// app/api/admin/donations/route.js
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Donation from '@/models/Donation';
import Campaign from '@/models/Campaign';
import User from '@/models/User';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user.role !== 'admin' && session.user.role !== 'moderator')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const search = searchParams.get('search');
    const status = searchParams.get('status');
    const campaignId = searchParams.get('campaignId');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    
    const skip = (page - 1) * limit;
    
    // Build query
    let query = {};
    
    if (status && status !== 'all') {
      query.status = status;
    }
    
    if (campaignId) {
      query.campaignId = campaignId;
    }
    
    if (search) {
      query.$or = [
        { donorName: { $regex: search, $options: 'i' } },
        { donorEmail: { $regex: search, $options: 'i' } },
        { transactionId: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (startDate && endDate) {
      query.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }
    
    // Get donations with populated data
    const donations = await Donation.find(query)
      .populate('campaignId', 'title image')
      .populate('donorId', 'firstName lastName email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    // Get total count
    const total = await Donation.countDocuments(query);
    
    // Calculate stats
    const totalDonations = await Donation.countDocuments();
    const totalAmountResult = await Donation.aggregate([
      { $match: { status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    const totalAmount = totalAmountResult[0]?.total || 0;
    
    const pendingDonations = await Donation.countDocuments({ status: 'pending' });
    const averageDonationResult = await Donation.aggregate([
      { $match: { status: 'completed' } },
      { $group: { _id: null, avg: { $avg: '$amount' } } }
    ]);
    const averageDonation = averageDonationResult[0]?.avg || 0;
    
    // Get recent donors
    const recentDonors = await Donation.aggregate([
      { $match: { status: 'completed' } },
      { $group: { 
        _id: '$donorId',
        totalDonated: { $sum: '$amount' },
        lastDonation: { $max: '$createdAt' },
        donationCount: { $sum: 1 }
      }},
      { $sort: { lastDonation: -1 } },
      { $limit: 5 },
      { $lookup: {
        from: 'users',
        localField: '_id',
        foreignField: '_id',
        as: 'donor'
      }},
      { $unwind: '$donor' }
    ]);
    
    return NextResponse.json({
      donations,
      stats: {
        totalDonations,
        totalAmount,
        pendingDonations,
        averageDonation,
        recentDonors
      },
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
    
  } catch (error) {
    console.error('Error fetching donations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch donations' },
      { status: 500 }
    );
  }
}
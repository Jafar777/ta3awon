// app/api/admin/campaigns/route.js
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Campaign from '@/models/Campaign';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';

// GET all campaigns for admin
export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    
    const skip = (page - 1) * limit;
    
    // Build query
    let query = {};
    
    if (status && status !== 'all') {
      query.status = status;
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Get campaigns
    const campaigns = await Campaign.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    // Get total count
    const total = await Campaign.countDocuments(query);
    
    // Calculate stats
    const activeCampaigns = await Campaign.countDocuments({ status: 'active' });
    const totalRaisedResult = await Campaign.aggregate([
      { $group: { _id: null, total: { $sum: '$amountRaised' } } }
    ]);
    const totalRaised = totalRaisedResult[0]?.total || 0;
    
    const totalDonorsResult = await Campaign.aggregate([
      { $group: { _id: null, total: { $sum: '$donorsCount' } } }
    ]);
    const totalDonors = totalDonorsResult[0]?.total || 0;
    
    return NextResponse.json({
      campaigns,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      },
      stats: {
        activeCampaigns,
        totalRaised,
        totalDonors,
        averageDonation: totalDonors > 0 ? totalRaised / totalDonors : 0
      }
    });
    
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    return NextResponse.json(
      { error: 'Failed to fetch campaigns' },
      { status: 500 }
    );
  }
}

// DELETE campaign
export async function DELETE(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Campaign ID is required' },
        { status: 400 }
      );
    }

    await dbConnect();
    
    // Optional: Also delete from Stripe if needed
    // await stripe.products.update(campaign.stripeProductId, { active: false });
    
    const campaign = await Campaign.findByIdAndDelete(id);
    
    if (!campaign) {
      return NextResponse.json(
        { error: 'Campaign not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Campaign deleted successfully' },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Error deleting campaign:', error);
    return NextResponse.json(
      { error: 'Failed to delete campaign' },
      { status: 500 }
    );
  }
}
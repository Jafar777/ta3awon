import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Campaign from '@/models/Campaign';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { campaignId, donationAmount, donorEmail } = await req.json();
    
    await dbConnect();
    const campaign = await Campaign.findById(campaignId);

    if (!campaign) {
      return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
    }

    // Create Stripe Checkout Session[citation:2]
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price: campaign.stripePriceId,
        quantity: Math.max(1, Math.floor(donationAmount * 100 / campaign.targetAmount)),
      }],
      mode: 'payment',
      success_url: `${process.env.NEXTAUTH_URL}/dashboard/donations/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/campaigns/${campaignId}`,
      customer_email: donorEmail,
      metadata: {
        campaignId: campaignId.toString(),
        donationType: 'one-time',
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: 'Checkout failed' }, { status: 500 });
  }
}
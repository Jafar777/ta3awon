// C:\Users\jafar\Desktop\ta3awon\app\api\auth\signup\route.js
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    console.log('Attempting to connect to database...');
    await dbConnect();
    console.log('Database connected');
    
    const body = await req.json();
    console.log('Request body:', body);
    
    const { firstName, lastName, email, password } = body;
    
    // Validate required fields
    if (!firstName || !lastName || !email || !password) {
      console.log('Missing required fields');
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }
    
    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      console.log('User already exists:', email);
      return NextResponse.json(
        { error: 'User with this email already exists' }, 
        { status: 400 }
      );
    }
    
    console.log('Creating new user...');
    // Create new user - password will be hashed by the pre-save hook
    const user = new User({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.toLowerCase().trim(),
      password: password,
      isVerified: true, // AUTO-VERIFY FOR DEVELOPMENT
      role: 'user', // Explicitly set role
    });
    
    // Save the user
    await user.save();
    console.log('User saved successfully:', user._id);
    
    // Remove password from response
    const userResponse = user.toJSON();
    
    return NextResponse.json(
      { 
        message: 'User created successfully',
        user: userResponse,
        requiresVerification: false
      }, 
      { status: 201 }
    );
    
  } catch (error) {
    console.error('Signup error details:', error);
    console.error('Error stack:', error.stack);
    
    // Handle specific Mongoose validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return NextResponse.json(
        { error: messages.join(', ') },
        { status: 400 }
      );
    }
    
    // Handle duplicate key error
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { 
        error: error.message || 'Registration failed. Please try again.' 
      }, 
      { status: 500 }
    );
  }
}

// Optional: Add other HTTP methods if needed
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
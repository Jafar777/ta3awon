// app/api/upload/route.js
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('image');
    
    if (!file) {
      return NextResponse.json(
        { error: 'No image file provided' },
        { status: 400 }
      );
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'Only image files are allowed' },
        { status: 400 }
      );
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'Image size should be less than 5MB' },
        { status: 400 }
      );
    }

    // Try to use Cloudinary if available
    try {
      const { v2: cloudinary } = await import('cloudinary');
      
      // Configure Cloudinary
      cloudinary.config({
        cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });

      // Convert file to buffer
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Upload to Cloudinary
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            folder: 'ta3awon_campaigns',
            resource_type: 'image'
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(buffer);
      });

      return NextResponse.json({
        publicId: result.public_id,
        url: result.secure_url,
        width: result.width,
        height: result.height
      });

    } catch (cloudinaryError) {
      console.error('Cloudinary error:', cloudinaryError);
      
      // Fallback: Save to local storage (for development)
      if (process.env.NODE_ENV === 'development') {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        
        // Generate a unique filename
        const timestamp = Date.now();
        const filename = `image_${timestamp}_${file.name}`;
        
        // Save to public/uploads directory
        const path = require('path');
        const fs = require('fs').promises;
        
        const uploadDir = path.join(process.cwd(), 'public', 'uploads');
        await fs.mkdir(uploadDir, { recursive: true });
        
        const filePath = path.join(uploadDir, filename);
        await fs.writeFile(filePath, buffer);
        
        const url = `/uploads/${filename}`;
        
        return NextResponse.json({
          publicId: `local_${timestamp}`,
          url: url,
          width: 0,
          height: 0,
          note: 'Saved locally for development'
        });
      }
      
      // In production without Cloudinary, we need an alternative
      throw new Error('Image upload service is not configured');
    }

  } catch (error) {
    console.error('Upload error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to upload image',
        details: error.message 
      },
      { status: 500 }
    );
  }
}
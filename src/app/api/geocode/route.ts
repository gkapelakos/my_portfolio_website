import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // Try to read Vercel's Geolocation header
  const countryHeader = request.headers.get('x-vercel-ip-country');
  
  if (countryHeader) {
    return NextResponse.json({ country: countryHeader.toUpperCase() });
  }

  // Fallback for local development or non-Vercel environments: query a privacy-friendly IP API
  try {
    const response = await fetch('https://ipapi.co/json/', {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    if (response.ok) {
      const data = await response.json();
      return NextResponse.json({ country: data.country_code?.toUpperCase() || 'US' });
    }
  } catch (error) {
    console.error('Failed to resolve IP location:', error);
  }

  return NextResponse.json({ country: 'unknown' });
}

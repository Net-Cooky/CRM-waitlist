import { createClient } from '@supabase/supabase-js'

// New FOS project configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Function to get user's location from IP address
async function getLocationFromIP() {
  try {
    // Using ipapi.co for free IP geolocation (1000 requests/day free)
    const response = await fetch('https://ipapi.co/json/', {
      method: 'GET',
      headers: {
        'User-Agent': 'ClientFlow-Waitlist/1.0'
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch location');
    }
    
    const locationData = await response.json();
    
    return {
      ip: locationData.ip || null,
      country: locationData.country_name || null,
      country_code: locationData.country_code || null,
      city: locationData.city || null,
      timezone: locationData.timezone || null
    };
  } catch (error) {
    console.warn('Failed to get location:', error);
    // Return null values if geolocation fails - don't block signup
    return {
      ip: null,
      country: null,
      country_code: null,
      city: null,
      timezone: null
    };
  }
}

// Function to add email to waitlist using direct database access
export async function addToWaitlist(email, niche = 'client_management', source = 'landing_page') {
  try {
    // Validate email format
    if (!isValidEmail(email)) {
      return { 
        success: false, 
        error: 'Please enter a valid email address' 
      }
    }

    // Get user's location data
    const locationData = await getLocationFromIP();
    console.log('Location data retrieved:', locationData);
    
    // Get user agent for additional context
    const userAgent = typeof window !== 'undefined' ? window.navigator.userAgent : null;

    // Insert email into waitlist table with location data
    const { data, error } = await supabase
      .from('waitlist')
      .insert({
        email: email.trim().toLowerCase(),
        niche,
        source,
        ip_address: locationData.ip,
        country: locationData.country,
        country_code: locationData.country_code,
        city: locationData.city,
        timezone: locationData.timezone,
        user_agent: userAgent
      })
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      
      // Handle duplicate email error
      if (error.code === '23505') {
        return { 
          success: false, 
          error: 'This email is already on our waitlist!' 
        }
      }
      
      return { 
        success: false, 
        error: 'Failed to join waitlist. Please try again.' 
      }
    }

    // Get updated waitlist count
    const countResult = await getWaitlistCount()
    
    // Create location-aware success message
    let successMessage = 'Successfully joined the waitlist!';
    if (locationData.country) {
      successMessage += ` Welcome from ${locationData.country}! 🌍`;
    }
    
    return { 
      success: true, 
      data,
      waitlistCount: countResult.count,
      message: successMessage,
      location: {
        country: locationData.country,
        city: locationData.city,
        timezone: locationData.timezone
      }
    }
  } catch (error) {
    console.error('Error adding to waitlist:', error)
    return { 
      success: false, 
      error: 'Network error. Please check your connection and try again.' 
    }
  }
}

// Function to get waitlist count using direct database access
export async function getWaitlistCount() {
  try {
    // Get count from waitlist table (excluding blocked entries)
    const { count, error } = await supabase
      .from('waitlist')
      .select('*', { count: 'exact', head: true })
      .eq('blocked', false)

    if (error) {
      console.error('Database error:', error)
      // Fallback to default count if database fails
      return { success: false, count: 1247 }
    }

    return { 
      success: true, 
      count: count || 0 
    }
  } catch (error) {
    console.error('Error getting waitlist count:', error)
    // Return fallback count on error
    return { success: false, count: 1247 }
  }
}

// Utility function to validate email format on client side
export function isValidEmail(email) {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
  return emailRegex.test(email) && email.length <= 255
}

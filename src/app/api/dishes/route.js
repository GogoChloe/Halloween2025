import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

const KV_KEY = 'halloween-dishes-taken';

// Initial data for first deployment
const INITIAL_DISHES = [
  { dishId: "mini-pizzas", takenBy: "Simon", timestamp: "2025-10-21T00:00:00.000Z" },
  { dishId: "sandwichs-tombeaux", takenBy: "Lilia", timestamp: "2025-10-21T00:00:00.000Z" },
  { dishId: "momies-saucisses", takenBy: "Diliana", timestamp: "2025-10-21T00:00:00.000Z" },
  { dishId: "oeuf-mimosa", takenBy: "Aurelien", timestamp: "2025-10-21T00:00:00.000Z" },
  { dishId: "balais-sorciere", takenBy: "Mia", timestamp: "2025-10-21T00:00:00.000Z" },
  { dishId: "punch-orange", takenBy: "Aurelien", timestamp: "2025-10-21T00:00:00.000Z" }
];

// GET: Read current dishes state
export async function GET() {
  try {
    let takenDishes = await kv.get(KV_KEY);
    
    // Initialize with default data if empty
    if (!takenDishes || !Array.isArray(takenDishes) || takenDishes.length === 0) {
      await kv.set(KV_KEY, INITIAL_DISHES);
      takenDishes = INITIAL_DISHES;
    }
    
    return NextResponse.json({ success: true, takenDishes });
  } catch (error) {
    console.error('Error reading dishes state:', error);
    // Return initial dishes as fallback
    return NextResponse.json({ success: true, takenDishes: INITIAL_DISHES });
  }
}

// POST: Update dishes state (mark dishes as taken)
export async function POST(request) {
  try {
    const { dishes, firstName } = await request.json();
    
    if (!dishes || !Array.isArray(dishes) || !firstName) {
      return NextResponse.json(
        { success: false, error: 'Invalid request: dishes array and firstName required' },
        { status: 400 }
      );
    }
    
    // Read existing state from KV
    let takenDishes = await kv.get(KV_KEY) || [];
    
    // Add new taken dishes
    const timestamp = new Date().toISOString();
    const newEntries = dishes.map(dishId => ({
      dishId,
      takenBy: firstName,
      timestamp
    }));
    
    // Remove duplicates (keep latest)
    const dishMap = new Map();
    [...takenDishes, ...newEntries].forEach(entry => {
      dishMap.set(entry.dishId, entry);
    });
    
    const updatedDishes = Array.from(dishMap.values());
    
    // Save to KV
    await kv.set(KV_KEY, updatedDishes);
    
    return NextResponse.json({ success: true, takenDishes: updatedDishes });
  } catch (error) {
    console.error('Error updating dishes state:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

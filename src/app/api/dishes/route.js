import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'dishes-state.json');

// Ensure data directory exists
function ensureDataDirectory() {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

// GET: Read current dishes state
export async function GET() {
  try {
    ensureDataDirectory();
    
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, 'utf8');
      const takenDishes = JSON.parse(data);
      return NextResponse.json({ success: true, takenDishes });
    }
    
    // Return empty array if file doesn't exist
    return NextResponse.json({ success: true, takenDishes: [] });
  } catch (error) {
    console.error('Error reading dishes state:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST: Update dishes state (mark dishes as taken)
export async function POST(request) {
  try {
    ensureDataDirectory();
    
    const { dishes, firstName } = await request.json();
    
    if (!dishes || !Array.isArray(dishes) || !firstName) {
      return NextResponse.json(
        { success: false, error: 'Invalid request: dishes array and firstName required' },
        { status: 400 }
      );
    }
    
    // Read existing state
    let takenDishes = [];
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, 'utf8');
      takenDishes = JSON.parse(data);
    }
    
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
    
    // Save to file
    fs.writeFileSync(DATA_FILE, JSON.stringify(updatedDishes, null, 2));
    
    return NextResponse.json({ success: true, takenDishes: updatedDishes });
  } catch (error) {
    console.error('Error updating dishes state:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

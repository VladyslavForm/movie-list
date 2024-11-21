import { NextResponse } from 'next/server';
import { Pool } from 'pg';
import { v4 as uuidv4 } from 'uuid';

// Initialize a connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, release_year, image } = body;

    if (!title || !release_year || !image) {
      return NextResponse.json(
        { error: 'All fields are required' },
      );
    }

    const id = uuidv4(); // Generate a new UUID

    const result = await pool.query(
      'INSERT INTO movies (id, title, release_year, image) VALUES ($1, $2, $3, $4) RETURNING *',
      [id, title, release_year, image]
    );

    return NextResponse.json({
      message: 'Movie created successfully',
      movie: result.rows[0],
    });
  } catch (error) {
    console.error('Error inserting data:', error);
    return NextResponse.json(
      { error: 'Internal server error' }
    );
  }
}

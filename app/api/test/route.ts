import { NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';

export async function GET() {
  try {
    // Try to create a test task
    const testTask = await prisma.task.create({
      data: {
        text: "Test task",
        category: "test",
        priority: "low",
      }
    });

    // If successful, delete it right away
    await prisma.task.delete({
      where: {
        id: testTask.id
      }
    });

    return NextResponse.json({ 
      status: 'Connected to database successfully!',
      timestamp: new Date()
    });
  } catch (error) {
    console.error('Database connection test failed:', error);
    return NextResponse.json({ 
      error: 'Failed to connect to database',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { 
      status: 500 
    });
  }
} 
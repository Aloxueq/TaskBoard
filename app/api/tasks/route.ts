import { NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';

export async function GET() {
  const tasks = await prisma.task.findMany();
  console.log('GET tasks:', tasks);
  return NextResponse.json(tasks);
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log('POST received data:', data);
    
    const task = await prisma.task.create({ data });
    console.log('Created task:', task);
    
    return NextResponse.json(task);
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ error: 'Failed to create task' }, { status: 500 });
  }
}
import { NextResponse } from 'next/server'
import { loadLLMData } from '@/lib/server-data'

export async function GET() {
  try {
    const data = await loadLLMData()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error loading data:', error)
    return NextResponse.json(
      { error: 'Failed to load data' },
      { status: 500 }
    )
  }
}
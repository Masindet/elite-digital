import { NextResponse } from 'next/server'
import { getCartCount } from '@/app/(app)/_actions/cartCount'
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId')

  if (!userId) {
    return NextResponse.json({ error: 'Missing userId' }, { status: 400 })
  }

  try {
    const count = await getCartCount(Number(userId))
    return NextResponse.json({ count })
  } catch (error) {
    console.error('Error in getCartCount:', error)
    return NextResponse.json({ error: 'Failed to get cart count' }, { status: 500 })
  }
}

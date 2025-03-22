import { NextResponse } from 'next/server'
import { removeCartItem } from '@/app/(app)/_actions/cart'
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId')
  const productId = searchParams.get('productId')
  if (!userId || !productId) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }
  try {
    const updatedCart = await removeCartItem(Number(userId), Number(productId))
    return NextResponse.json({ cart: updatedCart })
  } catch (error) {
    console.error('Error removing item from cart:', error)
    return NextResponse.json({ error: 'Failed to remove item from cart' }, { status: 500 })
  }
}

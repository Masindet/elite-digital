import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId')
  if (!userId) {
    return NextResponse.json({ error: 'Missing userId' }, { status: 400 })
  }
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'orders',
      where: { user: { equals: Number(userId) } },
      sort: '-createdAt',
      depth: 2,
    })
    return NextResponse.json({ orders: result.docs })
  } catch (error) {
    console.error('Error fetching orders:', error)
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 })
  }
}

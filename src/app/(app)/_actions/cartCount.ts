'use server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function getCartCount(userId: number): Promise<number> {
  const payload = await getPayload({ config })
  const existingCart = await payload.find({
    collection: 'cart',
    where: { user: { equals: userId } },
  })

  if (existingCart.docs.length > 0) {
    const cart = existingCart.docs[0]
    return cart.items ? cart.items.reduce((sum: number, item: any) => sum + item.quantity, 0) : 0
  }
  return 0
}

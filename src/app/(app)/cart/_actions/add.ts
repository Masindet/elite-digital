'use server'

import { getPayload } from 'payload'
import config from '@payload-config'

export async function addToCart(
  userId: number,
  productId: number | string, // accept string as well
  quantity: number,
  price: number,
): Promise<{ message: string }> {
  try {
    const payload = await getPayload({ config })

    if (!userId || !productId || !quantity || !price) {
      throw new Error('Missing required fields')
    }

    // Ensure productId is a number (if it comes as a string)
    const productIdNumber: number = typeof productId === 'number' ? productId : Number(productId)

    // Find the user's cart
    const existingCart = await payload.find({
      collection: 'cart',
      where: { user: { equals: userId } },
    })

    if (existingCart.docs.length > 0) {
      // Cart exists
      const cart = existingCart.docs[0]

      // Map items to ensure product is a number
      const items: { product: number; quantity: number; price: number }[] = (cart.items ?? []).map(
        (item: any) => ({
          product:
            typeof item.product === 'number'
              ? item.product
              : Number(item.product?.id || item.product),
          quantity: item.quantity,
          price: item.price,
        }),
      )

      // Check if product already exists in cart
      const existingItemIndex = items.findIndex((item) => item.product === productIdNumber)

      if (existingItemIndex !== -1) {
        // Increase quantity for existing product
        items[existingItemIndex].quantity += quantity
      } else {
        // Add new product
        items.push({ product: productIdNumber, quantity, price })
      }

      // Recalculate total price
      const total = items.reduce((sum, item) => sum + item.quantity * item.price, 0)

      // Update cart in DB
      await payload.update({
        collection: 'cart',
        id: cart.id,
        data: { items, total },
      })
    } else {
      // Create new cart with the item
      await payload.create({
        collection: 'cart',
        data: {
          user: userId,
          items: [{ product: productIdNumber, quantity, price }],
          total: quantity * price,
        },
      })
    }

    return { message: 'Item added to cart' }
  } catch (error) {
    console.error('Error adding to cart:', error)
    throw error
  }
}

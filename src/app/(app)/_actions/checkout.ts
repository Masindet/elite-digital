'use server'

import { getPayload } from 'payload'
import config from '@payload-config'

export interface ShippingAddress {
  street: string
  city: string
  state: string
  zipCode: string
  country: string
}

/**
 * Creates an order from the user's cart and then clears the cart.
 *
 * @param userId - The id of the user placing the order.
 * @param shippingAddress - The shipping address details.
 * @returns The created order document.
 */
export async function createOrder(
  userId: number,
  shippingAddress: ShippingAddress,
): Promise<{ order: any }> {
  const payload = await getPayload({ config })

  // Retrieve the user's cart from Payload
  const existingCart = await payload.find({
    collection: 'cart',
    where: { user: { equals: userId } },
    depth: 3,
  })

  if (existingCart.docs.length === 0) {
    throw new Error('Cart not found for user')
  }

  const cart = existingCart.docs[0]

  // Create the order data using cart information
  const orderData = {
    user: userId,
    items: cart.items, // Assumes items now include populated product details
    total: cart.total,
    status: 'pending', // initial order status
    paymentStatus: 'pending', // adjust based on your payment flow
    shippingAddress, // from the parameter
  }

  // Create a new order in the Orders collection
  const order = await payload.create({
    collection: 'orders',
    data: orderData,
  })

  // Clear the user's cart after successful order creation
  await payload.update({
    collection: 'cart',
    id: cart.id,
    data: { items: [], total: 0 },
  })

  return { order }
}

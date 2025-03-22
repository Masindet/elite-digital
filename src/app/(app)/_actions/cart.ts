'use server'
import { getPayload } from 'payload'
import config from '@payload-config'

/**
 * Get the cart for a given user.
 */
export async function getCart(userId: number): Promise<any> {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'cart',
    where: { user: { equals: userId } },
    depth: 3,
  })
  //   if (result.docs.length > 0) {
  //     // Ensure items are mapped to have a numeric product value.
  //     const cart = result.docs[0]
  //     cart.items = (cart.items ?? []).map((item: any) => ({
  //       product:
  //         typeof item.product === 'number' ? item.product : Number(item.product?.id || item.product),
  //       quantity: item.quantity,
  //       price: item.price,
  //     }))
  //     return cart
  //   }
  if (result.docs.length > 0) {
    const cart = result.docs[0]
    cart.items = (cart.items ?? []).map((item: any) => ({
      // Now item.product should be a full object, not just an ID.
      product: item.product, // full product object
      quantity: item.quantity,
      price: item.price,
    }))

    return cart
  }

  return null
}

/**
 * Update the quantity of a product in the user's cart.
 */
export async function updateCartItemQuantity(
  userId: number,
  productId: number,
  newQuantity: number,
): Promise<any> {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'cart',
    where: { user: { equals: userId } },
  })
  if (result.docs.length === 0) {
    throw new Error('Cart not found')
  }
  const cart = result.docs[0]
  // Map items to ensure product is a number.
  const items: { product: number; quantity: number; price: number }[] = (cart.items ?? []).map(
    (item: any) => ({
      product:
        typeof item.product === 'number' ? item.product : Number(item.product?.id || item.product),
      quantity: item.quantity,
      price: item.price,
    }),
  )
  const index = items.findIndex((item) => item.product === productId)
  if (index === -1) {
    throw new Error('Product not found in cart')
  }
  items[index].quantity = newQuantity
  const total = items.reduce((sum, item) => sum + item.quantity * item.price, 0)
  const updatedCart = await payload.update({
    collection: 'cart',
    id: cart.id,
    data: { items, total },
  })
  return updatedCart
}

/**
 * Remove an item from the user's cart.
 */
export async function removeCartItem(userId: number, productId: number): Promise<any> {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'cart',
    where: { user: { equals: userId } },
  })
  if (result.docs.length === 0) {
    throw new Error('Cart not found')
  }
  const cart = result.docs[0]
  const items: { product: number; quantity: number; price: number }[] = (cart.items ?? []).map(
    (item: any) => ({
      product:
        typeof item.product === 'number' ? item.product : Number(item.product?.id || item.product),
      quantity: item.quantity,
      price: item.price,
    }),
  )
  const updatedItems = items.filter((item) => item.product !== productId)
  const total = updatedItems.reduce((sum, item) => sum + item.quantity * item.price, 0)
  const updatedCart = await payload.update({
    collection: 'cart',
    id: cart.id,
    data: { items: updatedItems, total },
  })
  return updatedCart
}

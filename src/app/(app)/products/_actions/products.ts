// app/products/_actions/products.ts
'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import type { Where } from 'payload'

const payload = await getPayload({ config })

export async function getProducts(
  category?: string,
  brand?: string,
  minPrice: number = 0,
  maxPrice?: number, // Allow undefined maxPrice
) {
  try {
    const where: any = {
      price: {
        greater_than_equal: minPrice,
      },
    }

    // Ignore maxPrice if it's 0 or undefined
    if (maxPrice && maxPrice > 0) {
      where.price.less_than_equal = maxPrice
    }

    if (category && category !== 'All') {
      where.category = { equals: category }
    }

    if (brand && brand !== 'All') {
      where.brand = { equals: brand }
    }

    const response = await payload.find({ collection: 'products', where })
    return response.docs
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

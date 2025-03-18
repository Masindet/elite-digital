// app/products/_actions/products.ts
'use server'

import { getPayload } from 'payload'
import config from '@payload-config'

type Filters = {
  category?: string
  brand?: string
  minPrice?: number
  maxPrice?: number
  page?: number
  limit?: number
}

// app/products/_actions/products.ts
export async function getProductsFromDB(filters: Filters = {}) {
  const payload = await getPayload({ config })

  //   console.log('FILTERS:', filters) // debug filters
  //   const result = await payload.find({
  //     collection: 'products',
  //     limit: filters.limit || 9,
  //     page: filters.page || 1,
  //     where: {
  //       price: {
  //         greater_than_equal: filters.minPrice ?? 0,
  //         less_than_equal: filters.maxPrice ?? 10000,
  //       },
  //       ...(filters.category ? { category: { equals: filters.category } } : {}),
  //       ...(filters.brand ? { brand: { equals: filters.brand } } : {}),
  //     },
  //     sort: '-createdAt',
  //   })
  const result = await payload.find({
    collection: 'products',
    limit: 10,
  })

  console.log('Result:', result.docs)
  console.log('PRODUCTS FOUND:', result.docs.length) // debug result

  return result
}

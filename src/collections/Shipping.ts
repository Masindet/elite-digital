import type { CollectionConfig } from 'payload'

export const Shipping: CollectionConfig = {
  slug: 'shipping',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'price',
      type: 'number',
      required: true,
    },
    {
      name: 'estimatedDeliveryTime',
      type: 'text',
      required: false,
      admin: {
        description: 'E.g., "3-5 business days"',
      },
    },
  ],
}

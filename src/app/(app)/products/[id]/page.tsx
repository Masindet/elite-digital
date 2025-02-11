'use client'

import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ShoppingCart, Star } from 'lucide-react'
import { products } from '../_components/ProductList' // Import the products array

export default function ProductDetailsPage() {
  const { id } = useParams()
  const productId = Number(id)

  // Find the product from the static list
  const product = products.find((p) => p.id === productId)

  if (!product) {
    return <div className="text-center text-red-500 text-xl">Product Not Found</div>
  }

  return (
    <div className="min-h-screen bg-background py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Card className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="flex justify-center">
            <img src={product.image} alt={product.name} className="w-full max-w-sm rounded-lg" />
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <div className="flex items-center mb-4">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span className="ml-2 text-lg">{product.rating}</span>
            </div>
            <p className="text-xl font-bold text-primary mb-4">${product.price}</p>
            <p className="text-muted-foreground mb-6">Category: {product.category}</p>

            <Button className="w-full">
              <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}

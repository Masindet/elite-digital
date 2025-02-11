'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import { ShoppingCart, Star, SlidersHorizontal } from 'lucide-react'
import Link from 'next/link'

export const products = [
  {
    id: 1,
    name: 'Pro Wireless Headphones',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
    rating: 4.8,
    category: 'Audio',
    brand: 'SoundMaster',
  },
  {
    id: 2,
    name: 'Ultra HD Smart TV',
    price: 1299.99,
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&q=80',
    rating: 4.9,
    category: 'TV & Video',
    brand: 'TechVision',
  },
  {
    id: 3,
    name: 'Premium Smartwatch',
    price: 399.99,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80',
    rating: 4.7,
    category: 'Wearables',
    brand: 'SmartLife',
  },
  {
    id: 4,
    name: 'Gaming Laptop Pro',
    price: 1899.99,
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&q=80',
    rating: 4.9,
    category: 'Computers',
    brand: 'GameTech',
  },
  {
    id: 5,
    name: '4K Webcam',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1587826080692-f439a5212f45?w=800&q=80',
    rating: 4.6,
    category: 'Accessories',
    brand: 'ClearView',
  },
  {
    id: 6,
    name: 'Wireless Gaming Mouse',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80',
    rating: 4.8,
    category: 'Accessories',
    brand: 'GameTech',
  },
]

const categories = ['All', 'Audio', 'TV & Video', 'Wearables', 'Computers', 'Accessories']
const brands = ['All', 'SoundMaster', 'TechVision', 'SmartLife', 'GameTech', 'ClearView']

export default function ProductsPage() {
  const [priceRange, setPriceRange] = useState([0, 2000])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedBrand, setSelectedBrand] = useState('All')
  const [showFilters, setShowFilters] = useState(false)

  const filteredProducts = products.filter((product) => {
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory
    const matchesBrand = selectedBrand === 'All' || product.brand === selectedBrand
    return matchesPrice && matchesCategory && matchesBrand
  })

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Our Products</h1>
          <Button
            variant="outline"
            className="lg:hidden"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters - Desktop */}
          <div className={`lg:w-1/4 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Filters</h2>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-4">Price Range</h3>
                <Slider
                  defaultValue={[0, 2000]}
                  max={2000}
                  step={10}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="mb-2"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center">
                      <Checkbox
                        id={`category-${category}`}
                        checked={selectedCategory === category}
                        onCheckedChange={() => setSelectedCategory(category)}
                      />
                      <label
                        htmlFor={`category-${category}`}
                        className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Brands */}
              <div>
                <h3 className="text-sm font-medium mb-4">Brands</h3>
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <div key={brand} className="flex items-center">
                      <Checkbox
                        id={`brand-${brand}`}
                        checked={selectedBrand === brand}
                        onCheckedChange={() => setSelectedBrand(brand)}
                      />
                      <label
                        htmlFor={`brand-${brand}`}
                        className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {brand}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Link key={product.id} href={`/products/${product.id}`} passHref>
                  <Card className="overflow-hidden group cursor-pointer">
                    <div className="aspect-w-1 aspect-h-1 relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="object-cover w-full h-[200px] group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold">{product.name}</h3>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="ml-1 text-sm">{product.rating}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
                      <p className="text-xl font-bold text-primary mb-4">${product.price}</p>
                      <Button className="w-full">
                        <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                      </Button>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

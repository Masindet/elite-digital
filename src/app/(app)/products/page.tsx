'use client'

import { useEffect, useState } from 'react'
import { getProducts } from './_actions/products'
import { addToCart } from '../cart/_actions/add'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { getUser } from '../_actions/getUser'

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [brand, setBrand] = useState('')
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined)
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    async function fetchUser() {
      const currentUser = await getUser()
      setUser(currentUser)
    }
    fetchUser()
  }, [])

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchProducts()
    }, 500) // Debounce search input
    return () => clearTimeout(timeout)
  }, [category, brand, minPrice, maxPrice, search])

  const fetchProducts = async () => {
    setLoading(true)
    const data = await getProducts(category, brand, minPrice, maxPrice, search)
    setProducts(data)
    setLoading(false)
  }

  const handleAddToCart = async (product: any) => {
    try {
      if (user) {
        await addToCart(user.id, product.id, 1, product.price)
        alert('Added to cart!')
      } else {
        const localCart = JSON.parse(localStorage.getItem('cart') || '[]')
        const existingItemIndex = localCart.findIndex((item: any) => item.productId === product.id)

        if (existingItemIndex !== -1) {
          localCart[existingItemIndex].quantity += 1
        } else {
          localCart.push({ productId: product.id, quantity: 1, price: product.price })
        }
        localStorage.setItem('cart', JSON.stringify(localCart))
        alert('Added to cart! (Will sync on login)')
      }
    } catch (error) {
      console.error(error)
      alert('Failed to add product to cart.')
    }
  }

  return (
    <div className="ml-12 p-6 bg-white">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>
      <div className="flex gap-6">
        {/* Sidebar Filters */}
        <div className="w-1/4 p-4 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-bold mb-3">Filters</h3>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 w-full rounded mb-3"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 w-full rounded mb-3"
          >
            <option value="">All Categories</option>
            <option value="laptops">Laptops</option>
            <option value="phones">Phones</option>
            <option value="accessories">Accessories</option>
          </select>
          <select
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="border p-2 w-full rounded mb-3"
          >
            <option value="">All Brands</option>
            <option value="apple">Apple</option>
            <option value="samsung">Samsung</option>
            <option value="hp">HP</option>
          </select>
          <p>Min Price</p>
          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
            className="border p-2 w-full rounded mb-3"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="border p-2 w-full rounded mb-3"
          />
        </div>
        {/* Product List */}
        <div className="w-3/4">
          {loading ? (
            <p>Loading...</p>
          ) : products.length === 0 ? (
            <p>No products found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="border rounded-lg shadow-md hover:shadow-lg">
                  <Link href={`/product/${product.id}`}>
                    <img
                      src={`http://localhost:3000${product.images.url}`}
                      alt={product.name}
                      className="w-full h-40 object-cover rounded-t-lg"
                    />
                  </Link>
                  <CardContent className="p-4">
                    <h2 className="text-lg font-semibold">{product.name}</h2>
                    <p className="text-gray-500 text-sm mb-2">{product.description}</p>
                    <p className="font-bold text-lg">Ksh.{product.price}</p>
                    <Button
                      className="mt-3 w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 rounded"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

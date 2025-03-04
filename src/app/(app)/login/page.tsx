'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FiEye, FiEyeOff } from 'react-icons/fi' // Import eye icons
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false) // State for toggling password visibility

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    // Simulate successful login
    if (formData.email === '' || formData.password === '') {
      setError('Please fill in all fields.')
      return
    }

    alert('Login Successful!')
    router.push('/dashboard') // Redirect to the dashboard or another page
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Log In</h2>
        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'} // Toggle between text and password
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="absolute right-2 top-2"
              onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
            >
              {showPassword ? <FiEyeOff /> : <FiEye />} {/* Eye icon */}
            </button>
          </div>
          <Button type="submit" className="w-full">
            Log In
          </Button>
        </form>
        <p className="text-sm text-center mt-4">
          Don't have an account?{' '}
          <Link href="/sign-up" className="text-blue-600">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}

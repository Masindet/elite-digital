'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import Link from 'next/link'
import { signup, SignupResponse } from './_actions/signup'

export default function SignUpPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' })
  const [error, setError] = useState<string | null>(null)
  const [isPending, setIsPending] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setIsPending(true)

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setIsPending(false)
      return
    }

    const result: SignupResponse = await signup({
      email: formData.email,
      password: formData.password,
    })

    setIsPending(false)

    if (result.success) {
      router.push('/home')
    } else {
      setError(result.error || 'Sign-up failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
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
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="absolute right-2 top-2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          <div className="relative">
            <Input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="absolute right-2 top-2"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? 'Signing Up...' : 'Sign Up'}
          </Button>
        </form>
        <p className="text-sm text-center mt-4">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-600">
            Log In
          </Link>
        </p>
      </div>
    </div>
  )
}

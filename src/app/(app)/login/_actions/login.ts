'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { User } from '@/payload-types'
import { cookies } from 'next/headers'

interface LoginParams {
  email: string
  password: string
}

export interface LoginResponse {
  success: boolean
  error?: string
}

export type Result = {
  exp?: number
  token?: string
  user?: User
}

export async function login({ email, password }: LoginParams): Promise<LoginResponse> {
  const payload = await getPayload({ config })
  try {
    const result: Result = await payload.login({
      collection: 'users',
      data: { email, password },
    })
    if (result.token) {
      const cookieStore = await cookies()
      cookieStore.set('payload-token', result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development', // true in production
        path: '/',
      })
      return { success: true }
    } else {
      return { success: false, error: 'Invalid email or password' }
    }
  } catch (error) {
    console.error('Login error', error)
    return { success: false, error: 'An error occurred' }
  }
}

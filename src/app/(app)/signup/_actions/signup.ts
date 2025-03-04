'use server'

import { getPayload } from 'payload'
import { User } from '@/payload-types'
import { cookies } from 'next/headers'
import config from '@payload-config'

interface SignupParams {
  email: string
  password: string
}

export interface SignupResponse {
  success: boolean
  error?: string
}

type Result = {
  exp?: number
  token?: string
  user?: User
}
export async function signup({ email, password }: SignupParams): Promise<SignupResponse> {
  const payload = await getPayload({ config })
  try {
    await payload.create({
      collection: 'users',
      data: { email, password },
    })
    const result: Result = await payload.login({
      collection: 'users',
      data: { email, password },
    })
    if (result.token) {
      const cookieStore = await cookies()
      cookieStore.set({
        name: 'payload-token',
        value: result.token,
        httpOnly: true,
        path: '/',
      })
      return { success: true }
    } else {
      return { success: false, error: 'Login failed' }
    }
  } catch (error) {
    console.error('Sign up error', error)
    return { success: false, error: 'Signup failed ' }
  }
}

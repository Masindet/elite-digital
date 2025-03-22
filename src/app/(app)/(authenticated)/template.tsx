import { redirect } from 'next/navigation'
import React, { FC, ReactNode } from 'react'
import { getUser } from '../_actions/getUser'
import { Navbar } from '@/components/ui/navbar'
interface TemplateProps {
  children: ReactNode
}

const Layout: FC<TemplateProps> = async ({ children }) => {
  const user = await getUser()
  if (!user) {
    redirect('/login')
    return null
  }
  return <div>{children}</div>
}

export default Layout

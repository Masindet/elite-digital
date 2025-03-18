'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { logout } from '../_actions/logout'
import { AiOutlineLogout } from 'react-icons/ai'

export default function LogoutButton() {
  const [isPending, setIsPending] = useState(false)
  const router = useRouter()

  async function handleLogout() {
    setIsPending(true)
    const result = await logout()
    setIsPending(false)

    if (result.success) {
      router.refresh() // Refresh to reflect logout state
      window.location.reload()
    } else {
      alert('Logout failed')
    }
  }

  return (
    <button
      onClick={handleLogout}
      disabled={isPending}
      className="text-gray-700 hover:text-red-500 flex items-center"
    >
      {isPending ? 'Logging out...' : <AiOutlineLogout size={20} />}
      <span className="ml-2">Logout</span>
    </button>
  )
}

'use client'

import React from 'react'
import {IconButton} from '@/lib/components/buttons/icon-button'
import {signOut} from 'next-auth/react'

export const LogoutButton: React.FC = () => {
  const handleLogout = () => {
    signOut()
  }

  return (
    <IconButton
      icon="/assets/images/logout.svg"
      label="Logout"
      onClick={handleLogout}
    />
  )
}

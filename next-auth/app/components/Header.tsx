'use client'
import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react"
import { redirect } from "next/navigation"

export default function Header() {
  const handleSignout = () => {
    signOut();
    redirect('/');
  }
  return (
    <div>
      Let-me-in
      <button type="button" onClick={handleSignout}>signout</button>
    </div>
  )
} 
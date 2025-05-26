"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

interface UserWebsiteProps {
  sheetId: string
  isPaid: boolean
  username: string
}

export default function UserWebsite({ sheetId, isPaid, username }: UserWebsiteProps) {
  const router = useRouter()

  useEffect(() => {
    // Redirect to the index.html file for this username
    router.push(`/${username}/index.html`)
  }, [username, router])

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
    </div>
  )
}

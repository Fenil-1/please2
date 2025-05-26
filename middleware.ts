import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // You can add middleware logic here if needed
  // For example, rate limiting, logging, etc.
  return NextResponse.next()
}

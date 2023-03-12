import React from 'react'
import Link from 'next/link';

export default function Navbar() {
  return (
    <>
        <Link href="/">Home</Link>
        <Link href="/signin">Singin</Link>
        <Link href="/signup">Signup</Link>
    </>
  )
}

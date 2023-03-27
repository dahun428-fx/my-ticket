import React from 'react'
import Link from 'next/link';
import useAuth from '../../Hoc/useAuth';
import { signOut } from 'next-auth/react';

export default function Navbar() {

  const isAuthenticated = useAuth(true);

  const signOutHandler = (e) => {
    e.preventDefault();
    signOut();
  }

  return (
    <>
      <div>
        <Link href="/">Home</Link>
      </div>
      <div>
        <Link href="/signin">Singin</Link>
      </div>
      <div>
        <Link href="/signup">Signup</Link>
      </div>
      {isAuthenticated && 
      <>
        <div>
          <Link href="/test/getuserTest">getuserTest</Link>
        </div>
        <div>
          <Link onClick={(e) => signOutHandler(e)} href="/signout">Signout</Link>
        </div>
      </>
      }
    </>
  )
}

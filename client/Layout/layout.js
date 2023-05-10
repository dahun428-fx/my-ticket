import React from 'react'
import Navbar from '../Component/Common/Navbar';


export default function layout({children}) {
  return (
    <>
        <Navbar/>
        <div>{children}</div>
        <div>
          footer
        </div>
    </>
  )
}

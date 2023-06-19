import React from 'react'
import Navbar from '../Component/Common/Navbar';
import Footer from '../Component/Common/Footer';


export default function layout({children}) {
  return (
    <>
        <Navbar/>
        <div>{children}</div>
        <div>
          <Footer />
        </div>
    </>
  )
}

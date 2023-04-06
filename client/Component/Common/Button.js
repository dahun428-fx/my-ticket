import { Button } from '@mui/material'
import React from 'react'

export default function Btn(props) {
  return (
    <>
      <Button {...props}>{props.title}</Button>
    </>
  )
}

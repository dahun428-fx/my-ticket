import React from 'react'
import Button from '@mui/material/Button'

export default function Btn(props) {
  return (
    <Button {...props}>{props.title}</Button>
  )
}

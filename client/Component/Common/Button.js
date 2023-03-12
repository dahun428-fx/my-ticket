import React from 'react'

export default function Button(props) {
  return (
    <button type={props.type}>{props.title}</button>
  )
}

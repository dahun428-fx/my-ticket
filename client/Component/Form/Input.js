import React from 'react'

export default function Input(props) {
  return (
    <div>
        <label htmlFor={props.name}>{props.title}</label>
        <input
        value={props.value}
        name={props.name}
        type={props.type}
        placeholder={props.placeholder}
        onChange={props.onChange}
        />
    </div>
  )
}

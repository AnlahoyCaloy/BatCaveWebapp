"use client"
import React, { useEffect } from 'react'
import ActionButton, { ActionButtonRef } from './ActionButton'
import { useRef } from 'react'

const ActionButtonGroup = () => {
  const myref = useRef<ActionButtonRef>(null)

  useEffect(() => {
    if(myref) {
      console.log(myref.current);
    }
  }, [])


  return (
    <div className='action-button-group'>
      <ActionButton className='' fill='#ffffff' ref={myref} />
    </div>
  )
}

export default ActionButtonGroup
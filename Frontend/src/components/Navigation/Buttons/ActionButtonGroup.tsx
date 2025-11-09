"use client"
import React, { useEffect } from 'react'
import ActionButtons, { ActionButtonRef } from './ActionButtons'
import { useRef } from 'react'

const ActionButtonGroup = () => {
  const buttonRefs = useRef<ActionButtonRef[] | null[]>([])

  useEffect(() => {
    if(buttonRefs) {
      console.log(buttonRefs.current);
    }
  }, [])

  return (
    <div className='action-button-group h-[120px] w-[500px] p-10 px-10'>
      <ActionButtons
        ref={(el) => {buttonRefs.current[0] = el}}
        fill="#783D18"
      />
    </div>
  )
}

export default ActionButtonGroup
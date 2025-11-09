"use client"
import React, { forwardRef, useRef } from 'react'
import { useEffect, useState, useImperativeHandle } from 'react'

export interface ActionButtonRef {
  svg : HTMLDivElement | null,
  ellipse : SVGEllipseElement | null
}

export interface ActionButtonProps {
  className? : string,
  noStroke? : boolean,
  fill? : string,
  Ypos? : number,
  Icon? : React.ComponentType<{ size : number; clickAnimation : () => void }>;
}

const ActionButton = forwardRef<ActionButtonRef, ActionButtonProps>(
  ({ className , noStroke, fill , Ypos, Icon } , ref) => {

  const svgRef = useRef<HTMLDivElement>(null) 
  const CircleCxRef = useRef<SVGEllipseElement>(null)

  useImperativeHandle(ref , () => ({
    svg : svgRef.current,
    ellipse : CircleCxRef.current
  }), [])

  return (
    <div
        className={`action-button ${className}`}
        ref={svgRef}
        style={{ top: `${Ypos}px` }}
      >
        <svg className="group" width={80} height={90} viewBox="20 -10 80 75">
          <defs>
            <filter id="goo" height="300%" y="-100%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
              <feColorMatrix
                in="blur"
                mode="matrix"
                result="goo"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 2 18 -7"
              />
              <feGaussianBlur in="goo" stdDeviation="3" result="shadow" />
              <feColorMatrix
                in="shadow"
                mode="matrix"
                values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 -0.2"
                result="shadow"
              />
              <feOffset in="shadow" dx="1" dy="3" result="shadow" />
              <feBlend in2="shadow" in="goo" result="goo" />
              <feBlend in2="goo" in="SourceGraphic" result="mix" />
            </filter>
          </defs>

          <g transform="translate(50,50)">
            <g id="group1" filter="url(#goo)">
              <ellipse ref={CircleCxRef} cx={10} rx={30} ry={30} fill={fill ?? '#444446'} />
            </g>
            {/* <g ref={likeButtonGroupRef} transform="translate(-2, -15)">
              {Icon && <Icon size={24} clickAnimation={onLikeClick} />}
            </g> */}
          </g>
        </svg>
      </div>
  )
})


// Add this line to give it a display name
ActionButton.displayName = "ActionButton";

export default ActionButton;
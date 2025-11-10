import React from 'react'

interface SectionProps {
  children : React.ReactNode,
  color? : string,
  navBarHeight? : number | 0,
  className? : string,
  style? : React.CSSProperties
}


const Section : React.FC<SectionProps> = ({ children , color , navBarHeight , className, style}) => {
  console.log(navBarHeight)
  return (
    <div className={`w-full flex-col flex-1 flex  ${className || ''}`} style={{
      minHeight : `calc(100vh - ${navBarHeight || 0}px)`,
      backgroundColor : color,// minus the navbars height
      ...style
    }}>
      {children}
    </div>
  )
}

export default Section
"use client"
import React, { forwardRef, useRef, useImperativeHandle, useState } from "react"
import { motion, AnimatePresence, scale } from "framer-motion"
import '../../../app/globals.css'
import Link from "next/link"
export interface ActionButtonRef {
  container: HTMLDivElement | null
}

export interface ActionButtonProps {
  className?: string
  fill?: string
  Ypos?: number
}

const ActionButtons = forwardRef<ActionButtonRef, ActionButtonProps>(
  ({ className, fill, Ypos }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState(true)
    const distance = 120; // px distance between buttons
    const [isShrunk, setIsShrunk] = useState(true);

    const mainButtonRef = useRef<HTMLDivElement>(null);
    useImperativeHandle(ref, () => ({
      container: containerRef.current,
    }))

    // const navs = ["About" , "Rooms" , "Menu", "Home"]
    const navs = [
      { name : "About"  , path : "/about" },
      { name : "Rooms"  , path : "/rooms" },
      { name : "Menu"  , path : "/menu" },
      { name : "Home"  , path : "/" },
    ]

    const buttons = navs.map((nav, i) => (
      <Link className="" key={i} href={`${nav.path}`} passHref>
        <motion.div
          className={`action-button button ${className}`}
          style={{
            filter: "url(#goo)",
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: fill,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
            position: "absolute",
            left: 0,
            zIndex: 1,
            top: 0,
          }}
          initial={{ x: -10, scale: 0.7 , y : -50}}
          animate={{
            y : -40,
            x: open ? (-distance) * (i + 1) : -10,
            scale: open ? 0.9 : 0.7,
          }}
          transition={{ // spring like animation
            type: "spring",
            stiffness: 200,
            damping: 30,
            delay: i * 0.05,
          }}
          whileHover={{
            scale : 1.2,
            transition : {type : "spring" , stiffness : 300, damping : 20}
          }}
        >
          {nav.name}
        </motion.div>
      </Link>
    ))

    return (
      <div className="goo-container-menu flex items-center justify-end py-5 px-3" style={{ position: "relative", top: Ypos ?? 0, filter : "url(#goo)" }} ref={containerRef}>
        {/* Hidden SVG goo filter */}
        <svg style={{ position: "absolute", width: 0, height: 0 }}>
          <defs>
            <filter id="goo">
              <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
              <feGaussianBlur in="goo" stdDeviation="1" result="shadow" />
              <feColorMatrix in="shadow" mode="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 -0.2" result="shadow" />
              <feOffset in="shadow" dx="1" dy="1" result="shadow" />
              <feComposite in2="shadow" in="goo" result="goo" />
              <feComposite in2="goo" in="SourceGraphic" result="mix" />
          </filter>
          <filter id="goo">
              <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
              <feComposite in2="goo" in="SourceGraphic" result="mix" />
            </filter>
          </defs>
        </svg>

        {/* Main "menu" button */}
        <motion.div
          ref={mainButtonRef}
          className={`action-button main-button`}
          style={{
            maxWidth: 80,
            maxHeight: 80,
            width : 80,
            height : 80,
            borderRadius: "50%",
            background: fill ?? "#673ab7",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
            position: "relative",
            filter : "url(#goo)",
            zIndex : 2,
            // right : '100px',
            // top : '50px'
          }}
          onClick={() => {
            setOpen(!open);
            setIsShrunk(!isShrunk);
          }}
          whileHover={isShrunk ? undefined : { scale: 1.6 }} // ✅ only hover if not shrunk
          animate={{
            scale: isShrunk ? 1 : 1.5, // shrink or return
          }}
          transition={{ type : "spring" , stiffness : 200 , damping : 10 }}
        > 
          <motion.div className="hamburger flex flex-col gap-3">
            <motion.span
              className="hamburger-1 w-[30px] h-[3px] bg-amber-50"
              animate={open ? { rotate: 45, y: 18, width : 36 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="hamburger-2 w-[30px] h-[3px] bg-amber-50"
              animate={open ? { height: 4, scaleX: 0 } : { scaleX: 1 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="hamburger-3 w-[30px] h-[3px] bg-amber-50"
              animate={open ? { rotate: -45, y: -12, width : 36 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
          
        </motion.div>
        <div className="group-div-goo" style={{ filter: "url(#goo)", position : "absolute" , zIndex : 1, paddingRight : 80 }}>
            {/* <AnimatePresence>{buttons}</AnimatePresence> */}
            {buttons}
        </div>

        {/* Animated menu buttons */}
        
      </div>
    )
  }
)

ActionButtons.displayName = "ActionButtons"

export default ActionButtons

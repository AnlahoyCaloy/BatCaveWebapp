"use client"
import React from "react";
import { motion, Variants, easeOut } from "framer-motion";
import NewBrewsCard from "./NewBrewsCard";

// DUMMY DATA
export const brewsData = [
  {
    id: 1,
    name: "Caramel Latte",
    description: "Sweet and smooth caramel latte to start your day.",
    imageUrl: "/images/coffee1.png",
  },
  {
    id: 2,
    name: "Vanilla Cold Brew",
    description: "Rich vanilla flavor in a refreshing cold brew.",
    imageUrl: "/images/coffee2.png",
  },
  {
    id: 3,
    name: "Hazelnut Mocha",
    description: "Perfect blend of chocolate and hazelnut.",
    imageUrl: "/images/coffee3.png",
  },
  {
    id: 4,
    name: "Hazelnut Mocha",
    description: "Perfect blend of chocolate and hazelnut.",
    imageUrl: "/images/coffee3.png",
  },
  {
    id: 5,
    name: "Hazelnut Mocha",
    description: "Perfect blend of chocolate and hazelnut.",
    imageUrl: "/images/coffee3.png",
  },
  {
    id: 6,
    name: "Hazelnut Mocha",
    description: "Perfect blend of chocolate and hazelnut.",
    imageUrl: "/images/coffee3.png",
  },
];

const NewBrewsSection: React.FC = () => {

  const container: Variants = {
    hidden: {y : -100},
    // show: { transition: { staggerChildren: 0.2 } },
    scrollView : { transition : { staggerChildren : 0.2 } }
  };

  const child: Variants = {
    hidden: { y: -100, opacity: 0 },
    // show: { 
    //   y: 0, 
    //   opacity: 1, 
    //   transition: { duration: 0.6, ease: easeOut} 
    // },
    scrollView : {
      transition : { duration : 0.8, ease: easeOut },
      y: 100, 
      opacity: 1,
    },
  };

  return (
    <div className="new-brews flex flex-col gap-2 w-full h-full items-center">
      <motion.div initial="hidden" variants={container} whileInView="scrollView" className="w-full items-center justify-center flex p-5"  viewport={{ once: true }} style={{ color : "var(--color-coffee-medium)" }}>
        <motion.div variants={child} style={{ fontSize: "4rem", position : "absolute"}}>Our New Brews</motion.div>
        <motion.div variants={child} style={{ fontSize: "4rem", position : "absolute" }}>Our New Brews</motion.div>
        <motion.div variants={child} style={{ fontSize: "4rem"}}>Our New Brews</motion.div>
      </motion.div>

      <NewBrewsCard brews={brewsData}/>
      {/* <CoffeeCarousel coffees={coffeeData}/> */}
    </div>
  );
};

export default NewBrewsSection;

import React from "react";
import Image from "next/image";
import { ImageGallery, getImagePath} from "./ImageGallery";
import { motion } from 'framer-motion'
import { useRef } from "react";
// export const data = [
//   {
//     cover: "https://images6.alphacoders.com/679/thumb-1920-679459.jpg",
//     title: "Interstaller",
//   },
//   {
//     cover: "https://images2.alphacoders.com/851/thumb-1920-85182.jpg",
//     title: "Inception",
//   },
//   {
//     cover: "https://images6.alphacoders.com/875/thumb-1920-875570.jpg",
//     title: "Blade Runner 2049",
//   },
//   {
//     cover: "https://images6.alphacoders.com/114/thumb-1920-1141749.jpg",
//     title: "Icon man 3",
//   },
//   {
//     cover: "https://images3.alphacoders.com/948/thumb-1920-948864.jpg",
//     title: "Venom",
//   },
//   {
//     cover: "https://images2.alphacoders.com/631/thumb-1920-631095.jpg",
//     title: "Steins Gate",
//   },
//   {
//     cover: "https://images4.alphacoders.com/665/thumb-1920-665242.png",
//     title: "One Punch Man",
//   },
//   {
//     cover: "https://images2.alphacoders.com/738/thumb-1920-738176.png",
//     title: "A Silent Voice",
//   },
//   {
//     cover: "https://images8.alphacoders.com/100/thumb-1920-1005531.jpg",
//     title: "Demon Slayer",
//   },
//   {
//     cover: "https://images2.alphacoders.com/582/thumb-1920-582804.png",
//     title: "Attack On Titan",
//   },
// ];

export const coffeeProducts = [
  {
    cover: "coffee1.png",
    description: "Rich and aromatic espresso with a bold flavor.",
    value: 150
  },
  {
    cover: "coffee2.png",
    description: "Smooth latte with a creamy texture and subtle sweetness.",
    value: 180
  },
  {
    cover: "coffee3.png",
    description: "Velvety cappuccino topped with a delicate layer of foam.",
    value: 170
  },
  {
    cover: "coffee4.png",
    description: "Intense dark roast with deep chocolate notes.",
    value: 200
  },
  {
    cover: "coffee5.png",
    description: "Light and fruity brew with a refreshing aroma.",
    value: 160
  }
];


interface ImageFile {
  cover : string,
  description : string,
  value : number
}

interface CardProps {
  data : ImageFile[],
  dataIndex : number,
  slideHeight? : number
}

const Card : React.FC<CardProps>=  React.memo( ({ data , dataIndex, slideHeight = 450 }) => {
  const coverString  = data[dataIndex].cover;
  const path = getImagePath(coverString);
  const { description , value } = data[dataIndex];

  const overlayVariants = {
    initial: { opacity: 0 },
    hover: { opacity: 0.52 },
  };

  const textVariants = {
    initial: { y: 10 },
    hover: { y: 0 },
  };

  const slideComponentRef = useRef<HTMLDivElement>(null);
  
  return (
    <motion.div style={{ width: "100%", height: slideHeight, userSelect: "none",}}
    className="my-slide-component"
    ref={slideComponentRef} 
    initial="initial" // designate the key for the variants/objects to the children 
    animate="initial" // also designate
    whileHover="hover"  // also designate if i change the object to like hoverme then i should change this to hoverme too
    variants={{
      initial : { scale : 1},
      hover : { scale : 1.1}
    }}
    transition={{ type : "spring" , damping : 10, stiffness : 160 }}
    >
      <Image
        alt="slide-image"
        fill // makes the image fill the parent
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className='object-cover rounded-2xl'
        draggable={false}
        src={path}
      />

      {/* the overlay  */}
      <motion.div
        className="absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-center items-center text-white text-center p-4 rounded-2xl"
        variants={overlayVariants}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <motion.p 
        className="text-lg font-semibold mb-2" 
        variants={textVariants}
        transition={{ duration : 0.3, ease: "easeOut" }}>
          {description}
        </motion.p>

        <motion.p 
        className="text-sm opacity-80" 
        variants={textVariants} 
        transition={{ duration : 0.8, }}>
          ₱{value}
        </motion.p>

      </motion.div>

    </motion.div>
  );
});

Card.displayName = "Card"

export default Card
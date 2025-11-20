// src/components/NewBrews.tsx
import React from "react";
import Image from "next/image";
import { motion } from 'framer-motion';
import '../../app/globals.css';
type Brew = {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
};

type NewBrewsProps = {
  brews: Brew[];
};

const NewBrewsCard: React.FC<NewBrewsProps> = ({ brews }) => {
  return (
    <section className="new-brews-container px-4 flex justify-center items-center w-full max-w-[1500px] h-full" style={{
      fontFamily : "var(--font-inter)"
    }}>
      <motion.div className="grid gap-15 md:grid-cols-2 lg:grid-cols-3 w-full h-full">
        {brews.map((brew) => (
          <motion.div
            key={brew.id}
            className="brew-card w-full flex h-70 overflow-hidden rounded-[25px] shadow-[var(--shadow-custom)]"
            style={{ 
              backgroundColor : "var(--color-coffee-dark)", 
            }}
            initial={{ y : 0 }}
            whileHover={{ y : -10  }}
          >
            <div className="brew-image relative w-full h-full">
              <Image
                src={brew.imageUrl}
                alt={brew.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4 px-4 flex flex-col justify-between gap-2">
              <h3 className="text-xl font-semibold mb-2">{brew.name}</h3>
              <p className="text-[var(--color-silk-cream)] text-[13px]">{brew.description}</p>

              {/* button */}
              <motion.div className="order-now-btn w-[120px]  p-1.5 rounded-[25px] text-black px-3 cursor-pointer text-center"
              style={{ backgroundColor : "var(--color-accent)" }}
              initial={{ y : 0 }}
              whileHover={{  y : -5, boxShadow : "var(--shadow-custom-button)" }}
              >Buy Now
              </motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default NewBrewsCard;

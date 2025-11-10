// src/components/NewBrews.tsx
import React from "react";
import Image from "next/image";
import { motion } from 'framer-motion';

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
    <section className="new-brews-container px-4 flex justify-center items-center" style={{
      fontFamily : "var(--font-inter)"
    }}>
      <motion.div className="grid gap-15 md:grid-cols-2 lg:grid-cols-3 w-[1500px]">
        {brews.map((brew) => (
          <motion.div
            key={brew.id}
            className="brew-card flex bg-[#935935] overflow-hidden rounded-[25px] shadow-[var(--shadow-custom)]"
            initial={{ y : 0 }}
            whileHover={{ y : -10  }}
          >
            <div className="brew-image relative w-[450px] h-full">
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

              <motion.div className="w-[120px] order-now-btn bg-[#754b31]  p-1.5 rounded-[25px] text-black px-3 cursor-pointer"
              initial={{ y : 0 }}
              whileHover={{  y : -5, boxShadow : "var(--shadow-custom-button)" }}
              >Order Now</motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default NewBrewsCard;

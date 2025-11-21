'use client'
import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Variants } from 'framer-motion'

const About = () => {
  const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.2 }
    }
  }

  const itemVariant = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale : 1, transition: { type : "spring", ease: 'easeOut', duration : 0.7 } }
  }

  return (
    <div className="w-full bg-linear-to-r from-[var(--color-white-choco)] to-white">
      {/* Hero Section */}
      <motion.section 
        className="max-w-6xl mx-auto px-4 py-20 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariant}
      >
        <motion.h1 
          className="text-5xl md:text-6xl font-bold mb-6"
          style={{ color: 'var(--color-coffee-dark)' }}
          variants={itemVariant}
        >
          About Bat Cave
        </motion.h1>
        <motion.p 
          className="text-xl text-gray-600 max-w-3xl mx-auto"
          variants={itemVariant}
        >
          Your ultimate destination for premium coffee, delectable pastries, and unforgettable moments
        </motion.p>
      </motion.section>

      {/* Story Section */}
      <motion.section 
        className="max-w-6xl mx-auto px-4 py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariant}
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div variants={itemVariant}>
            <h2 className="text-4xl font-bold mb-6" style={{ color: 'var(--color-coffee-dark)' }}>
              Our Story
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Founded with a passion for exceptional coffee and community connection, Bat Cave Cafe has become a beloved sanctuary for coffee enthusiasts and friends alike. What started as a small vision has grown into a thriving establishment where quality meets comfort.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Every cup served and every moment shared within our walls reflects our commitment to excellence and creating meaningful experiences for our customers.
            </p>
          </motion.div>
          <motion.div 
            className="relative h-96 rounded-lg overflow-hidden shadow-lg"
            variants={itemVariant}
          >
            <div 
              className="w-full h-full rounded-lg"
              style={{
                background: 'linear-gradient(135deg, var(--color-coffee-dark), var(--color-coffee-medium))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '18px'
              }}
            >
              Bat Cave Cafe Environment
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Mission & Vision Section */}
      <motion.section 
        className="max-w-6xl mx-auto px-4 py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariant}
      >
        <motion.h2 
          className="text-4xl font-bold text-center mb-16"
          style={{ color: 'var(--color-coffee-dark)' }}
          variants={itemVariant}
        >
          Our Mission & Vision
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Mission Card */}
          <motion.div
            className="p-8 rounded-lg shadow-lg"
            style={{ background: 'var(--color-accent)', color: 'var(--color-coffee-dark)' }}
            variants={itemVariant}
            whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}
          >
            <h3 className="text-3xl font-bold mb-4 flex items-center gap-3">
              <span className="text-4xl">🎯</span> Mission
            </h3>
            <p className="text-lg leading-relaxed font-medium">
              To craft the finest coffee experience while providing a welcoming space where our community can gather, work, celebrate, and create lasting memories. We are committed to sourcing the highest quality beans, maintaining exceptional service standards, and delivering consistent excellence in every aspect of our business.
            </p>
          </motion.div>

          {/* Vision Card */}
          <motion.div
            className="p-8 rounded-lg shadow-lg"
            style={{ background: 'var(--color-coffee-medium)', color: 'white' }}
            variants={itemVariant}
            whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}
          >
            <h3 className="text-3xl font-bold mb-4 flex items-center gap-3">
              <span className="text-4xl">✨</span> Vision
            </h3>
            <p className="text-lg leading-relaxed font-medium">
              To become the most cherished coffee destination in our region, recognized for our premium products, exceptional hospitality, and commitment to sustainability. We envision a place where every visit is special, every customer feels valued, and our contributions to the community extend beyond coffee to create positive social impact.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Values Section */}
      <motion.section 
        className="max-w-6xl mx-auto px-4 py-20 bg-linear-to-r from-amber-100 to-amber-50 rounded-lg my-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariant}
      >
        <motion.h2 
          className="text-4xl font-bold text-center mb-12"
          style={{ color: 'var(--color-coffee-dark)' }}
          variants={itemVariant}
        >
          Our Core Values
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: '☕', title: 'Quality', description: 'Premium ingredients and exceptional craftsmanship in everything we do' },
            { icon: '❤️', title: 'Community', description: 'Creating a warm space where everyone feels welcome and valued' },
            { icon: '🌱', title: 'Sustainability', description: 'Responsible sourcing and environmentally conscious practices' },
            { icon: '🎨', title: 'Creativity', description: 'Innovative flavors and unique experiences that delight our customers' },
            { icon: '⭐', title: 'Excellence', description: 'Striving for perfection in service, taste, and overall experience' },
            { icon: '🤝', title: 'Integrity', description: 'Honest, transparent, and ethical in all our dealings' }
          ].map((value, idx) => (
            <motion.div
              key={idx}
              className="text-center p-6"
              variants={itemVariant}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-5xl mb-4">{value.icon}</div>
              <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-coffee-dark)' }}>
                {value.title}
              </h3>
              <p className="text-gray-700">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="max-w-6xl mx-auto px-4 py-16 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariant}
      >
        <motion.h2 
          className="text-3xl font-bold mb-6"
          style={{ color: 'var(--color-coffee-dark)' }}
          variants={itemVariant}
        >
          Experience the Bat Cave Difference
        </motion.h2>
        <motion.p 
          className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto"
          variants={itemVariant}
        >
          Visit us today and discover why we're more than just a cafe—we're a community gathering place where memories are brewed fresh every day.
        </motion.p>
        <motion.a
          href="/rooms"
          className="inline-block px-8 py-4 rounded-lg text-white font-bold text-lg"
          style={{ background: 'linear-gradient(135deg, #D97706, #F59E0B)' }}
          variants={itemVariant}
          whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(217, 119, 6, 0.3)' }}
        >
          Reserve Your Space
        </motion.a>
      </motion.section>
    </div>
  )
}

export default About
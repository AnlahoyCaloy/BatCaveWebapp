import React from 'react'
import { motion } from 'framer-motion';


const ConfirmationCardOverlay : React.FC = ({  }) => {


  return (
    <motion.div
    className='overlay'
    initial={{ opacity : 0 }}
    animate={{ opacity : 1 }}
    exit={{ opacity : 0 }}>

      
      <motion.div>

      </motion.div>
    </motion.div>
  )
}

export default ConfirmationCardOverlay
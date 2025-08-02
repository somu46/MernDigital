import React from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle } from 'react-icons/fi';
// import { useLocation } from 'react-router-dom';


const ThankYouPage = () => {
//   const location = useLocation();
  

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full bg-gray-900 rounded-xl shadow-2xl overflow-hidden"
      >
        <div className="p-8 md:p-12 text-center">
          <div className="flex justify-center mb-6">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <FiCheckCircle className="text-6xl text-green-500" />
            </motion.div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Thank You for Contacting Us!
          </h1>
          
          <p className="text-xl mb-6 text-gray-300">
            We've received your message and our team will get back to you within 24 hours.
          </p>
          
          
          
          {/* <div className="mt-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <a 
                href="/" 
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all"
              >
                <FaRocket className="text-lg" />
                Back to Home
              </a>
            </motion.div>
          </div> */}
        </div>
      </motion.div>
    </div>
  );
};

export default ThankYouPage;
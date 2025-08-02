import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiCode, FiServer, FiSmartphone, FiDatabase, FiCloud, FiShield } from 'react-icons/fi';
import { FaReact, FaNodeJs, FaAws } from 'react-icons/fa';
import { SiTailwindcss, SiMongodb } from 'react-icons/si';

const ComingSoon = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const calculateTimeLeft = () => {
    const launchDate = new Date('2025-12-31');
    const now = new Date();
    const difference = launchDate - now;

    if (difference > 0) {
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      });
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      calculateTimeLeft();
    }, 1000);

    return () => clearTimeout(timer);
  });

  const services = [
    {
      icon: <FiCode className="w-8 h-8" />,
      title: "Web Development",
      description: "Custom websites with modern frameworks like React, Next.js, and Vue.js.",
      tech: <div className="flex space-x-2 mt-2"><FaReact className="text-blue-500" /><SiTailwindcss className="text-cyan-400" /></div>
    },
    {
      icon: <FiServer className="w-8 h-8" />,
      title: "Backend Services",
      description: "Scalable server solutions with Node.js, Python, and Java.",
      tech: <div className="flex space-x-2 mt-2"><FaNodeJs className="text-green-600" /></div>
    },
    {
      icon: <FiSmartphone className="w-8 h-8" />,
      title: "Mobile Apps",
      description: "Cross-platform mobile applications for iOS and Android.",
      tech: null
    },
    {
      icon: <FiDatabase className="w-8 h-8" />,
      title: "Database Solutions",
      description: "Optimized database architecture and management.",
      tech: <div className="flex space-x-2 mt-2"><SiMongodb className="text-green-700" /></div>
    },
    {
      icon: <FiCloud className="w-8 h-8" />,
      title: "Cloud Services",
      description: "Deployment and management on AWS, Azure, and Google Cloud.",
      tech: <div className="flex space-x-2 mt-2"><FaAws className="text-orange-500" /></div>
    },
    {
      icon: <FiShield className="w-8 h-8" />,
      title: "Security",
      description: "Comprehensive security audits and protection services.",
      tech: null
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-800 text-white">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Coming Soon</h1>
          <p className="text-xl md:text-2xl text-indigo-200 max-w-2xl mx-auto">
            We're working hard to bring you an amazing experience. Stay tuned!
          </p>
        </motion.div>

        <div className="flex justify-center mb-20">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, yoyo: Infinity }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div key={unit} className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-3xl md:text-5xl font-bold">{value}</div>
                <div className="text-sm md:text-base uppercase tracking-wider text-indigo-200">
                  {unit}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="max-w-4xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Get Notified When We Launch</h2>
            <form className="flex flex-col md:flex-row gap-4">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 rounded-lg bg-white bg-opacity-20 placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition-colors duration-300"
              >
                Notify Me
              </button>
            </form>
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true }}
          className="mb-20"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
          >
            Our Tech Services
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-white bg-opacity-5 hover:bg-opacity-10 backdrop-blur-sm rounded-xl p-6 transition-all duration-300 border border-white border-opacity-10"
              >
                <div className="text-purple-400 mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-indigo-200 mb-4">{service.description}</p>
                {service.tech}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center text-indigo-200"
        >
          <p>© {new Date().getFullYear()} Merndigital. All rights reserved.</p>
        </motion.div>
      </div>
    </div>
  );
};

export default ComingSoon;
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMenu, FiX, FiArrowRight, FiCheck, FiChevronDown, FiChevronUp, FiPhone, FiMessageSquare, FiMail, FiBarChart2, FiUser,FiClock } from 'react-icons/fi';
import { FaReact, FaNodeJs, FaAws, FaGoogle, FaMicrosoft, FaWhatsapp, FaFacebook, FaInstagram, FaLinkedin, FaTwitter , FaGithub } from 'react-icons/fa';
import { SiMongodb, SiTypescript, SiGraphql, SiDocker, SiFigma, SiAdobephotoshop, SiGoogleads } from 'react-icons/si';
import { DiRedis } from 'react-icons/di';
import emailjs from '@emailjs/browser';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activePhoneNumber, setActivePhoneNumber] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [emailError, setEmailError] = useState('');
  const form = useRef();
  const navigate = useNavigate();

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(process.env.REACT_APP_EMAILJS_USER_ID);
  }, []);

  // Time-based phone number logic
  useEffect(() => {
    const updatePhoneNumber = () => {
      const now = new Date();
      const hours = now.getHours();
      // Daytime number (7AM-4PM)
      setActivePhoneNumber(hours >= 7 && hours < 16 ? 
        process.env.REACT_APP_DAY_PHONE : 
        process.env.REACT_APP_NIGHT_PHONE);
    };
    updatePhoneNumber();
    const interval = setInterval(updatePhoneNumber, 60000);
    return () => clearInterval(interval);
  }, []);

  // Navbar scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle file selection


  // Email submission handler
  const sendEmail = async (e) => {
    e.preventDefault();
    setEmailError('');
    
    try {
      // Create FormData to handle file uploads
      const formData = new FormData();
      formData.append('name', e.target.name.value);
      formData.append('mobile', e.target.mobile.value);
      formData.append('email', e.target.email.value);
      formData.append('service', e.target.service.value);
      formData.append('description', e.target.description.value);
      

      await emailjs.sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        form.current,
        process.env.REACT_APP_EMAILJS_USER_ID,
        formData
      );
      
      setEmailSent(true);
      form.current.reset();
      navigate('/thank-you');
    } catch (error) {
      setEmailError('Failed to send message. Please try again.');
      console.error('EmailJS error:', error);
    }
  };

  // FAQ toggle function
  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  // Color variables
  const colors = {
    primary: '#00ED64',
    secondary: '#61DAFB',
    accent1: '#339933',
    accent2: '#000000',
    gradient: 'linear-gradient(135deg, #00ED64 0%, #61DAFB 50%, #339933 100%)',
    textLight: '#F8F9FA',
    textDark: '#212529',
  };

  // Partners logos
  const partners = [
    { name: 'Google', icon: <FaGoogle className="w-12 h-12 text-gray-400 hover:text-white transition-colors" /> },
    { name: 'Microsoft', icon: <FaMicrosoft className="w-12 h-12 text-gray-400 hover:text-white transition-colors" /> },
    { name: 'AWS', icon: <FaAws className="w-12 h-12 text-gray-400 hover:text-white transition-colors" /> },
    { name: 'Figma', icon: <SiFigma className="w-12 h-12 text-gray-400 hover:text-white transition-colors" /> },
    { name: 'Docker', icon: <SiDocker className="w-12 h-12 text-gray-400 hover:text-white transition-colors" /> },
  ];

  // Features
  const features = [
    {
      title: "Fast Performance",
      description: "Optimized for speed and efficiency to deliver the best user experience.",
      icon: <FiCheck className="w-6 h-6" style={{ color: colors.primary }} />
    },
    {
      title: "Secure Solutions",
      description: "Built with security in mind from the ground up.",
      icon: <FiCheck className="w-6 h-6" style={{ color: colors.secondary }} />
    },
    {
      title: "Easy Integration",
      description: "Seamlessly integrates with your existing systems.",
      icon: <FiCheck className="w-6 h-6" style={{ color: colors.accent1 }} />
    },
    {
      title: "24/7 Support",
      description: "Our team is always ready to assist you.",
      icon: <FiCheck className="w-6 h-6" style={{ color: colors.primary }} />
    },
  ];

  // Services
  const services = [
    {
      title: "Web Development",
      description: "Custom websites with modern frameworks like React, Next.js, and Vue.js.",
      icon: <FaReact className="w-8 h-8" style={{ color: colors.secondary }} />
    },
    {
      title: "Mobile Apps",
      description: "Cross-platform mobile applications for iOS and Android.",
      icon: <FaReact className="w-8 h-8" style={{ color: colors.secondary }} />
    },
    {
      title: "Digital Marketing",
      description: "Comprehensive digital strategies to grow your online presence.",
      icon: <SiGoogleads className="w-8 h-8" style={{ color: colors.primary }} />
    },
    {
      title: "SEO Services",
      description: "Improve your search rankings and organic traffic.",
      icon: <FiBarChart2 className="w-8 h-8" style={{ color: colors.accent1 }} />
    },
    {
      title: "Cloud Solutions",
      description: "Scalable cloud infrastructure and deployment.",
      icon: <FaAws className="w-8 h-8" style={{ color: colors.primary }} />
    },
    {
      title: "UI/UX Design",
      description: "Beautiful and intuitive user interfaces.",
      icon: <SiFigma className="w-8 h-8" style={{ color: colors.secondary }} />
    },
    {
      title: "Social Media Marketing",
      description: "Engage your audience across all platforms.",
      icon: <FaInstagram className="w-8 h-8" style={{ color: colors.primary }} />
    },
    {
      title: "Content Marketing",
      description: "Strategic content to attract and retain customers.",
      icon: <FiMessageSquare className="w-8 h-8" style={{ color: colors.accent1 }} />
    },
  ];

  // Industries
  const industries = [
    { name: "Healthcare", count: 24 },
    { name: "Finance", count: 18 },
    { name: "Education", count: 32 },
    { name: "E-commerce", count: 15 },
    { name: "Manufacturing", count: 9 },
    { name: "Entertainment", count: 12 },
  ];

  // Projects
  const projects = [
    {
      title: "E-commerce Platform",
      description: "A full-featured online shopping solution",
      category: "Web Development"
    },
    {
      title: "Health Tracking App",
      description: "Mobile app for personal health monitoring",
      category: "Mobile App"
    },
    {
      title: "Digital Marketing Campaign",
      description: "Increased conversions by 150% for retail client",
      category: "Digital Marketing"
    },
  ];

  // Tech Stack
  const techStack = [
    { name: "React", icon: <FaReact className="w-10 h-10" style={{ color: colors.secondary }} /> },
    { name: "Node.js", icon: <FaNodeJs className="w-10 h-10" style={{ color: colors.accent1 }} /> },
    { name: "TypeScript", icon: <SiTypescript className="w-10 h-10" style={{ color: '#007ACC' }} /> },
    { name: "GraphQL", icon: <SiGraphql className="w-10 h-10" style={{ color: '#E535AB' }} /> },
    { name: "MongoDB", icon: <SiMongodb className="w-10 h-10" style={{ color: colors.accent1 }} /> },
    { name: "Redis", icon: <DiRedis className="w-10 h-10" style={{ color: '#D82C20' }} /> },
    { name: "Docker", icon: <SiDocker className="w-10 h-10" style={{ color: '#2496ED' }} /> },
    { name: "AWS", icon: <FaAws className="w-10 h-10" style={{ color: colors.primary }} /> },
    { name: "Google Ads", icon: <SiGoogleads className="w-10 h-10" style={{ color: '#4285F4' }} /> },
    { name: "Photoshop", icon: <SiAdobephotoshop className="w-10 h-10" style={{ color: '#31A8FF' }} /> },
  ];

  // Testimonials
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, HealthTech Inc.",
      quote: "Their team delivered beyond our expectations. The project was completed on time and within budget.",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      name: "Michael Chen",
      role: "CTO, FinServe",
      quote: "The technical expertise of their developers is outstanding. We've seen a 40% improvement in performance.",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      name: "David Wilson",
      role: "Marketing Director, RetailCo",
      quote: "Our digital marketing campaign resulted in a 300% ROI. MERN Digital's strategies are game-changing.",
      avatar: "https://randomuser.me/api/portraits/men/75.jpg"
    },
  ];

  // FAQs
  const faqs = [
    {
      question: "What services do you offer?",
      answer: "We offer web development, mobile apps, digital marketing, SEO, cloud solutions, UI/UX design, and more."
    },
    {
      question: "How do you approach digital marketing?",
      answer: "We create data-driven strategies combining SEO, content marketing, social media, and paid advertising for maximum impact."
    },
    {
      question: "Do you provide ongoing support?",
      answer: "Yes, we offer various support packages to meet your needs after project completion."
    },
    {
      question: "What technologies do you specialize in?",
      answer: "We specialize in MERN stack, mobile development, cloud technologies, and all major digital marketing platforms."
    },
  ];

  return (
    <div className="font-sans bg-black text-gray-200">
      {/* Floating WhatsApp and Call Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3">
        <motion.a
          href={`https://wa.me/${process.env.REACT_APP_WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-[#25D366] text-white p-3 rounded-full shadow-lg"
        >
          <FaWhatsapp className="w-6 h-6" />
        </motion.a>
        <motion.a
          href={`tel:${activePhoneNumber}`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-3 rounded-full shadow-lg"
          style={{ background: colors.gradient }}
        >
          <FiPhone className="w-6 h-6" />
        </motion.a>
      </div>

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/90 backdrop-blur-md py-2 shadow-lg' : 'bg-transparent py-4'}`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-2xl font-bold" style={{ background: colors.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                MERN Digital
              </span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8 items-center">
              <a href="#home" className="text-gray-300 hover:text-[#00ED64] transition-colors">Home</a>
              <a href="#features" className="text-gray-300 hover:text-[#61DAFB] transition-colors">Features</a>
              <a href="#services" className="text-gray-300 hover:text-[#339933] transition-colors">Services</a>
              <a href="#industries" className="text-gray-300 hover:text-[#00ED64] transition-colors">Industries</a>
              <a href="#projects" className="text-gray-300 hover:text-[#61DAFB] transition-colors">Projects</a>
              <a href="#contact" className="text-gray-300 hover:text-[#339933] transition-colors">Contact</a>
              <a 
                href={`tel:${activePhoneNumber}`} 
                className="flex items-center px-4 py-2 rounded-md transition-colors ml-4"
                style={{ background: colors.gradient }}
              >
                <FiPhone className="mr-2" /> Call Us
              </a>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-300 focus:outline-none">
                {isMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
              </button>
            </div>
          </div>
          
          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4">
              <div className="flex flex-col space-y-3">
                <a href="#home" className="text-gray-300 hover:text-[#00ED64]" onClick={() => setIsMenuOpen(false)}>Home</a>
                <a href="#features" className="text-gray-300 hover:text-[#61DAFB]" onClick={() => setIsMenuOpen(false)}>Features</a>
                <a href="#services" className="text-gray-300 hover:text-[#339933]" onClick={() => setIsMenuOpen(false)}>Services</a>
                <a href="#industries" className="text-gray-300 hover:text-[#00ED64]" onClick={() => setIsMenuOpen(false)}>Industries</a>
                <a href="#projects" className="text-gray-300 hover:text-[#61DAFB]" onClick={() => setIsMenuOpen(false)}>Projects</a>
                <a href="#contact" className="text-gray-300 hover:text-[#339933]" onClick={() => setIsMenuOpen(false)}>Contact</a>
                <a 
                  href={`tel:${activePhoneNumber}`} 
                  className="flex items-center justify-center px-4 py-2 rounded-md transition-colors"
                  style={{ background: colors.gradient }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FiPhone className="mr-2" /> Call Us
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20" style={{ background: `linear-gradient(135deg, ${colors.accent2} 0%, #111 100%)` }}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl md:text-5xl font-bold mb-6 text-white"
              >
                Transform Your Business With <span style={{ background: colors.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>MERN Digital</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl mb-8 text-gray-400"
              >
                We build innovative digital solutions that drive growth and efficiency for your business.
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
              >
                <a 
                  href="#contact"
                  className="px-6 py-3 rounded-md font-medium transition-colors text-center"
                  style={{ background: colors.gradient }}
                >
                  Get Started
                </a>
                <a 
                  href="#projects" 
                  className="border-2 px-6 py-3 rounded-md font-medium hover:bg-white/10 transition-colors text-center"
                  style={{ borderColor: colors.primary, color: colors.primary }}
                >
                  Our Projects
                </a>
              </motion.div>
            </div>
            
            <div className="md:w-1/2">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border"
                style={{ borderColor: colors.primary }}
              >
                <h3 className="text-2xl font-bold mb-6 text-white">Get Started Today</h3>
                <form ref={form} onSubmit={sendEmail} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="block text-sm font-medium mb-1 text-gray-300">Full Name*</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiUser className="text-gray-500" />
                        </div>
                        <input
                          type="text"
                          id="contact-name"
                          name="name"
                          className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-[#00ED64] focus:border-transparent text-white"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="contact-mobile" className="block text-sm font-medium mb-1 text-gray-300">Mobile Number*</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiPhone className="text-gray-500" />
                        </div>
                        <input
                          type="tel"
                          id="contact-mobile"
                          name="mobile"
                          className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-[#00ED64] focus:border-transparent text-white"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-medium mb-1 text-gray-300">Email Address*</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiMail className="text-gray-500" />
                      </div>
                      <input
                        type="email"
                        id="contact-email"
                        name="email"
                        className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-[#00ED64] focus:border-transparent text-white"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="contact-service" className="block text-sm font-medium mb-1 text-gray-300">Service Needed*</label>
                    <select
                      id="service"
                      name="service"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-[#00ED64] focus:border-transparent text-gray-300"
                      required
                    >
                      <option value="">Select a service</option>
                      <option value="web-development">Web Development</option>
                      <option value="mobile-app">Mobile App Development</option>
                      <option value="digital-marketing">Digital Marketing</option>
                      <option value="ui-ux">UI/UX Design</option>
                      <option value="consulting">Consulting</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="contact-description" className="block text-sm font-medium mb-1 text-gray-300">Project Description*</label>
                    <textarea
                      id="contact-description"
                      name="description"
                      rows="5"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-[#00ED64] focus:border-transparent text-white"
                      required
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full px-6 py-3 rounded-md font-medium transition-colors"
                    style={{ background: colors.gradient }}
                  >
                    Request Consultation
                  </button>
                  {emailError && (
                    <p className="text-red-400 text-center mt-2">{emailError}</p>
                  )}
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Slider */}
      <section className="bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <h3 className="text-center text-gray-400 mb-8">Trusted by industry leaders</h3>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {partners.map((partner, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {partner.icon}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Why Choose Us</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              We deliver exceptional value through our unique approach and expertise.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-900 p-6 rounded-lg border border-gray-800 hover:border-[#00ED64]/50 transition-all"
              >
                <div className="flex items-center mb-4">
                  <div className="mr-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                </div>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-gray-900 py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">About <span style={{ background: colors.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>MERN Digital</span></h2>
              <p className="text-gray-400 mb-6">
                Founded in 2015, we've grown from a small team of passionate developers to a full-service digital agency serving clients worldwide.
              </p>
              <p className="text-gray-400 mb-6">
                Our mission is to deliver innovative technology solutions that solve real business problems and create measurable value for our clients.
              </p>
              <div className="flex space-x-4">
                <div className="text-center">
                  <div className="text-3xl font-bold" style={{ color: colors.primary }}>150+</div>
                  <div className="text-gray-400">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold" style={{ color: colors.secondary }}>50+</div>
                  <div className="text-gray-400">Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold" style={{ color: colors.accent1 }}>40+</div>
                  <div className="text-gray-400">Team Members</div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-gray-800 p-6 rounded-lg border border-gray-700"
              >
                <img 
                  src="https://images.unsplash.com/photo-1579389083078-4e7018379f7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Our team working" 
                  className="rounded-lg w-full h-auto"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Our Services</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Comprehensive solutions tailored to your business needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-gray-900 p-6 rounded-lg border border-gray-800 hover:border-[#00ED64]/50 transition-all"
              >
                <div className="mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                <p className="text-gray-400 mb-4">{service.description}</p>
                <a href="#" className="flex items-center" style={{ color: colors.primary }}>
                  Learn more <FiArrowRight className="ml-2" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section id="industries" className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Industries We Serve</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              We have experience across multiple industries and sectors.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-800 p-6 rounded-lg border border-gray-700"
              >
                <h3 className="text-xl font-bold text-white mb-2">{industry.name}</h3>
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <div 
                    className="h-2.5 rounded-full" 
                    style={{ 
                      width: `${(industry.count / 32) * 100}%`,
                      background: index % 2 === 0 ? colors.primary : colors.secondary
                    }}
                  ></div>
                </div>
                <p className="text-gray-400 mt-2">{industry.count} projects completed</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Our Projects</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Some of our recent work that we're proud of.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-[#00ED64]/50 transition-all"
              >
                <div 
                  className="h-48"
                  style={{ 
                    background: index === 0 ? colors.primary : 
                              index === 1 ? colors.secondary : 
                              colors.accent1 
                  }}
                ></div>
                <div className="p-6">
                  <span 
                    className="text-sm"
                    style={{ 
                      color: index === 0 ? colors.primary : 
                            index === 1 ? colors.secondary : 
                            colors.accent1 
                    }}
                  >
                    {project.category}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-2 mb-2">{project.title}</h3>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  <a href="#" className="flex items-center" style={{ color: colors.primary }}>
                    View case study <FiArrowRight className="ml-2" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button 
              className="px-6 py-3 rounded-md font-medium transition-colors"
              style={{ background: colors.gradient }}
            >
              View All Projects
            </button>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Our Tech Stack</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              We use cutting-edge technologies to build robust solutions.
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {techStack.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1 }}
                className="flex flex-col items-center"
              >
                <div className="mb-2">
                  {tech.icon}
                </div>
                <span className="text-sm text-gray-400">{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">What Our Clients Say</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Don't just take our word for it - hear from our clients.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-900 p-8 rounded-lg border border-gray-800"
              >
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-white">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-300 italic">"{testimonial.quote}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Contact Us</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Get in touch with our team for any inquiries.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-6 text-white">Our Information</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="mt-1 mr-4" style={{ color: colors.primary }}>
                    <FiPhone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Phone Support</h4>
                    <p className="text-gray-300">
                      Currently active: <a href={`tel:${activePhoneNumber}`} style={{ color: colors.primary }}>{activePhoneNumber}</a>
                    </p>
                    <div className="flex items-center mt-1 text-sm text-gray-400">
                      <FiClock className="mr-2" />
                      <span>Daytime (7AM-4PM): {process.env.REACT_APP_DAY_PHONE}</span>
                    </div>
                    <div className="flex items-center mt-1 text-sm text-gray-400">
                      <FiClock className="mr-2" />
                      <span>After hours: {process.env.REACT_APP_NIGHT_PHONE}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mt-1 mr-4" style={{ color: colors.primary }}>
                    <FiMail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Email</h4>
                    <a href="mailto:contact@merndigital.com" className="text-gray-300 hover:text-[#00ED64]">
                      contact@merndigital.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mt-1 mr-4" style={{ color: colors.primary }}>
                    <FaWhatsapp className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">WhatsApp</h4>
                    <a 
                      href={`https://wa.me/${process.env.REACT_APP_WHATSAPP_NUMBER}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-[#00ED64]"
                    >
                      {process.env.REACT_APP_WHATSAPP_NUMBER}
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="font-bold mb-4 text-white">Follow Us</h4>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-[#00ED64] transition-colors">
                    <FaLinkedin className="w-6 h-6" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-[#61DAFB] transition-colors">
                    <FaTwitter className="w-6 h-6" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-[#339933] transition-colors">
                    <FaGithub className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <form ref={form} onSubmit={sendEmail} className="bg-gray-800 p-8 rounded-lg border border-gray-700">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="block text-sm font-medium mb-1 text-gray-300">Full Name*</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiUser className="text-gray-500" />
                        </div>
                        <input
                          type="text"
                          id="contact-name"
                          name="name"
                          className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-[#00ED64] focus:border-transparent text-white"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="contact-mobile" className="block text-sm font-medium mb-1 text-gray-300">Mobile Number*</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiPhone className="text-gray-500" />
                        </div>
                        <input
                          type="tel"
                          id="contact-mobile"
                          name="mobile"
                          className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-[#00ED64] focus:border-transparent text-white"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-medium mb-1 text-gray-300">Email Address*</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiMail className="text-gray-500" />
                      </div>
                      <input
                        type="email"
                        id="contact-email"
                        name="email"
                        className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-[#00ED64] focus:border-transparent text-white"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-service" className="block text-sm font-medium mb-1 text-gray-300">Service Needed*</label>
                    <select
                      id="contact-service"
                      name="service"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-[#00ED64] focus:border-transparent text-gray-300"
                      required
                    >
                      <option value="">Select a service</option>
                      <option value="web-development">Web Development</option>
                      <option value="mobile-app">Mobile App Development</option>
                      <option value="digital-marketing">Digital Marketing</option>
                      <option value="ui-ux">UI/UX Design</option>
                      <option value="consulting">Consulting</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact-description" className="block text-sm font-medium mb-1 text-gray-300">Project Description*</label>
                    <textarea
                      id="contact-description"
                      name="description"
                      rows="5"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-[#00ED64] focus:border-transparent text-white"
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full px-6 py-3 rounded-md font-medium transition-colors"
                    style={{ background: colors.gradient }}
                  >
                    Submit Request
                  </button>

                  {emailError && (
                    <p className="text-red-400 text-center mt-2">{emailError}</p>
                  )}
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Find answers to common questions about our services.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="mb-4"
              >
                <div 
                  className="bg-gray-900 p-4 rounded-lg border border-gray-800 cursor-pointer"
                  onClick={() => toggleFAQ(index)}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-white">{faq.question}</h3>
                    {activeFAQ === index ? 
                      <FiChevronUp style={{ color: colors.primary }} /> : 
                      <FiChevronDown className="text-gray-400" />}
                  </div>
                  {activeFAQ === index && (
                    <motion.p 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                      className="mt-2 text-gray-400"
                    >
                      {faq.answer}
                    </motion.p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20" style={{ background: colors.gradient }}>
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-6 text-white"
          >
            Ready to Start Your Project?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl mb-8 max-w-2xl mx-auto text-gray-100"
          >
            Get in touch with us today to discuss how we can help bring your ideas to life.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <a 
              href="#contact"
              className="inline-block bg-black text-white px-8 py-4 rounded-md font-medium hover:bg-gray-900 transition-colors text-lg"
            >
              Contact Us Now
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4" style={{ background: colors.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                MERN Digital
              </h3>
              <p className="text-gray-400">
                Building innovative digital solutions that drive business growth.
              </p>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="text-gray-400 hover:text-[#00ED64]"><FaFacebook /></a>
                <a href="#" className="text-gray-400 hover:text-[#61DAFB]"><FaTwitter /></a>
                <a href="#" className="text-gray-400 hover:text-[#339933]"><FaLinkedin /></a>
                <a href="#" className="text-gray-400 hover:text-[#00ED64]"><FaInstagram /></a>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-white">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#home" className="text-gray-400 hover:text-[#00ED64]">Home</a></li>
                <li><a href="#services" className="text-gray-400 hover:text-[#61DAFB]">Services</a></li>
                <li><a href="#projects" className="text-gray-400 hover:text-[#339933]">Projects</a></li>
                <li><a href="#contact" className="text-gray-400 hover:text-[#00ED64]">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-white">Services</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-[#00ED64]">Web Development</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#61DAFB]">Mobile Apps</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#339933]">Digital Marketing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#00ED64]">Cloud Solutions</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-white">Contact Us</h4>
              <address className="text-gray-400 not-italic">
                123 Tech Street<br />
                San Francisco, CA 94107<br />
                <a href="mailto:info@merndigital.com" className="hover:text-[#00ED64]">info@merndigital.com</a><br />
                <a href={`tel:${activePhoneNumber}`} className="hover:text-[#61DAFB]">{activePhoneNumber}</a>
              </address>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} MERN Digital. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
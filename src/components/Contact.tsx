import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Instagram } from 'lucide-react';
import { contactData } from '../data/static';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'success' | 'error' | 'loading'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    const whatsappMessage = `Name: ${formData.name}
Email: ${formData.email}
WhatsApp: ${formData.whatsapp}
Message: ${formData.message}`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=919154175727&text=${encodeURIComponent(whatsappMessage)}`;

    window.location.href = whatsappUrl;
    setStatus('success');
    setFormData({ name: '', email: '', whatsapp: '', message: '' });
    setTimeout(() => setStatus('idle'), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  const contactIcons = {
    email: Mail,
    phone: Phone,
    location: MapPin,
  };

  const socialIcons = {
    github: Github,
    linkedin: Linkedin,
    instagram: Instagram,
  };

  return (
    <section id="contact" className="py-20 bg-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
          >
            {contactData.title.split(' ')[0]} {contactData.title.split(' ')[1]} <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">{contactData.title.split(' ')[2]}</span>
          </motion.h2>
          <motion.div
            variants={itemVariants}
            className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto mb-6"
          ></motion.div>
          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-300 max-w-2xl mx-auto"
          >
            {contactData.description}
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h3 className="text-3xl font-bold mb-8">{contactData.contactInfo.title}</h3>
            
            <div className="space-y-6">
              {contactData.contactInfo.details.map((detail) => (
                <motion.div
                  key={detail.type}
                  whileHover={{ x: 10 }}
                  className="flex items-center space-x-4 p-4 bg-slate-700/50 rounded-lg border border-slate-600/50 hover:border-purple-400/50 transition-all duration-300"
                >
                  <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                    {React.createElement(contactIcons[detail.type as keyof typeof contactIcons], { size: 20, className: "text-white" })}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-300 text-sm">{detail.label}</p>
                    <p className="text-white font-semibold break-all">{detail.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div className="pt-8">
              <h4 className="text-xl font-semibold mb-4">{contactData.socials.title}</h4>
              <div className="flex space-x-4">
                {contactData.socials.links.map((social) => (
                  <motion.a
                    key={social.name}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    href={social.url}
                    className="flex items-center justify-center w-12 h-12 bg-slate-700 hover:bg-purple-500 rounded-lg transition-colors duration-200"
                  >
                    {React.createElement(socialIcons[social.name as keyof typeof socialIcons], { size: 20, className: "text-white" })}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-slate-700/50 p-8 rounded-xl border border-slate-600/50 backdrop-blur-sm"
          >
            <h3 className="text-2xl font-bold mb-6">{contactData.form.title}</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Your Name
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-600/50 border border-slate-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-200"
                  placeholder={contactData.form.namePlaceholder}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-600/50 border border-slate-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-200"
                  placeholder={contactData.form.emailPlaceholder}
                />
              </div>

              <div>
                <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-300 mb-2">
                  Your WhatsApp Number
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="tel"
                  id="whatsapp"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-600/50 border border-slate-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-200"
                  placeholder="Enter your WhatsApp number"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <motion.textarea
                  whileFocus={{ scale: 1.02 }}
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-slate-600/50 border border-slate-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-200 resize-none"
                  placeholder={contactData.form.messagePlaceholder}
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow-md hover:from-pink-500 hover:to-purple-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400/50"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? (
                  <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                  </svg>
                ) : (
                  <Send className="mr-2" size={18} />
                )}
                {status === 'loading' ? 'Sending...' : 'Send Message'}
              </motion.button>
              {status === 'success' && (
                <p className="text-green-400 text-center mt-2">Message sent successfully!</p>
              )}
              {status === 'error' && (
                <p className="text-red-400 text-center mt-2">Failed to send message. Please try again later.</p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
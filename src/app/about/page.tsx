'use client';

import { motion } from 'framer-motion';
import { MapPin, Users, Award, Globe } from 'lucide-react';

export default function AboutPage() {
  const stats = [
    { number: '15+', label: 'Years of Excellence', icon: Award },
    { number: '500+', label: 'Properties Sold', icon: Globe },
    { number: '50+', label: 'Cities Worldwide', icon: MapPin },
    { number: '10K+', label: 'Happy Clients', icon: Users },
  ];

  const team = [
    {
      name: 'Sarah Mitchell',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600',
    },
    {
      name: 'Marcus Chen',
      role: 'Head of Acquisitions',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600',
    },
    {
      name: 'Elena Rodriguez',
      role: 'Lead Designer',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600',
    },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[80vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920"
            alt="Luxury architecture"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-ink-dark/40" />
        </div>
        <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="font-serif text-h1 text-ink-inverse mb-6">Our Story</h1>
            <p className="text-body-lg text-ink-inverse/90 max-w-2xl mx-auto">
              Redefining luxury real estate through curated properties and unparalleled service for discerning clients worldwide.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-24 bg-surface">
        <div className="max-w-content mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="utility-label text-accent mb-4 block">Our Mission</span>
              <h2 className="font-serif text-h2 mb-6">Crafting Exceptional Real Estate Experiences</h2>
              <p className="text-body text-white/80 mb-6 leading-relaxed">
                For over fifteen years, we've dedicated ourselves to connecting extraordinary properties with extraordinary people. Our portfolio spans the world's most desirable locations, each selected for its unique character, architectural significance, and investment potential.
              </p>
              <p className="text-body text-white/80 leading-relaxed">
                We believe that finding the perfect property is about more than just square meters and price points—it's about discovering a space that resonates with your lifestyle, aspirations, and vision for the future.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800"
                alt="Modern interior"
                className="w-full rounded-lg shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-ink-dark">
        <div className="max-w-content mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <Icon className="w-8 h-8 text-accent mx-auto mb-4" />
                  <div className="font-serif text-h3 text-ink-inverse mb-2">{stat.number}</div>
                  <div className="utility-label text-ink-inverse/70 text-xs">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-bg">
        <div className="max-w-content mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="utility-label text-accent mb-4 block">Our Team</span>
            <h2 className="font-serif text-h2">Meet the Experts</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group"
              >
                <div className="overflow-hidden rounded-lg mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <h3 className="font-serif text-h4 mb-1">{member.name}</h3>
                <p className="utility-label text-accent text-xs">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-surface">
        <div className="max-w-content mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="utility-label text-accent mb-4 block">Our Values</span>
            <h2 className="font-serif text-h2">What Drives Us</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="p-8 bg-bg rounded-lg"
            >
              <h3 className="font-serif text-h4 mb-4">Discretion</h3>
              <p className="text-body text-ink/70">
                We understand the importance of privacy in high-value real estate transactions. Our processes are designed to protect your confidentiality at every step.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="p-8 bg-bg rounded-lg"
            >
              <h3 className="font-serif text-h4 mb-4">Expertise</h3>
              <p className="text-body text-ink/70">
                Our team brings decades of combined experience in international luxury real estate, providing unmatched market insights and guidance.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="p-8 bg-bg rounded-lg"
            >
              <h3 className="font-serif text-h4 mb-4">Exclusivity</h3>
              <p className="text-body text-ink/70">
                We maintain a carefully curated portfolio of exceptional properties that meet our strict standards for quality, location, and investment value.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="p-8 bg-bg rounded-lg"
            >
              <h3 className="font-serif text-h4 mb-4">Service</h3>
              <p className="text-body text-ink/70">
                Our white-glove service extends far beyond the transaction. We provide ongoing support to ensure your property investment continues to exceed expectations.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
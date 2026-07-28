'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const offices = [
  {
    city: 'New York',
    address: '150 East 58th Street, 55th Floor',
    phone: '+1 (212) 555-0123',
    email: 'newyork@estate.com',
    coordinates: { lat: 40.7608, lng: -73.9695 },
    hours: 'Mon-Fri: 9am - 6pm EST',
  },
  {
    city: 'London',
    address: '30 St Mary Axe, London EC3A 8BF',
    phone: '+44 20 7946 0123',
    email: 'london@estate.com',
    coordinates: { lat: 51.5134, lng: -0.0890 },
    hours: 'Mon-Fri: 9am - 6pm GMT',
  },
  {
    city: 'Dubai',
    address: 'Burj Khalifa, Downtown Dubai',
    phone: '+971 4 333 0123',
    email: 'dubai@estate.com',
    coordinates: { lat: 25.1972, lng: 55.2744 },
    hours: 'Mon-Fri: 9am - 6pm GST',
  },
];

export default function ContactPage() {
  const [activeOffice, setActiveOffice] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Save message to localStorage for admin panel
    const newMessage = {
      id: Date.now().toString(),
      name: data.name,
      email: data.email,
      phone: data.phone,
      subject: data.subject,
      message: data.message,
      createdAt: new Date().toISOString(),
      isRead: false,
      isReplied: false
    };

    // Get existing messages and add new one
    const existingMessages = JSON.parse(localStorage.getItem('contact_messages') || '[]');
    existingMessages.unshift(newMessage);
    localStorage.setItem('contact_messages', JSON.stringify(existingMessages));
    
    console.log('Form submitted:', data);
    setIsSubmitted(true);
    reset();
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920"
            alt="Modern skyscraper"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-ink-dark/50" />
        </div>
        <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="font-serif text-h1 text-ink-inverse mb-6">Get in Touch</h1>
            <p className="text-body-lg text-ink-inverse/90 max-w-2xl mx-auto">
              Our team of luxury real estate experts is ready to assist you with your property journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-24 bg-bg">
        <div className="max-w-content mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-3"
            >
              <span className="utility-label text-accent mb-4 block">Send a Message</span>
              <h2 className="font-serif text-h2 mb-8">Start a Conversation</h2>
              
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-accent-secondary/10 border border-accent-secondary/30 rounded-lg p-8 text-center"
                >
                  <h3 className="font-serif text-h4 text-accent-secondary mb-3">Message Sent!</h3>
                  <p className="text-ink/70">Thank you for reaching out. We'll be in touch within 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block utility-label mb-2 text-xs">Full Name</label>
                      <input
                        {...register('name')}
                        type="text"
                        id="name"
                        className="w-full px-4 py-3 bg-surface border border-ink/10 rounded-lg focus:outline-none focus:border-accent transition-colors"
                        placeholder="John Smith"
                      />
                      {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label htmlFor="email" className="block utility-label mb-2 text-xs">Email Address</label>
                      <input
                        {...register('email')}
                        type="email"
                        id="email"
                        className="w-full px-4 py-3 bg-surface border border-ink/10 rounded-lg focus:outline-none focus:border-accent transition-colors"
                        placeholder="john@example.com"
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block utility-label mb-2 text-xs">Phone (Optional)</label>
                      <input
                        {...register('phone')}
                        type="tel"
                        id="phone"
                        className="w-full px-4 py-3 bg-surface border border-ink/10 rounded-lg focus:outline-none focus:border-accent transition-colors"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block utility-label mb-2 text-xs">Subject</label>
                      <input
                        {...register('subject')}
                        type="text"
                        id="subject"
                        className="w-full px-4 py-3 bg-surface border border-ink/10 rounded-lg focus:outline-none focus:border-accent transition-colors"
                        placeholder="Property Inquiry"
                      />
                      {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>}
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block utility-label mb-2 text-xs">Message</label>
                    <textarea
                      {...register('message')}
                      id="message"
                      rows={6}
                      className="w-full px-4 py-3 bg-surface border border-ink/10 rounded-lg focus:outline-none focus:border-accent transition-colors resize-none"
                      placeholder="Tell us about your real estate goals..."
                    />
                    {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-4 bg-ink text-ink-inverse rounded-lg font-medium hover:bg-ink-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </motion.div>

            {/* Office Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-2"
            >
              <span className="utility-label text-accent mb-4 block">Our Offices</span>
              <h2 className="font-serif text-h2 mb-8">Global Locations</h2>
              
              {/* Office Tabs */}
              <div className="flex space-x-4 mb-8">
                {offices.map((office, index) => (
                  <button
                    key={office.city}
                    onClick={() => setActiveOffice(index)}
                    className={`px-4 py-2 rounded-lg utility-label text-xs transition-all ${
                      activeOffice === index
                        ? 'bg-ink text-ink-inverse'
                        : 'bg-surface text-ink/60 hover:text-ink'
                    }`}
                  >
                    {office.city}
                  </button>
                ))}
              </div>

              {/* Active Office Details */}
              <motion.div
                key={activeOffice}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-surface rounded-lg overflow-hidden"
              >
                {/* Map Placeholder */}
                <div className="h-48 bg-ink/10 relative">
                  <img
                    src={`https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&${offices[activeOffice].coordinates.lat}`}
                    alt={`${offices[activeOffice].city} location`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <MapPin className="w-10 h-10 text-accent" />
                  </div>
                </div>
                
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="font-serif text-h4 mb-1">{offices[activeOffice].city}</h3>
                    <p className="text-ink/70 text-sm">{offices[activeOffice].address}</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Phone className="w-4 h-4 text-accent" />
                      <span className="text-sm text-ink/80">{offices[activeOffice].phone}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="w-4 h-4 text-accent" />
                      <span className="text-sm text-ink/80">{offices[activeOffice].email}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="w-4 h-4 text-accent" />
                      <span className="text-sm text-ink/80">{offices[activeOffice].hours}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
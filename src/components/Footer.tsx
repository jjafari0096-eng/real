import Link from 'next/link';
import { Instagram, Twitter, Facebook, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

export function Footer() {
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Properties', path: '/listings' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms of Service', path: '/terms' },
    { name: 'Cookie Policy', path: '/cookies' },
  ];

  const socialLinks = [
    { name: 'Instagram', icon: Instagram, path: '#' },
    { name: 'Twitter', icon: Twitter, path: '#' },
    { name: 'Facebook', icon: Facebook, path: '#' },
    { name: 'LinkedIn', icon: Linkedin, path: '#' },
  ];

  return (
    <footer className="bg-ink-dark text-ink-inverse">
      {/* Pre-footer headline section */}
      <div className="max-w-content mx-auto px-6 md:px-12 py-20 border-b border-white/10">
        <h2 className="font-serif text-h2 max-w-3xl">Find your next address in the world's most desirable locations</h2>
      </div>
      
      {/* Main footer content */}
      <div className="max-w-content mx-auto px-6 md:px-12 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand column */}
        <div className="md:col-span-2">
          <h3 className="font-serif text-3xl mb-6">NOVA Realty</h3>
          <p className="text-ink-inverse/70 max-w-md mb-8">
            Curating exceptional properties across the globe for discerning clients. Our team of specialists provides end-to-end support in finding your dream property.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin size={18} className="text-accent mt-1 flex-shrink-0" />
              <span className="text-ink-inverse/70">123 Avenue des Champs-Élysées, 75008 Paris, France</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={18} className="text-accent flex-shrink-0" />
              <span className="text-ink-inverse/70">+33 1 23 45 67 89</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={18} className="text-accent flex-shrink-0" />
              <span className="text-ink-inverse/70">inquiries@estate.com</span>
            </div>
          </div>
        </div>

        {/* Navigation column */}
        <div>
          <h4 className="utility-label text-xs mb-6 text-white">Navigation</h4>
          <ul className="space-y-4">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link 
                  href={link.path}
                  className="text-ink-inverse/70 hover:text-accent transition-colors"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal & Social column */}
        <div>
          <h4 className="utility-label text-xs mb-6 text-white">Legal</h4>
          <ul className="space-y-4 mb-10">
            {legalLinks.map((link) => (
              <li key={link.path}>
                <Link 
                  href={link.path}
                  className="text-ink-inverse/70 hover:text-accent transition-colors"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          <h4 className="utility-label text-xs mb-6 text-white">Follow Us</h4>
          <div className="flex gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.path}
                className="p-2 bg-white/10 rounded-sm hover:bg-accent transition-colors"
                aria-label={social.name}
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter signup */}
      <div className="max-w-content mx-auto px-6 md:px-12 py-10 border-t border-white/10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="utility-label text-xs text-white mb-2">Subscribe to our newsletter</h4>
            <p className="text-ink-inverse/60 text-sm">Get the latest properties and market insights delivered to your inbox.</p>
          </div>
          <div className="flex w-full md:w-auto gap-3">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-1 md:w-80 px-4 py-3 bg-white/10 border border-white/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-accent text-white placeholder:text-white/50"
            />
            <button className="utility-label bg-accent text-white px-6 py-3 rounded-sm hover:bg-accent/90 transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-content mx-auto px-6 md:px-12 py-6 border-t border-white/10">
        <p className="text-ink-inverse/50 text-sm text-center">
          © {new Date().getFullYear()} NOVA Realty. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
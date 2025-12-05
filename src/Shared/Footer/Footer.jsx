import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-neutral text-neutral-content p-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* About Platform */}
        <div>
          <h6 className="footer-title text-white font-bold mb-2">About Platform</h6>
          <p className="text-neutral-content text-sm">
            Our platform provides powerful tools and resources to help you stay connected,
            learn, and grow. We focus on delivering a smooth, user-friendly experience.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h6 className="footer-title text-white font-bold mb-2">Quick Links</h6>
          <ul className="space-y-1">
            <li><a href="#" className="link link-hover">Home</a></li>
            <li><a href="#" className="link link-hover">Features</a></li>
            <li><a href="#" className="link link-hover">Pricing</a></li>
            <li><a href="#" className="link link-hover">FAQ</a></li>
            <li><a href="#" className="link link-hover">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h6 className="footer-title text-white font-bold mb-2">Contact Information</h6>
          <p className="text-sm">Email: etuition@gmail.com</p>
          <p className="text-sm">Phone: +880 ********</p>
          <p className="text-sm">Location: Dhaka, Bangladesh</p>
        </div>

        {/* Social Media */}
        <div>
          <h6 className="footer-title text-white font-bold mb-2">Follow Us</h6>
          <div className="flex space-x-3 mt-2">
            <a href="#"><img className="w-6 h-6" src="https://upload.wikimedia.org/wikipedia/commons/5/53/X_logo_2023.svg" alt="X"/></a>
            <a href="#"><img className="w-6 h-6" src="https://upload.wikimedia.org/wikipedia/commons/4/44/Facebook_Logo.png" alt="Facebook"/></a>
            <a href="#"><img className="w-6 h-6" src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram"/></a>
            <a href="#"><img className="w-6 h-6" src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" alt="LinkedIn"/></a>
          </div>
        </div>

      </div>

      {/* Copyright */}
      <div className="text-center mt-8 border-t border-neutral-content/20 pt-4 text-sm">
        © 2025 YourCompanyName. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

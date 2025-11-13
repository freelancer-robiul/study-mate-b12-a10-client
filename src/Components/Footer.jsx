import React from "react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-green-300 to-pink-400 text-base-content px-6 md:px-10 py-10 mt-16">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo & About */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <img
              src="https://images.pexels.com/photos/261909/pexels-photo-261909.jpeg"
              alt="StudyMate Logo"
              className="w-8 h-8 rounded-full "
            />
            <h2 className="text-2xl font-bold text-blue-500">StudyMate</h2>
          </div>
          <p className="text-sm opacity-80 leading-relaxed">
            StudyMate helps students connect and collaborate for better learning
            outcomes. Find your ideal study partner based on subject, style, or
            location — and achieve your goals together.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h6 className="footer-title mb-2">Quick Links</h6>
          <ul className="space-y-1">
            <li>
              <Link to="/" className="link link-hover">
                Home
              </Link>
            </li>
            <li>
              <Link to="/find-partners" className="link link-hover">
                Find Partners
              </Link>
            </li>
            <li>
              <Link to="/create-partner" className="link link-hover">
                Create Profile
              </Link>
            </li>
            <li>
              <Link to="/login" className="link link-hover">
                Login / Register
              </Link>
            </li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h6 className="footer-title mb-2">Follow Us</h6>
          <div className="flex gap-4 mt-1">
            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-primary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M9 8H6v4h3v12h5V12h3.642l.358-4H14V7c0-.955.192-1.333 1.115-1.333H18V1h-3.808C10.596 1 9 2.583 9 5.615V8z" />
              </svg>
            </a>

            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
              className="hover:text-primary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M17.43 2h3.27l-7.16 8.19L21 22h-6.37l-4.99-6.64L3.93 22H.66l7.67-8.78L3 2h6.5l4.44 5.93L17.43 2Zm-2.23 18h1.81L8.85 4h-1.9l8.25 16Z" />
              </svg>
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-primary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 8h4v13H3V8zm7 0h3.6v1.77h.05c.5-.94 1.72-1.93 3.54-1.93 3.78 0 4.47 2.49 4.47 5.73V21H17v-6.16c0-1.47-.03-3.36-2.05-3.36-2.05 0-2.36 1.6-2.36 3.25V21H10V8z" />
              </svg>
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-primary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 2c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3h10zm-5 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm4.5-.25a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-base-200 mt-8 pt-4 text-center text-sm opacity-70">
        © {new Date().getFullYear()} StudyMate — All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

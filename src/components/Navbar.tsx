import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon, Menu, X } from 'lucide-react';

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ darkMode, toggleDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`fixed w-full ${darkMode ? 'bg-sb-darker text-white border-gray-800' : 'bg-white text-gray-900 border-gray-200'} z-50 border-b transition-colors duration-200`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-8">
            <Link to="/">
              <img 
                src="https://skls3.cloud.skalena.com.br/-aLNH4vJQ59" 
                alt="Logo" 
                className="h-8 w-auto"
              />
            </Link>
            <div className="hidden md:flex items-center space-x-4 font-comfortaa text-[14px]">
              <Link to="/" className="bg-gradient-to-r from-emerald-800 to-green-700 bg-clip-text text-transparent hover:opacity-80 transition-opacity font-medium">Home</Link>
              <Link to="/blog" className="bg-gradient-to-r from-emerald-800 to-green-700 bg-clip-text text-transparent hover:opacity-80 transition-opacity font-medium">Blog</Link>
              <Link to="/contact" className="bg-gradient-to-r from-emerald-800 to-green-700 bg-clip-text text-transparent hover:opacity-80 transition-opacity font-medium">Contact</Link>
              <a href="/#about" className="bg-gradient-to-r from-emerald-800 to-green-700 bg-clip-text text-transparent hover:opacity-80 transition-opacity font-medium">About</a>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg ${
                darkMode 
                  ? 'bg-sb-slate text-sb-green hover:bg-sb-slate/80' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              } transition-colors duration-200`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button className="hidden md:block bg-sb-green text-black font-comfortaa text-[12px] font-medium px-4 py-2 rounded-lg hover:bg-sb-green/90 transition-colors duration-200">
              Get Started
            </button>
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} ${darkMode ? 'bg-sb-darker border-gray-800' : 'bg-white border-gray-200'} border-b`}>
        <div className="px-4 pt-2 pb-4 space-y-2 font-comfortaa text-[14px]">
          <Link 
            to="/" 
            className="block py-2 bg-gradient-to-r from-emerald-800 to-green-700 bg-clip-text text-transparent hover:opacity-80 transition-opacity font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/blog" 
            className="block py-2 bg-gradient-to-r from-emerald-800 to-green-700 bg-clip-text text-transparent hover:opacity-80 transition-opacity font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Blog
          </Link>
          <Link 
            to="/contact" 
            className="block py-2 bg-gradient-to-r from-emerald-800 to-green-700 bg-clip-text text-transparent hover:opacity-80 transition-opacity font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </Link>
          <a 
            href="/#about" 
            className="block py-2 bg-gradient-to-r from-emerald-800 to-green-700 bg-clip-text text-transparent hover:opacity-80 transition-opacity font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </a>
          <button className="w-full mt-4 bg-sb-green text-black font-medium px-4 py-2 rounded-lg hover:bg-sb-green/90 transition-colors duration-200">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
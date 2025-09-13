// src/components/Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.png';

const Navbar = ({ onLogout }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-slate-800 py-3 px-1 md:px-16">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center text-white text-lg font-bold">
                    <img src={logo} alt="Logo" className="h-8 mr-2" />
                    <span className='font-AVENIR-L'>One Shell</span>
                </div>

                <div className="md:hidden">
                    <button onClick={toggleMenu} className="text-white focus:outline-none">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
                        </svg>
                    </button>
                </div>
                <ul className={`md:flex md:items-center md:space-x-4 ${isOpen ? 'block' : 'hidden'} md:block`}>
                    <li className="text-white">
                        <Link to="/" className="block px-2 py-1">Home</Link>
                    </li>
                    <li className="text-white">
                        <Link to="/about" className="block px-2 py-1">About</Link>
                    </li>
                    <li className="text-white">
                        <Link to="/support" className="block px-2 py-1">Support</Link>
                    </li>
                    <li className="text-white">
                        <button onClick={onLogout} className="block px-2 py-1">Logout</button>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;

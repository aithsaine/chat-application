import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';

const LightButton = ({ isDarkMode, setIsDarkMode }) => {

    const toggleMode = () => {
        isDarkMode ? localStorage.setItem("light_mode", "light") : localStorage.setItem("light_mode", "dark")
        setIsDarkMode(!isDarkMode);

    };

    return (
        <motion.button
            className={`flex items-center px-4 py-2 rounded-full border ${isDarkMode ? 'bg-gray-800 text-white border-gray-800' : 'bg-gray-200 text-gray-800 border-gray-200'
                }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{
                x: isDarkMode ? [0, 20] : [0, -20], // Move to right for dark mode and left for light mode
            }}
            transition={{
                type: 'spring',
                stiffness: 200,
            }}
            onClick={toggleMode}
        >
            {isDarkMode ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}
        </motion.button>

    );
};

export default LightButton

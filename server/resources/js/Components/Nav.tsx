
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faUserFriends, faBell, faUser } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import { Link } from '@inertiajs/react';

export default function Nav({ filename }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [image, setImage] = useState("")
    useEffect(() => {
        const getPict = async () => {
            const response = await axios.get(`/storage/picture/${filename}`, {
                responseType: 'blob',
            })
            if (response.status == 200) {

                const blobUrl = URL.createObjectURL(response.data);
                setImage(blobUrl)
                console.log(response.data)
            }

        }
        getPict();

    }, [])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-gray-800 fixed w-full z-50 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <a href="#" className="flex items-center">
                                <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Workflow" />
                                <span className="ml-2 font-bold">MyApp</span>
                            </a>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <a href="#" className="hover:text-gray-300">
                                    <FontAwesomeIcon icon={faEnvelope} />
                                </a>
                                <a href="#" className="hover:text-gray-300">
                                    <FontAwesomeIcon icon={faUserFriends} />
                                </a>
                                <a href="#" className="hover:text-gray-300">
                                    <FontAwesomeIcon icon={faBell} />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-4 flex items-center md:ml-6">
                            <div className="relative">
                                <button className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" onClick={toggleDropdown}>
                                    <span className="sr-only">Open user menu</span>
                                    <img className="h-10 w-10 rounded-full object-cover" src={image} alt="Profile" />
                                </button>
                                {isOpen && (
                                    <ul ref={dropdownRef} className="absolute z-50 right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1 text-gray-800">
                                        <li><a href="#" className="block px-4 py-2 hover:bg-gray-100">Profile</a></li>
                                        <li><a href="#" className="block px-4 py-2 hover:bg-gray-100">Settings</a></li>
                                        <li><hr className="my-1" /></li>
                                        <li><Link href="/logout" method='post' className="block px-4 py-2 hover:bg-gray-100">Logout</Link></li>
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}



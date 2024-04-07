
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faUserFriends, faBell, faUser } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import { Link } from '@inertiajs/react';
import SearchInput from './SearchInput';
import LightButton from './LightMode';

export default function Nav({ filename, className, isDarkMode, setIsDarkMode }) {

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
        <>
            <nav className={`border-bottom border-black ${isDarkMode ? "bg-black shadow-sky-800" : "bg-white"}  px-6 shadow-lg  py-2 fixed w-full z-50 ${className}`}>
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <img className="h-8" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="" />
                        <SearchInput />
                    </div>
                    <div className="relative flex justify-between w-1/5 items-center">
                        <div className="relative group">
                            <div className="group-hover:bg-gray-3  00 cursor-pointer p-2 group-hover:rounded-lg transition-all ease-in-out duration-300">
                                <Link href={"/feed"}> <img className="md:h-6 h-4 cursor-pointer" src="https://img.icons8.com/external-kmg-design-flat-kmg-design/32/000000/external-home-ui-essential-kmg-design-flat-kmg-design.png" /></Link>
                            </div>
                            <div className="absolute group-hover:border-b-2 group-hover:cursor-pointer mt-2 border-blue-500 w-full transition-all duration-100 ease-in-out "></div>
                        </div>
                        <div className="relative group">
                            <div className="group-hover:bg-gray-3  00 cursor-pointer p-2 group-hover:rounded-lg transition-all ease-in-out duration-300">
                                <img className="md:h-6 h-4 cursor-pointer" src="https://img.icons8.com/fluency/48/000000/conference-call.png" />
                            </div>
                            <div className="absolute group-hover:border-b-2 group-hover:cursor-pointer mt-2 border-blue-500 w-full transition-all duration-100 ease-in-out"></div>
                        </div>
                        <div className="relative group">
                            <div className="group-hover:bg-gray-3  00 cursor-pointer p-2 group-hover:rounded-lg transition-all ease-in-out duration-300">
                                <img className="md:h-6 h-4 cursor-pointer" src="https://img.icons8.com/external-bearicons-outline-color-bearicons/64/000000/external-watch-call-to-action-bearicons-outline-color-bearicons.png" />
                            </div>
                            <div className="absolute group-hover:border-b-2 group-hover:cursor-pointer mt-2 border-blue-500 w-full transition-all duration-100 ease-in-out "></div>
                        </div>
                    </div>
                    <LightButton isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
                    <div className="flex justify-evenly ">
                        <div className="">
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
            {/* <nav className="bg-gray-800 fixed w-full z-50 text-white">
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
            </nav> */}
        </>
    );
}



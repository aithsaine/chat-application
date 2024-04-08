import { useState, PropsWithChildren, ReactNode, useEffect } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import { User } from '@/types';
import Nav from '@/Components/Nav';
import { Toaster } from 'react-hot-toast';

export default function Authenticated({ user, header, isDarkMode, setIsDarkMode, children }: PropsWithChildren<{ user: User, header?: ReactNode }>) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    useEffect(() => {
        if (!localStorage.getItem("light_mode"))
            window.localStorage.setItem("light_mode", "dark")
    }, [])
    return (
        <main className={`relative w-full ${isDarkMode ? "bg-black text-white" : "bg-white"} mb-0 no-scrollbar`}>

            {header ?? <Nav filename={user.picture} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />}
            <Toaster position="bottom-right" />
            <div className='py-14 min-h-screen'>


                {children}
            </div>
        </main >
    );
}

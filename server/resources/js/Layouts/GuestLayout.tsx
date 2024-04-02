import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { PropsWithChildren, useEffect } from 'react';
import { Toaster } from "react-hot-toast"

export default function Guest({ children }: PropsWithChildren) {

    useEffect(() => {
        if (!localStorage.getItem("light_mode"))
            window.localStorage.setItem("light_mode", "dark")

    }, [])
    return (
        <div>

            <Toaster position="bottom-right" />
            {children}
        </div>
    );
}

import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';
import { Toaster } from "react-hot-toast"

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div>

            <Toaster position="bottom-right" />
            {children}
        </div>
    );
}

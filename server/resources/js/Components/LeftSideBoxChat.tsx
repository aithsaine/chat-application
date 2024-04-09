import React from 'react';
import { usePage } from "@inertiajs/react";
import clsx from "clsx";

export default function ({ message, isDarkMode }) {
    const { auth } = usePage().props;

    return (
        <>
            {/* Left Side Box Chat */}
            <div className="col-start-1 col-end-9 p-1">
                <div className="relative flex flex-row group">
                    <div className={clsx(message.message_deleted_at ? '' : 'lg:pr-12', `py-2 pl-3 pr-3 text-xs ${isDarkMode ? "text-white bg-black" : "bg-white text-gray-600"} rounded-md lg:text-sm`)}>
                        <div className="break-all whitespace-pre-wrap">{message.message}</div>
                    </div>




                    <div className={`absolute top-0 w-4 h-4  ${isDarkMode ? " bg-black" : "bg-white "} rounded-bl-full -left-2`}></div>

                </div>
            </div>
        </>
    )
}

import clsx from 'clsx';
import React from 'react';
import { Link, usePage } from "@inertiajs/react";

export default function RightSideBoxChat({ message, isDarkMode }) {
    const { auth } = usePage().props;

    return (
        <>
            {/* Right Side Box Chat */}
            <div className="col-start-6 col-end-13 p-1">
                <div className="relative flex flex-row-reverse group">
                    <div className={clsx(message.message_deleted_at ? '' : 'lg:pr-20', `px-3 py-2 text-xs text-black  bg-[#bbf7d0] rounded-md lg:text-sm`)}>


                        {/* Chat Body */}
                        <div className="break-all whitespace-pre-wrap">{message.message}</div>



                    </div>



                    <div className={`absolute top-0 w-4 h-4  bg-[#bbf7d0]  rounded-br-full -right-2`}></div>
                </div>
            </div >
        </>
    )
}

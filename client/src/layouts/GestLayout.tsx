import React, { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { Outlet } from 'react-router-dom'
import { csrf } from '../tools/axios'

export default function GestLayout() {
    useEffect(() => {
        const getCsrf = async () => {
            await csrf();
        }
        getCsrf()
    })
    return (
        <>
            <Toaster position="bottom-right" />
            <Outlet />
        </>
    )
}

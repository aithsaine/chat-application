import React from 'react'
import { Toaster } from 'react-hot-toast'
import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
    return (
        <>
            <Toaster position="bottom-right" />
            <Outlet />
        </>
    )
}

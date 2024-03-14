import React from 'react'
import { Outlet } from 'react-router-dom'

export default function GestLayout() {
    return (
        <>
            <p>this is gest layout</p>

            <Outlet />
        </>
    )
}

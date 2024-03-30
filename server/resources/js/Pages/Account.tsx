import AccountLayout from '@/Layouts/AccountLayout'
import React from 'react'

export default function Account({ auth, user }) {
    return (
        <AccountLayout
            auth={auth}
            user={user.data}
        >
        </AccountLayout>
    )
}

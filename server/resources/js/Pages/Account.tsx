import Post from '@/Components/Post'
import AccountLayout from '@/Layouts/AccountLayout'
import { Head } from "@inertiajs/react"
import { useState } from 'react';
export default function Account({ auth, user, posts }) {
    const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem("light_mode") == "dark" ?? false);

    return (
        <AccountLayout
            auth={auth}
            user={user}
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
        >
            <Head title={user.data.first_name.toUpperCase() + " " + user.data.last_name.toUpperCase()} />
            {posts.data.map((item: any) => <Post isDarkMode={isDarkMode} commentsCount={item.commentsCount} auth={auth} likes={item.likes} dislikes={item.dislikes} reaction={item.reaction} title={item.title} user_id={item.user_id} username={item.user_name} date={item.date} post_id={item.id}
                filename={item.user_picture} files={item.files} />)}
        </AccountLayout>
    )
}

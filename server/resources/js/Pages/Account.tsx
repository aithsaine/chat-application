import Post from '@/Components/Post'
import AccountLayout from '@/Layouts/AccountLayout'
import React from 'react'

export default function Account({ auth, user, posts }) {
    return (
        <AccountLayout
            auth={auth}
            user={user.data}
        >

            {posts.data.map((item: any) => <Post commentsCount={item.commentsCount} auth={auth} likes={item.likes} dislikes={item.dislikes} reaction={item.reaction} title={item.title} user_id={item.user_id} username={item.user_name} date={item.date} post_id={item.id}
                filename={item.user_picture} files={item.files} />)}
        </AccountLayout>
    )
}

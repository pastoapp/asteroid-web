import React from 'react'
import { useUser } from '../../utils/user'

export const Page = () => {
    const user = useUser()
    return (
        <div>
            <h1>Profile</h1>
            <h2>User: {user._id ? user._id : 'Not logged in.'}</h2>
            <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
    )
}

import { Code, Container } from '@mantine/core'
import React from 'react'
import { useUser } from '../../utils/user'

/**
 * The Profile page at /profile
 * @returns JSX for the profile page
 */
export const Page = () => {
    const user = useUser()
    return (
        <Container size='sm'>
            <h1>Profile</h1>
            <h2>User: {user._id ? user._id : 'Not logged in.'}</h2>
            <Code block>{JSON.stringify(user, null, 2)}</Code>
        </Container>
    )
}

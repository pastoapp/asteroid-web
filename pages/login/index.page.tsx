import React, { useEffect, useState } from 'react'
import { Container, ActionIcon, Text, Button, TextInput, Group, } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { useClipboard } from '@mantine/hooks'
import { useForm } from '@mantine/form'
import axios from 'axios'
import { IconClipboard } from '@tabler/icons'
import { User } from '../../utils/types'

const validateUUID4 = (value: string) => (/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(value))

const nonceFetcher = async (uid: string) => {
    const response = await axios.get<User>(import.meta.env.VITE_ASTEROID_SERVER_URL + '/users/' + uid)
    return response.data
}

export const Page = () => {
    // state of the nonce for user authentication
    const [nonce, setNonce] = useState('Enter your UID first.')

    // clipboard manager
    const { copy } = useClipboard({ timeout: 1000 })

    // create form object
    const form = useForm({
        initialValues: {
            uid: '',
            signature: '',
        },
        validate: {
            // validate uuid / uid
            // https://www.ietf.org/rfc/rfc4122.txt
            uid: (value) => validateUUID4(value) ? null : 'Invalid UID',
            signature: (value) => value.length > 10 ? null : 'Signature is required',
        },
        validateInputOnChange: true

    })

    // update public nonce from user id
    useEffect(() => {
        if (validateUUID4(form.values.uid)) nonceFetcher(form.values.uid).then(res => setNonce(res.nonce))
        else setNonce('Enter your UID first.')
    }, [form.values.uid])


    return (
        <Container size='xs' >
            <h1>Login</h1>

            <form onSubmit={form.onSubmit((values) => console.log(values))}>
                <TextInput
                    label="User ID (UID)"
                    name="uid"
                    required
                    placeholder='Ex. 099435ac-9894-4ccd-893f-b07cd7e5e766'
                    mt='md'
                    {...form.getInputProps('uid')}
                />

                <TextInput
                    label="Signature"
                    name="signature"
                    required
                    placeholder='Ex. aedaFc...011029'
                    mt='md'
                />
                <Group position='right' mt='md'>
                    <Button type='submit'>Submit</Button>
                </Group>
            </form>
            <span>
                <Text mt='md'>
                    Your nonce is: <br /> <code>{nonce}</code>
                </Text>
                <ActionIcon color="blue" size="lg" variant="outline"
                    disabled={!validateUUID4(form.values.uid)}
                    onClick={() => {
                        copy(nonce)
                        showNotification({ message: 'Copied to clipboard! 🚀', title: 'Copied!' })
                    }}>
                    <IconClipboard size={16} />
                </ActionIcon>
            </span>
        </Container>
    )
}

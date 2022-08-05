import React from 'react'
import { splitNotes, User, useUser } from '../../utils/user'
import { Group, Container, Button, Modal, Textarea, Paper, Text, ActionIcon } from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconClipboard } from '@tabler/icons'
import axios from 'axios'

// createNote is a function that creates a new note
const createNote = async (note: string) => {
    await axios.post(import.meta.env.VITE_ASTEROID_SERVER_URL + '/notes/', { note }, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } })
    location.reload()
}

// getNote is a function that gets a note
const getNote = (id: string) => {
    return axios.get(import.meta.env.VITE_ASTEROID_SERVER_URL + '/notes/' + id, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } })
}

export interface NoteProps {
    id: string
}

// Note is a component that displays a note
export const Note = (props: NoteProps) => {
    const [nt, setNt] = React.useState<{ id: string, note: string, uid: string }>({ id: '', note: '', uid: '' })

    React.useEffect(() => {
        getNote(props.id).then(res => setNt(res.data))
    }, [setNt])

    return (
        <Paper shadow="lg" radius="lg" p="lg" withBorder>
            <Text size='xs'>{nt.id}</Text>
            <Text size='lg' align='center'>{nt.note}</Text>
            <Text size='xs'>{nt.uid}</Text>
            {/* <pre>{JSON.stringify({ nt: nt.note }, null, 2)}</pre> */}
            <ActionIcon  >
                <IconClipboard size={16} />
            </ActionIcon>
        </Paper >
    )
}

export const Page = () => {
    const { _id: uid, notes: nts } = useUser()
    const notes = splitNotes(nts)
    const [showModal, setShowModal] = React.useState(false)
    const form = useForm({
        initialValues: {
            note: '',
        },
        validate: {
            note: (value) => value.length > 0 ? null : 'Note is required',
        }
    })

    return (
        <Container size="xl">
            <Modal
                opened={showModal}
                onClose={() => setShowModal(false)}
                title="Create a new note"
            >
                <form onSubmit={form.onSubmit(values => createNote(values.note))}>
                    <Textarea
                        placeholder="ex. new telefone number: 01231...."
                        label="New Note"
                        description="The contents of your new note"
                        radius="md"
                        size="xl"
                        minRows={10}
                        maxRows={25}
                        required
                        {...form.getInputProps('note')}
                    />
                    <Group position="right" mt="md">
                        <Button type="submit">Submit</Button>
                    </Group>
                </form>
            </Modal>
            <h1>Notes</h1>
            <h2>User: {uid ? uid : 'Not logged in.'}</h2>
            <Button onClick={() => setShowModal(true)}>New Note</Button>
            {notes.length > 0 ? <ul>{notes.map(note => <li key={note}><Note id={note} /></li>)}</ul> : <p>No notes</p>}
            {/* <pre>{JSON.stringify({ info, user }, null, 2)}</pre> */}
        </Container>
    )
}

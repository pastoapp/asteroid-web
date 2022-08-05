import React from 'react'
import { splitNotes, User, useUser } from '../../utils/user'
import { Group, Container, CopyButton, Button, Modal, Textarea, Paper, Text, ActionIcon, Stack, Tooltip } from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconCopy, IconCheck } from '@tabler/icons'
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
            <Group position='apart'>
                {/* note info */}
                <Stack>
                    <Text size='xs' color='dimmed'>{nt.id}</Text>
                    <Text size='lg' lineClamp={6}>{nt.note}</Text>
                </Stack>
                {/* copy note button */}
                <CopyButton timeout={1000} value={nt.note}>
                    {({ copy, copied }) => (
                        <Tooltip label={`Copy Note ID ${nt.id}`} withArrow position='left'>
                            <ActionIcon size='xl' color={copied ? 'teal' : 'blue'} variant='outline' onClick={copy}>
                                {copied ? <IconCheck /> : <IconCopy />}
                            </ActionIcon>
                        </Tooltip>
                    )}
                </CopyButton>
            </Group>
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
            {/* New Note Dialogue */}
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
            {/* new note dialogue button */}
            <Button size='xl' onClick={() => setShowModal(true)}>New Note</Button>
            {/* Display notes if user is logged in */}
            {notes.length > 0 ?
                <Stack mt='lg'>{notes.map(note => <Note key={note} id={note} />)}</Stack> :
                <p>No notes</p>
            }
        </Container>
    )
}

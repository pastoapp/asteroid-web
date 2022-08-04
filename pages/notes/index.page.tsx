import jwtDecode from 'jwt-decode'
import axios from 'axios'
import React from 'react'
import { splitNotes, User, useUser } from '../../utils/user'


export const Page = () => {
    const { _id: uid, notes: nts } = useUser()
    const notes = splitNotes(nts)

    return (
        <div>
            <h1>Notes</h1>
            <h2>User: {uid ? uid : 'Not logged in.'}</h2>
            {notes.length > 0 ? <ul>{notes.map(note => <li key={note}>{note}</li>)}</ul> : <p>No notes</p>}
            {/* <pre>{JSON.stringify({ info, user }, null, 2)}</pre> */}
        </div>
    )
}

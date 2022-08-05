import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

// User is a singleton class that holds the user's data.
export interface User {
    _id: string
    createdAt: number
    nonce: string
    notes: string
    publicKey: string
    updatedAt: number
}

// useUser returns a user object indicating if the user is logged in
export const useUser = (): User => {
    // The user object is initialized to an empty object.
    const [user, setUser] = useState<User>({} as User)

    useEffect(() => {
        // localstorage is a browser feature that stores data locally.
        if (typeof window === 'undefined') return

        // If the user is logged in, get their data from the localstorage.
        const token = localStorage.getItem('token')
        if (!token) return

        // Decode the token and get the user's data.
        const { _id } = jwtDecode<{ _id: string, exp: number, orig_iat: number }>(token)

        // get user object from server
        axios.get<User>(import.meta.env.VITE_ASTEROID_SERVER_URL + '/users/' + _id)
            .then(res => {
                setUser({ ...res.data })
            })
            .catch(err => {
                console.error(err)
            })
    }, [setUser])

    return user
}

// splitNotes is a function that splits a string of notes into an array of note ids
export const splitNotes = (notes: string): string[] => notes ? notes.split(';').filter(s => s.length > 0) : []

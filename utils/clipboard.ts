import React, { useEffect } from 'react'
import { readText } from '@tauri-apps/api/clipboard'
import { createNote } from '../pages/notes/index.page'
import { Mutex } from 'async-mutex'

// main mutex to sync databaase writes
const mutex = new Mutex()
let oldText = ''

/**
 * Gathers the clipboard content
 * @returns {Promise<string>} text from clipboard
 */
export const clipboardContent = async (): Promise<string> => {
    const clipboardText = await readText()
    return clipboardText ?? ''
}

/**
 * uploads the clipboard content to the database
 * @param clipText text from clipboard
 * @returns {Promise<string>} the clipboard text
 */
export const uploadClipboard = async (clipText: string): Promise<string> => {
    // sync database writes
    await mutex.runExclusive(() => {
        // write only, if the data is unchanged
        if (clipText !== oldText) {
            console.log('uploading...', clipText)
            createNote(clipText)
            oldText = clipText
        }
    })

    return clipText
}

/**
 * Hook to upload the clipboard content to the database.
 * Does not work in Browser environments.
 * @returns {string} the clipboard text
 */
export const clipboardWatcher = () => {
    const [newClip, setNewClip] = React.useState('')
    useEffect(() => {
        // run only, if the desktop app is running. 
        if (!window.__TAURI__) return
        const interval = setInterval(() => {
            clipboardContent().then(res => uploadClipboard(res)).then(result => setNewClip(result))
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    return newClip
}
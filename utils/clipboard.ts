import React, { useEffect } from 'react'
import { readText } from '@tauri-apps/api/clipboard'
import { createNote } from '../pages/notes/index.page'
import { Mutex } from 'async-mutex'

const mutex = new Mutex()
let oldText = ''

export const clipboardContent = async (): Promise<string> => {
    const clipboardText = await readText()
    return clipboardText ?? ''
}

export const uploadClipboard = async (clipText: string): Promise<string> => {
    await mutex.runExclusive(() => {
        if (clipText !== oldText) {
            console.log('uploading...', clipText)
            // TODO: check if note exists
            createNote(clipText)
            oldText = clipText
        }
    })

    return clipText
}

export const clipboardWatcher = () => {
    const [newClip, setNewClip] = React.useState('')
    useEffect(() => {
        if (!window.__TAURI__) return
        const interval = setInterval(() => {
            clipboardContent().then(res => uploadClipboard(res)).then(result => setNewClip(result))
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    return newClip
}
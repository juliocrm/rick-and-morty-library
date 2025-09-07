import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'rickmorty_character_comments'

const getAllComments = () => {
    try {
        const comments = window.localStorage.getItem(STORAGE_KEY)
        return comments ? JSON.parse(comments) : {}
    } catch (error) {
        console.error('Error reading from localStorage', error)
        return {}
    }
}

const saveAllComments = (comments) => {
    try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(comments))
    } catch (error) {
        console.error('Error writing to localStorage', error)
    }
}

export default function useCharacterComments(characterId) {
    const [comment, setComment] = useState('')

    useEffect(() => {
        if (!characterId) return
        const allComments = getAllComments()
        setComment(allComments[characterId] || '')
    }, [characterId])

    const saveComment = useCallback((commentText) => {
        if (!characterId) return
        const allComments = getAllComments()
        const updatedAllComments = { ...allComments, [characterId]: commentText }
        saveAllComments(updatedAllComments)
        setComment(commentText)
    }, [characterId])

    return { comment, saveComment }
}
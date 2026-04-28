import { useState, useEffect } from 'react'
import { Palette } from '@/types/palette'

const KEY = "palette-ai-favorites"

export function useFavorites(){
    const [favorites, setFavorites] = useState<Palette[]>([])

    useEffect(() => {
        const stored = localStorage.getItem(KEY)
        if(stored) setFavorites(JSON.parse(stored))
    }, [])

    const save = (favorites: Palette[]) => {
        setFavorites(favorites)
        localStorage.setItem(KEY, JSON.stringify(favorites))
    }

    const addFavorite = (palette: Palette) => {
        const updated = [palette, ...favorites.filter(p => p.id !== palette.id)]
        save(updated)
    }

    const removeFavorite = (id: string) => {
        save(favorites.filter(p => p.id !== id))
    }

    const isFavorite = (id: string) => favorites.some(p => p.id === id)

    return { favorites, addFavorite, removeFavorite, isFavorite }

}
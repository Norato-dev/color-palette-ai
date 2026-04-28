'use client'

import { useFavorites } from '@/lib/useFavorites'
import Link from 'next/link'
import { Color } from '@/types/palette'
import { motion } from "framer-motion";

const toHex = (hex: string) => hex.startsWith("#") ? hex : `#${hex}`;

function MiniPalette({ colors }: { colors: Color[] }) {
    return (
        <div className="flex rounded-lg overflow-hidden h-10">
            {colors.map((color) => (
                <div
                key={color.role}
                className="flex-1"
                style={{ backgroundColor: toHex(color.hex) }}
                />
            ))}
        </div>
    )
}

export default function FavoritesPage() {
    const { favorites, removeFavorite } = useFavorites()

    return (
        <main className="min-h-screen bg-gray-950 text-white flex flex-col items-center p-8">
            <div className="w-full max-w-2xl mt-16 flex flex-col gap-6">
                
                <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">★ Favoritos</h1>
                <Link
                    href="/"
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                    ← Volver
                </Link>
                </div>

                {favorites.length === 0 ? (
                <div className="text-center py-20 text-gray-500">
                    <p className="text-4xl mb-3">🎨</p>
                    <p>No tienes paletas guardadas aún.</p>
                    <Link href="/" className="text-blue-400 hover:underline text-sm mt-2 inline-block">
                    Generar una paleta
                    </Link>
                </div>
                ) : (
                <div className="flex flex-col gap-3">
                    {favorites.map((palette, i) => (
                    <motion.div
                        key={palette.id}
                        className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex flex-col gap-3"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3, delay: i * 0.06 }}
                    >
                        <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">"{palette.prompt}"</p>
                        <button
                            onClick={() => removeFavorite(palette.id)}
                            className="text-xs text-gray-500 hover:text-red-400 transition-colors"
                        >
                            Eliminar
                        </button>
                        </div>
                        <MiniPalette colors={palette.colors} />
                        <div className="flex">
                            {palette.colors.map((color) => (
                                <div key={color.role} className="flex-1 text-center">
                                <p className="text-xs text-gray-500 capitalize">{color.role}</p>
                                <p className="text-xs font-mono">{toHex(color.hex)}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                    ))}
                </div>
                )}
            </div>
            <p className="text-xs font-mono text-gray-700 mt-8 tracking-widest">
                // davidnorato.dev
            </p>
        </main>
    )
}
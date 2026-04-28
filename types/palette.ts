export interface Color {
    name: string
    hex: string
    role: "primary" | "secondary" | "accent" | "background" | "text"
}

export interface Palette {
    id: string
    prompt: string
    colors: Color[]
    createdAt: string
}
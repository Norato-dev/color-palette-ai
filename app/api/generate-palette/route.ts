import { NextRequest, NextResponse } from 'next/server'
import groq from '@/lib/groq'

export async function POST(req: NextRequest){
    const { prompt } = await req.json()

    if(!prompt) {
        return NextResponse.json(
            { error: "Prompt requerido"},
            { status: 400 }
        )
    }

    const completion = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
            {
                role:"system",
                content:`Eres un experto en diseño UI, branding y teoría del color.
                        Tu trabajo es generar paletas de colores para interfaces digitales.

                        REGLAS ESTRICTAS:
                        1. Responde ÚNICAMENTE con JSON válido, sin texto adicional, sin markdown
                        2. Genera exactamente 5 colores con estos roles:
                        - "primary": color principal de la marca, para navbars y elementos destacados
                        - "secondary": color de superficie/card, debe contrastar sutilmente con el background
                        - "accent": color de acción, para botones CTA y elementos interactivos
                        - "background": color de fondo general de la app, suele ser el más neutro
                        - "text": color para textos, debe tener alto contraste con el background

                        3. COHERENCIA: Los 5 colores deben funcionar juntos visualmente
                        4. CONTRASTE: text debe ser legible sobre background y sobre secondary
                        5. El accent debe destacar sobre primary y secondary
                        6. Interpreta el concepto del usuario con criterio de diseñador profesional

                        Formato de respuesta:
                        {
                        "colors": [
                            { "name": "nombre evocador del color", "hex": "#RRGGBB", "role": "primary" },
                            { "name": "nombre evocador del color", "hex": "#RRGGBB", "role": "secondary" },
                            { "name": "nombre evocador del color", "hex": "#RRGGBB", "role": "accent" },
                            { "name": "nombre evocador del color", "hex": "#RRGGBB", "role": "background" },
                            { "name": "nombre evocador del color", "hex": "#RRGGBB", "role": "text" }
                        ]
                        }`
            },
            {
                role:"user",
                content: prompt,
            },
        ],
        temperature: 0.7,
    })

    const raw = completion.choices[0].message.content ?? ""
    try {
        const palette = JSON.parse(raw)
        return NextResponse.json(palette)
    } catch (error) {
        return NextResponse.json(
            { error: "Error pocesando respuesta de IA"},
            { status: 500 }
        )
    }
}
<div align="center">

# 🎨 Palette AI

**Describe un concepto. Obtén una paleta de colores lista para producción.**

Generación de paletas UI con IA — impulsado por LLaMA 3.3 70B vía Groq.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Groq](https://img.shields.io/badge/Groq-LLaMA_3.3_70B-F55036?style=flat-square)](https://groq.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-EF008F?style=flat-square&logo=framer&logoColor=white)](https://www.framer.com/motion)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?style=flat-square&logo=vercel)](https://vercel.com)

[**→ Ver demo en vivo**](https://palette-ai.vercel.app)

</div>

---

## ¿Qué es esto?

Palette AI convierte una descripción en texto libre en una paleta de 5 colores coherente y lista para usar en interfaces digitales. Solo escribe algo como *"dashboard fintech minimalista"* o *"app de meditación con tonos de bosque"* y la IA genera colores con roles semánticos pensados para UI real.

No es un generador de colores aleatorios — el modelo tiene contexto de diseño UI, branding y teoría del color para devolver paletas que realmente funcionan juntas.

---

## Features

| | |
|---|---|
| 🤖 **Generación con IA** | LLaMA 3.3 70B vía Groq API genera colores con criterio de diseñador profesional |
| 🎨 **Preview en UI real** | Visualiza la paleta aplicada a componentes de interfaz antes de usarla |
| 📋 **Exportación lista para usar** | Copia en CSS Variables, Tailwind Config o JSON con un click |
| ★ **Favoritos** | Guarda paletas en localStorage para acceder después |
| ⚡ **Animaciones fluidas** | Transiciones con Framer Motion para una experiencia premium |
| 🎯 **Roles semánticos** | Cada color tiene un rol: `primary`, `secondary`, `accent`, `background`, `text` |

---

## Stack

- **[Next.js 16](https://nextjs.org)** — App Router + API Routes
- **[TypeScript 5](https://www.typescriptlang.org)** — tipado estricto end-to-end
- **[Tailwind CSS v4](https://tailwindcss.com)** — estilos utility-first
- **[Groq SDK](https://groq.com)** — inferencia ultrarrápida con `llama-3.3-70b-versatile`
- **[Framer Motion 12](https://www.framer.com/motion)** — animaciones declarativas

---

## Empezar localmente

### Prerequisitos

- Node.js 18+
- Una [Groq API Key](https://console.groq.com) (gratis)

### Instalación

```bash
# 1. Clona el repositorio
git clone https://github.com/tu-usuario/color-palette-ai.git
cd color-palette-ai

# 2. Instala dependencias
npm install

# 3. Configura las variables de entorno
cp .env.example .env.local
```

Edita `.env.local` y agrega tu clave:

```env
GROQ_API_KEY=gsk_...
```

```bash
# 4. Inicia el servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

---

## Variables de entorno

| Variable | Descripción | Requerida |
|---|---|---|
| `GROQ_API_KEY` | API Key de [Groq Console](https://console.groq.com) | ✅ |

---

## Estructura del proyecto

```
app/
├── page.tsx                  # Página principal — generador
├── favorites/page.tsx        # Página de paletas guardadas
├── layout.tsx
└── api/
    └── generate-palette/
        └── route.ts          # POST /api/generate-palette

components/
├── PalettePreview.tsx        # Preview de la paleta en UI real
└── ExportMenu.tsx            # Exportación CSS / Tailwind / JSON

lib/
├── groq.ts                   # Cliente Groq inicializado
└── useFavorites.ts           # Hook para favoritos en localStorage

types/
└── palette.ts                # Tipos TypeScript compartidos
```

---

## Cómo funciona

1. El usuario describe un concepto en texto libre
2. El prompt se envía a `POST /api/generate-palette`
3. La API llama a Groq con un system prompt que instruye al modelo como diseñador UI experto
4. El modelo devuelve un JSON con 5 colores en roles semánticos (`primary`, `secondary`, `accent`, `background`, `text`)
5. La paleta se renderiza con preview en componentes UI y opciones de exportación

---

<div align="center">

Made by [davidnorato.dev](https://davidnorato.dev)

</div>
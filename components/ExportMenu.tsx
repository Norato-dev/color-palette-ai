'use client'

import { useState } from 'react'
import { Color } from '@/types/palette'

interface Props {
    colors: Color[]
    prompt: string
}

const toHex = (hex: string) => (hex.startsWith("#") ? hex : `#${hex}`)

export default function ExportMenu({ colors, prompt }: Props){
    const [copied, setCopied] = useState<string | null>(null)

    const copyToClipboard = (text: string, label: string) => {
        navigator.clipboard.writeText(text)
        setCopied(label)
        setTimeout(() => setCopied(null), 1500)
     }

    const exportCSS = () => {
        const vars = colors
            .map((c) => `  --color-${c.role}: ${toHex(c.hex)};`)
            .join("\n");
        return `:root {\n${vars}\n}`;
    };
    
    const exportTailwind  = () => {
        const entries = colors
            .map((c) => ` ${c.role}: "${toHex(c.hex)}",`)
            .join("\n")
        return `// tailwind.config.ts\nextend: {\n  colors: {\n    brand: {\n${entries}\n    }\n  }\n}`
    }

    const exportJson = () => {
        const obj = Object.fromEntries(
            colors.map((c) => [c.role, { hex: toHex(c.hex), name: c.name }])
        )
        return JSON.stringify({ prompt, palette: obj}, null, 2)
    }

    const formats = [
        { label: "CSS Variables", content: exportCSS(), tag: "css" },
        { label: "Tailwind Config", content: exportTailwind(), tag: "tailwind" },
        { label: "JSON", content: exportJson(), tag: "json"}
    ] 

    return (
        <div className="flex flex-col gap-3 mt-4">
      <p className="text-gray-400 text-sm">Exportar paleta</p>
      <div className="flex flex-col gap-2">
        {formats.map(({ label, content, tag }) => (
          <div
            key={tag}
            className="bg-gray-900 border border-gray-800 rounded-lg p-3 flex flex-col gap-2"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400 font-mono">{label}</span>
              <button
                onClick={() => copyToClipboard(content, tag)}
                className="text-xs px-3 py-1 rounded-md bg-gray-800 hover:bg-gray-700 text-white transition-colors"
              >
                {copied === tag ? "✓ Copiado" : "Copiar"}
              </button>
            </div>
            <pre className="text-xs text-green-400 font-mono overflow-x-auto whitespace-pre-wrap">
              {content}
            </pre>
          </div>
        ))}
      </div>
    </div>
    )
}
import { Color } from '@/types/palette'

interface Props {
    colors: Color[]
}

const getColor = (colors: Color[], role: string) =>
    colors.find((c) => c.role === role)?.hex ?? "#000"

const toHex = (hex: string) => (hex.startsWith("#") ? hex : `#${hex}`)

export default function PalettePreview({ colors } : Props) {
    const primary = toHex(getColor(colors, "primary"))
    const secondary = toHex(getColor(colors, "secondary"))
    const accent = toHex(getColor(colors, "accent"))
    const background = toHex(getColor(colors, "background"))
    const text = toHex(getColor(colors, "text"))

    return (
        <div className="flex flex-col gap-3 mt-4">
      <p className="text-gray-400 text-sm">Preview en componentes</p>

      {/* Card de producto */}
      <div
        className="rounded-xl p-5 flex flex-col gap-4"
        style={{ backgroundColor: background, color: text }}
      >
        {/* Navbar */}
        <div
          className="flex items-center justify-between px-4 py-2 rounded-lg"
          style={{ backgroundColor: primary, boxShadow: `0 2px 12px ${primary}55` }}
        >
          <span className="font-bold text-sm" style={{ color: background }}>
            MyApp
          </span>
          <div className="flex gap-3">
            {["Inicio", "Precios", "Blog"].map((item) => (
              <span
                key={item}
                className="text-xs opacity-80 cursor-pointer"
                style={{ color: background }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Hero */}
        <div className="flex flex-col gap-2 px-2">
          <h2 className="text-lg font-bold" style={{ color: text }}>
            Bienvenido a tu producto
          </h2>
          <p className="text-xs opacity-70" style={{ color: text }}>
            Una descripción corta que explica el valor de tu producto en una línea.
          </p>
          <div className="flex gap-2 mt-1">
            <button
              className="px-4 py-1.5 rounded-lg text-xs font-semibold"
              style={{ backgroundColor: accent, color: background }}
            >
              Empezar gratis
            </button>
            <button
              className="px-4 py-1.5 rounded-lg text-xs font-semibold border"
              style={{ borderColor: primary, color: primary }}
            >
              Ver demo
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-3 gap-2">
          {["Rápido", "Seguro", "Escalable"].map((feature) => (
            <div
              key={feature}
              className="rounded-lg p-3 flex flex-col gap-1"
              style={{
                backgroundColor: secondary,
                opacity: 0.8,
                outline: `1px solid ${primary}22`,
              }}
            >
              <span className="text-base">
                {feature === "Rápido" ? "⚡" : feature === "Seguro" ? "🔒" : "📈"}
              </span>
              <span className="text-xs font-semibold" style={{ color: text }}>
                {feature}
              </span>
              <span className="text-xs opacity-60" style={{ color: text }}>
                Lorem ipsum dolor sit amet.
              </span>
            </div>
          ))}
        </div>

        {/* Badge accent */}
        <div className="flex gap-2">
          <span
            className="text-xs px-2 py-1 rounded-full font-medium"
            style={{ backgroundColor: accent, color: background }}
          >
            Nuevo
          </span>
          <span
            className="text-xs px-2 py-1 rounded-full font-medium border"
            style={{ borderColor: accent, color: accent }}
          >
            Popular
          </span>
        </div>
      </div>
    </div>
    )
}
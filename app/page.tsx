"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Palette } from "@/types/palette";
import { useFavorites } from "@/lib/useFavorites";
import PalettePreview from "@/components/PalettePreview";
import ExportMenu from "@/components/ExportMenu";

const toHex = (hex: string) => (hex.startsWith("#") ? hex : `#${hex}`);

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [palette, setPalette] = useState<Palette | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const generatePalette = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setError("");
    setPalette(null);

    try {
      const res = await fetch("/api/generate-palette", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      if (data.error) { setError(data.error); return; }

      setPalette({
        id: crypto.randomUUID(),
        prompt,
        colors: data.colors,
        createdAt: new Date().toISOString(),
      });
    } catch {
      setError("Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (hex: string) => {
    navigator.clipboard.writeText(toHex(hex));
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1500);
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-start px-4 py-8 md:p-8 relative">
      
      {/* Link favoritos */}
      <Link
        href="/favorites"
        className="text-sm text-gray-400 hover:text-white transition-colors absolute right-4 top-6 md:right-8 md:top-8"
      >
        ★ Favoritos
      </Link>

      <div className="w-full max-w-2xl mt-12 md:mt-16 flex flex-col gap-6">

        {/* Header */}
        <motion.div
          className="text-center flex flex-col items-center gap-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-xs font-mono text-purple-400 tracking-widest">
            // davidnorato.dev
          </span>
          <h1 className="text-3xl md:text-4xl font-bold">🎨 Palette AI</h1>
          <p className="text-gray-400 text-sm md:text-base text-center">
            Describe un estilo y la IA genera tu paleta de colores
          </p>
        </motion.div>

        {/* Input */}
        <motion.div
          className="flex flex-col sm:flex-row gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && generatePalette()}
            placeholder="ej: startup tech minimalista, café vintage..."
            className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors text-sm md:text-base"
          />
          <button
            onClick={generatePalette}
            disabled={loading || !prompt.trim()}
            className="bg-purple-600 hover:bg-purple-500 disabled:bg-gray-700 disabled:cursor-not-allowed px-6 py-3 rounded-lg font-semibold transition-all text-sm md:text-base whitespace-nowrap"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin">⟳</span> Generando...
              </span>
            ) : (
              "Generar"
            )}
          </button>
        </motion.div>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.p
              className="text-red-400 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Paleta */}
        <AnimatePresence>
          {palette && (
            <motion.div
              className="flex flex-col gap-4"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Label + Favorito */}
              <div className="flex items-center justify-between flex-wrap gap-2">
                <p className="text-gray-400 text-sm">
                  Paleta para:{" "}
                  <span className="text-white font-medium">"{palette.prompt}"</span>
                </p>
                <motion.button
                  whileTap={{ scale: 0.92 }}
                  onClick={() =>
                    isFavorite(palette.id)
                      ? removeFavorite(palette.id)
                      : addFavorite(palette)
                  }
                  className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg border transition-colors"
                  style={{
                    borderColor: isFavorite(palette.id) ? "#f59e0b" : "#374151",
                    color: isFavorite(palette.id) ? "#f59e0b" : "#9ca3af",
                  }}
                >
                  {isFavorite(palette.id) ? "★ Guardada" : "☆ Guardar"}
                </motion.button>
              </div>

              {/* Barras de color */}
              <div className="flex rounded-xl overflow-hidden h-20 md:h-24">
                {palette.colors.map((color, i) => (
                  <motion.div
                    key={color.role}
                    className="flex-1 cursor-pointer group relative"
                    style={{ backgroundColor: toHex(color.hex) }}
                    onClick={() => handleCopy(color.hex)}
                    initial={{ opacity: 0, scaleY: 0.5 }}
                    animate={{ opacity: 1, scaleY: 1 }}
                    transition={{ duration: 0.3, delay: i * 0.07 }}
                  >
                    <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 bg-black/30 transition-opacity">
                      {copiedHex === color.hex ? (
                        <span className="text-white text-xs font-bold">✓ Copiado</span>
                      ) : (
                        <>
                          <span className="text-white text-xs font-bold">{toHex(color.hex)}</span>
                          <span className="text-white text-xs hidden md:block">{color.name}</span>
                        </>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Hex codes */}
              <div className="grid grid-cols-5 gap-1 md:gap-2">
                {palette.colors.map((color) => (
                  <div key={color.role} className="text-center">
                    <p className="text-xs text-gray-400 capitalize">{color.role}</p>
                    <p className="text-xs font-mono text-white">{toHex(color.hex)}</p>
                  </div>
                ))}
              </div>

              <PalettePreview colors={palette.colors} />
              <ExportMenu colors={palette.colors} prompt={palette.prompt} />

              {/* Footer branding */}
              <p className="text-xs font-mono text-gray-700 text-center tracking-widest mt-4">
                // davidnorato.dev
              </p>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </main>
  );
}
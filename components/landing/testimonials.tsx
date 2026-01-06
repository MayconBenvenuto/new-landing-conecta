"use client"

import { motion } from "framer-motion"
import { Instagram } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-animations"

export function Testimonials() {
  const [ref, isVisible] = useScrollReveal()

  // Vídeos do Instagram da Conecta Saúde
  const instagramReels = [
    {
      code: "DOMnguAD9t7",
      url: "https://www.instagram.com/belzconectasaude/reel/DOMnguAD9t7/"
    },
    {
      code: "DRPzrG9Ef6u",
      url: "https://www.instagram.com/belzconectasaude/reel/DRPzrG9Ef6u/"
    },
    {
      code: "DRfdQ1SkbL4",
      url: "https://www.instagram.com/belzconectasaude/reel/DRfdQ1SkbL4/"
    },
  ]

  return (
    <section ref={ref} className="py-20 md:py-32 px-4 md:px-6 lg:px-8" style={{ backgroundColor: '#011147' }}>
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Instagram className="w-8 h-8 text-white" />
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-balance text-white">
                Depoimentos dos nossos clientes
              </h2>
            </div>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Veja o que empresas reais dizem sobre a Conecta Saúde
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {instagramReels.map((reel, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
              >
                <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                  {/* Instagram Reel Embed via iframe */}
                  <div className="relative w-full" style={{ paddingBottom: '177.78%' /* 9:16 aspect ratio */ }}>
                    <iframe
                      src={`https://www.instagram.com/reel/${reel.code}/embed/`}
                      className="absolute top-0 left-0 w-full h-full border-0"
                      frameBorder="0"
                      scrolling="no"
                      allowTransparency
                      allow="encrypted-media"
                      title={`Instagram Reel ${index + 1}`}
                    />
                  </div>
                  {/* Link para abrir no Instagram */}
                  <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50">
                    <a
                      href={reel.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors"
                    >
                      <Instagram className="w-4 h-4" />
                      <span>Ver no Instagram</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Instagram CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 text-center"
          >
            <a
              href="https://www.instagram.com/belzconectasaude/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              <Instagram className="w-6 h-6" />
              <span>Siga @belzconectasaude no Instagram</span>
            </a>
          </motion.div>
        </div>
      </section>
  )
}
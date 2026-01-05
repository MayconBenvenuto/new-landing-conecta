"use client"

import { useState, useEffect } from "react"
import { MessageCircle, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    // Show button after 3 seconds
    const timer = setTimeout(() => setIsVisible(true), 3000)
    return () => clearTimeout(timer)
  }, [])

  const whatsappNumber = "5581999999999" // Substitua pelo número real
  const message = "Olá! Gostaria de falar com um especialista sobre gestão de riscos."
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          className="fixed bottom-6 right-6 z-50"
        >
          {/* Expanded Message */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, x: 20, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-20 right-0 w-64 bg-white rounded-2xl shadow-2xl p-4 border border-border/50"
              >
                <button
                  onClick={() => setIsExpanded(false)}
                  className="absolute top-2 right-2 w-6 h-6 rounded-full bg-secondary/10 hover:bg-secondary/20 flex items-center justify-center transition-colors"
                  aria-label="Fechar"
                >
                  <X className="w-3 h-3 text-secondary" />
                </button>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-secondary text-sm">Conecta Saúde</p>
                      <p className="text-xs text-green-600">Online agora</p>
                    </div>
                  </div>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    Olá! 👋 Precisa de ajuda com gestão de riscos? Fale com um especialista.
                  </p>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-green-500 hover:bg-green-600 text-white text-sm font-medium py-2 px-4 rounded-lg text-center transition-colors"
                  >
                    Iniciar conversa
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 shadow-2xl flex items-center justify-center text-white transition-colors group relative"
            aria-label="Abrir chat do WhatsApp"
          >
            <MessageCircle className="w-7 h-7" />
            
            {/* Pulse animation */}
            <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20" />
            
            {/* Badge */}
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold">
              1
            </span>
          </motion.button>

          {/* Tooltip */}
          {!isExpanded && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-0 right-20 bg-secondary text-white text-sm font-medium px-4 py-2 rounded-lg shadow-lg whitespace-nowrap pointer-events-none"
            >
              Fale com especialista
              <div className="absolute top-1/2 -right-1 w-2 h-2 bg-secondary transform rotate-45 -translate-y-1/2" />
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

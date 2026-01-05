"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useScrollSpy } from "@/hooks/use-scroll-spy"
import { useAnalytics } from "@/hooks/use-analytics"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { trackCTAClick } = useAnalytics()

  const activeSection = useScrollSpy(["como-funciona", "diferenciais", "nr1", "quem-somos", "diagnostico"], 120)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "#como-funciona", label: "Como funciona", id: "como-funciona" },
    { href: "#diferenciais", label: "Diferenciais", id: "diferenciais" },
    { href: "#nr1", label: "NR-1", id: "nr1" },
    { href: "#quem-somos", label: "Quem somos", id: "quem-somos" },
  ]

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const targetId = href.replace("#", "")
    const element = document.getElementById(targetId)
    if (element) {
      const offsetTop = element.offsetTop - 80
      window.scrollTo({ top: offsetTop, behavior: "smooth" })
    }
    setIsMobileMenuOpen(false)
  }

  const handleCTAClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    trackCTAClick("Agendar Diagnóstico", "header")
    const element = document.getElementById("diagnostico")
    if (element) {
      const offsetTop = element.offsetTop - 80
      window.scrollTo({ top: offsetTop, behavior: "smooth" })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center">
            <Image
              src={isScrolled ? "/images/logo-conecta-saude.png" : "/images/logo-conecta-saude-branca.png"}
              alt="Conecta Saúde"
              width={140}
              height={36}
              className="h-8 w-auto md:h-[133px] transition-opacity duration-300"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-sm font-medium transition-colors relative ${
                  activeSection === link.id ? "text-white" : isScrolled ? "text-foreground hover:text-primary" : "text-white/90 hover:text-white"
                }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <span className={`absolute -bottom-1 left-0 right-0 h-0.5 rounded-full ${
                    isScrolled ? "bg-primary" : "bg-white"
                  }`} />
                )}
              </a>
            ))}
            <Button asChild size="sm" className={isScrolled ? "bg-primary hover:bg-primary/90" : "bg-white text-primary hover:bg-white/90"}>
              <a href="#diagnostico" onClick={handleCTAClick}>
                Agendar Diagnóstico
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 transition-colors ${
              isScrolled ? "text-foreground" : "text-white"
            }`}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border bg-white">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`text-sm font-medium transition-colors px-2 ${
                    activeSection === link.id ? "text-primary" : "text-foreground hover:text-primary"
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <Button asChild className="bg-primary hover:bg-primary/90">
                <a href="#diagnostico" onClick={handleCTAClick}>
                  Agendar Diagnóstico
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

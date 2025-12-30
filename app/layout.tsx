import type React from "react"
import type { Metadata } from "next"
import { Source_Serif_4, Source_Sans_3 } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"

const sourceSerif4 = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
})

const sourceSans3 = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Conecta Saúde | Gestão de Riscos Integrada com Inteligência de Dados",
  description:
    "HUB de Gestão de Riscos que integra RH, Jurídico e SST em uma única inteligência de dados. Conformidade com NR-1, prevenção de riscos psicossociais e governança corporativa.",
  keywords: ["NR-1", "riscos psicossociais", "gestão de riscos", "SST", "saúde corporativa", "compliance", "ISO 45003"],
  openGraph: {
    title: "Conecta Saúde | Gestão de Riscos Integrada",
    description:
      "Gestão de riscos psicossociais com conformidade NR-1 e inteligência de dados para RH, Jurídico e SST.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Conecta Saúde | Gestão de Riscos Integrada",
    description: "HUB de Gestão de Riscos com conformidade NR-1 e inteligência de dados.",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${sourceSans3.variable} ${sourceSerif4.variable} font-sans antialiased`}>
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}

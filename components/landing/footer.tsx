import Link from "next/link"
import Image from "next/image"

export function Footer() {
  const links = [
    { href: "#como-funciona", label: "Como funciona" },
    { href: "#diferenciais", label: "Diferenciais" },
    { href: "#nr1", label: "NR-1" },
    { href: "#quem-somos", label: "Quem somos" },
  ]

  return (
    <footer className="bg-secondary text-white py-12 px-4 md:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-conecta-nobg-KXmXw5JkjXCXbS5FtK3jZjTWspRE7w.png"
                alt="Conecta Saúde"
                width={160}
                height={42}
                className="w-auto brightness-0 invert h-[125px]"
              />
            </Link>
            <p className="text-white/80 text-sm leading-relaxed">Gestão de riscos com inteligência de dados.</p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-bold mb-4">Navegação</h3>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-white/80 hover:text-white text-sm transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold mb-4">Contato</h3>
            <div className="space-y-2 text-sm text-white/80">
              <p>contato@conectasaude.com.br</p>
              <p>Pernambuco, Brasil</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 space-y-4">
          <p className="text-xs text-white/60 leading-relaxed">
            Informações institucionais. O conteúdo apresentado não substitui orientação jurídica, médica ou técnica
            especializada. Consulte profissionais habilitados para decisões específicas.
          </p>
          <p className="text-sm text-white/80">
            © {new Date().getFullYear()} Conecta Saúde. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

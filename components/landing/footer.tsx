import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, MapPin, Linkedin, Instagram, Shield, FileText } from "lucide-react"

export function Footer() {
  const links = [
    { href: "#como-funciona", label: "Como funciona" },
    { href: "#diferenciais", label: "Diferenciais" },
    { href: "#nr1", label: "NR-1" },
    { href: "#quem-somos", label: "Quem somos" },
  ]

  const legalLinks = [
    { href: "/privacidade", label: "Política de Privacidade" },
    { href: "/termos", label: "Termos de Uso" },
  ]

  const socialLinks = [
    { href: "https://www.linkedin.com/company/conecta-sa%C3%BAdee/posts/?feedView=all", icon: Linkedin, label: "LinkedIn" },
    { href: "https://instagram.com/conectasaude", icon: Instagram, label: "Instagram" },
  ]

  return (
    <footer className="bg-secondary text-white py-12 px-4 md:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4 md:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-conecta-nobg-KXmXw5JkjXCXbS5FtK3jZjTWspRE7w.png"
                alt="Conecta Saúde"
                width={160}
                height={42}
                className="w-auto brightness-0 invert h-32 md:h-[125px]"
              />
            </Link>
            <p className="text-white/80 text-sm leading-relaxed">
              Gestão de riscos com inteligência de dados para empresas que valorizam pessoas e performance.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
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

          {/* Legal */}
          <div>
            <h3 className="font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/80 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 space-y-2">
              <div className="flex items-center gap-2 text-xs text-white/60">
                <Shield className="w-3 h-3" />
                <span>LGPD Compliant</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-white/60">
                <FileText className="w-3 h-3" />
                <span>CNPJ: 58.139.448/0001-70</span>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold mb-4">Contato</h3>
            <div className="space-y-3 text-sm">
              <a
                href="tel:+5581996085185"
                className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>(81) 99608-5185</span>
              </a>
              <a
                href="mailto:contato@conectasaude.com.br"
                className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>contato@conectasaude.com.br</span>
              </a>
              <div className="flex items-start gap-2 text-white/80">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>
                  Empresarial Charles Darwin, 231 - Ilha do Leite, Recife - PE, 50070-460
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/60">
            <p className="leading-relaxed text-center md:text-left">
              Informações institucionais. O conteúdo apresentado não substitui orientação jurídica, médica ou técnica
              especializada. Consulte profissionais habilitados para decisões específicas.
            </p>
            <div className="flex items-center gap-2 flex-shrink-0">
              <Shield className="w-4 h-4" />
              <span>SSL Seguro</span>
            </div>
          </div>
          <p className="text-sm text-white/80 text-center">
            © {new Date().getFullYear()} Conecta Saúde. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

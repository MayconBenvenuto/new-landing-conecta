import Image from "next/image"
import { Check } from "lucide-react"

export function PainSection() {
  const benefits = [
    "o esgotamento que foi evitado",
    "a crise que não se instalou",
    "a perda de talentos que não ocorreu",
  ]

  return (
    <section id="como-funciona" className="py-20 md:py-32 px-4 md:px-6 lg:px-8 bg-white">
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Image */}
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src="/father-embracing-child-at-home--warm-lifestyle-pho.jpg"
              alt="Cuidado preventivo que preserva pessoas e negócios"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-secondary/20 to-transparent" />
          </div>

          {/* Right - Content */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-balance text-secondary">
              O valor do que não se vê: quando prevenir é o maior resultado
            </h2>
            <div className="space-y-4 text-foreground/90 leading-relaxed">
              <p>
                A alma do Conecta Saúde não é apenas a gestão de riscos, mas também a preservação do futuro das pessoas.
                No nosso Programa, gestão de riscos não se resume a cumprir exigências legais. Ela começa antes, na
                prevenção silenciosa que evita afastamentos, conflitos, passivos e rupturas humanas.
              </p>
              <p>Quando o cuidado funciona, o maior valor está no que não acontece:</p>
            </div>

            <ul className="space-y-3">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="mt-1 rounded-full bg-primary/10 p-1 flex-shrink-0">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-foreground/90">{benefit}</span>
                </li>
              ))}
            </ul>

            <p className="text-foreground/90 leading-relaxed pt-4 font-medium">
              Chamamos isso de a invisibilidade do cuidado: uma estrutura sólida que sustenta pessoas e negócios sob
              alta pressão, sem interromper a performance.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

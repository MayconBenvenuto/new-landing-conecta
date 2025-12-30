import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"

export default function PrivacidadePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-32 pb-20 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-secondary">Política de Privacidade</h1>

          <div className="prose prose-lg max-w-none text-foreground/90">
            <p className="text-lg mb-6">
              O Conecta Saúde está comprometido com a proteção dos seus dados pessoais, em conformidade com a Lei Geral
              de Proteção de Dados (LGPD - Lei nº 13.709/2018).
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-secondary">1. Dados Coletados</h2>
            <p>Coletamos apenas os dados necessários para atendimento à sua solicitação:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Nome completo</li>
              <li>E-mail corporativo</li>
              <li>Telefone/WhatsApp</li>
              <li>Nome da empresa</li>
              <li>Cargo</li>
              <li>Número de colaboradores</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-secondary">2. Finalidade do Tratamento</h2>
            <p>Seus dados serão utilizados exclusivamente para:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Entrar em contato sobre sua solicitação de diagnóstico</li>
              <li>Enviar informações relevantes sobre nossos serviços</li>
              <li>Melhorar nossa comunicação e atendimento</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-secondary">3. Compartilhamento de Dados</h2>
            <p>
              Não compartilhamos, vendemos ou alugamos seus dados pessoais a terceiros. Seus dados são tratados apenas
              por nossa equipe interna e ferramentas essenciais de gestão.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-secondary">4. Seus Direitos</h2>
            <p>Conforme a LGPD, você tem direito a:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Acessar seus dados pessoais</li>
              <li>Corrigir dados incompletos ou desatualizados</li>
              <li>Solicitar a eliminação dos seus dados</li>
              <li>Revogar o consentimento a qualquer momento</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-secondary">5. Contato</h2>
            <p>
              Para exercer seus direitos ou esclarecer dúvidas sobre o tratamento dos seus dados, entre em contato
              conosco pelo e-mail:{" "}
              <a href="mailto:privacidade@conectasaude.com.br" className="text-primary hover:underline">
                privacidade@conectasaude.com.br
              </a>
            </p>

            <p className="mt-8 text-muted-foreground">Última atualização: Dezembro de 2024</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

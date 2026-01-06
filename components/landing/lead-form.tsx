"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { useAnalytics } from "@/hooks/use-analytics"
import {
  Calendar,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  FileText,
  BarChart3,
  ClipboardList,
  Rocket,
} from "lucide-react"
import { validateLeadForm, formatWhatsApp } from "@/lib/validations"
import { getAdaptiveCTA } from "@/lib/adaptive-cta"
import Image from "next/image"

const ROLE_OPTIONS = [
  { value: "", label: "Selecione seu cargo" },
  { value: "RH", label: "Recursos Humanos" },
  { value: "Jurídico", label: "Jurídico / Compliance" },
  { value: "SST", label: "Saúde e Segurança do Trabalho" },
  { value: "Diretoria", label: "Diretoria / C-Level" },
  { value: "Outro", label: "Outro" },
]

const EMPLOYEE_RANGES = [
  { value: "", label: "Selecione" },
  { value: "1-50", label: "1 a 50 colaboradores" },
  { value: "51-200", label: "51 a 200 colaboradores" },
  { value: "201-500", label: "201 a 500 colaboradores" },
  { value: "501-1000", label: "501 a 1.000 colaboradores" },
  { value: "1000+", label: "Mais de 1.000 colaboradores" },
]

const TIMELINE_STEPS = [
  {
    icon: FileText,
    title: "Diagnóstico",
    description: "Levantamento técnico inicial e análise do cenário atual",
  },
  {
    icon: BarChart3,
    title: "Evidências",
    description: "Cruzamento de dados e identificação de riscos psicossociais",
  },
  {
    icon: ClipboardList,
    title: "Plano",
    description: "Recomendações estratégicas personalizadas para sua empresa",
  },
  {
    icon: Rocket,
    title: "Execução",
    description: "Acompanhamento e implementação das ações preventivas",
  },
]

export function LeadForm() {
  const { toast } = useToast()
  const { trackFormSubmit } = useAnalytics()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [retryCount, setRetryCount] = useState(0)
  const [lastError, setLastError] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    role: "",
    email: "",
    phone: "",
    employees: "",
    message: "",
    lgpd: false,
    website: "",
  })

  const adaptiveCTA = getAdaptiveCTA({ role: formData.role, employees: formData.employees })

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatWhatsApp(e.target.value)
    setFormData({ ...formData, phone: formatted })
    if (errors.phone) {
      setErrors({ ...errors, phone: "" })
    }
  }

  const handleFieldChange = (field: string, value: string | boolean) => {
    setFormData({ ...formData, [field]: value })
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" })
    }
  }

  useEffect(() => {
    const step1Fields = formData.name && formData.company && formData.role
    const step2Fields = formData.email && formData.phone && formData.employees
    if (step2Fields) {
      setCurrentStep(2)
    } else if (step1Fields) {
      setCurrentStep(2)
    } else {
      setCurrentStep(1)
    }
  }, [formData])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.website) {
      // Simulate success to not alert bots
      setIsSuccess(true)
      return
    }

    const validation = validateLeadForm(formData)
    if (!validation.valid) {
      setErrors(validation.errors)
      toast({
        title: "Campos inválidos",
        description: "Por favor, corrija os campos destacados.",
        variant: "destructive",
      })
      trackFormSubmit("lead-form", false)
      return
    }

    setIsSubmitting(true)
    setErrors({})
    setLastError(null)

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          website: undefined, // Don't send honeypot
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setIsSuccess(true)
        setRetryCount(0)
        trackFormSubmit("lead-form", true)
      } else {
        throw new Error(data.error || "Erro ao enviar formulário")
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Erro desconhecido"
      setLastError(errorMessage)
      setRetryCount((prev) => prev + 1)
      trackFormSubmit("lead-form", false)

      // Log separately for observability
      console.error("[Lead Form] Submission failed:", {
        error: errorMessage,
        retryCount: retryCount + 1,
        email: formData.email,
        timestamp: new Date().toISOString(),
      })

      toast({
        title: "Erro ao enviar",
        description:
          retryCount >= 2
            ? "Persistem problemas técnicos. Por favor, entre em contato pelo WhatsApp."
            : "Não foi possível enviar. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <section id="diagnostico" className="py-20 md:py-32 px-4 md:px-6 lg:px-8 bg-background">
        <div className="container mx-auto max-w-7xl">
          <div className="max-w-3xl mx-auto">
            {/* Success header */}
            <div className="text-center mb-12">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Solicitação Registrada</h2>
              <p className="text-lg text-foreground/80">
                Sua solicitação foi registrada com sucesso.
                <br />
                Um consultor técnico entrará em contato para conduzir o diagnóstico.
              </p>
            </div>

            <div className="bg-background rounded-2xl p-8 border border-border/50">
              <h3 className="text-xl font-bold text-secondary mb-6 text-center">Próximos passos do diagnóstico</h3>
              <div className="grid md:grid-cols-4 gap-6">
                {TIMELINE_STEPS.map((step, index) => (
                  <div key={index} className="relative">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                        <step.icon className="w-6 h-6 text-primary" />
                      </div>
                      <span className="text-xs font-semibold text-primary mb-2">Etapa {index + 1}</span>
                      <h4 className="font-bold text-secondary mb-2">{step.title}</h4>
                      <p className="text-sm text-foreground/70">{step.description}</p>
                    </div>
                    {/* Connector line */}
                    {index < TIMELINE_STEPS.length - 1 && (
                      <div className="hidden md:block absolute top-7 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-0.5 bg-border" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <p className="text-center text-muted-foreground mt-8">
              Enquanto isso, continue explorando como podemos ajudar sua empresa.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="diagnostico" className="py-20 md:py-32 px-4 md:px-6 lg:px-8 bg-background">
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Content & Image */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-balance text-secondary">
                Planejar o cuidado hoje é proteger o negócio amanhã.
              </h2>
              <p className="text-lg text-foreground/90 leading-relaxed">
                Antecipe riscos, reduza passivos e construa uma operação sustentável para o próximo ciclo.
              </p>
            </div>

            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/corporate-planning-calendar-2026-business-strategy.jpg"
                alt="Planejamento estratégico 2026"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent" />
              <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg px-4 py-2 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                <span className="font-semibold text-secondary">1º Semestre 2026</span>
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div className="bg-background border border-border/50 rounded-3xl p-8 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-secondary">Falar com um Consultor</h3>
              <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
                Etapa {currentStep} de 2
              </span>
            </div>

            {lastError && retryCount > 0 && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm text-red-800 font-medium">
                      {retryCount >= 3 ? "Problemas técnicos persistentes" : "Não foi possível enviar"}
                    </p>
                    <p className="text-sm text-red-600 mt-1">
                      {retryCount >= 3
                        ? "Entre em contato pelo WhatsApp: (81) 99608-5185"
                        : "Verifique sua conexão e tente novamente."}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={(e) => handleFieldChange("website", e.target.value)}
                className="absolute opacity-0 pointer-events-none h-0 w-0"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              <div className="space-y-2">
                <Label htmlFor="name">Nome completo *</Label>
                <Input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => handleFieldChange("name", e.target.value)}
                  placeholder="Seu nome completo"
                  className={errors.name ? "border-red-500 focus-visible:ring-red-500" : ""}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && (
                  <p id="name-error" className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.name}
                  </p>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company">Empresa *</Label>
                  <Input
                    id="company"
                    required
                    value={formData.company}
                    onChange={(e) => handleFieldChange("company", e.target.value)}
                    placeholder="Nome da empresa"
                    className={errors.company ? "border-red-500 focus-visible:ring-red-500" : ""}
                  />
                  {errors.company && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.company}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Cargo *</Label>
                  <select
                    id="role"
                    required
                    value={formData.role}
                    onChange={(e) => handleFieldChange("role", e.target.value)}
                    className={`w-full h-10 rounded-md border bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                      errors.role ? "border-red-500 focus-visible:ring-red-500" : "border-input"
                    }`}
                  >
                    {ROLE_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors.role && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.role}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail corporativo *</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleFieldChange("email", e.target.value)}
                    placeholder="seu@empresa.com.br"
                    className={errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.email}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">WhatsApp *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    placeholder="(00) 00000-0000"
                    className={errors.phone ? "border-red-500 focus-visible:ring-red-500" : ""}
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="employees">Número de colaboradores *</Label>
                <select
                  id="employees"
                  required
                  value={formData.employees}
                  onChange={(e) => handleFieldChange("employees", e.target.value)}
                  className={`w-full h-10 rounded-md border bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                    errors.employees ? "border-red-500 focus-visible:ring-red-500" : "border-input"
                  }`}
                >
                  {EMPLOYEE_RANGES.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.employees && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.employees}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Mensagem (opcional)</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleFieldChange("message", e.target.value)}
                  placeholder="Conte-nos sobre suas necessidades ou dúvidas específicas..."
                  rows={4}
                />
              </div>

              <div className="flex items-start gap-3">
                <Checkbox
                  id="lgpd"
                  checked={formData.lgpd}
                  onCheckedChange={(checked) => handleFieldChange("lgpd", checked as boolean)}
                  className={errors.lgpd ? "border-red-500" : ""}
                />
                <label htmlFor="lgpd" className="text-sm text-foreground/80 leading-relaxed cursor-pointer">
                  Autorizo o Conecta Saúde a utilizar meus dados para contato comercial, conforme a{" "}
                  <a href="/privacidade" className="text-primary underline hover:no-underline">
                    Política de Privacidade
                  </a>{" "}
                  e em conformidade com a LGPD. *
                </label>
              </div>
              {errors.lgpd && (
                <p className="text-sm text-red-500 flex items-center gap-1 -mt-2">
                  <AlertCircle className="w-3 h-3" /> {errors.lgpd}
                </p>
              )}

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-base h-12 flex items-center justify-center gap-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  adaptiveCTA.text
                )}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                Seus dados estão seguros. Não compartilhamos informações com terceiros.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

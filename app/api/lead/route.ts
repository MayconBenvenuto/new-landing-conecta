import { type NextRequest, NextResponse } from "next/server"
import { calculateLeadScore } from "@/lib/lead-scoring"
import { validateLeadForm } from "@/lib/validations"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    if (body.website) {
      // Log for monitoring but return success to not alert bots
      console.log("[Lead] Honeypot triggered - bot detected:", {
        ip: request.headers.get("x-forwarded-for"),
        timestamp: new Date().toISOString(),
      })
      return NextResponse.json(
        { success: true, message: "Lead registrado com sucesso", leadId: `fake_${Date.now()}` },
        { status: 200 },
      )
    }

    const validation = validateLeadForm({
      name: body.name,
      company: body.company,
      role: body.role,
      email: body.email,
      phone: body.phone,
      employees: body.employees,
      lgpd: body.lgpd,
    })

    if (!validation.valid) {
      return NextResponse.json({ error: "Validação falhou", details: validation.errors }, { status: 400 })
    }

    const leadScore = calculateLeadScore(body.role, body.employees)

    // Prepare payload for CRM (Kommo / RD Station / HubSpot)
    const crmPayload = {
      // Lead data
      name: body.name,
      company: body.company,
      role: body.role,
      email: body.email,
      phone: body.phone,
      employees: body.employees,
      message: body.message || "",
      // Lead scoring
      leadScore: leadScore.leadScore,
      perfil: leadScore.perfil,
      flags: leadScore.flags,
      // Metadata
      source: "landing-page",
      landingVersion: body.landingVersion || "default",
      timestamp: new Date().toISOString(),
      lgpdConsent: true,
      lgpdConsentDate: new Date().toISOString(),
    }

    // Log for observability
    console.log("[Lead] New submission:", {
      email: body.email,
      company: body.company,
      leadScore: leadScore.leadScore,
      perfil: leadScore.perfil,
    })

    // TODO: Integration hooks for CRM
    // await sendToKommo(crmPayload)
    // await sendToRDStation(crmPayload)
    // await sendToHubSpot(crmPayload)

    return NextResponse.json(
      {
        success: true,
        message: "Lead registrado com sucesso",
        leadId: `lead_${Date.now()}`,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("[Lead] Error processing:", {
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString(),
    })
    return NextResponse.json({ error: "Erro ao processar solicitação" }, { status: 500 })
  }
}

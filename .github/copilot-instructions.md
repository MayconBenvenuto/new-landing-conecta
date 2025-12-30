# AI Coding Instructions - Conecta Saúde Landing Page

## Project Overview
Next.js 16 landing page with integrated CRM (Kommo), lead scoring, and form validation. Focus: B2B lead generation for occupational health risk management (NR-1 compliance). Uses App Router, TypeScript, Tailwind CSS, Radix UI (via Shadcn/ui), and Framer Motion for animations.

## Architecture & Data Flow

### Lead Capture Pipeline
1. **Form → Validation** (`lib/validations.ts`): Honeypot trap (`website` field), WhatsApp format, LGPD consent
2. **Scoring** (`lib/lead-scoring.ts`): Strategic roles (Diretoria/RH/Jurídico) + company size → HIGH/MEDIUM/LOW
3. **CRM Integration** (`lib/kommo.ts`): Two-step process:
   - Create contact with email/phone (multitext fields with enum codes: WORK, MOB)
   - Create lead linked to contact with custom fields and calculated price
4. **API Route** (`app/api/lead/route.ts`): POST `/api/lead` orchestrates full pipeline, returns `leadId` or error

**Critical Rules**:
- Email validation accepts ALL emails (gmail, hotmail, etc.) - restriction removed Dec 2024
- Phone auto-formatted with +55 prefix for Kommo (Brazilian format)
- Kommo failures don't block user (graceful degradation with fake `leadId`)

### Component Structure
**Landing sections** (`components/landing/`): 11 modular sections imported in order by `app/page.tsx`:
- HeroHub → PainSection → Hub360 → HowItWorks → EvidenceROI → NR1Section → AboutSection → FAQ → LeadForm → Footer
- Plus: Navbar (with scroll spy), AuthorityBadges, ContextualCTA

**UI Components** (`components/ui/`): Shadcn/ui components (Radix UI base) - accordion, button, card, checkbox, input, label, textarea, toast
- All use `class-variance-authority` for variant management
- Dark mode ready via `next-themes` (ThemeProvider in `app/layout.tsx`)

**Animations** (`hooks/use-animations.ts`): 
- `useScrollReveal(threshold, triggerOnce)` - Intersection Observer for reveal-on-scroll
- `usePrefersReducedMotion()` - Accessibility check for motion preferences
- `useParallax(speed)` - Scroll-based parallax offset calculation
- `useCounter(end, duration, start)` - Animated number counter with easing
- Framer Motion integrated in 5 components (HeroHub, Hub360, HowItWorks, EvidenceROI, FAQ)
- Pattern: `initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}`

## Development Workflows

### Commands
```bash
pnpm dev                  # Start dev server (port 3000)
pnpm build                # Production build
pnpm lint                 # ESLint check
pnpm kommo:discover       # List Kommo custom field IDs (requires .env.local)
pnpm kommo:pipelines      # List Kommo pipelines/stages
npx tsx scripts/create-kommo-fields.ts       # Create missing Kommo fields
npx tsx scripts/test-kommo-lead.ts           # Test lead submission to Kommo
npx tsx scripts/configure-landing-pipeline.ts # Configure Kommo pipeline stages
```

### Scripts Directory (`scripts/`)
Utility scripts for Kommo CRM setup and testing:
- `discover-kommo-fields.ts` - Fetch all custom field IDs from Kommo API
- `discover-kommo-pipelines.ts` - List all pipelines and stages
- `create-kommo-fields.ts` - Auto-create required custom fields in Kommo
- `test-kommo-lead.ts` - End-to-end test of lead creation flow
- `configure-landing-pipeline.ts` - Setup landing page pipeline stages
- `add-pipeline-stages.ts`, `rename-pipeline-stages.ts`, `update-pipeline-colors.ts` - Pipeline management

### Environment Setup
**Required** `.env.local` for Kommo integration:
```env
KOMMO_BASE_URL=https://kommobelz.kommo.com/
KOMMO_ACCESS_TOKEN=your_jwt_token
KOMMO_CLIENT_ID=uuid
KOMMO_CLIENT_SECRET=secret
```

**Field IDs** (configured in `lib/kommo.ts` lines 76-96):
- Empresa: 3859842
- Cargo: 3859846
- Nº Colaboradores: 3859848
- Lead Score: 3859850
- Origem: 3859844
- Email (contact): 3702724
- Telefone (contact): 3702722

## Project-Specific Conventions

### Validation Rules
- **No corporate email restriction**: Accept gmail.com, hotmail.com, etc. (changed Dec 2024)
- **Honeypot**: `website` field must be empty; bots filling it get fake success response
- **WhatsApp**: 10-11 digits required, auto-formatted to `(XX) XXXXX-XXXX`
- **LGPD**: Explicit consent checkbox required

### Lead Scoring Logic
```typescript
// HIGH (score >= 3): Strategic role + large company (501+)
// MEDIUM (score >= 2): Strategic role OR medium/large company
// LOW: All others
// Strategic roles: Diretoria, RH, Jurídico
```

### Animation Patterns
- **Scroll reveal**: Use `useScrollReveal(0.1, true)` for one-time entrance animations
- **Framer Motion**: `initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}`
- **Accessibility**: All animations respect `prefers-reduced-motion`; fallback to `app/globals.css` classes

### Styling
- **Tailwind**: Utility-first with custom animations in `globals.css`
- **Colors**: Blue primary (`#0066FF`), green accent (`#00CC88`)
- **Typography**: Source Serif 4 (headings), Source Sans 3 (body)
- **Dark mode**: Implemented via `next-themes`, use `className="dark:..."` pattern

## Integration Points

### Kommo CRM API
- **Authentication**: Bearer token (JWT) in headers
- **Custom fields**: Must match exact field_id integers; wrong IDs cause 400 errors
- **Lead value**: Calculated as HIGH=$50k, MEDIUM=$25k, LOW=$10k
- **Contacts**: Created separately with multitext fields (email/phone) using specific enum format
- **Phone format**: Auto-prepends +55 for Brazilian numbers (removes all non-digits first)
- **Two-step process**: 1) Create contact with email/phone, 2) Create lead with contact_id and custom fields

### Error Handling
- **Kommo failures**: Log but don't block user (return fake `leadId` so UX isn't broken)
- **Validation errors**: Return 400 with `{ error: string, details: Record<string, string> }`
- **Bot detection**: Return 200 with fake success to avoid alerting spam bots
- **Philosophy**: Lead capture is critical - graceful degradation preferred over hard failures

## Key Files for Reference

- **Form validation patterns**: `lib/validations.ts` (honeypot, WhatsApp, LGPD)
- **Lead scoring algorithm**: `lib/lead-scoring.ts` (role + company size matrix)
- **CRM integration**: `lib/kommo.ts` (KommoClient class with createLead method)
- **API endpoint**: `app/api/lead/route.ts` (full pipeline orchestration)
- **Animation hooks**: `hooks/use-animations.ts` (scroll reveal, parallax, counter)
- **Complete docs**: `DOCUMENTATION.md`, `COMPONENTS_GUIDE.md`, `KOMMO_INTEGRATION.md`, `QUICK_START_KOMMO.md`

## Testing Checklist

When modifying lead capture:
1. Test honeypot (fill `website` field → should get 200 success)
2. Test validation (invalid email/phone → should get 400 error)
3. Test Kommo integration (check terminal logs for `[Kommo] Lead criado com sucesso`)
4. Verify in Kommo dashboard (https://kommobelz.kommo.com/) that lead appears with all fields
5. Test with personal emails (gmail, hotmail) → should work

When adding animations:
1. Import `useScrollReveal` or Framer Motion components
2. Wrap animated elements with proper initial/animate states
3. Test with browser DevTools → Rendering → Emulate "prefers-reduced-motion: reduce"

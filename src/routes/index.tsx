import { Link, createFileRoute } from '@tanstack/react-router'
import type { ReactNode } from 'react'
import {
  BadgeCheck,
  Bot,
  BriefcaseBusiness,
  ChevronRight,
  CircleDollarSign,
  MessageSquareText,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  UserRoundCheck,
} from 'lucide-react'

export const Route = createFileRoute('/')({
  component: Home,
})

const services = [
  {
    title: 'Video editing',
    meta: '24h average delivery',
    price: '$35+',
    accent: 'bg-coral',
  },
  {
    title: 'Thumbnail design',
    meta: 'Verified portfolios',
    price: '$18+',
    accent: 'bg-mint',
  },
  {
    title: 'Caption writing',
    meta: 'AI draft assist',
    price: '$12+',
    accent: 'bg-gold',
  },
]

const aiFeatures = [
  ['Smart matching', 'Embedding-powered job and gig recommendations.'],
  ['Content moderation', 'Flag-and-hold review flow for risky listings and messages.'],
  ['Writing assistant', 'Polishes rough listings and job briefs into editable drafts.'],
  ['Dispute summaries', 'Neutral evidence summaries for faster admin decisions.'],
]

const timeline = [
  ['Weeks 1-2', 'Discovery, UX, architecture, AI provider setup'],
  ['Weeks 2-4', 'Auth, profiles, marketplace core'],
  ['Weeks 5-7', 'Payments, escrow, messaging, matching'],
  ['Weeks 7-9', 'Trust, reviews, admin, moderation'],
  ['Weeks 9-10', 'Subscriptions, ads, assistant, chatbot'],
  ['Weeks 11-12', 'QA, hardening, launch readiness'],
]

function Home() {
  return (
    <main className="min-h-screen bg-ivory text-ink">
      <section className="border-b border-ink/10 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link className="flex items-center gap-2 font-semibold" to="/">
            <span className="grid size-9 place-items-center rounded-md bg-ink text-white">
              <Sparkles size={18} aria-hidden="true" />
            </span>
            SkillNest
          </Link>
          <nav className="hidden items-center gap-6 text-sm text-ink/70 md:flex">
            <a className="hover:text-ink" href="#marketplace">
              Marketplace
            </a>
            <a className="hover:text-ink" href="#ai">
              AI tools
            </a>
            <a className="hover:text-ink" href="#timeline">
              Timeline
            </a>
          </nav>
          <button className="inline-flex items-center gap-2 rounded-md bg-ink px-4 py-2 text-sm font-medium text-white transition hover:bg-ink/90">
            Launch sprint
            <ChevronRight size={16} aria-hidden="true" />
          </button>
        </div>
      </section>

      <section className="bg-[linear-gradient(115deg,#f8f4ec_0%,#ffffff_46%,#e7f6ee_100%)]">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.05fr_0.95fr] md:py-16 lg:px-8">
          <div className="flex flex-col justify-center">
            <p className="mb-4 inline-flex w-fit items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-medium text-ink shadow-sm ring-1 ring-ink/10">
              <ShieldCheck size={16} aria-hidden="true" />
              Escrow-backed creative services
            </p>
            <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-normal text-ink sm:text-5xl">
              SkillNest
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-ink/72">
              A trust-first micro skill marketplace where clients hire verified
              freelancers for fast content work, backed by escrow, messaging,
              moderation, and AI-assisted matching.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button className="inline-flex items-center justify-center gap-2 rounded-md bg-coral px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-coral-dark">
                <Search size={18} aria-hidden="true" />
                Browse services
              </button>
              <button className="inline-flex items-center justify-center gap-2 rounded-md border border-ink/15 bg-white px-5 py-3 text-sm font-semibold text-ink transition hover:border-ink/30">
                <BriefcaseBusiness size={18} aria-hidden="true" />
                Post a job
              </button>
            </div>
          </div>

          <div className="rounded-lg border border-ink/10 bg-white p-4 shadow-xl shadow-ink/5">
            <div className="flex items-center justify-between border-b border-ink/10 pb-4">
              <div>
                <p className="text-sm font-medium text-ink/60">Live matches</p>
                <h2 className="text-xl font-semibold">Recommended freelancers</h2>
              </div>
              <span className="rounded-md bg-mint px-3 py-1 text-sm font-semibold text-ink">
                94% fit
              </span>
            </div>
            <div className="space-y-3 py-4">
              {['Ada M.', 'Miles C.', 'Nora V.'].map((name, index) => (
                <article
                  className="flex items-center gap-4 rounded-md border border-ink/10 p-3"
                  key={name}
                >
                  <div className="grid size-12 place-items-center rounded-md bg-ivory font-semibold">
                    {name
                      .split(' ')
                      .map((part) => part[0])
                      .join('')}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{name}</h3>
                      <BadgeCheck className="text-mint-dark" size={16} aria-hidden="true" />
                    </div>
                    <p className="truncate text-sm text-ink/65">
                      {index === 0
                        ? 'Short-form video editor'
                        : index === 1
                          ? 'YouTube thumbnail designer'
                          : 'Caption and content repurposing specialist'}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-sm font-semibold">
                    <Star className="fill-gold text-gold" size={16} aria-hidden="true" />
                    4.{9 - index}
                  </div>
                </article>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-3 border-t border-ink/10 pt-4 text-center">
              <Metric icon={<UserRoundCheck size={18} />} value="1.8k" label="verified" />
              <Metric icon={<CircleDollarSign size={18} />} value="$42k" label="escrowed" />
              <Metric icon={<MessageSquareText size={18} />} value="8m" label="avg reply" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8" id="marketplace">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-normal text-coral">
              Marketplace
            </p>
            <h2 className="mt-2 text-2xl font-semibold">Fast services, clear trust signals</h2>
          </div>
          <button className="hidden rounded-md border border-ink/15 bg-white px-4 py-2 text-sm font-semibold text-ink sm:inline-flex">
            View all
          </button>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {services.map((service) => (
            <article className="rounded-lg border border-ink/10 bg-white p-5" key={service.title}>
              <div className={`mb-5 h-2 w-16 rounded-full ${service.accent}`} />
              <h3 className="text-lg font-semibold">{service.title}</h3>
              <p className="mt-2 text-sm text-ink/65">{service.meta}</p>
              <div className="mt-6 flex items-center justify-between">
                <span className="text-2xl font-semibold">{service.price}</span>
                <button aria-label={`Open ${service.title}`} className="grid size-10 place-items-center rounded-md bg-ivory text-ink transition hover:bg-ink hover:text-white">
                  <ChevronRight size={18} aria-hidden="true" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-ink/10 bg-white" id="ai">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-normal text-mint-dark">
              AI layer
            </p>
            <h2 className="mt-2 text-2xl font-semibold">Useful automation with human review</h2>
            <p className="mt-4 leading-7 text-ink/68">
              The roadmap favors third-party AI APIs, vector search, and
              admin-facing review queues so the launch can stay inside a
              12-week delivery window.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {aiFeatures.map(([title, description]) => (
              <article className="rounded-lg border border-ink/10 bg-ivory p-5" key={title}>
                <Bot className="text-coral" size={22} aria-hidden="true" />
                <h3 className="mt-4 font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-ink/65">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8" id="timeline">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-normal text-coral">
            Delivery plan
          </p>
          <h2 className="mt-2 text-2xl font-semibold">Three-month build timeline</h2>
        </div>
        <div className="overflow-hidden rounded-lg border border-ink/10 bg-white">
          {timeline.map(([weeks, focus]) => (
            <div
              className="grid gap-3 border-b border-ink/10 p-4 last:border-b-0 sm:grid-cols-[9rem_1fr]"
              key={weeks}
            >
              <span className="font-semibold text-ink">{weeks}</span>
              <span className="text-ink/70">{focus}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

function Metric({
  icon,
  value,
  label,
}: {
  icon: ReactNode
  value: string
  label: string
}) {
  return (
    <div className="flex min-w-0 flex-col items-center gap-1">
      <span className="text-coral">{icon}</span>
      <span className="text-sm font-semibold">{value}</span>
      <span className="text-xs text-ink/60">{label}</span>
    </div>
  )
}

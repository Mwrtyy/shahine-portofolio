import { useEffect, useRef, useState } from 'react'

const HERO_VIDEO = 'https://cdn.sceneai.art/Hero%20Section%20Video/50b4f304-cdca-4e12-8735-580d225834be.mp4'
const CHAT_VIDEO = 'https://cdn.sceneai.art/Hero%20Section%20Video/1bcc8fa3-37f6-4c53-8591-0347e4c7f8ac.mp4'
const TRANSCRIPTION_VIDEO = 'https://cdn.sceneai.art/Hero%20Section%20Video/736fd4a0-70ac-4f44-9633-55769ead6aca.mp4'

const navLinks = [
  { label: 'About', id: 'about' },
  { label: 'Features', id: 'features' },
  { label: 'FAQ', id: 'faq' },
  { label: 'Contact', id: 'contact' },
]

const faqs = [
  {
    question: 'Is my data safe with Plety?',
    answer: 'Yes. Plety is designed with security-first infrastructure, encrypted data handling, and clear controls so your information stays protected throughout every workflow.',
  },
  {
    question: 'Can Plety integrate with my existing stack?',
    answer: 'Plety is built to sit cleanly inside modern workflows. Use the platform alongside your existing tools and connect the systems your team already depends on.',
  },
  {
    question: 'How quickly can I get started?',
    answer: 'You can start immediately with a focused setup. The interface is designed to stay simple while still supporting more advanced workflows as your needs grow.',
  },
  {
    question: 'Does Plety support teams?',
    answer: 'Yes. Plety is designed for individual operators and collaborative teams, with a consistent workspace for AI conversations, transcription, and shared decision-making.',
  },
  {
    question: 'What makes Plety different from a standard chatbot?',
    answer: 'Plety is designed as an intelligence layer rather than a single chat window, combining conversational AI, transcription, and contextual understanding in one coherent experience.',
  },
]

function FadeInUp({ children, className = '', delay = 0 }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(node)
        }
      },
      { threshold: 0.14, rootMargin: '0px 0px -48px 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`${className} transition-all duration-1000 ease-out ${visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
    >
      {children}
    </div>
  )
}

function PletyLogo({ className = 'h-8 w-8' }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path d="M8.5 10.5 20 4l11.5 6.5v13L20 30 8.5 23.5v-13Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="m8.5 10.5 11.5 6.7 11.5-6.7M20 17.2V30" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="m14.1 7.35 11.65 6.72v6.5L20 23.9l-5.9-3.36V7.35Z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" opacity=".55" />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
      <path d="M5 10h10M11 6l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function MicIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
      <rect x="7" y="3" width="6" height="9" rx="3" stroke="currentColor" strokeWidth="1.4" />
      <path d="M4.8 9.5a5.2 5.2 0 0 0 10.4 0M10 14.7V18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

function WaveIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
      <path d="M3 11V9m3 5V6m4 10V4m4 10V6m3 5V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function PrimaryButton({ children = 'Get started', href = '#contact' }) {
  return (
    <a href={href} className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition duration-300 hover:bg-gray-200">
      {children}
      <ArrowIcon />
    </a>
  )
}

function SecondaryButton({ children = 'Learn more', href = '#features' }) {
  return (
    <a href={href} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/5 bg-[#1F1F22] px-5 py-2.5 text-sm font-medium text-white transition duration-300 hover:bg-[#2A2A2D]">
      {children}
    </a>
  )
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const goTo = (id) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled || open ? 'bg-black/80 backdrop-blur-md' : 'bg-transparent'}`}>
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <button onClick={() => goTo('about')} className="flex items-center gap-2.5 text-white" aria-label="Plety home">
          <PletyLogo className="h-8 w-8" />
          <span className="text-lg font-semibold tracking-tight">Plety</span>
        </button>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex" aria-label="Primary navigation">
          {navLinks.map((link) => (
            <button key={link.id} onClick={() => goTo(link.id)} className="text-sm font-medium text-gray-300 transition-colors hover:text-white">
              {link.label}
            </button>
          ))}
        </nav>

        <div className="hidden md:block">
          <a href="#contact" className="rounded-full border border-white/5 bg-[#1F1F22] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#2A2A2D]">
            Get started
          </a>
        </div>

        <button
          onClick={() => setOpen((value) => !value)}
          className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span className={`absolute h-px w-4 bg-white transition-transform duration-300 ${open ? 'translate-y-0 rotate-45' : '-translate-y-1.5'}`} />
          <span className={`absolute h-px w-4 bg-white transition-opacity duration-300 ${open ? 'opacity-0' : 'opacity-100'}`} />
          <span className={`absolute h-px w-4 bg-white transition-transform duration-300 ${open ? 'translate-y-0 -rotate-45' : 'translate-y-1.5'}`} />
        </button>
      </div>

      <div className={`overflow-hidden border-t border-white/5 transition-all duration-500 md:hidden ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <nav className="mx-auto flex max-w-7xl flex-col px-6 py-4">
          {navLinks.map((link) => (
            <button key={link.id} onClick={() => goTo(link.id)} className="border-b border-white/5 py-4 text-left text-sm font-medium text-gray-300 transition-colors last:border-0 hover:text-white">
              {link.label}
            </button>
          ))}
          <a href="#contact" onClick={() => setOpen(false)} className="mt-4 rounded-full bg-white px-5 py-3 text-center text-sm font-medium text-black">
            Get started
          </a>
        </nav>
      </div>
    </header>
  )
}

function BrandGlyph({ type }) {
  const paths = {
    Springfield: <><circle cx="18" cy="18" r="9" /><path d="m11 18 4 4 10-10" /></>,
    Orbitc: <><circle cx="18" cy="18" r="7" /><ellipse cx="18" cy="18" rx="14" ry="6" transform="rotate(-24 18 18)" /></>,
    Cloud: <path d="M8 22c-3 0-5-2-5-4.8 0-2.6 2-4.6 4.5-4.8C8.4 8.7 11.3 6 15 6c4.5 0 8 3.6 8 8v.3c3.4.2 6 2.7 6 5.8 0 3.3-2.8 5.9-6.4 5.9H8Z" />,
    Amster: <><path d="M6 27 18 6l12 21" /><path d="M11 20h14" /></>,
    Nexus: <><path d="m7 7 22 22M29 7 7 29" /><circle cx="18" cy="18" r="13" /></>,
  }

  return (
    <svg viewBox="0 0 36 36" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[type]}
    </svg>
  )
}

const brands = ['Springfield', 'Orbitc', 'Cloud', 'Amster', 'Nexus']

function BrandMarquee() {
  const loop = Array.from({ length: 4 }, () => brands).flat()

  return (
    <div className="mt-24 w-full">
      <p className="mb-8 text-center text-sm font-medium text-gray-500">Trusted by industry leaders</p>
      <div
        className="mx-auto max-w-6xl overflow-hidden"
        style={{ maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)' }}
      >
        <div className="flex w-max animate-[marquee_30s_linear_infinite] items-center">
          {loop.map((brand, index) => (
            <div key={`${brand}-${index}`} className="flex flex-shrink-0 items-center gap-3 px-8 text-gray-500">
              <BrandGlyph type={brand} />
              <span className="text-base font-medium tracking-tight">{brand}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Hero() {
  return (
    <section id="about" className="relative z-0 flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pb-20 pt-32">
      <video autoPlay muted loop playsInline preload="metadata" className="absolute inset-0 -z-10 h-full min-h-full w-full min-w-full object-cover opacity-90" aria-hidden="true">
        <source src={HERO_VIDEO} type="video/mp4" />
      </video>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/30 via-transparent to-black" />
      <div className="absolute inset-0 -z-10 bg-black/20" />

      <FadeInUp className="flex flex-col items-center">
        <div className="mb-8 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-gray-300 backdrop-blur-sm">
          ✨ Announcing API 2.0
        </div>
        <h1 className="mb-6 text-center text-5xl font-medium tracking-tight text-white md:text-7xl">
          The intelligence layer<br />for clear <span className="font-serif font-normal italic">decisions.</span>
        </h1>
        <p className="max-w-2xl text-center text-[16px] leading-7 text-gray-400">
          Our platform integrates seamlessly into your stack to deliver real-time understanding, not just predictions.
        </p>
        <div className="mt-8 flex flex-row items-center gap-3">
          <PrimaryButton />
          <SecondaryButton />
        </div>
      </FadeInUp>

      <BrandMarquee />
    </section>
  )
}

function FeatureCopy({ badge, badgeColor, title, body, align = 'left' }) {
  return (
    <FadeInUp className={`flex flex-col justify-center ${align === 'right' ? 'lg:pl-6' : 'lg:pr-6'}`}>
      <p className={`mb-5 text-sm font-medium ${badgeColor}`}>{badge}</p>
      <h2 className="max-w-xl text-4xl font-semibold tracking-tight text-white md:text-5xl">{title}</h2>
      <p className="mt-6 max-w-xl text-[16px] leading-7 text-gray-400">{body}</p>
      <div className="mt-8">
        <PrimaryButton />
      </div>
    </FadeInUp>
  )
}

function ChatMockup() {
  const chips = ['Create image', 'Summarize', 'Write copy']

  return (
    <FadeInUp delay={120} className="relative min-h-[520px] overflow-hidden rounded-3xl border border-white/10 p-8">
      <video autoPlay muted loop playsInline preload="metadata" className="absolute inset-0 h-full w-full object-cover" aria-hidden="true">
        <source src={CHAT_VIDEO} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/55 to-transparent" />

      <div className="relative z-10 flex h-full min-h-[456px] items-end justify-center">
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#1C1C1E]/90 p-4 shadow-2xl shadow-black/30 backdrop-blur-xl">
          <div className="mb-4 flex flex-wrap gap-2">
            {chips.map((chip) => (
              <button key={chip} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-gray-300 transition hover:bg-white/10 hover:text-white">
                {chip}
              </button>
            ))}
          </div>
          <div className="mb-5 min-h-28 rounded-xl border border-white/5 bg-black/20 p-4">
            <p className="text-xs text-gray-500">Plety</p>
            <p className="mt-3 text-sm leading-6 text-gray-200">I can turn that idea into a clear plan, compare the options, and surface the trade-offs that matter most.</p>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/30 px-4 py-3">
            <span className="flex-1 text-sm text-gray-500">Ask anything...</span>
            <button className="text-gray-400 transition hover:text-white" aria-label="Voice input"><MicIcon /></button>
            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black transition hover:bg-gray-200" aria-label="Send voice"><WaveIcon /></button>
          </div>
        </div>
      </div>
    </FadeInUp>
  )
}

function ChatFeature() {
  return (
    <section id="features" className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 py-24 lg:grid-cols-2">
      <FeatureCopy
        badge="✨ AI chat"
        badgeColor="text-yellow-300"
        title="Where speed meets intelligent conversation."
        body="A conversational AI assistant that understands your questions, provides intelligent answers, and helps you get things done fast from casual chats to complex tasks."
      />
      <ChatMockup />
    </section>
  )
}

function Waveform() {
  const heights = [10, 20, 14, 28, 18, 34, 22, 42, 26, 38, 18, 30, 16, 36, 24, 44, 28, 34, 14, 26, 18, 32, 12, 22, 16, 28, 11]
  return (
    <div className="flex h-12 items-center gap-1">
      {heights.map((height, index) => (
        <span key={index} className="w-1 rounded-full bg-white/70" style={{ height }} />
      ))}
    </div>
  )
}

function TranscriptionMockup() {
  return (
    <FadeInUp className="relative min-h-[520px] overflow-hidden rounded-3xl border border-white/10 p-8">
      <video autoPlay muted loop playsInline preload="metadata" className="absolute inset-0 h-full w-full object-cover" aria-hidden="true">
        <source src={TRANSCRIPTION_VIDEO} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/50" />

      <div className="relative z-10 flex h-full min-h-[456px] items-center justify-center">
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#1C1C1E]/90 p-5 shadow-2xl shadow-black/30 backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <button className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-white text-black" aria-label="Play recording">
              <svg viewBox="0 0 20 20" className="ml-0.5 h-4 w-4" fill="currentColor" aria-hidden="true"><path d="m7 5 8 5-8 5V5Z" /></svg>
            </button>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-white">11:06 AM – Chris</p>
              <p className="mt-1 text-xs text-gray-500">Meeting recording · 04:18</p>
            </div>
          </div>

          <div className="my-6 overflow-hidden rounded-xl border border-white/5 bg-black/25 px-4 py-2">
            <Waveform />
          </div>

          <div className="space-y-4 border-t border-white/10 pt-5">
            <div>
              <p className="text-xs font-medium text-gray-500">Chris · 11:06 AM</p>
              <p className="mt-2 text-sm leading-6 text-gray-200">The main thing we need is a faster way to turn these conversations into decisions the whole team can act on.</p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500">Plety · Live transcript</p>
              <p className="mt-2 text-sm leading-6 text-gray-400">Key point detected: reduce the time between discussion, understanding, and execution.</p>
            </div>
          </div>
        </div>
      </div>
    </FadeInUp>
  )
}

function TranscriptionFeature() {
  return (
    <section className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 py-24 lg:grid-cols-2">
      <TranscriptionMockup />
      <FeatureCopy
        badge="✨ AI transcription"
        badgeColor="text-green-300"
        title="Turn speech into text with speed and precision."
        body="Automatically convert speech into accurate, editable text in real time. Perfect for meetings, interviews, voice notes, and more, powered by advanced speech recognition technology."
        align="right"
      />
    </section>
  )
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faq" className="mx-auto max-w-3xl px-6 py-32">
      <FadeInUp>
        <h2 className="mb-12 text-center text-4xl font-semibold tracking-tight text-white md:text-5xl">We've got answers</h2>
      </FadeInUp>

      <FadeInUp delay={100} className="rounded-xl border border-white/10 bg-transparent">
        {faqs.map((faq, index) => {
          const open = openIndex === index
          return (
            <div key={faq.question} className={index !== faqs.length - 1 ? 'border-b border-white/10' : ''}>
              <button
                className="flex w-full items-center justify-between gap-6 px-6 py-6 text-left"
                onClick={() => setOpenIndex(open ? -1 : index)}
                aria-expanded={open}
              >
                <span className="text-base font-medium text-white">{faq.question}</span>
                <span className={`relative h-5 w-5 flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-45' : 'rotate-0'}`} aria-hidden="true">
                  <span className="absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 -translate-y-1/2 bg-white" />
                  <span className="absolute left-1/2 top-1/2 h-4 w-px -translate-x-1/2 -translate-y-1/2 bg-white" />
                </span>
              </button>
              <div className={`grid transition-[grid-template-rows] duration-500 ease-out ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                <div className="overflow-hidden">
                  <p className="px-6 pb-6 text-sm leading-6 text-gray-400">{faq.answer}</p>
                </div>
              </div>
            </div>
          )
        })}
      </FadeInUp>
    </section>
  )
}

function FooterColumn({ title, links }) {
  return (
    <div>
      <h3 className="mb-5 text-sm font-medium text-white">{title}</h3>
      <ul className="space-y-3.5">
        {links.map((link) => (
          <li key={link}><a href="#" className="text-sm text-gray-400 transition-colors hover:text-white">{link}</a></li>
        ))}
      </ul>
    </div>
  )
}

function Footer() {
  return (
    <footer id="contact" className="relative z-0 overflow-hidden border-t border-white/5 px-6 pb-10 pt-32">
      <video autoPlay muted loop playsInline preload="metadata" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-40" aria-hidden="true">
        <source src={HERO_VIDEO} type="video/mp4" />
      </video>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black via-black/60 to-black" />

      <FadeInUp className="mx-auto mb-32 flex max-w-4xl flex-col items-center text-center">
        <h2 className="text-4xl font-semibold tracking-tight text-white md:text-6xl">Ready to automate <span className="font-serif font-normal italic">everything?</span></h2>
        <div className="mt-8 flex flex-row gap-3">
          <PrimaryButton />
          <SecondaryButton />
        </div>
      </FadeInUp>

      <div className="mx-auto mb-24 grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5 text-white">
            <PletyLogo className="h-8 w-8" />
            <span className="text-xl font-bold tracking-tight">Plety</span>
          </div>
          <p className="mt-5 max-w-xs text-sm leading-6 text-gray-400">Speed, scale, and smarts — deployed.</p>
        </div>
        <FooterColumn title="Product" links={['About', 'Pricing', 'Changelog', 'Contact']} />
        <FooterColumn title="Legal" links={['Terms of service', 'Privacy policy', '404']} />
        <FooterColumn title="Connect" links={['Instagram', 'YouTube', 'LinkedIn', 'Twitter / X']} />
      </div>

      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-4 border-t border-white/5 pt-8 text-xs text-gray-500 md:flex-row">
        <span>© 2026 Plety. All rights reserved</span>
        <span>•</span>
        <span>by <span className="text-gray-300">Re-text</span></span>
        <span>•</span>
        <span>Made in <span className="text-gray-300">Gemini</span></span>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-black font-sans text-white antialiased">
      <Navbar />
      <main>
        <Hero />
        <ChatFeature />
        <TranscriptionFeature />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}

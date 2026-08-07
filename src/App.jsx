import { useEffect, useRef, useState } from 'react'

const HERO_VIDEO = 'https://cdn.sceneai.art/Hero%20Section%20Video/50b4f304-cdca-4e12-8735-580d225834be.mp4'
const WORK_VIDEO = 'https://cdn.sceneai.art/Hero%20Section%20Video/1bcc8fa3-37f6-4c53-8591-0347e4c7f8ac.mp4'
const PROCESS_VIDEO = 'https://cdn.sceneai.art/Hero%20Section%20Video/736fd4a0-70ac-4f44-9633-55769ead6aca.mp4'

const navLinks = [
  { label: 'Home', id: 'home' },
  { label: 'Work', id: 'work' },
  { label: 'Process', id: 'process' },
  { label: 'About', id: 'about' },
  { label: 'FAQ', id: 'faq' },
]

const disciplines = ['Pacing', 'Motion', 'Transitions', 'Sound sync', 'Short form', '9:16', 'Visual rhythm']

const projects = [
  { number: '01', title: 'DROP 01', type: 'TIKTOK / REEL', role: 'EDIT · PACING · FX' },
  { number: '02', title: 'DROP 02', type: 'SHORT FORM', role: 'CUT · TRANSITIONS' },
  { number: '03', title: 'DROP 03', type: 'MOTION EDIT', role: 'MOTION · EFFECTS' },
  { number: '04', title: 'DROP 04', type: 'SOCIAL VIDEO', role: 'EDIT · SOUND SYNC' },
]

const faqs = [
  {
    question: 'What kind of videos does Shahine edit?',
    answer: 'The portfolio is built around short-form audiovisual work: TikTok edits, Reels, fast-paced social content, motion-heavy sequences and rhythm-led edits.',
  },
  {
    question: 'Can I send raw footage and a reference?',
    answer: 'Yes. A clear brief, source footage, music and visual references are the cleanest starting point. Scope and creative direction can be agreed before the edit begins.',
  },
  {
    question: 'Are revisions possible?',
    answer: 'Revision rounds should be defined with each project so expectations stay clear. The goal is to refine pacing, timing, effects and details without losing the original direction.',
  },
  {
    question: 'Can Shahine edit vertical content?',
    answer: 'Yes. The visual system here is intentionally centered on 9:16 and short-form presentation, where the first seconds, rhythm and readability matter most.',
  },
  {
    question: 'Where can I see the real edits?',
    answer: 'The four project slots are ready for Shahine’s real videos and posters. Once the final files and social links are supplied, they can replace the current placeholders directly.',
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

function ShahineLogo({ className = 'h-8 w-8' }) {
  return (
    <svg className={className} viewBox="0 0 42 42" fill="none" aria-hidden="true">
      <path d="M31.5 8.5H16.8c-5.3 0-8.3 2.5-8.3 6.3 0 4.2 3.4 5.7 8.1 6.2l8.2.8c5.4.5 8.7 2.2 8.7 6.4 0 3.7-3.2 6.3-8.5 6.3H10.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 12.5 30 29.5M30 12.5 12 29.5" stroke="currentColor" strokeWidth="1" opacity=".28" />
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

function PlayIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
      <path d="m7 5 8 5-8 5V5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  )
}

function PrimaryButton({ children = 'View selected work', href = '#work' }) {
  return (
    <a href={href} className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition duration-300 hover:bg-gray-200">
      {children}
      <ArrowIcon />
    </a>
  )
}

function SecondaryButton({ children = 'About Shahine', href = '#about' }) {
  return (
    <a href={href} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-[#1F1F22]/90 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-md transition duration-300 hover:bg-[#2A2A2D]">
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
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled || open ? 'border-b border-white/5 bg-black/80 backdrop-blur-md' : 'bg-transparent'}`}>
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <button onClick={() => goTo('home')} className="flex items-center gap-2.5 text-white" aria-label="Shahine home">
          <ShahineLogo className="h-8 w-8" />
          <span className="text-lg font-semibold tracking-[-0.04em]">SHAHINE</span>
        </button>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex" aria-label="Primary navigation">
          {navLinks.map((link) => (
            <button key={link.id} onClick={() => goTo(link.id)} className="text-sm font-medium text-gray-300 transition-colors hover:text-white">
              {link.label}
            </button>
          ))}
        </nav>

        <div className="hidden md:block">
          <a href="#contact" className="rounded-full border border-white/10 bg-[#1F1F22]/90 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-md transition hover:bg-[#2A2A2D]">
            Contact
          </a>
        </div>

        <button
          onClick={() => setOpen((value) => !value)}
          className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span className={`absolute h-px w-4 bg-white transition-transform duration-300 ${open ? 'rotate-45' : '-translate-y-1.5'}`} />
          <span className={`absolute h-px w-4 bg-white transition-opacity duration-300 ${open ? 'opacity-0' : 'opacity-100'}`} />
          <span className={`absolute h-px w-4 bg-white transition-transform duration-300 ${open ? '-rotate-45' : 'translate-y-1.5'}`} />
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
            Contact Shahine
          </a>
        </nav>
      </div>
    </header>
  )
}

function DisciplineGlyph({ index }) {
  const paths = [
    <><path d="M5 18h26M9 12v12M15 9v18M21 13v10M27 7v22" /></>,
    <><circle cx="18" cy="18" r="10" /><path d="m18 8 4 10-4 10-4-10 4-10Z" /></>,
    <><path d="M5 11h18l8 7-8 7H5l8-7-8-7Z" /></>,
    <><path d="M4 19h4l3-8 4 14 4-12 4 9 3-6h6" /></>,
    <><rect x="8" y="4" width="20" height="28" rx="5" /><path d="M13 26h10" /></>,
    <><path d="M8 5h20v26H8z" /><path d="m12 12 12 12M24 12 12 24" /></>,
    <><path d="M6 26c5-14 19-14 24 0M9 12h18" /><circle cx="18" cy="12" r="4" /></>,
  ]

  return (
    <svg viewBox="0 0 36 36" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[index % paths.length]}
    </svg>
  )
}

function DisciplineMarquee() {
  const loop = Array.from({ length: 4 }, () => disciplines).flat()

  return (
    <div className="mt-24 w-full">
      <p className="mb-8 text-center text-sm font-medium text-gray-500">Built around the details that make an edit hit</p>
      <div
        className="mx-auto max-w-6xl overflow-hidden"
        style={{ maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)' }}
      >
        <div className="flex w-max animate-[marquee_30s_linear_infinite] items-center">
          {loop.map((item, index) => (
            <div key={`${item}-${index}`} className="flex flex-shrink-0 items-center gap-3 px-8 text-gray-500">
              <DisciplineGlyph index={index % disciplines.length} />
              <span className="text-base font-medium tracking-tight">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Hero() {
  return (
    <section id="home" className="relative z-0 flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pb-20 pt-32">
      <video autoPlay muted loop playsInline preload="metadata" className="absolute inset-0 -z-10 h-full min-h-full w-full min-w-full object-cover opacity-80" aria-hidden="true">
        <source src={HERO_VIDEO} type="video/mp4" />
      </video>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/20 via-black/15 to-black" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_38%,transparent_0%,rgba(0,0,0,.12)_38%,rgba(0,0,0,.8)_100%)]" />

      <FadeInUp className="flex max-w-5xl flex-col items-center">
        <div className="mb-8 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium tracking-wide text-gray-300 backdrop-blur-sm">
          VIDEO EDITOR · AUDIOVISUAL
        </div>
        <h1 className="mb-6 text-center text-5xl font-medium leading-[.95] tracking-[-0.055em] text-white md:text-7xl lg:text-[88px]">
          Cuts that hit before<br />the <span className="font-serif font-normal italic">scroll does.</span>
        </h1>
        <p className="max-w-2xl text-center text-[16px] leading-7 text-gray-400">
          Shahine creates short-form edits built around rhythm, pacing, motion and sound — designed to hold attention from the first frame.
        </p>
        <div className="mt-8 flex flex-row flex-wrap items-center justify-center gap-3">
          <PrimaryButton />
          <SecondaryButton />
        </div>
      </FadeInUp>

      <DisciplineMarquee />
    </section>
  )
}

function SectionCopy({ badge, badgeColor, title, body, children }) {
  return (
    <FadeInUp className="flex flex-col justify-center">
      <p className={`mb-5 text-sm font-medium ${badgeColor}`}>{badge}</p>
      <h2 className="max-w-xl text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl">{title}</h2>
      <p className="mt-6 max-w-xl text-[16px] leading-7 text-gray-400">{body}</p>
      {children}
    </FadeInUp>
  )
}

function WorkMockup() {
  return (
    <FadeInUp delay={120} className="relative min-h-[560px] overflow-hidden rounded-3xl border border-white/10 p-6 sm:p-8">
      <video autoPlay muted loop playsInline preload="metadata" className="absolute inset-0 h-full w-full object-cover opacity-80" aria-hidden="true">
        <source src={WORK_VIDEO} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/10" />

      <div className="relative z-10 flex min-h-[496px] items-end">
        <div className="w-full rounded-[24px] border border-white/10 bg-[#101012]/90 p-4 shadow-2xl shadow-black/40 backdrop-blur-2xl">
          <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[.16em] text-gray-500">Selected work</p>
              <p className="mt-1 text-lg font-semibold tracking-tight text-white">SHAHINE / CUT ARCHIVE</p>
            </div>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] text-gray-400">04 SLOTS</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {projects.map((project, index) => (
              <button key={project.number} className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[.035] text-left transition hover:bg-white/[.07]">
                <div className={`relative aspect-[9/11] overflow-hidden ${index === 0 ? 'bg-[radial-gradient(circle_at_60%_25%,#777_0%,#222_22%,#090909_70%)]' : index === 1 ? 'bg-[linear-gradient(145deg,#30343a,#0c0c0d_65%)]' : index === 2 ? 'bg-[radial-gradient(circle_at_25%_30%,#4d5662,#101214_35%,#070708_75%)]' : 'bg-[linear-gradient(160deg,#171719,#050506_65%)]'}`}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-white/[.06]" />
                  <span className="absolute left-3 top-3 font-mono text-[9px] text-white/55">{project.number}</span>
                  <span className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-black/30 text-white backdrop-blur-md transition group-hover:scale-110"><PlayIcon /></span>
                </div>
                <div className="p-3">
                  <div className="flex items-center justify-between gap-2">
                    <b className="text-sm font-medium text-white">{project.title}</b>
                    <span className="text-[8px] text-gray-500">{project.type}</span>
                  </div>
                  <p className="mt-1 text-[9px] tracking-wide text-gray-500">{project.role}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </FadeInUp>
  )
}

function SelectedWork() {
  return (
    <section id="work" className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 py-24 lg:grid-cols-2 lg:py-32">
      <SectionCopy
        badge="✦ Selected work"
        badgeColor="text-[#E8D8A8]"
        title="The edit is the identity."
        body="A portfolio should prove taste before it explains it. These slots are designed for Shahine’s strongest vertical edits, with room for real posters, MP4/WebM previews and project details."
      >
        <div className="mt-8 flex flex-wrap gap-2">
          {['TikTok edits', 'Reels', 'Motion', 'Transitions', 'Sound sync'].map((item) => (
            <span key={item} className="rounded-full border border-white/10 bg-white/[.035] px-3 py-2 text-xs text-gray-400">{item}</span>
          ))}
        </div>
      </SectionCopy>
      <WorkMockup />
    </section>
  )
}

function TimelineMockup() {
  const waveform = [22, 36, 18, 44, 30, 50, 24, 40, 16, 46, 28, 52, 34, 20, 42, 26, 48, 32, 18, 38, 24, 44, 30, 50, 20, 36, 28, 46, 22, 40]

  return (
    <FadeInUp delay={120} className="relative min-h-[540px] overflow-hidden rounded-3xl border border-white/10 p-6 sm:p-8">
      <video autoPlay muted loop playsInline preload="metadata" className="absolute inset-0 h-full w-full object-cover opacity-75" aria-hidden="true">
        <source src={PROCESS_VIDEO} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/25" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/55" />

      <div className="relative z-10 flex min-h-[476px] items-center justify-center">
        <div className="w-full max-w-lg rounded-[24px] border border-white/10 bg-[#111113]/90 p-5 shadow-2xl shadow-black/40 backdrop-blur-2xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black"><PlayIcon /></span>
              <div><p className="text-sm font-medium text-white">EDIT_004_FINAL</p><p className="mt-0.5 text-[10px] text-gray-500">00:00:18 · 9:16 · SHORT FORM</p></div>
            </div>
            <span className="font-mono text-[10px] text-gray-500">CUT / 01</span>
          </div>

          <div className="py-5">
            <div className="flex h-16 items-center gap-[3px] overflow-hidden rounded-xl border border-white/10 bg-black/30 px-3">
              {waveform.map((height, index) => <span key={index} className="w-[3px] shrink-0 rounded-full bg-white/60" style={{ height }} />)}
            </div>
            <div className="mt-3 grid grid-cols-12 gap-1">
              {Array.from({ length: 12 }, (_, index) => <span key={index} className={`h-2 rounded-sm ${index < 7 ? 'bg-white/60' : 'bg-white/10'}`} />)}
            </div>
          </div>

          <div className="space-y-3 border-t border-white/10 pt-4">
            {[['01', 'Hook', 'First-frame clarity'], ['02', 'Rhythm', 'Cuts locked to energy'], ['03', 'Motion', 'Effects serve the beat'], ['04', 'Finish', 'Clean exit / replay value']].map(([n, title, text]) => (
              <div key={n} className="flex items-center gap-4 rounded-xl border border-white/[.07] bg-white/[.025] px-3 py-3">
                <span className="font-mono text-[9px] text-gray-600">{n}</span>
                <div><p className="text-xs font-medium text-white">{title}</p><p className="mt-0.5 text-[10px] text-gray-500">{text}</p></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </FadeInUp>
  )
}

function Process() {
  return (
    <section id="process" className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 py-24 lg:grid-cols-2 lg:py-32">
      <TimelineMockup />
      <SectionCopy
        badge="✦ Editing system"
        badgeColor="text-[#A9E6C5]"
        title="Every cut has a reason."
        body="The workflow is simple: establish the hook, find the rhythm, build motion around the footage, then remove everything that does not make the final edit stronger."
      >
        <div className="mt-8"><SecondaryButton href="#faq">How projects work</SecondaryButton></div>
      </SectionCopy>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="px-6 py-28 md:py-36">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[32px] border border-white/10 bg-[radial-gradient(circle_at_80%_10%,rgba(255,255,255,.08),transparent_28%),linear-gradient(145deg,#111113,#050505_70%)] p-8 md:p-14 lg:p-16">
        <FadeInUp className="grid gap-14 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
          <div>
            <p className="mb-5 text-sm font-medium text-gray-500">ABOUT SHAHINE</p>
            <h2 className="max-w-4xl text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-white md:text-6xl">
              Editor first.<br /><span className="font-serif font-normal italic text-gray-500">Effects second.</span>
            </h2>
          </div>
          <div>
            <p className="text-[16px] leading-7 text-gray-400">Shahine is a video editor focused on short-form audiovisual work where timing matters: fast cuts, controlled pacing, transitions, motion and sound synchronization.</p>
            <p className="mt-5 text-sm leading-6 text-gray-600">No fake clients. No invented metrics. The work should speak for itself.</p>
          </div>
        </FadeInUp>
      </div>
    </section>
  )
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faq" className="mx-auto max-w-3xl px-6 py-32">
      <FadeInUp>
        <p className="mb-4 text-center text-sm font-medium text-gray-500">PROJECT INFO</p>
        <h2 className="mb-12 text-center text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl">Before the first cut.</h2>
      </FadeInUp>

      <FadeInUp delay={100} className="rounded-xl border border-white/10 bg-transparent">
        {faqs.map((item, index) => {
          const open = openIndex === index
          return (
            <div key={item.question} className={index < faqs.length - 1 ? 'border-b border-white/10' : ''}>
              <button onClick={() => setOpenIndex(open ? -1 : index)} className="flex w-full items-center justify-between gap-6 px-6 py-6 text-left" aria-expanded={open}>
                <span className="text-base font-medium text-white">{item.question}</span>
                <span className={`relative h-5 w-5 shrink-0 transition-transform duration-300 ${open ? 'rotate-45' : ''}`} aria-hidden="true">
                  <span className="absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 -translate-y-1/2 bg-white" />
                  <span className="absolute left-1/2 top-1/2 h-4 w-px -translate-x-1/2 -translate-y-1/2 bg-white" />
                </span>
              </button>
              <div className={`grid transition-[grid-template-rows] duration-500 ease-out ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                <div className="overflow-hidden"><p className="px-6 pb-6 text-sm leading-6 text-gray-400">{item.answer}</p></div>
              </div>
            </div>
          )
        })}
      </FadeInUp>
    </section>
  )
}

function Footer() {
  return (
    <footer id="contact" className="relative z-0 overflow-hidden border-t border-white/5 px-6 pb-10 pt-32">
      <video autoPlay muted loop playsInline preload="metadata" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-35" aria-hidden="true">
        <source src={HERO_VIDEO} type="video/mp4" />
      </video>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black via-black/65 to-black" />

      <FadeInUp className="mx-auto mb-32 flex max-w-4xl flex-col items-center text-center">
        <p className="mb-5 text-sm font-medium text-gray-500">NEXT PROJECT</p>
        <h2 className="text-4xl font-semibold tracking-[-0.045em] text-white md:text-6xl">Have footage.<br />Let’s make it <span className="font-serif font-normal italic">hit.</span></h2>
        <p className="mt-6 max-w-xl text-[16px] leading-7 text-gray-400">Send the brief, footage and references. The actual TikTok, Instagram and email links can be connected here as soon as Shahine provides them.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <PrimaryButton href="#work">See the work</PrimaryButton>
          <SecondaryButton href="#contact">Contact details below</SecondaryButton>
        </div>
      </FadeInUp>

      <div className="mx-auto mb-24 grid max-w-7xl grid-cols-1 gap-10 md:grid-cols-4 md:gap-8">
        <div>
          <div className="flex items-center gap-2.5 text-white"><ShahineLogo className="h-8 w-8" /><span className="text-xl font-bold tracking-[-0.04em]">SHAHINE</span></div>
          <p className="mt-4 max-w-xs text-sm leading-6 text-gray-500">Video editor · short-form · audiovisual.</p>
        </div>
        <div>
          <p className="mb-4 text-sm font-medium text-white">Portfolio</p>
          <div className="flex flex-col gap-3">{[['Work', '#work'], ['Process', '#process'], ['About', '#about'], ['FAQ', '#faq']].map(([label, href]) => <a key={label} href={href} className="text-sm text-gray-400 transition-colors hover:text-white">{label}</a>)}</div>
        </div>
        <div>
          <p className="mb-4 text-sm font-medium text-white">Contact</p>
          <div className="flex flex-col gap-3 text-sm text-gray-500"><span>TikTok · ADD HANDLE</span><span>Instagram · ADD HANDLE</span><span>Email · ADD ADDRESS</span></div>
        </div>
        <div>
          <p className="mb-4 text-sm font-medium text-white">Focus</p>
          <div className="flex flex-col gap-3 text-sm text-gray-400"><span>TikTok / Reels</span><span>Short-form edits</span><span>Motion / FX</span><span>Sound sync</span></div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-4 border-t border-white/5 pt-8 text-xs text-gray-600 md:flex-row">
        <span>© 2026 Shahine. Portfolio.</span><span className="hidden md:inline">·</span><span>Built for the edit.</span>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white antialiased">
      <Navbar />
      <main>
        <Hero />
        <SelectedWork />
        <Process />
        <About />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}

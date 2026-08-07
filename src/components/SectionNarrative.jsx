import { projects } from '../data/projects.js'

export const narrativeSections = [
  {
    id: 'home',
    eyebrow: 'SHAHINE / 001',
    title: <>CUTS WITH<br/><em>INTENT.</em></>,
    body: 'Video editor and audiovisual creator focused on short-form rhythm, pacing, transitions and motion.',
    note: 'Drag the device · Tap the screen',
  },
  {
    id: 'work',
    eyebrow: 'SELECTED WORK / 002',
    title: <>BUILT FOR<br/><em>ATTENTION.</em></>,
    body: 'The phone becomes the reel. Open a card to inspect a vertical project without leaving the device.',
    note: `${projects.length} replaceable project slots`,
  },
  {
    id: 'projects',
    eyebrow: 'PROJECT INDEX / 003',
    title: <>VERTICAL<br/><em>BY DESIGN.</em></>,
    body: 'The data model is intentionally simple: add a title, role, poster and compressed video to ship a new edit.',
    note: 'Data-driven · lazy video loading',
  },
  {
    id: 'about',
    eyebrow: 'APPROACH / 004',
    title: <>MOTION IS<br/><em>THE PROOF.</em></>,
    body: 'The interface uses controlled inertia, depth and refractive layers because motion quality is part of an editor’s portfolio.',
    note: 'Reduced-motion respected',
  },
  {
    id: 'contact',
    eyebrow: 'CONTACT / 005',
    title: <>READY FOR<br/><em>THE REAL WORK.</em></>,
    body: 'Replace the contact placeholders with Shahine’s actual social handles and email before public launch.',
    note: 'No invented clients · no fake metrics',
  },
]

export function SectionNarrative() {
  return (
    <div className="story-column">
      {narrativeSections.map((section) => (
        <section key={section.id} id={section.id} data-route={section.id} className="story-section" aria-labelledby={`${section.id}-title`}>
          <div className="story-copy">
            <p className="story-eyebrow">{section.eyebrow}</p>
            <h1 id={`${section.id}-title`}>{section.title}</h1>
            <p className="story-body">{section.body}</p>
            <p className="story-note">{section.note}</p>
          </div>
        </section>
      ))}
    </div>
  )
}

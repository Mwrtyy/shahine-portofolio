import { useState } from 'react'
import { projects, routes } from '../data/projects.js'
import { VideoPreview } from './VideoPreview.jsx'

const navGlyphs = {
  home: '⌂',
  work: '◫',
  projects: '▤',
  about: '◌',
  contact: '↗',
}

function StatusBar() {
  return (
    <div className="phone-status" aria-hidden="true">
      <span>9:41</span>
      <span className="phone-island" />
      <span>● ᯤ</span>
    </div>
  )
}

function HomeScreen({ onNavigate }) {
  return (
    <div className="phone-page phone-home">
      <p className="phone-kicker">VIDEO EDITOR · AUDIOVISUAL</p>
      <h2>SHAHINE</h2>
      <p className="phone-lede">Fast cuts. Controlled pacing. Effects that serve the edit.</p>
      <button className="phone-primary" onClick={() => onNavigate('work')}>View selected work <span>↗</span></button>
      <div className="phone-reel-strip" aria-hidden="true">
        <span>01</span><span>02</span><span>03</span>
      </div>
      <div className="phone-home-meta">
        <span>SHORT FORM</span>
        <span>TIKTOK / REELS</span>
        <span>MOTION</span>
      </div>
    </div>
  )
}

function WorkScreen({ onProject }) {
  return (
    <div className="phone-page phone-work">
      <div className="phone-title-row">
        <div><p>SELECTED</p><h3>WORK</h3></div>
        <span>{String(projects.length).padStart(2, '0')}</span>
      </div>
      <div className="phone-work-grid">
        {projects.map((project) => (
          <button key={project.id} className="phone-work-card" onClick={() => onProject(project)}>
            <VideoPreview project={project} compact />
            <span className="phone-work-card__meta"><b>{project.title}</b><small>{project.category}</small></span>
          </button>
        ))}
      </div>
    </div>
  )
}

function ProjectsScreen({ onProject }) {
  return (
    <div className="phone-page phone-projects">
      <p className="phone-kicker">PROJECT INDEX</p>
      <h3>VERTICAL<br/>BY DESIGN.</h3>
      <div className="project-list">
        {projects.map((project, index) => (
          <button key={project.id} onClick={() => onProject(project)}>
            <span>0{index + 1}</span>
            <div><b>{project.title}</b><small>{project.role}</small></div>
            <i>↗</i>
          </button>
        ))}
      </div>
    </div>
  )
}

function AboutScreen() {
  return (
    <div className="phone-page phone-about">
      <p className="phone-kicker">ABOUT / APPROACH</p>
      <h3>EDITOR FIRST.<br/>EFFECTS SECOND.</h3>
      <p>Shahine creates short-form audiovisual edits built around rhythm, clarity and replay value.</p>
      <div className="skill-stack">
        {['PACING', 'TRANSITIONS', 'MOTION', 'EFFECTS', 'SOUND SYNC', '9:16 STORY'].map((skill) => <span key={skill}>{skill}</span>)}
      </div>
      <p className="replace-note">Replace this short bio with Shahine’s real wording when available.</p>
    </div>
  )
}

function ContactScreen() {
  return (
    <div className="phone-page phone-contact">
      <p className="phone-kicker">CONTACT</p>
      <h3>LET’S CUT<br/>SOMETHING.</h3>
      <p>Add Shahine’s real TikTok, Instagram and email before launch.</p>
      <div className="contact-slots">
        <button disabled><span>TIKTOK</span><b>ADD HANDLE</b></button>
        <button disabled><span>INSTAGRAM</span><b>ADD HANDLE</b></button>
        <button disabled><span>EMAIL</span><b>ADD ADDRESS</b></button>
      </div>
    </div>
  )
}

function ProjectDetail({ project, onClose }) {
  return (
    <div className="phone-detail">
      <button className="detail-back" onClick={onClose}>← Back</button>
      <VideoPreview project={project} controls />
      <div className="detail-copy">
        <p>{project.category} · {project.year}</p>
        <h3>{project.title}</h3>
        <span>{project.role}</span>
        <p>{project.summary}</p>
      </div>
    </div>
  )
}

export function PhoneUI({ route, onNavigate }) {
  const [selectedProject, setSelectedProject] = useState(null)

  const navigate = (nextRoute) => {
    setSelectedProject(null)
    onNavigate(nextRoute)
  }

  const pages = {
    home: <HomeScreen onNavigate={navigate} />,
    work: <WorkScreen onProject={setSelectedProject} />,
    projects: <ProjectsScreen onProject={setSelectedProject} />,
    about: <AboutScreen />,
    contact: <ContactScreen />,
  }

  return (
    <div className="phone-ui" onPointerDown={(event) => event.stopPropagation()}>
      <StatusBar />
      <main className="phone-screen-content" aria-live="polite">
        {selectedProject ? <ProjectDetail project={selectedProject} onClose={() => setSelectedProject(null)} /> : pages[route] || pages.home}
      </main>
      {!selectedProject && (
        <nav className="phone-dock" aria-label="Portfolio navigation">
          {routes.map((item) => (
            <button
              key={item.id}
              className={route === item.id ? 'is-active' : ''}
              onClick={() => navigate(item.id)}
              aria-label={item.label}
              aria-current={route === item.id ? 'page' : undefined}
            >
              <span>{navGlyphs[item.id]}</span>
              <small>{item.label}</small>
            </button>
          ))}
        </nav>
      )}
    </div>
  )
}

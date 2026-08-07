import { useCallback, useEffect, useState } from 'react'
import { LiquidGlass, LiquidGlassDefs } from './components/LiquidGlass.jsx'
import { PhoneScene } from './components/PhoneScene.jsx'
import { SectionNarrative } from './components/SectionNarrative.jsx'
import { routes } from './data/projects.js'
import { useReducedMotion } from './hooks/useReducedMotion.js'

export default function App() {
  const [route, setRoute] = useState('home')
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const sections = [...document.querySelectorAll('.story-section')]
    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (current?.target?.dataset?.route) setRoute(current.target.dataset.route)
      },
      { threshold: [0.25, 0.45, 0.65], rootMargin: '-18% 0px -18% 0px' },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const navigate = useCallback((nextRoute) => {
    setRoute(nextRoute)
    document.getElementById(nextRoute)?.scrollIntoView({
      behavior: reducedMotion ? 'auto' : 'smooth',
      block: 'start',
    })
  }, [reducedMotion])

  return (
    <div className="site-shell">
      <LiquidGlassDefs />
      <div className="atmosphere" aria-hidden="true"><span/><span/><span/></div>

      <header className="topbar">
        <a href="#home" className="brand" onClick={(event) => { event.preventDefault(); navigate('home') }}>S<span>H</span></a>
        <LiquidGlass as="nav" className="desktop-nav" aria-label="Main navigation">
          {routes.map((item) => (
            <button key={item.id} className={route === item.id ? 'is-active' : ''} onClick={() => navigate(item.id)}>{item.label}</button>
          ))}
        </LiquidGlass>
        <span className="availability"><i /> VIDEO EDITOR</span>
      </header>

      <div className="experience-grid">
        <SectionNarrative />
        <aside className="device-stage" aria-label="Interactive portfolio device">
          <div className="device-stage__halo" aria-hidden="true" />
          <PhoneScene route={route} onNavigate={navigate} reducedMotion={reducedMotion} />
          <div className="drag-caption" aria-hidden="true"><span>↔</span> DRAG DEVICE</div>
        </aside>
      </div>

      <footer>
        <span>SHAHINE © {new Date().getFullYear()}</span>
        <span>VIDEO EDITOR / AUDIOVISUAL CREATOR</span>
      </footer>
    </div>
  )
}

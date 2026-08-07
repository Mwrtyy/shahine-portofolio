import { useEffect } from 'react'

const FILTER_ID = 'shahine-liquid-glass-refraction'

export function LiquidGlassDefs() {
  useEffect(() => {
    const supportsSvgBackdrop = window.CSS?.supports?.('backdrop-filter', `url(#${FILTER_ID}) blur(1px)`)
    document.documentElement.classList.toggle('supports-svg-backdrop', Boolean(supportsSvgBackdrop))
    return () => document.documentElement.classList.remove('supports-svg-backdrop')
  }, [])

  return (
    <svg className="liquid-glass-defs" aria-hidden="true">
      <defs>
        <filter id={FILTER_ID} x="-15%" y="-15%" width="130%" height="130%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.008 0.014" numOctaves="2" seed="23" result="surface" />
          <feGaussianBlur in="surface" stdDeviation="1.2" result="softSurface" />
          <feDisplacementMap in="SourceGraphic" in2="softSurface" scale="18" xChannelSelector="R" yChannelSelector="G" result="refracted" />
          <feColorMatrix
            in="refracted"
            type="matrix"
            values="1.02 0 0 0 0.006  0 1.02 0 0 0.006  0 0 1.05 0 0.008  0 0 0 1 0"
          />
        </filter>
      </defs>
    </svg>
  )
}

export function LiquidGlass({ as: Tag = 'div', className = '', children, ...props }) {
  return (
    <Tag className={`liquid-glass ${className}`.trim()} {...props}>
      <span className="liquid-glass__specular" aria-hidden="true" />
      <span className="liquid-glass__edge" aria-hidden="true" />
      <span className="liquid-glass__content">{children}</span>
    </Tag>
  )
}

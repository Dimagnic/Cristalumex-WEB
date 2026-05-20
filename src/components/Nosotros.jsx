import { useEffect, useRef } from 'react'
import { useSite } from '../lib/context'

const benefits = [
  { icon: '🏆', title: '+20 Años de Experiencia', desc: 'Trayectoria sólida en el mercado de vidrio y aluminio en Puebla y la región.' },
  { icon: '⚡', title: 'Instalación Rápida', desc: 'Equipos especializados que garantizan entregas en tiempo y forma.' },
  { icon: '🛡️', title: 'Garantía de Calidad', desc: 'Materiales certificados y procesos de instalación con garantía total.' },
  { icon: '✏️', title: 'Diseño Personalizado', desc: 'Cada proyecto es único. Adaptamos nuestras soluciones a tus necesidades.' },
]

export default function Nosotros() {
  const { siteData } = useSite()
  const nos = siteData?.nosotros || {}
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    sectionRef.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="nosotros" ref={sectionRef} style={{ padding: '5rem 1.5rem', background: 'var(--bg-card)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span style={{ display: 'inline-block', background: 'var(--secondary)', color: '#fff', fontFamily: 'Montserrat, sans-serif', fontSize: '.7rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', padding: '.25rem .75rem', borderRadius: 99, marginBottom: '1rem' }}>
            {nos.badge}
          </span>
          <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 800, color: 'var(--text)', marginBottom: '.75rem' }}>{nos.title}</h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', maxWidth: 580, margin: '0 auto' }}>{nos.subtitle}</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
          {benefits.map((b, i) => (
            <div key={i} className="reveal" style={{
              background: '#fff', border: '1px solid var(--border)', borderRadius: 12,
              padding: '2rem 1.5rem', transition: 'all .3s',
            }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 32px rgba(44,74,110,.12)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)' }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{b.icon}</div>
              <h3 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '1.1rem', marginBottom: '.4rem' }}>{b.title}</h3>
              <p style={{ fontSize: '.9rem', color: 'var(--text-muted)' }}>{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

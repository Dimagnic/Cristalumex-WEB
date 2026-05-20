import { useEffect, useRef } from 'react'
import { useSite } from '../lib/context'

export default function Productos() {
  const { siteData, products } = useSite()
  const sec = siteData?.productos || {}
  const redes = siteData?.redes || {}
  const sectionRef = useRef(null)

  const waLink = (title) => `https://wa.me/${redes.waNumber}?text=${encodeURIComponent('Hola, me interesa una cotización para: ' + title)}`

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    sectionRef.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [products])

  return (
    <section id="productos" ref={sectionRef} style={{ padding: '5rem 1.5rem', background: '#fff' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span style={{ display: 'inline-block', background: 'var(--secondary)', color: '#fff', fontFamily: 'Montserrat, sans-serif', fontSize: '.7rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', padding: '.25rem .75rem', borderRadius: 99, marginBottom: '1rem' }}>
            {sec.badge}
          </span>
          <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 800, color: 'var(--text)', marginBottom: '.75rem' }}>{sec.title}</h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', maxWidth: 580, margin: '0 auto' }}>{sec.subtitle}</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
          {products.map((p) => (
            <div key={p.id} className="reveal" style={{
              background: 'var(--bg-card)', border: '1px solid var(--border)',
              borderRadius: 12, overflow: 'hidden', transition: 'all .3s',
              display: 'flex', flexDirection: 'column',
            }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 12px 40px rgba(44,74,110,.15)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)' }}>
              <div style={{ padding: '1.75rem', flex: 1 }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(0,102,204,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                  <svg width="24" height="24" fill="none" stroke="var(--secondary)" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                </div>
                <h3 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '1.1rem', marginBottom: '.6rem' }}>{p.title}</h3>
                <p style={{ fontSize: '.88rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{p.desc}</p>
              </div>
              <div style={{ padding: '1rem 1.75rem', borderTop: '1px solid var(--border)' }}>
                <a href={waLink(p.title)} target="_blank" rel="noreferrer" style={{
                  display: 'block', width: '100%', textAlign: 'center',
                  border: '1.5px solid var(--secondary)', color: 'var(--secondary)',
                  fontFamily: 'Montserrat, sans-serif', fontSize: '.82rem', fontWeight: 700,
                  padding: '.6rem', borderRadius: 6, transition: 'all .2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--secondary)'; e.currentTarget.style.color = '#fff' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--secondary)' }}>
                  Solicitar Cotización
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

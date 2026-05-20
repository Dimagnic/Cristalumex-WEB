import { useEffect, useRef } from 'react'
import { useSite } from '../lib/context'

export default function Testimonios() {
  const { siteData, testimonials } = useSite()
  const sec = siteData?.testimonios || {}
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    sectionRef.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [testimonials])

  return (
    <section id="proyectos" ref={sectionRef} style={{ padding: '5rem 1.5rem', background: '#fff' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span style={{ display: 'inline-block', background: 'var(--secondary)', color: '#fff', fontFamily: 'Montserrat, sans-serif', fontSize: '.7rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', padding: '.25rem .75rem', borderRadius: 99, marginBottom: '1rem' }}>
            {sec.badge}
          </span>
          <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 800, color: 'var(--text)', marginBottom: '.75rem' }}>{sec.title}</h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', maxWidth: 580, margin: '0 auto' }}>{sec.subtitle}</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {testimonials.map((t) => (
            <div key={t.id} className="reveal" style={{
              background: 'var(--bg-card)', border: '1px solid var(--border)',
              borderRadius: 12, padding: '2rem',
            }}>
              <div style={{ display: 'flex', gap: '.2rem', marginBottom: '1rem' }}>
                {[1,2,3,4,5].map(s => <span key={s} style={{ color: '#FACC15', fontSize: '1.1rem' }}>★</span>)}
              </div>
              <blockquote style={{ fontStyle: 'italic', color: 'var(--text)', lineHeight: 1.7, fontSize: '.95rem', marginBottom: '1.5rem' }}>
                "{t.text}"
              </blockquote>
              <div style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '.95rem' }}>{t.name}</div>
              <div style={{ fontSize: '.82rem', color: 'var(--text-muted)' }}>{t.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

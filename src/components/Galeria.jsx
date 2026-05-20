import { useState, useEffect, useRef } from 'react'
import { useSite } from '../lib/context'

export default function Galeria() {
  const { siteData, gallery } = useSite()
  const sec = siteData?.galeria || {}
  const [filter, setFilter] = useState('all')
  const [lightbox, setLightbox] = useState(null)
  const sectionRef = useRef(null)

  const cats = [...new Set(gallery.map(i => i.cat))]
  const filtered = filter === 'all' ? gallery : gallery.filter(i => i.cat === filter)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    sectionRef.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [gallery, filter])

  useEffect(() => {
    document.body.style.overflow = lightbox ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [lightbox])

  return (
    <section id="galeria" ref={sectionRef} style={{ padding: '5rem 1.5rem', background: 'var(--bg-card)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span style={{ display: 'inline-block', background: 'var(--secondary)', color: '#fff', fontFamily: 'Montserrat, sans-serif', fontSize: '.7rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', padding: '.25rem .75rem', borderRadius: 99, marginBottom: '1rem' }}>
            {sec.badge}
          </span>
          <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 800, color: 'var(--text)', marginBottom: '.75rem' }}>{sec.title}</h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', maxWidth: 580, margin: '0 auto' }}>{sec.subtitle}</p>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '2rem' }}>
          {['all', ...cats].map(c => (
            <button key={c} onClick={() => setFilter(c)} style={{
              fontFamily: 'Montserrat, sans-serif', fontSize: '.78rem', fontWeight: 700,
              padding: '.4rem 1rem', borderRadius: 99,
              border: '1.5px solid', borderColor: filter === c ? 'var(--secondary)' : 'var(--border)',
              background: filter === c ? 'var(--secondary)' : '#fff',
              color: filter === c ? '#fff' : 'var(--text-muted)',
              cursor: 'pointer', transition: 'all .2s',
            }}>
              {c === 'all' ? 'Todos' : c}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
          {filtered.map(img => (
            <div key={img.id} className="reveal" onClick={() => setLightbox(img)} style={{
              position: 'relative', borderRadius: 12, overflow: 'hidden',
              aspectRatio: '4/3', cursor: 'pointer', transition: 'transform .3s',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'scale(1.02)'
                e.currentTarget.querySelector('.overlay').style.opacity = '1'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'scale(1)'
                e.currentTarget.querySelector('.overlay').style.opacity = '0'
              }}>
              <img src={img.url} alt={img.alt} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .5s' }} />
              <div className="overlay" style={{
                position: 'absolute', inset: 0, opacity: 0, transition: 'opacity .3s',
                background: 'linear-gradient(to top, rgba(44,74,110,.8) 0%, rgba(44,74,110,.2) 60%, transparent 100%)',
                display: 'flex', alignItems: 'flex-end', padding: '1.25rem',
              }}>
                <div>
                  <span style={{ display: 'inline-block', background: 'var(--secondary)', color: '#fff', fontFamily: 'Montserrat, sans-serif', fontSize: '.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', padding: '.2rem .6rem', borderRadius: 99, marginBottom: '.4rem' }}>{img.cat}</span>
                  <p style={{ color: '#fff', fontSize: '.82rem' }}>{img.alt}</p>
                </div>
              </div>
              <div style={{ position: 'absolute', bottom: '.75rem', right: '.75rem', color: 'rgba(255,255,255,.55)', fontSize: '.65rem', fontWeight: 600 }}>Cristalumex</div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div onClick={() => setLightbox(null)} style={{
          position: 'fixed', inset: 0, zIndex: 200,
          background: 'rgba(0,0,0,.85)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem',
        }}>
          <div onClick={e => e.stopPropagation()} style={{ position: 'relative', maxWidth: 900, width: '100%' }}>
            <button onClick={() => setLightbox(null)} style={{
              position: 'absolute', top: -40, right: 0,
              background: 'none', border: 'none', color: '#fff', fontSize: '2rem', cursor: 'pointer', lineHeight: 1,
            }}>✕</button>
            <img src={lightbox.url} alt={lightbox.alt} style={{ width: '100%', borderRadius: '12px 12px 0 0', display: 'block' }} />
            <div style={{ background: '#fff', padding: '1rem 1.5rem', borderRadius: '0 0 12px 12px' }}>
              <span style={{ background: 'var(--secondary)', color: '#fff', fontSize: '.7rem', fontWeight: 700, padding: '.2rem .6rem', borderRadius: 99, marginRight: '.5rem' }}>{lightbox.cat}</span>
              <span style={{ fontSize: '.9rem', color: 'var(--text)' }}>{lightbox.alt}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

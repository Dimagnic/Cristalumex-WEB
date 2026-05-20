import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSite } from '../lib/context'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { siteData, user } = useSite()
  const navigate = useNavigate()
  const nav = siteData?.nav || {}
  const logoUrl = siteData?.logoUrl

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const scrollTo = (id) => {
    setMobileOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        background: 'rgba(255,255,255,.97)', backdropFilter: 'blur(8px)',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        boxShadow: scrolled ? '0 4px 24px rgba(44,74,110,.12)' : 'none',
        transition: 'all .3s',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem', height: 80, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          <a href="#hero" onClick={e => { e.preventDefault(); scrollTo('hero') }} style={{ display: 'flex', alignItems: 'center', gap: '.75rem', textDecoration: 'none', transition: 'transform .2s' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
            
            {/* 🔥 LOGO CORREGIDO */}
            <img
              src={logoUrl || "/logo.png"}
              alt="Cristalumex"
              style={{ height: 48, width: 'auto', objectFit: 'contain' }}
            />

          </a>

          <nav style={{ display: 'flex', alignItems: 'center', gap: '.25rem' }} className="desktop-nav">
            {[['nosotros', 'nosotros'], ['productos', 'productos'], ['galeria', 'galeria'], ['proyectos', 'proyectos'], ['contacto', 'contacto']].map(([key, id]) => (
              <button key={key} onClick={() => scrollTo(id)} style={{
                fontFamily: 'Montserrat, sans-serif', fontSize: '.8rem', fontWeight: 600, letterSpacing: '.05em',
                color: 'var(--text)', background: 'none', border: 'none', padding: '.4rem .85rem', borderRadius: 6,
                cursor: 'pointer', transition: 'all .2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--secondary)'; e.currentTarget.style.color = '#fff' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'var(--text)' }}>
                {nav[key] || key}
              </button>
            ))}
            <button onClick={() => navigate('/admin')} style={{
              display: 'flex', alignItems: 'center', gap: '.4rem',
              background: 'var(--secondary)', color: '#fff',
              fontFamily: 'Montserrat, sans-serif', fontSize: '.8rem', fontWeight: 700,
              padding: '.5rem 1.1rem', borderRadius: 6, border: 'none', cursor: 'pointer', transition: 'all .2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#0055aa'; e.currentTarget.style.transform = 'translateY(-1px)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--secondary)'; e.currentTarget.style.transform = 'translateY(0)' }}>
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
              {user ? 'Panel CMS' : 'Administrar'}
            </button>
          </nav>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="mobile-menu-btn" style={{
            display: 'none', flexDirection: 'column', gap: 5, background: 'none', border: 'none', cursor: 'pointer', padding: 4,
          }}>
            <span style={{ display: 'block', width: 24, height: 2, background: 'var(--text)', borderRadius: 2, transition: 'all .3s' }} />
            <span style={{ display: 'block', width: 24, height: 2, background: 'var(--text)', borderRadius: 2, transition: 'all .3s' }} />
            <span style={{ display: 'block', width: 24, height: 2, background: 'var(--text)', borderRadius: 2, transition: 'all .3s' }} />
          </button>
        </div>
      </header>

      {mobileOpen && (
        <div style={{
          position: 'fixed', inset: '80px 0 0', background: 'rgba(255,255,255,.98)',
          backdropFilter: 'blur(8px)', display: 'flex', flexDirection: 'column',
          padding: '2rem 1.5rem', gap: '1rem', zIndex: 40,
        }}>
          {[['nosotros', 'nosotros'], ['productos', 'productos'], ['galeria', 'galeria'], ['proyectos', 'proyectos'], ['contacto', 'contacto']].map(([key, id]) => (
            <button key={key} onClick={() => scrollTo(id)} style={{
              fontFamily: 'Montserrat, sans-serif', fontSize: '1.1rem', fontWeight: 600,
              color: 'var(--text)', background: 'none', border: 'none', padding: '.75rem 1rem',
              borderRadius: 'var(--radius)', cursor: 'pointer', textAlign: 'left',
            }}>
              {nav[key] || key}
            </button>
          ))}
          <button onClick={() => { setMobileOpen(false); navigate('/admin') }} style={{
            background: 'var(--secondary)', color: '#fff', fontFamily: 'Montserrat, sans-serif',
            fontSize: '1rem', fontWeight: 700, padding: '.85rem 1rem', borderRadius: 'var(--radius)',
            border: 'none', cursor: 'pointer', textAlign: 'left',
          }}>
            Administrar
          </button>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  )
}
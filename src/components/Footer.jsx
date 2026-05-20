import { useSite } from '../lib/context'

export default function Footer() {
  const { siteData } = useSite()
  const footer = siteData?.footer || {}
  const redes = siteData?.redes || {}
  const logoUrl = siteData?.logoUrl
  const nav = siteData?.nav || {}

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer style={{ background: 'var(--primary)', color: '#fff', padding: '4rem 1.5rem 2rem' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2.5rem', marginBottom: '3rem' }}>
          {/* Brand */}
          <div>
            {logoUrl && <img src={logoUrl} alt="Cristalumex" style={{ height: 48, width: 'auto', objectFit: 'contain', filter: 'brightness(0) invert(1)', marginBottom: '1rem', display: 'block' }} />}
            <p style={{ fontSize: '.85rem', opacity: .85, lineHeight: 1.7 }}>{footer.desc}</p>
          </div>

          {/* Links */}
          <div>
            <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '.72rem', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: '1.25rem', opacity: .6 }}>Navegación</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '.6rem' }}>
              {[['nosotros', 'nosotros'], ['productos', 'productos'], ['galeria', 'galeria'], ['proyectos', 'proyectos'], ['contacto', 'contacto']].map(([key, id]) => (
                <button key={key} onClick={() => scrollTo(id)} style={{
                  background: 'none', border: 'none', color: '#fff', opacity: .85,
                  fontSize: '.88rem', cursor: 'pointer', textAlign: 'left', padding: 0,
                  transition: 'opacity .2s',
                }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '.85'}>
                  {nav[key] || key}
                </button>
              ))}
            </div>
          </div>

          {/* Contact info */}
          <div>
            <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '.72rem', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: '1.25rem', opacity: .6 }}>Contacto</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '.8rem' }}>
              <div style={{ display: 'flex', gap: '.6rem', alignItems: 'flex-start', fontSize: '.85rem', opacity: .85 }}>
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ flexShrink: 0, marginTop: 2 }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                {footer.address}
              </div>
              <a href={`https://wa.me/${redes.waNumber}`} target="_blank" rel="noreferrer" style={{ display: 'flex', gap: '.6rem', alignItems: 'flex-start', fontSize: '.85rem', opacity: .85, color: '#fff', transition: 'opacity .2s' }}
                onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                onMouseLeave={e => e.currentTarget.style.opacity = '.85'}>
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" style={{ flexShrink: 0, marginTop: 2 }}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.116.549 4.103 1.51 5.831L.055 23.454a.75.75 0 00.918.918l5.623-1.455A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.89 0-3.663-.523-5.181-1.433l-.371-.22-3.843.994.994-3.843-.22-.371A9.955 9.955 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
                WhatsApp: {redes.waNumber}
              </a>
              <a href={redes.fbUrl} target="_blank" rel="noreferrer" style={{ display: 'flex', gap: '.6rem', alignItems: 'center', fontSize: '.85rem', opacity: .85, color: '#fff', transition: 'opacity .2s' }}
                onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                onMouseLeave={e => e.currentTarget.style.opacity = '.85'}>
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                Facebook
              </a>
            </div>
          </div>

          {/* Hours */}
          <div>
            <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '.72rem', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: '1.25rem', opacity: .6 }}>Horario</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '.4rem', fontSize: '.85rem', opacity: .85 }}>
              <p>{footer.hours1}</p>
              <p>{footer.hours2}</p>
              <p>Domingo: Cerrado</p>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,.12)', paddingTop: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', fontSize: '.8rem', opacity: .55 }}>
          <span>{footer.copy}</span>
          <span>Hecho con ❤️ en Puebla, México</span>
        </div>
      </div>
    </footer>
  )
}

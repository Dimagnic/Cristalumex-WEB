import { useSite } from '../lib/context'

export default function Contacto() {
  const { siteData } = useSite()
  const sec = siteData?.contacto || {}
  const redes = siteData?.redes || {}

  const waLink = `https://wa.me/${redes.waNumber}?text=${encodeURIComponent(redes.waMsg || '')}`

  return (
    <section id="contacto" style={{
      padding: '5rem 1.5rem',
      background: 'linear-gradient(135deg, var(--primary) 0%, #1a3654 100%)',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(0,179,204,.15) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(0,102,204,.15) 0%, transparent 50%)',
      }} />
      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 800, color: '#fff', marginBottom: '1rem' }}>
          {sec.title}
        </h2>
        <p style={{ color: 'rgba(255,255,255,.85)', fontSize: '1.05rem', maxWidth: 560, margin: '0 auto 2.5rem' }}>
          {sec.subtitle}
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href={waLink} target="_blank" rel="noreferrer" style={{
            display: 'inline-flex', alignItems: 'center', gap: '.5rem',
            background: '#25D366', color: '#fff',
            fontFamily: 'Montserrat, sans-serif', fontSize: '.92rem', fontWeight: 700,
            padding: '.85rem 1.75rem', borderRadius: 'var(--radius)',
            boxShadow: '0 8px 24px rgba(37,211,102,.35)', transition: 'all .2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = '#1fba58'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#25D366'; e.currentTarget.style.transform = 'translateY(0)' }}>
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.116.549 4.103 1.51 5.831L.055 23.454a.75.75 0 00.918.918l5.623-1.455A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.89 0-3.663-.523-5.181-1.433l-.371-.22-3.843.994.994-3.843-.22-.371A9.955 9.955 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
            {sec.btnWa}
          </a>
          <a href={redes.fbUrl} target="_blank" rel="noreferrer" style={{
            display: 'inline-flex', alignItems: 'center', gap: '.5rem',
            background: 'transparent', color: '#fff',
            fontFamily: 'Montserrat, sans-serif', fontSize: '.92rem', fontWeight: 700,
            padding: '.85rem 1.75rem', borderRadius: 'var(--radius)',
            border: '2px solid rgba(255,255,255,.6)', transition: 'all .2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,.1)'; e.currentTarget.style.borderColor = '#fff' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.6)' }}>
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            {sec.btnFb}
          </a>
        </div>
      </div>
    </section>
  )
}

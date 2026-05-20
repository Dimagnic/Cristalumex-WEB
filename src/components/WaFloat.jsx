import { useSite } from '../lib/context'

export default function WaFloat() {
  const { siteData } = useSite()
  const redes = siteData?.redes || {}
  const waLink = `https://wa.me/${redes.waNumber}?text=${encodeURIComponent(redes.waMsg || '')}`

  return (
    <div style={{ position: 'fixed', bottom: '1.5rem', right: '1.5rem', zIndex: 100 }}
      onMouseEnter={e => e.currentTarget.querySelector('.wa-tooltip').style.opacity = '1'}
      onMouseLeave={e => e.currentTarget.querySelector('.wa-tooltip').style.opacity = '0'}>
      <div className="wa-tooltip" style={{
        position: 'absolute', right: 76, top: '50%', transform: 'translateY(-50%)',
        background: '#fff', color: 'var(--text)',
        fontFamily: 'Montserrat, sans-serif', fontSize: '.78rem', fontWeight: 600,
        padding: '.5rem 1rem', borderRadius: 8, whiteSpace: 'nowrap',
        boxShadow: '0 4px 16px rgba(0,0,0,.12)', opacity: 0, transition: 'opacity .2s',
        pointerEvents: 'none',
      }}>
        ¡Escríbenos!
        <div style={{ position: 'absolute', right: -8, top: '50%', transform: 'translateY(-50%)', borderLeft: '8px solid #fff', borderTop: '8px solid transparent', borderBottom: '8px solid transparent' }} />
      </div>
      <a href={waLink} target="_blank" rel="noreferrer">
        <button style={{
          width: 64, height: 64, borderRadius: '50%',
          background: '#25D366', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 24px rgba(37,211,102,.5)',
          animation: 'waFloat 3s ease-in-out infinite, waPulse 2s ease-in-out 1s infinite',
          transition: 'transform .2s',
        }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1) rotate(5deg)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1) rotate(0deg)'}>
          <svg width="36" height="36" fill="#fff" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.116.549 4.103 1.51 5.831L.055 23.454a.75.75 0 00.918.918l5.623-1.455A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.89 0-3.663-.523-5.181-1.433l-.371-.22-3.843.994.994-3.843-.22-.371A9.955 9.955 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
          </svg>
        </button>
      </a>
    </div>
  )
}

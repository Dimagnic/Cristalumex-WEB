import { useState, useEffect } from 'react'
import { useSite } from '../lib/context'

export default function Splash() {
  const [visible, setVisible] = useState(true)
  const { siteData } = useSite()

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 3000)
    return () => clearTimeout(t)
  }, [])

  if (!visible) return null

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: '#fff', display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      animation: 'splashFade .5s ease 2.5s forwards',
    }}>
      <style>{`
        @keyframes splashFade { to { opacity: 0; pointer-events: none; } }
        .splash-logo { width: 220px; height: auto; object-fit: contain;
          animation: logoPop 1.5s cubic-bezier(.22,1,.36,1) forwards,
                     logoGlow 2s ease-in-out 1.5s infinite; }
      `}</style>
      <img
        className="splash-logo"
        src={siteData?.logoUrl || '/logo.png'}
        alt="Cristalumex"
        onError={e => { e.target.style.display = 'none' }}
      />
    </div>
  )
}

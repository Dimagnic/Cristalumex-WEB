import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useSite } from '../lib/context'

// ── Sub-sections ──────────────────────────────────────────
import CMSHero from '../components/cms/CMSHero'
import CMSNosotros from '../components/cms/CMSNosotros'
import CMSProductos from '../components/cms/CMSProductos'
import CMSGaleria from '../components/cms/CMSGaleria'
import CMSTestimonios from '../components/cms/CMSTestimonios'
import CMSContacto from '../components/cms/CMSContacto'
import CMSColores from '../components/cms/CMSColores'
import CMSFooter from '../components/cms/CMSFooter'
import CMSRedes from '../components/cms/CMSRedes'

const SECTIONS = [
  { id: 'hero',        label: 'Hero / Banner',    icon: '🖼️',  group: 'Contenido' },
  { id: 'nosotros',    label: 'Nosotros',          icon: '🏢',  group: 'Contenido' },
  { id: 'productos',   label: 'Productos',         icon: '📦',  group: 'Contenido' },
  { id: 'galeria',     label: 'Galería',           icon: '🖼️',  group: 'Contenido' },
  { id: 'testimonios', label: 'Testimonios',       icon: '💬',  group: 'Contenido' },
  { id: 'contacto',    label: 'Contacto / CTA',   icon: '📞',  group: 'Contenido' },
  { id: 'colores',     label: 'Colores y Estilo',  icon: '🎨',  group: 'Configuración' },
  { id: 'footer',      label: 'Pie de Página',     icon: '📄',  group: 'Configuración' },
  { id: 'redes',       label: 'Redes Sociales',    icon: '🔗',  group: 'Configuración' },
]

const SECTION_COMPONENTS = {
  hero: CMSHero,
  nosotros: CMSNosotros,
  productos: CMSProductos,
  galeria: CMSGaleria,
  testimonios: CMSTestimonios,
  contacto: CMSContacto,
  colores: CMSColores,
  footer: CMSFooter,
  redes: CMSRedes,
}

export default function AdminPage() {
  const navigate = useNavigate()
  const { user, loading: authLoading, signIn, signOut } = useSite()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoginError('')
    setLoginLoading(true)
    try {
      await signIn(email, password)
      toast.success('Bienvenido al panel CMS')
    } catch (err) {
      setLoginError('Credenciales incorrectas. Verifica tu email y contraseña.')
    } finally {
      setLoginLoading(false)
    }
  }

  const handleLogout = async () => {
    await signOut()
    navigate('/')
  }

  if (authLoading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f1f5f9' }}>
        <div style={{ fontFamily: 'Montserrat, sans-serif', color: '#64748b' }}>Cargando...</div>
      </div>
    )
  }

  // ── LOGIN SCREEN ──────────────────────────────────────────
  if (!user) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(135deg, #1a3050 0%, #2c4a6e 100%)',
        padding: '1rem',
      }}>
        <div style={{
          background: '#fff', borderRadius: 20, padding: '2.5rem',
          width: '100%', maxWidth: 400,
          boxShadow: '0 20px 60px rgba(0,0,0,.3)',
        }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ width: 56, height: 56, borderRadius: 14, background: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
              <svg width="28" height="28" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
            </div>
            <h1 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800, fontSize: '1.4rem', color: '#1a3050', marginBottom: '.25rem' }}>Panel Administrativo</h1>
            <p style={{ fontSize: '.85rem', color: '#64748b' }}>Ingresa tus credenciales para acceder al CMS</p>
          </div>

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontFamily: 'Montserrat, sans-serif', fontSize: '.72rem', fontWeight: 700, color: '#64748b', marginBottom: '.35rem', textTransform: 'uppercase', letterSpacing: '.04em' }}>Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@cristalumex.com"
                required
                style={{ width: '100%', padding: '.65rem .9rem', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: '.88rem', outline: 'none', fontFamily: 'inherit', transition: 'border .2s' }}
                onFocus={e => e.target.style.borderColor = 'var(--secondary)'}
                onBlur={e => e.target.style.borderColor = '#e2e8f0'}
              />
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontFamily: 'Montserrat, sans-serif', fontSize: '.72rem', fontWeight: 700, color: '#64748b', marginBottom: '.35rem', textTransform: 'uppercase', letterSpacing: '.04em' }}>Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{ width: '100%', padding: '.65rem .9rem', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: '.88rem', outline: 'none', fontFamily: 'inherit', transition: 'border .2s' }}
                onFocus={e => e.target.style.borderColor = 'var(--secondary)'}
                onBlur={e => e.target.style.borderColor = '#e2e8f0'}
              />
            </div>
            {loginError && (
              <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: 8, padding: '.75rem 1rem', marginBottom: '1rem', color: '#dc2626', fontSize: '.82rem' }}>
                {loginError}
              </div>
            )}
            <button type="submit" disabled={loginLoading} style={{
              width: '100%', background: 'var(--secondary)', color: '#fff',
              fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '.95rem',
              padding: '.85rem', borderRadius: 10, border: 'none', cursor: loginLoading ? 'not-allowed' : 'pointer',
              opacity: loginLoading ? .7 : 1, transition: 'all .2s',
            }}>
              {loginLoading ? 'Verificando...' : 'Iniciar Sesión'}
            </button>
          </form>

          <button onClick={() => navigate('/')} style={{
            display: 'block', width: '100%', marginTop: '1rem',
            background: 'none', border: 'none', color: '#64748b',
            fontSize: '.82rem', cursor: 'pointer', textAlign: 'center', padding: '.5rem',
          }}>
            ← Volver al sitio
          </button>
        </div>
      </div>
    )
  }

  // ── CMS PANEL ──────────────────────────────────────────
  const ActiveComponent = SECTION_COMPONENTS[activeSection]
  const groups = [...new Set(SECTIONS.map(s => s.group))]

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', fontFamily: 'Inter, sans-serif' }}>
      {/* Sidebar */}
      <div style={{
        width: 240, background: '#1a3050', color: '#fff',
        display: 'flex', flexDirection: 'column', flexShrink: 0, overflowY: 'auto',
      }}>
        <div style={{ padding: '1.5rem 1.25rem', borderBottom: '1px solid rgba(255,255,255,.08)' }}>
          <div style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800, fontSize: '1rem', marginBottom: '.25rem' }}>Cristalumex</div>
          <div style={{ fontSize: '.65rem', fontWeight: 700, letterSpacing: '.15em', textTransform: 'uppercase', opacity: .5 }}>Panel CMS</div>
        </div>

        <nav style={{ flex: 1, padding: '.5rem 0' }}>
          {groups.map(group => (
            <div key={group}>
              <div style={{ padding: '.75rem 1rem .25rem', fontFamily: 'Montserrat, sans-serif', fontSize: '.6rem', fontWeight: 700, letterSpacing: '.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,.35)' }}>
                {group}
              </div>
              {SECTIONS.filter(s => s.group === group).map(sec => (
                <button key={sec.id} onClick={() => setActiveSection(sec.id)} style={{
                  display: 'flex', alignItems: 'center', gap: '.65rem',
                  width: '100%', padding: '.6rem 1rem', background: activeSection === sec.id ? 'rgba(0,102,204,.4)' : 'none',
                  border: 'none', color: activeSection === sec.id ? '#fff' : 'rgba(255,255,255,.7)',
                  fontFamily: 'Inter, sans-serif', fontSize: '.83rem', cursor: 'pointer',
                  textAlign: 'left', transition: 'all .2s', borderRadius: 4,
                }}
                  onMouseEnter={e => { if (activeSection !== sec.id) e.currentTarget.style.background = 'rgba(255,255,255,.08)' }}
                  onMouseLeave={e => { if (activeSection !== sec.id) e.currentTarget.style.background = 'none' }}>
                  <span style={{ fontSize: '1rem' }}>{sec.icon}</span>
                  {sec.label}
                </button>
              ))}
            </div>
          ))}
        </nav>

        <div style={{ padding: '1rem', borderTop: '1px solid rgba(255,255,255,.08)' }}>
          <button onClick={() => navigate('/')} style={{
            display: 'flex', alignItems: 'center', gap: '.5rem', width: '100%',
            background: 'rgba(255,255,255,.06)', border: 'none', borderRadius: 8,
            padding: '.65rem 1rem', color: 'rgba(255,255,255,.6)', fontSize: '.83rem',
            cursor: 'pointer', marginBottom: '.5rem', transition: 'all .2s',
          }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,.12)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,.06)'}>
            🌐 Ver sitio
          </button>
          <button onClick={handleLogout} style={{
            display: 'flex', alignItems: 'center', gap: '.5rem', width: '100%',
            background: 'rgba(255,255,255,.06)', border: 'none', borderRadius: 8,
            padding: '.65rem 1rem', color: 'rgba(255,255,255,.6)', fontSize: '.83rem',
            cursor: 'pointer', transition: 'all .2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,100,100,.2)'; e.currentTarget.style.color = '#ff8080' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,.06)'; e.currentTarget.style.color = 'rgba(255,255,255,.6)' }}>
            🚪 Cerrar Sesión
          </button>
        </div>
      </div>

      {/* Main */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#f8fafc' }}>
        {/* Topbar */}
        <div style={{
          background: '#fff', borderBottom: '1px solid #e2e8f0',
          padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexShrink: 0,
        }}>
          <div>
            <div style={{ fontSize: '.8rem', color: '#94a3b8' }}>Panel CMS</div>
            <h1 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '1.1rem', fontWeight: 800, color: '#1a3050' }}>
              {SECTIONS.find(s => s.id === activeSection)?.label}
            </h1>
          </div>
          <div style={{ fontSize: '.8rem', color: '#64748b' }}>
            👤 {user.email}
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
          {ActiveComponent && <ActiveComponent />}
        </div>
      </div>
    </div>
  )
}

import { useState } from 'react'
import toast from 'react-hot-toast'
import { useSite } from '../../lib/context'
import { Card, Field, Row, SaveButton } from './CMSFields'

function ColorField({ label, value, onChange }) {
  return (
    <Field label={label}>
      <div style={{ display: 'flex', gap: '.5rem', alignItems: 'center' }}>
        <input type="color" value={value} onChange={e => onChange(e.target.value)}
          style={{ width: 44, height: 36, borderRadius: 8, border: '1.5px solid #e2e8f0', padding: 2, cursor: 'pointer', background: '#f8fafc' }} />
        <input type="text" value={value} onChange={e => { if (/^#[0-9a-f]{0,6}$/i.test(e.target.value)) onChange(e.target.value) }}
          style={{ flex: 1, padding: '.6rem .85rem', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: '.88rem', fontFamily: 'monospace', background: '#f8fafc', outline: 'none' }} />
      </div>
    </Field>
  )
}

export default function CMSColores() {
  const { siteData, saveSiteData } = useSite()
  const [colors, setColors] = useState(siteData?.colors || {})
  const [navData, setNavData] = useState(siteData?.nav || {})
  const [loading, setLoading] = useState(false)

  const setColor = (key) => (val) => {
    setColors(c => ({ ...c, [key]: val }))
    // live preview
    const map = { primary: ['--primary', '--text'], secondary: ['--secondary'], accent: ['--accent'], bg: ['--bg'] }
    ;(map[key] || [key]).forEach(v => document.documentElement.style.setProperty(v, val))
  }

  const setNav = (key) => (val) => setNavData(d => ({ ...d, [key]: val }))

  const handleSave = async () => {
    setLoading(true)
    try {
      await saveSiteData({ colors, nav: navData })
      toast.success('Colores y navegación guardados')
    } catch {
      toast.error('Error al guardar')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Card title="🎨 Colores del Sitio (preview en vivo)">
        <Row>
          <ColorField label="Color Primario" value={colors.primary || '#2c4a6e'} onChange={setColor('primary')} />
          <ColorField label="Color Secundario" value={colors.secondary || '#0066cc'} onChange={setColor('secondary')} />
        </Row>
        <Row>
          <ColorField label="Color Acento" value={colors.accent || '#00b3cc'} onChange={setColor('accent')} />
          <ColorField label="Fondo" value={colors.bg || '#ffffff'} onChange={setColor('bg')} />
        </Row>
      </Card>

      <Card title="🧭 Etiquetas de Navegación">
        {[['nosotros', 'Nosotros'], ['productos', 'Productos'], ['galeria', 'Galería'], ['proyectos', 'Proyectos'], ['contacto', 'Contacto']].map(([key, placeholder]) => (
          <Field key={key} label={placeholder}>
            <input value={navData[key] || ''} onChange={e => setNav(key)(e.target.value)}
              placeholder={placeholder}
              style={{ width: '100%', padding: '.6rem .85rem', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: '.88rem', fontFamily: 'Inter, sans-serif', background: '#f8fafc', outline: 'none' }} />
          </Field>
        ))}
      </Card>

      <SaveButton onClick={handleSave} loading={loading} />
    </div>
  )
}

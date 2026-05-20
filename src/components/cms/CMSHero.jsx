import { useState } from 'react'
import toast from 'react-hot-toast'
import { useSite } from '../../lib/context'
import { Card, Field, Input, Textarea, Row, SaveButton } from './CMSFields'

export default function CMSHero() {
  const { siteData, saveSiteData } = useSite()
  const [data, setData] = useState(siteData?.hero || {})
  const [logoUrl, setLogoUrl] = useState(siteData?.logoUrl || '')
  const [loading, setLoading] = useState(false)

  const set = (key) => (val) => setData(d => ({ ...d, [key]: val }))

  const handleSave = async () => {
    setLoading(true)
    try {
      await saveSiteData({ hero: data, logoUrl })
      toast.success('Hero actualizado correctamente')
    } catch {
      toast.error('Error al guardar. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Card title="🖼️ Logo del Sitio">
        <Field label="URL del Logo">
          <Input value={logoUrl} onChange={setLogoUrl} placeholder="https://..." />
        </Field>
        {logoUrl && <img src={logoUrl} alt="logo preview" style={{ height: 48, marginTop: '.5rem', objectFit: 'contain' }} />}
      </Card>

      <Card title="📝 Textos del Hero">
        <Field label="Título Principal">
          <Textarea value={data.title || ''} onChange={set('title')} rows={2} />
        </Field>
        <Field label="Subtítulo">
          <Textarea value={data.subtitle || ''} onChange={set('subtitle')} rows={3} />
        </Field>
        <Row>
          <Field label="Botón Primario (WhatsApp)">
            <Input value={data.btn1 || ''} onChange={set('btn1')} />
          </Field>
          <Field label="Botón Secundario">
            <Input value={data.btn2 || ''} onChange={set('btn2')} />
          </Field>
        </Row>
      </Card>

      <Card title="🌅 Fondo e Overlay">
        <Field label="URL de Imagen de Fondo">
          <Input value={data.bgUrl || ''} onChange={set('bgUrl')} placeholder="https://..." />
        </Field>
        <Field label={`Opacidad del Overlay: ${data.overlayOpacity || 0.87}`}>
          <input
            type="range" min="0.3" max="0.98" step="0.01"
            value={data.overlayOpacity || 0.87}
            onChange={e => set('overlayOpacity')(parseFloat(e.target.value))}
            style={{ width: '100%' }}
          />
        </Field>
      </Card>

      <SaveButton onClick={handleSave} loading={loading} />
    </div>
  )
}

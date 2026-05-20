import { useState } from 'react'
import toast from 'react-hot-toast'
import { useSite } from '../../lib/context'
import { Card, Field, Input, Textarea, SaveButton } from './CMSFields'

export default function CMSRedes() {
  const { siteData, saveSiteData } = useSite()
  const [data, setData] = useState(siteData?.redes || {})
  const [loading, setLoading] = useState(false)
  const set = (key) => (val) => setData(d => ({ ...d, [key]: val }))

  const handleSave = async () => {
    setLoading(true)
    try {
      await saveSiteData({ redes: data })
      toast.success('Redes sociales guardadas')
    } catch {
      toast.error('Error al guardar')
    } finally {
      setLoading(false)
    }
  }

  const waPreview = `https://wa.me/${data.waNumber}?text=${encodeURIComponent(data.waMsg || '')}`

  return (
    <div>
      <Card title="💬 WhatsApp">
        <Field label="Número de WhatsApp (con código de país, sin + ni espacios)">
          <Input value={data.waNumber || ''} onChange={set('waNumber')} placeholder="522221234567" />
        </Field>
        <Field label="Mensaje predeterminado">
          <Textarea value={data.waMsg || ''} onChange={set('waMsg')} rows={3} />
        </Field>
        {data.waNumber && (
          <div style={{ marginTop: '.5rem' }}>
            <a href={waPreview} target="_blank" rel="noreferrer" style={{ fontSize: '.78rem', color: '#25D366', textDecoration: 'underline' }}>
              🔗 Probar enlace de WhatsApp
            </a>
          </div>
        )}
      </Card>

      <Card title="📘 Facebook">
        <Field label="URL de Facebook">
          <Input value={data.fbUrl || ''} onChange={set('fbUrl')} placeholder="https://facebook.com/cristalumex" />
        </Field>
        {data.fbUrl && (
          <a href={data.fbUrl} target="_blank" rel="noreferrer" style={{ fontSize: '.78rem', color: '#0066cc', textDecoration: 'underline' }}>
            🔗 Abrir página de Facebook
          </a>
        )}
      </Card>

      <SaveButton onClick={handleSave} loading={loading} />
    </div>
  )
}

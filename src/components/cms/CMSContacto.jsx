import { useState } from 'react'
import toast from 'react-hot-toast'
import { useSite } from '../../lib/context'
import { Card, Field, Input, Textarea, Row, SaveButton } from './CMSFields'

export default function CMSContacto() {
  const { siteData, saveSiteData } = useSite()
  const [data, setData] = useState(siteData?.contacto || {})
  const [loading, setLoading] = useState(false)
  const set = (key) => (val) => setData(d => ({ ...d, [key]: val }))

  const handleSave = async () => {
    setLoading(true)
    try {
      await saveSiteData({ contacto: data })
      toast.success('Sección Contacto guardada')
    } catch {
      toast.error('Error al guardar')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Card title="📞 Sección Contacto / CTA">
        <Field label="Título"><Textarea value={data.title || ''} onChange={set('title')} rows={2} /></Field>
        <Field label="Subtítulo"><Textarea value={data.subtitle || ''} onChange={set('subtitle')} rows={3} /></Field>
        <Row>
          <Field label="Texto Botón WhatsApp"><Input value={data.btnWa || ''} onChange={set('btnWa')} /></Field>
          <Field label="Texto Botón Facebook"><Input value={data.btnFb || ''} onChange={set('btnFb')} /></Field>
        </Row>
      </Card>
      <SaveButton onClick={handleSave} loading={loading} />
    </div>
  )
}

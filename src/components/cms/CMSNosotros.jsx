import { useState } from 'react'
import toast from 'react-hot-toast'
import { useSite } from '../../lib/context'
import { Card, Field, Input, Textarea, SaveButton } from './CMSFields'

export default function CMSNosotros() {
  const { siteData, saveSiteData } = useSite()
  const [data, setData] = useState(siteData?.nosotros || {})
  const [loading, setLoading] = useState(false)
  const set = (key) => (val) => setData(d => ({ ...d, [key]: val }))

  const handleSave = async () => {
    setLoading(true)
    try {
      await saveSiteData({ nosotros: data })
      toast.success('Sección Nosotros guardada')
    } catch {
      toast.error('Error al guardar')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Card title="🏢 Sección Nosotros">
        <Field label="Badge / Etiqueta"><Input value={data.badge || ''} onChange={set('badge')} /></Field>
        <Field label="Título"><Input value={data.title || ''} onChange={set('title')} /></Field>
        <Field label="Subtítulo"><Textarea value={data.subtitle || ''} onChange={set('subtitle')} /></Field>
      </Card>
      <SaveButton onClick={handleSave} loading={loading} />
    </div>
  )
}

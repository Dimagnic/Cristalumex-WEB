import { useState } from 'react'
import toast from 'react-hot-toast'
import { useSite } from '../../lib/context'
import { Card, Field, Input, Textarea, Row, SaveButton } from './CMSFields'

export default function CMSFooter() {
  const { siteData, saveSiteData } = useSite()
  const [data, setData] = useState(siteData?.footer || {})
  const [loading, setLoading] = useState(false)
  const set = (key) => (val) => setData(d => ({ ...d, [key]: val }))

  const handleSave = async () => {
    setLoading(true)
    try {
      await saveSiteData({ footer: data })
      toast.success('Pie de página guardado')
    } catch {
      toast.error('Error al guardar')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Card title="📄 Pie de Página">
        <Field label="Descripción de la Empresa"><Textarea value={data.desc || ''} onChange={set('desc')} rows={3} /></Field>
        <Field label="Dirección"><Input value={data.address || ''} onChange={set('address')} /></Field>
        <Row>
          <Field label="Horario Lunes-Viernes"><Input value={data.hours1 || ''} onChange={set('hours1')} /></Field>
          <Field label="Horario Sábado"><Input value={data.hours2 || ''} onChange={set('hours2')} /></Field>
        </Row>
        <Field label="Texto de Copyright"><Input value={data.copy || ''} onChange={set('copy')} /></Field>
      </Card>
      <SaveButton onClick={handleSave} loading={loading} />
    </div>
  )
}

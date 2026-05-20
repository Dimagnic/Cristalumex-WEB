import { useState } from 'react'
import toast from 'react-hot-toast'
import { useSite } from '../../lib/context'
import { Card, Field, Input, Textarea, Row, SaveButton, AddButton, DangerButton } from './CMSFields'

export default function CMSTestimonios() {
  const { siteData, saveSiteData, testimonials, saveTestimonials, deleteTestimonial } = useSite()
  const [secData, setSecData] = useState(siteData?.testimonios || {})
  const [local, setLocal] = useState(testimonials)
  const [loading, setLoading] = useState(false)
  const setSec = (key) => (val) => setSecData(d => ({ ...d, [key]: val }))

  const update = (id, key, val) => setLocal(ts => ts.map(t => t.id === id ? { ...t, [key]: val } : t))

  const handleAdd = () => {
    setLocal(ts => [...ts, { id: Date.now(), name: 'Nuevo Cliente', role: '', text: 'Excelente servicio.' }])
  }

  const handleDelete = async (id) => {
    setLocal(ts => ts.filter(t => t.id !== id))
    await deleteTestimonial(id)
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      await saveSiteData({ testimonios: secData })
      await saveTestimonials(local)
      toast.success('Testimonios guardados correctamente')
    } catch {
      toast.error('Error al guardar')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Card title="💬 Encabezado de Sección">
        <Field label="Badge"><Input value={secData.badge || ''} onChange={setSec('badge')} /></Field>
        <Field label="Título"><Input value={secData.title || ''} onChange={setSec('title')} /></Field>
        <Field label="Subtítulo"><Textarea value={secData.subtitle || ''} onChange={setSec('subtitle')} /></Field>
      </Card>

      <Card title="💬 Testimonios">
        {local.map((t, i) => (
          <div key={t.id} style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: 10, padding: '1rem', marginBottom: '.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '.75rem' }}>
              <strong style={{ fontSize: '.85rem', color: '#1a3050' }}>{t.name}</strong>
              <DangerButton onClick={() => handleDelete(t.id)} />
            </div>
            <Row>
              <Field label="Nombre"><Input value={t.name} onChange={v => update(t.id, 'name', v)} /></Field>
              <Field label="Cargo / Rol"><Input value={t.role} onChange={v => update(t.id, 'role', v)} /></Field>
            </Row>
            <Field label="Testimonio"><Textarea value={t.text} onChange={v => update(t.id, 'text', v)} rows={3} /></Field>
          </div>
        ))}
        <AddButton onClick={handleAdd}>+ Agregar Testimonio</AddButton>
      </Card>

      <SaveButton onClick={handleSave} loading={loading} />
    </div>
  )
}

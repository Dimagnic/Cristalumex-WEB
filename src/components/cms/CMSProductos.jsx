import { useState } from 'react'
import toast from 'react-hot-toast'
import { useSite } from '../../lib/context'
import { Card, Field, Input, Textarea, Row, SaveButton, AddButton, DangerButton } from './CMSFields'

export default function CMSProductos() {
  const { siteData, saveSiteData, products, saveProducts, deleteProduct } = useSite()
  const [secData, setSecData] = useState(siteData?.productos || {})
  const [localProducts, setLocalProducts] = useState(products)
  const [loading, setLoading] = useState(false)
  const setSec = (key) => (val) => setSecData(d => ({ ...d, [key]: val }))

  const updateProduct = (id, key, val) => {
    setLocalProducts(ps => ps.map(p => p.id === id ? { ...p, [key]: val } : p))
  }

  const handleAdd = () => {
    const newP = { id: Date.now(), title: 'Nuevo Producto', desc: 'Descripción del producto.' }
    setLocalProducts(ps => [...ps, newP])
  }

  const handleDelete = async (id) => {
    setLocalProducts(ps => ps.filter(p => p.id !== id))
    await deleteProduct(id)
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      await saveSiteData({ productos: secData })
      await saveProducts(localProducts)
      toast.success('Productos guardados correctamente')
    } catch {
      toast.error('Error al guardar')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Card title="📦 Encabezado de Sección">
        <Field label="Badge"><Input value={secData.badge || ''} onChange={setSec('badge')} /></Field>
        <Field label="Título"><Input value={secData.title || ''} onChange={setSec('title')} /></Field>
        <Field label="Subtítulo"><Textarea value={secData.subtitle || ''} onChange={setSec('subtitle')} /></Field>
      </Card>

      <Card title="📦 Productos">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
          {localProducts.map((p, i) => (
            <div key={p.id} style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: 12, padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '.75rem' }}>
                <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '.8rem', fontWeight: 700, color: '#1a3050' }}>#{i + 1} {p.title}</span>
                <DangerButton onClick={() => handleDelete(p.id)} />
              </div>
              <Field label="Título">
                <Input value={p.title} onChange={(val) => updateProduct(p.id, 'title', val)} />
              </Field>
              <Field label="Descripción">
                <Textarea value={p.desc} onChange={(val) => updateProduct(p.id, 'desc', val)} rows={3} />
              </Field>
            </div>
          ))}
        </div>
        <AddButton onClick={handleAdd}>+ Agregar Producto</AddButton>
      </Card>

      <SaveButton onClick={handleSave} loading={loading} />
    </div>
  )
}

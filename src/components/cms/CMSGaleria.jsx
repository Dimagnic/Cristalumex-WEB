import { useState } from 'react'
import toast from 'react-hot-toast'
import { useSite } from '../../lib/context'
import { Card, Field, Input, Textarea, Row, SaveButton, AddButton, DangerButton } from './CMSFields'

export default function CMSGaleria() {
  const { siteData, saveSiteData, gallery, saveGallery, deleteGalleryItem } = useSite()
  const [secData, setSecData] = useState(siteData?.galeria || {})
  const [localGallery, setLocalGallery] = useState(gallery)
  const [newUrl, setNewUrl] = useState('')
  const [newCat, setNewCat] = useState('Casas')
  const [newAlt, setNewAlt] = useState('')
  const [loading, setLoading] = useState(false)
  const setSec = (key) => (val) => setSecData(d => ({ ...d, [key]: val }))

  const handleAdd = () => {
    if (!newUrl.trim()) return toast.error('Ingresa la URL de la imagen')
    const img = { id: Date.now(), url: newUrl.trim(), cat: newCat, alt: newAlt || 'Proyecto Cristalumex' }
    setLocalGallery(g => [...g, img])
    setNewUrl(''); setNewAlt('')
  }

  const handleDelete = async (id) => {
    setLocalGallery(g => g.filter(i => i.id !== id))
    await deleteGalleryItem(id)
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      await saveSiteData({ galeria: secData })
      await saveGallery(localGallery)
      toast.success('Galería guardada correctamente')
    } catch {
      toast.error('Error al guardar')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Card title="🖼️ Encabezado de Sección">
        <Field label="Badge"><Input value={secData.badge || ''} onChange={setSec('badge')} /></Field>
        <Field label="Título"><Input value={secData.title || ''} onChange={setSec('title')} /></Field>
        <Field label="Subtítulo"><Textarea value={secData.subtitle || ''} onChange={setSec('subtitle')} /></Field>
        <Field label="Categorías (separadas por coma)">
          <Input value={secData.cats || ''} onChange={setSec('cats')} placeholder="Casas, Oficinas, Fachadas" />
        </Field>
      </Card>

      <Card title="➕ Agregar Imagen">
        <Row>
          <Field label="URL de la Imagen">
            <Input value={newUrl} onChange={setNewUrl} placeholder="https://..." />
          </Field>
          <Field label="Categoría">
            <select value={newCat} onChange={e => setNewCat(e.target.value)}
              style={{ width: '100%', padding: '.6rem .85rem', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: '.88rem', background: '#f8fafc', outline: 'none' }}>
              {(secData.cats || 'Casas,Oficinas,Fachadas,Baños,Instalaciones').split(',').map(c => (
                <option key={c.trim()} value={c.trim()}>{c.trim()}</option>
              ))}
            </select>
          </Field>
        </Row>
        <Field label="Descripción (alt)">
          <Input value={newAlt} onChange={setNewAlt} placeholder="Descripción breve del proyecto" />
        </Field>
        <AddButton onClick={handleAdd}>+ Agregar Imagen</AddButton>
      </Card>

      <Card title="🖼️ Imágenes Actuales">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '.75rem' }}>
          {localGallery.map(img => (
            <div key={img.id} style={{ position: 'relative', aspectRatio: '4/3', borderRadius: 8, overflow: 'hidden', border: '2px solid #e2e8f0' }}
              onMouseEnter={e => e.currentTarget.querySelector('.del-overlay').style.opacity = '1'}
              onMouseLeave={e => e.currentTarget.querySelector('.del-overlay').style.opacity = '0'}>
              <img src={img.url} alt={img.alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div className="del-overlay" style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,.55)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '.35rem', opacity: 0, transition: 'opacity .2s' }}>
                <span style={{ color: '#fff', fontSize: '.65rem', textAlign: 'center', padding: '0 .25rem' }}>{img.cat}</span>
                <DangerButton onClick={() => handleDelete(img.id)} />
              </div>
            </div>
          ))}
        </div>
      </Card>

      <SaveButton onClick={handleSave} loading={loading} />
    </div>
  )
}

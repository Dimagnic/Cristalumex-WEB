import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { DEFAULT_SITE_DATA, DEFAULT_PRODUCTS, DEFAULT_GALLERY, DEFAULT_TESTIMONIALS } from '../lib/defaults'

export function useSiteData() {
  const [siteData, setSiteData] = useState(DEFAULT_SITE_DATA)
  const [products, setProducts] = useState(DEFAULT_PRODUCTS)
  const [gallery, setGallery] = useState(DEFAULT_GALLERY)
  const [testimonials, setTestimonials] = useState(DEFAULT_TESTIMONIALS)
  const [loading, setLoading] = useState(true)

  const fetchAll = useCallback(async () => {
    try {
      const [sdRes, prRes, gaRes, teRes] = await Promise.all([
        supabase.from('site_data').select('*').eq('id', 1).maybeSingle(),
        supabase.from('products').select('*').order('sort_order'),
        supabase.from('gallery').select('*').order('sort_order'),
        supabase.from('testimonials').select('*').order('sort_order'),
      ])

      // 🔥 SITE DATA FIX (NO sobrescribe con undefined)
      if (sdRes.data?.content) {
        setSiteData({ ...DEFAULT_SITE_DATA, ...sdRes.data.content })
      } else {
        setSiteData(DEFAULT_SITE_DATA)
      }

      // 🔥 LISTAS SEGURAS: usa defaults si Supabase devuelve vacío
      setProducts(prRes.data?.length ? prRes.data : DEFAULT_PRODUCTS)
      setGallery(gaRes.data?.length ? gaRes.data : DEFAULT_GALLERY)
      setTestimonials(teRes.data?.length ? teRes.data : DEFAULT_TESTIMONIALS)

    } catch (err) {
      console.error('Supabase error:', err)
      setSiteData(DEFAULT_SITE_DATA)
      setProducts(DEFAULT_PRODUCTS)
      setGallery(DEFAULT_GALLERY)
      setTestimonials(DEFAULT_TESTIMONIALS)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchAll()

    const channel = supabase
      .channel('site-updates')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'site_data' }, fetchAll)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, fetchAll)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'gallery' }, fetchAll)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'testimonials' }, fetchAll)
      .subscribe()

    return () => supabase.removeChannel(channel)
  }, [fetchAll])

  const saveSiteData = async (newData) => {
    const merged = { ...siteData, ...newData }
    setSiteData(merged)

    const { error } = await supabase
      .from('site_data')
      .upsert({ id: 1, content: merged })

    if (error) console.error('saveSiteData error:', error)
  }

  // Guarda una lista en Supabase: INSERT para items nuevos (id temporal string),
  // UPDATE para items existentes (id numérico real de Supabase).
  // Devuelve la lista con los IDs reales asignados por Supabase.
  const _saveList = async (table, items, fields) => {
    const result = []

    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      const isNew = typeof item.id === 'string' // IDs temporales son strings ('new-...')

      if (isNew) {
        // INSERT: no enviamos id, Supabase asigna BIGSERIAL
        const payload = {}
        fields.forEach(f => { if (item[f] !== undefined) payload[f] = item[f] })
        payload.sort_order = i

        const { data, error } = await supabase
          .from(table)
          .insert(payload)
          .select()
          .single()

        if (error) console.error(`${table} INSERT error:`, error)
        else result.push(data)
      } else {
        // UPDATE: el id es numérico real de Supabase
        const payload = {}
        fields.forEach(f => { if (item[f] !== undefined) payload[f] = item[f] })
        payload.sort_order = i

        const { data, error } = await supabase
          .from(table)
          .update(payload)
          .eq('id', item.id)
          .select()
          .single()

        if (error) console.error(`${table} UPDATE error:`, error)
        else result.push(data)
      }
    }

    return result
  }

  const saveProducts = async (newProducts) => {
    const saved = await _saveList('products', newProducts, ['title', 'desc'])
    setProducts(saved)
    return saved
  }

  const saveGallery = async (newGallery) => {
    const saved = await _saveList('gallery', newGallery, ['url', 'cat', 'alt'])
    setGallery(saved)
    return saved
  }

  const saveTestimonials = async (newTestimonials) => {
    const saved = await _saveList('testimonials', newTestimonials, ['name', 'role', 'text'])
    setTestimonials(saved)
    return saved
  }

  const deleteProduct = async (id) => {
    const updated = products.filter(p => p.id !== id)
    setProducts(updated)

    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)

    if (error) console.error(error)
  }

  const deleteGalleryItem = async (id) => {
    const updated = gallery.filter(g => g.id !== id)
    setGallery(updated)

    const { error } = await supabase
      .from('gallery')
      .delete()
      .eq('id', id)

    if (error) console.error(error)
  }

  const deleteTestimonial = async (id) => {
    const updated = testimonials.filter(t => t.id !== id)
    setTestimonials(updated)

    const { error } = await supabase
      .from('testimonials')
      .delete()
      .eq('id', id)

    if (error) console.error(error)
  }

  return {
    siteData,
    products,
    gallery,
    testimonials,
    loading,
    saveSiteData,
    saveProducts,
    saveGallery,
    saveTestimonials,
    deleteProduct,
    deleteGalleryItem,
    deleteTestimonial,
    setProducts,
    setGallery,
    setTestimonials,
  }
}

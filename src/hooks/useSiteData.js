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
        supabase.from('site_data').select('*').eq('id', 1).single(),
        supabase.from('products').select('*').order('sort_order'),
        supabase.from('gallery').select('*').order('sort_order'),
        supabase.from('testimonials').select('*').order('sort_order'),
      ])

      if (sdRes.data) setSiteData({ ...DEFAULT_SITE_DATA, ...sdRes.data.content })
      if (prRes.data && prRes.data.length > 0) setProducts(prRes.data)
      if (gaRes.data && gaRes.data.length > 0) setGallery(gaRes.data)
      if (teRes.data && teRes.data.length > 0) setTestimonials(teRes.data)
    } catch (err) {
      console.warn('Using default data (Supabase not configured):', err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchAll()

    // Real-time subscription for live updates
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
    await supabase.from('site_data').upsert({ id: 1, content: merged })
  }

  const saveProducts = async (newProducts) => {
    setProducts(newProducts)
    for (let i = 0; i < newProducts.length; i++) {
      const p = { ...newProducts[i], sort_order: i }
      if (typeof p.id === 'number' && p.id < 1000000000000) {
        await supabase.from('products').upsert(p)
      } else {
        const { id, ...rest } = p
        await supabase.from('products').insert({ ...rest })
      }
    }
  }

  const saveGallery = async (newGallery) => {
    setGallery(newGallery)
    for (let i = 0; i < newGallery.length; i++) {
      const g = { ...newGallery[i], sort_order: i }
      if (typeof g.id === 'number' && g.id < 1000000000000) {
        await supabase.from('gallery').upsert(g)
      } else {
        const { id, ...rest } = g
        await supabase.from('gallery').insert({ ...rest })
      }
    }
  }

  const saveTestimonials = async (newTestimonials) => {
    setTestimonials(newTestimonials)
    for (let i = 0; i < newTestimonials.length; i++) {
      const t = { ...newTestimonials[i], sort_order: i }
      if (typeof t.id === 'number' && t.id < 1000000000000) {
        await supabase.from('testimonials').upsert(t)
      } else {
        const { id, ...rest } = t
        await supabase.from('testimonials').insert({ ...rest })
      }
    }
  }

  const deleteProduct = async (id) => {
    const updated = products.filter(p => p.id !== id)
    setProducts(updated)
    await supabase.from('products').delete().eq('id', id)
  }

  const deleteGalleryItem = async (id) => {
    const updated = gallery.filter(g => g.id !== id)
    setGallery(updated)
    await supabase.from('gallery').delete().eq('id', id)
  }

  const deleteTestimonial = async (id) => {
    const updated = testimonials.filter(t => t.id !== id)
    setTestimonials(updated)
    await supabase.from('testimonials').delete().eq('id', id)
  }

  return {
    siteData, products, gallery, testimonials, loading,
    saveSiteData, saveProducts, saveGallery, saveTestimonials,
    deleteProduct, deleteGalleryItem, deleteTestimonial,
    setProducts, setGallery, setTestimonials,
  }
}

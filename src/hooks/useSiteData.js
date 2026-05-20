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

      // 🔥 LISTAS SEGURAS
      setProducts(prRes.data || [])
      setGallery(gaRes.data || [])
      setTestimonials(teRes.data || [])

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

  const saveProducts = async (newProducts) => {
    setProducts(newProducts)

    for (let i = 0; i < newProducts.length; i++) {
      const p = { ...newProducts[i], sort_order: i }

      const { error } = await supabase
        .from('products')
        .upsert(p)

      if (error) console.error('saveProducts error:', error)
    }
  }

  const saveGallery = async (newGallery) => {
    setGallery(newGallery)

    for (let i = 0; i < newGallery.length; i++) {
      const g = { ...newGallery[i], sort_order: i }

      const { error } = await supabase
        .from('gallery')
        .upsert(g)

      if (error) console.error('saveGallery error:', error)
    }
  }

  const saveTestimonials = async (newTestimonials) => {
    setTestimonials(newTestimonials)

    for (let i = 0; i < newTestimonials.length; i++) {
      const t = { ...newTestimonials[i], sort_order: i }

      const { error } = await supabase
        .from('testimonials')
        .upsert(t)

      if (error) console.error('saveTestimonials error:', error)
    }
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

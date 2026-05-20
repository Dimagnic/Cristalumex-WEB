import { Routes, Route } from 'react-router-dom'
import { useSiteData } from './hooks/useSiteData'
import { useAuth } from './hooks/useAuth'
import { SiteContext } from './lib/context'
import HomePage from './pages/HomePage'
import AdminPage from './pages/AdminPage'

export default function App() {
  const siteDataHook = useSiteData()
  const authHook = useAuth()

  // Apply dynamic colors from siteData
  const { siteData } = siteDataHook
  if (siteData?.colors) {
    const root = document.documentElement
    root.style.setProperty('--primary', siteData.colors.primary)
    root.style.setProperty('--secondary', siteData.colors.secondary)
    root.style.setProperty('--accent', siteData.colors.accent)
    root.style.setProperty('--bg', siteData.colors.bg)
    root.style.setProperty('--text', siteData.colors.primary)
  }

  return (
    <SiteContext.Provider value={{ ...siteDataHook, ...authHook }}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </SiteContext.Provider>
  )
}

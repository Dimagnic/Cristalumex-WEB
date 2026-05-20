# 🏢 Cristalumex — Sitio Web + CMS en React + Vite

Sitio web profesional con CMS administrativo real, persistencia en Supabase y deploy en Vercel.

---

## 🚀 Deploy en 5 pasos

### 1. Crear proyecto en Supabase

1. Ve a [supabase.com](https://supabase.com) → **New Project**
2. Guarda la **URL** y **anon key** del proyecto (Settings → API)
3. Ve a **SQL Editor** y ejecuta el contenido de `supabase-schema.sql`
4. Ve a **Authentication → Users → Add User** y crea el usuario administrador

### 2. Crear variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-anon-key-aqui
```

### 3. Instalar dependencias y probar local

```bash
npm install
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173)

### 4. Deploy en Vercel

**Opción A — desde GitHub (recomendado):**
1. Sube el proyecto a un repositorio de GitHub
2. Ve a [vercel.com](https://vercel.com) → **New Project** → importa el repo
3. En **Environment Variables** agrega `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`
4. Click **Deploy** ✅

**Opción B — CLI de Vercel:**
```bash
npm install -g vercel
vercel --prod
# Te pedirá las env vars durante el proceso
```

**Opción C — subir ZIP directamente:**
1. Ejecuta `npm run build`
2. Sube la carpeta `dist/` en Vercel Dashboard → **Deploy** → **Upload**

### 5. Acceder al CMS

- URL pública: `https://tu-dominio.vercel.app`
- Panel admin: `https://tu-dominio.vercel.app/admin`
- Usa el email y contraseña que creaste en Supabase Authentication

---

## 📁 Estructura del Proyecto

```
cristalumex/
├── src/
│   ├── components/
│   │   ├── cms/          # Editores del panel admin
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── Nosotros.jsx
│   │   ├── Productos.jsx
│   │   ├── Galeria.jsx
│   │   ├── Testimonios.jsx
│   │   ├── Contacto.jsx
│   │   ├── Footer.jsx
│   │   └── WaFloat.jsx
│   ├── hooks/
│   │   ├── useAuth.js       # Auth con Supabase
│   │   └── useSiteData.js   # CRUD + realtime
│   ├── lib/
│   │   ├── supabase.js      # Cliente Supabase
│   │   ├── defaults.js      # Datos por defecto
│   │   └── context.js       # React Context
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   └── AdminPage.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── supabase-schema.sql      # ← Ejecutar en Supabase
├── vercel.json
├── vite.config.js
└── package.json
```

---

## ✨ Funcionalidades del CMS

| Sección | Editable |
|---------|----------|
| Hero / Banner | Título, subtítulo, imagen de fondo, botones |
| Nosotros | Badge, título, subtítulo |
| Productos | CRUD completo (crear, editar, eliminar) |
| Galería | Agregar/eliminar imágenes, categorías |
| Testimonios | CRUD completo |
| Contacto | Textos del CTA |
| Colores | Preview en vivo de toda la paleta |
| Pie de Página | Dirección, horarios, copyright |
| Redes Sociales | WhatsApp (número + mensaje) y Facebook |

---

## 🔄 Actualizaciones en Tiempo Real

Gracias a Supabase Realtime, **todos los visitantes del sitio ven los cambios automáticamente** al guardar desde el panel admin, sin necesidad de recargar la página.

---

## 🛠️ Tech Stack

- **Frontend:** React 18 + Vite 5
- **Backend / DB:** Supabase (PostgreSQL + Auth + Realtime)
- **Deploy:** Vercel
- **Fonts:** Google Fonts (Montserrat + Inter)
- **Notifications:** react-hot-toast

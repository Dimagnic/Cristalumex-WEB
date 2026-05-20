-- ══════════════════════════════════════════════════════
-- CRISTALUMEX CMS - Supabase Schema
-- Ejecutar en: Supabase Dashboard → SQL Editor
-- ══════════════════════════════════════════════════════

-- 1. Tabla principal de configuración del sitio
CREATE TABLE IF NOT EXISTS site_data (
  id       INTEGER PRIMARY KEY DEFAULT 1,
  content  JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Solo puede existir un registro (la fila con id=1)
INSERT INTO site_data (id, content) VALUES (1, '{}')
ON CONFLICT (id) DO NOTHING;

-- 2. Productos
CREATE TABLE IF NOT EXISTS products (
  id          BIGSERIAL PRIMARY KEY,
  title       TEXT NOT NULL DEFAULT 'Producto',
  desc        TEXT NOT NULL DEFAULT '',
  sort_order  INTEGER DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Galería
CREATE TABLE IF NOT EXISTS gallery (
  id          BIGSERIAL PRIMARY KEY,
  url         TEXT NOT NULL,
  cat         TEXT NOT NULL DEFAULT 'General',
  alt         TEXT NOT NULL DEFAULT '',
  sort_order  INTEGER DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Testimonios
CREATE TABLE IF NOT EXISTS testimonials (
  id          BIGSERIAL PRIMARY KEY,
  name        TEXT NOT NULL DEFAULT 'Cliente',
  role        TEXT DEFAULT '',
  text        TEXT NOT NULL DEFAULT '',
  sort_order  INTEGER DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ══════════════════════════════════════════════════════
-- POLÍTICAS RLS (Row Level Security)
-- ══════════════════════════════════════════════════════

ALTER TABLE site_data   ENABLE ROW LEVEL SECURITY;
ALTER TABLE products    ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery     ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Lectura pública (el sitio público puede leer todo)
CREATE POLICY "public_read_site_data"    ON site_data    FOR SELECT USING (true);
CREATE POLICY "public_read_products"     ON products     FOR SELECT USING (true);
CREATE POLICY "public_read_gallery"      ON gallery      FOR SELECT USING (true);
CREATE POLICY "public_read_testimonials" ON testimonials FOR SELECT USING (true);

-- Escritura solo para usuarios autenticados (admin)
CREATE POLICY "auth_write_site_data" ON site_data
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "auth_write_products" ON products
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "auth_write_gallery" ON gallery
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "auth_write_testimonials" ON testimonials
  FOR ALL USING (auth.role() = 'authenticated');

-- ══════════════════════════════════════════════════════
-- DATOS INICIALES (opcional - poblar con defaults)
-- ══════════════════════════════════════════════════════

INSERT INTO products (title, "desc", sort_order) VALUES
  ('Ventanas y Puertas', 'Diseños modernos en aluminio y vidrio templado para hogares y oficinas. Máxima seguridad y eficiencia energética.', 0),
  ('Fachadas y Proyectos', 'Fachadas arquitectónicas de alto impacto. Soluciones personalizadas para edificios comerciales y residenciales.', 1),
  ('Vidrio de Seguridad', 'Vidrio templado, laminado y de control solar. Protección y estética para cualquier espacio.', 2),
  ('Baños y Accesorios', 'Canceles de baño, espejos y accesorios en aluminio. Diseños elegantes y funcionales.', 3)
ON CONFLICT DO NOTHING;

INSERT INTO testimonials (name, role, text, sort_order) VALUES
  ('María González', 'Propietaria de Casa', 'Excelente servicio y calidad. Las ventanas quedaron perfectas y el equipo fue muy profesional. Totalmente recomendados.', 0),
  ('Roberto Martínez', 'Gerente de Construcción', 'Hemos trabajado con Cristalumex en varios proyectos comerciales. Siempre cumplen con los tiempos y la calidad es excepcional.', 1),
  ('Ana Ramírez', 'Arquitecta', 'Los recomiendo ampliamente. Su experiencia y atención al detalle hacen la diferencia en cada proyecto.', 2)
ON CONFLICT DO NOTHING;

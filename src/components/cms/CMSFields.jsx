// Shared UI primitives for CMS panels

export function Card({ title, children }) {
  return (
    <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e2e8f0', padding: '1.5rem', marginBottom: '1.25rem', boxShadow: '0 1px 4px rgba(0,0,0,.04)' }}>
      {title && <h3 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '.9rem', fontWeight: 700, color: '#1a3050', marginBottom: '1rem', paddingBottom: '.75rem', borderBottom: '1px solid #f1f5f9' }}>{title}</h3>}
      {children}
    </div>
  )
}

export function Field({ label, children }) {
  return (
    <div style={{ marginBottom: '.9rem' }}>
      <label style={{ display: 'block', fontFamily: 'Montserrat, sans-serif', fontSize: '.72rem', fontWeight: 700, letterSpacing: '.04em', color: '#64748b', marginBottom: '.35rem', textTransform: 'uppercase' }}>
        {label}
      </label>
      {children}
    </div>
  )
}

const inputStyle = {
  width: '100%', padding: '.6rem .85rem',
  border: '1.5px solid #e2e8f0', borderRadius: 8,
  fontSize: '.88rem', fontFamily: 'Inter, sans-serif',
  outline: 'none', background: '#f8fafc', transition: 'all .2s',
}

export function Input({ value, onChange, placeholder, type = 'text' }) {
  return (
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      style={inputStyle}
      onFocus={e => { e.target.style.borderColor = '#0066cc'; e.target.style.background = '#fff' }}
      onBlur={e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.background = '#f8fafc' }}
    />
  )
}

export function Textarea({ value, onChange, placeholder, rows = 3 }) {
  return (
    <textarea
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      style={{ ...inputStyle, resize: 'vertical', minHeight: rows * 24 + 'px' }}
      onFocus={e => { e.target.style.borderColor = '#0066cc'; e.target.style.background = '#fff' }}
      onBlur={e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.background = '#f8fafc' }}
    />
  )
}

export function Row({ children }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
      {children}
    </div>
  )
}

export function SaveButton({ onClick, loading }) {
  return (
    <button onClick={onClick} disabled={loading} style={{
      background: 'var(--secondary)', color: '#fff',
      fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '.88rem',
      padding: '.7rem 1.75rem', borderRadius: 8, border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
      opacity: loading ? .7 : 1, transition: 'all .2s', display: 'inline-flex', alignItems: 'center', gap: '.5rem',
    }}
      onMouseEnter={e => { if (!loading) e.currentTarget.style.background = '#0055aa' }}
      onMouseLeave={e => { e.currentTarget.style.background = 'var(--secondary)' }}>
      {loading ? '⏳ Guardando...' : '💾 Guardar Cambios'}
    </button>
  )
}

export function DangerButton({ onClick, children }) {
  return (
    <button onClick={onClick} style={{
      background: '#ef4444', color: '#fff', border: 'none',
      borderRadius: 6, padding: '.3rem .65rem', fontSize: '.72rem',
      cursor: 'pointer', fontWeight: 700, transition: 'background .2s',
    }}
      onMouseEnter={e => e.currentTarget.style.background = '#dc2626'}
      onMouseLeave={e => e.currentTarget.style.background = '#ef4444'}>
      {children || '✕ Eliminar'}
    </button>
  )
}

export function AddButton({ onClick, children }) {
  return (
    <button onClick={onClick} style={{
      background: 'rgba(0,102,204,.08)', color: 'var(--secondary)',
      border: '1.5px dashed var(--secondary)', borderRadius: 8,
      padding: '.65rem 1.25rem', fontSize: '.83rem', cursor: 'pointer',
      fontWeight: 600, fontFamily: 'Montserrat, sans-serif', transition: 'all .2s',
    }}
      onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,102,204,.15)'}
      onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,102,204,.08)'}>
      {children || '+ Agregar'}
    </button>
  )
}

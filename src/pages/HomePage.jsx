import Splash from '../components/Splash'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Nosotros from '../components/Nosotros'
import Productos from '../components/Productos'
import Galeria from '../components/Galeria'
import Testimonios from '../components/Testimonios'
import Contacto from '../components/Contacto'
import Footer from '../components/Footer'
import WaFloat from '../components/WaFloat'

export default function HomePage() {
  return (
    <>
      <Splash />
      <Header />
      <main style={{ paddingTop: 80 }}>
        <Hero />
        <Nosotros />
        <Productos />
        <Galeria />
        <Testimonios />
        <Contacto />
      </main>
      <Footer />
      <WaFloat />
    </>
  )
}

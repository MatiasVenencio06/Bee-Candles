import NavBar from './components/navBar'
import Footer from './components/footer'
import honeycomb from './assets/honeycomb.svg'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import NotFound from './components/404'
import Prueba from './components/fireBaseCall'
import Home from './components/home'
import GenerarOrden from './components/ordenCompra'
import Detalle from './components/detalle'
import { CartProvider } from './context/CartContext'
import VelasFrasco from './components/categorias/velaFrasco'
import VelasSinFrasco from './components/categorias/velaSinFrasco'
import Bombones from './components/categorias/bombonesNudo'
import OrdenDeCompra from './components/ordenDeCompra'

function App() {

  const rutaActual = window.location.pathname

  return (
    <ConfigProvider theme={{
      token: {
        colorPrimary: '#f37794',
        // Alias Token
        colorBgContainer: '#BBB6DF',
      }
    }}>
      <BrowserRouter>
        <CartProvider>
          <div style={{margin: 'auto', display: 'grid', minHeight: '100vh', gridTemplateRows: 'auto 1fr auto', width: '100%', backgroundImage: `url(${honeycomb})`, backgroundSize: '100vw'}}>
            <NavBar display={rutaActual === '/orden-de-compra' ? 'none' : 'flex'}/>
            <section style={{paddingTop: '4rem'}}>
              <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/sobre-nosotros' element={<Prueba/>} />
                <Route path='/detalle/:id' element={<Detalle/>} />
                <Route path='/generar-orden' element={<GenerarOrden/>} />
                <Route path='/categoria/velas-sin-frasco' element={<VelasSinFrasco condicional={true}/>}/>
                <Route path='/categoria/velas-aromaticas' element={<VelasFrasco condicional={true}/>}/>
                <Route path='/categoria/bombones-aromaticos' element={<Bombones condicional={true}/>}/>
                <Route path='*' element={<NotFound/>}/>
              <Route path='/orden-de-compra' element={<OrdenDeCompra/>}/>
              </Routes>
            </section>
            <Footer display={rutaActual === '/orden-de-compra' ? 'none' : 'flex'}/>
          </div>
        </CartProvider>
      </BrowserRouter>
    </ConfigProvider>
  )
}

export default App

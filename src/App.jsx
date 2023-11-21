import { Children, useState } from 'react'
import NavBar from './components/navBar'
import Footer from './components/footer'
import honeycomb from './assets/honeycomb.svg'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import NotFound from './components/404'
import SkeletonCard from './components/skeletonCard'
import Prueba from './components/fireBaseCall'

function App() {

  return (
    <ConfigProvider theme={{
      token: {
        colorPrimary: '#f37794',
        // Alias Token
        colorBgContainer: '#BBB6DF',
      }
    }}>
      <BrowserRouter>
        <div style={{margin: 'auto', display: 'grid', minHeight: '100vh', gridTemplateRows: 'auto 1fr auto', width: '100%', backgroundImage: `url(${honeycomb})`, backgroundSize: '100vw'}}>
          <NavBar/>
          <section>
            <Routes>
              <Route path='/' element={<h1 style={{display: 'flex', justifyContent: 'center'}}>Home</h1>} />
              <Route path='/sobre-nosotros' element={<Prueba></Prueba>} />
              <Route path='categoria/velas-aromaticas' element={<div><SkeletonCard/></div>}></Route>
              <Route path='*' element={<NotFound/>}></Route>
            </Routes>
          </section>
          <Footer/>
        </div>
      </BrowserRouter>
    </ConfigProvider>
  )
}

export default App

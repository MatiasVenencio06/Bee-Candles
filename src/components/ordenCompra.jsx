import { Card, Row, Col, Button, Image, Carousel } from 'antd'
import Title from 'antd/es/typography/Title'
import React, { useState, useEffect, Fragment } from 'react'
import { useCartContext } from '../context/CartContext'
import { Link } from 'react-router-dom'
import Paragraph from 'antd/es/typography/Paragraph'
import { ShoppingCartOutlined } from '@ant-design/icons'

function GenerarOrden() {
  const [clicked, setClicked] = useState(false)
  const {cartCounter, AddToCart, RemoveFromCart, setCartCounter, total, totalProducts} = useCartContext()

  useEffect(() => {
    setCartCounter(cartCounter)
  }, [clicked])

    return (
      <Row style={{display: 'flex', justifyContent: 'center', gap: 30}}>
        <Col style={{width: '50%'}}>
          {(cartCounter.length > 0) ?
          <Fragment>
            {cartCounter.map((item, index) => (
              <Fragment key={item.id}>
              {window.innerWidth > 500 ? <Col key={index} style={{display: 'flex', width: '70vw', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)', marginTop: '2rem', backgroundColor: '#BBB6DF', borderRadius: 10}}>
                  <Col style={{width: '20%'}}>
                    <Image style={{ borderRadius: '10px 0 0 10px'}} src={item.imgs[0]}/>
                  </Col>
                  <Col style={{width: '48%'}}>
                    <Title level={3} style={{padding: '1rem', margin: 0}}><b>{item.nombre}</b></Title>
                    <Paragraph ellipsis style={{paddingLeft: '1rem'}}>{item.descripcion}</Paragraph>
                  </Col>
                  <Col style={{display: 'flex', alignItems: 'center', margin: 'auto'}}>
                    <Col style={{border: '1px solid #fff', borderRadius: '8px'}}>
                      <Button style={{marginRight: '10px', borderRadius: '8px 0 0 8px'}} onClick={() => (RemoveFromCart(item), setClicked(!clicked))}>-</Button>
                      {item.cantidad}
                      <Button style={{marginLeft: '10px', borderRadius: '0 8px 8px 0'}} onClick={() => (AddToCart(item, 1), setClicked(!clicked))}>+</Button>
                    </Col>
                  </Col>
                  <Title level={3} style={{display: 'flex', alignItems: 'center', marginLeft: 'auto', marginRight: '1rem'}}>${item.precio * item.cantidad}</Title>
                </Col> : <Col key={index} style={{width: '20rem', marginTop: '1rem', display: 'flex', justifyContent: 'center', width: "100%"}}>
              <Card
                hoverable
                style={{
                  width: 240
                }}
                cover={
                  <Carousel 
                  >
                    <img alt={item.nombre} src={item.imgs[0]}/>
                    <img alt={item.nombre} src={item.imgs[1]}/>
                </Carousel>
                }
              >
              <Row style={{display: 'flex'}}>
                <Col flex="auto" style={{textAnchor: '20rem'}}>
                  <h3>{item.nombre}</h3>
                </Col>
                <Col flex="none">
                  <p style={{ textAlign: 'right', color: 'GrayText', marginRight: '.5rem' }}><b style={{alignItems: 'end', display: 'flex'}}>{`$${item.precio}`}</b></p>
                </Col>
                  <Paragraph ellipsis>{item.descripcion}</Paragraph>
                  <Col style={{border: '1px solid #fff', borderRadius: '8px', display: 'flex', justifyContent: 'space-between'}}>
                    <Button style={{border: 0, borderRight: '1px solid #fff', borderRadius: '8px 0 0 8px'}} onClick={() => (RemoveFromCart(item), setClicked(!clicked))}>Quitar -</Button>
                      <Col style={{display: 'inline-block', display: 'flex', alignItems: 'center', paddingRight: '.3rem', paddingLeft: '.3rem'}}>
                        {item.cantidad}
                      </Col>
                    <Button style={{border: 0, borderLeft: '1px solid #fff', borderRadius: '0 8px 8px 0'}} onClick={() => (AddToCart(item, 1), setClicked(!clicked))}>Añadir +</Button>
                  </Col>
              </Row>
            </Card>
            </Col>}
                
              </Fragment>
            ))}
          </Fragment>
           : <>
            <h1 style={{marginTop: '2rem'}}>Aun no has seleccionado productos para comprar</h1>
            <Link to={'/'}>
              <Button>Ver los productos</Button>
            </Link>
           </>}
        </Col>
        {cartCounter.length > 0 ? <Row style={{opacity: '80%', marginTop: '2rem'}}>
          <Col>
            <Card>
              <Paragraph style={{display: 'flex'}}>Productos: <p style={{marginLeft: 'auto'}}>{totalProducts()}</p></Paragraph>
              <Paragraph style={{display: 'flex'}}>Costos de envio: <p style={{color: 'green', marginLeft: 'auto'}}>Envio gratis</p></Paragraph>
              <Title level={4}>Precio del carrito: ${total()}</Title>
            </Card>
            <Link to={'/orden-de-compra'}>
              <Button style={{width: '100%', marginTop: '1rem', height: '3rem'}}>Generar y descargar orden de compra</Button>
            </Link>
          </Col>
        </Row> : null}
      </Row>
    )
}

export default GenerarOrden

import React, { useEffect } from 'react'
import { useCartContext } from '../context/CartContext';
import { Col, Image, Button } from 'antd';
import Title from 'antd/es/typography/Title';
import Paragraph from 'antd/es/typography/Paragraph';

function OrdenDeCompra() {
    const { cartCounter, total } = useCartContext()

    useEffect(() => {
        setTimeout(() => {
            window.print()
        }, 1000);
    })

    return (
        <>
        {console.log(cartCounter)}
          {cartCounter.map((item, index) => (
            <Col key={index} style={{display: 'flex', width: '70vw', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)', marginTop: '2rem', backgroundColor: '#BBB6DF', borderRadius: 10}}>
            <Col style={{width: '20%'}}>
              <Image style={{ borderRadius: '10px 0 0 10px'}} src={item.imgs[0]}/>
            </Col>
            <Col style={{width: '48%'}}>
              <Title level={3} style={{padding: '1rem', margin: 0}}><b>{item.cantidad}x {item.nombre}</b></Title>
              <Paragraph style={{paddingLeft: '1rem'}}>{item.descripcion}</Paragraph>
            </Col>
            <Title level={3} style={{display: 'flex', alignItems: 'center', marginLeft: 'auto', marginRight: '1rem'}}>${item.precio * item.cantidad}</Title>
          </Col>
          ))}
          <h1>Precio total de la compra: {total()}</h1>
        </>
    )}

export default OrdenDeCompra

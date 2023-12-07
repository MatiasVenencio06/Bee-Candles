import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getFirestore, getDoc, doc} from 'firebase/firestore'
import { Button, Card, Col, Image, Carousel, Row } from 'antd'
import Title from 'antd/es/typography/Title'
import Paragraph from 'antd/es/typography/Paragraph'
import { useCartContext } from '../context/CartContext'
import { ArrowLeftOutlined } from '@ant-design/icons';
import Loader from './loader'

function Detalle() {
    const [loading, setLoading] = useState(false)
    const [item, setItem] = useState()
    const [cantityToAdd, setCantityToAdd] = useState(1)
    const { id } = useParams()
    const {AddToCart} = useCartContext()

    useEffect(() => {
      const fetchProduct = async () => {
        setLoading(true)
        try {
          const db = getFirestore();
          const itemRef = doc(db, 'products', id);
          const data = await getDoc(itemRef);
          
          if (data.exists()) {
            setItem({ id: data.id, ...data.data() });
          }
        } catch (error) {
          console.error('Error al obtener el producto:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchProduct();
    }, [id]);

    return (
        <div>
          {loading ? <Loader loading={loading}></Loader> :  <>
          {item ? <Col style={{display: 'flex', justifyContent: 'center'}}>
            {window.innerWidth > 500 ? <Card style={{width: '50%'}}>
                <Link to={-1}>
                  <ArrowLeftOutlined style={{color: 'black'}}/>
                </Link>
                <Col style={{display: 'flex'}} key={item.id}>
                  <Col style={{width: '45%', padding: '.4rem'}}>
                    <Image style={{ borderRadius: '5px'}} src={item.imgs[0]}></Image>
                  </Col>
                  <Col style={{paddingLeft: '1rem', width: '50%'}}>
                    <Title>{item.nombre}</Title>
                    <Paragraph>{item.descripcion}</Paragraph>
                    <Title level={4}>{cantityToAdd}x ${item.precio * cantityToAdd}</Title>
                    <Col style={{display: 'flex', marginTop: 'auto'}}>
                      <Col style={{display: 'flex', border: '1px solid #fff', borderRadius: '8px'}}>
                        <Button onClick={() => setCantityToAdd(cantityToAdd - 1)} style={{borderRadius: '8px 0 0 8px'}} disabled={cantityToAdd > 1 ? false : true}>-</Button>
                        <Button onClick={() => AddToCart(item, cantityToAdd)} style={{borderRadius: 0}}>Añadir {cantityToAdd} al carrito</Button>
                        <Button onClick={() => setCantityToAdd(cantityToAdd + 1)} style={{borderRadius: '0 8px 8px 0'}}>+</Button>
                      </Col>
                    </Col>
                  </Col>
                  </Col>
              </Card> : <Card
                    hoverable
                    key={item.id}
                    style={{
                      width: 300,
                      marginBottom: '1rem'
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
                      <h3>{cantityToAdd}x {item.nombre}</h3>
                    </Col>
                    <Col flex="none">
                      <p style={{ textAlign: 'right', color: 'GrayText', marginRight: '.5rem' }}><b style={{alignItems: 'end', display: 'flex'}}>${item.precio * cantityToAdd}</b></p>
                    </Col>
                      <Paragraph>{item.descripcion}</Paragraph>
                    <Col style={{display: 'flex', width: '100%', justifyContent: 'center', marginTop: '1rem'}}>
                      <Button onClick={() => setCantityToAdd(cantityToAdd - 1)} style={{borderRadius: '8px 0 0 8px'}} disabled={cantityToAdd > 1 ? false : true}>-</Button>
                      <Button onClick={() => AddToCart(item, cantityToAdd)} style={{borderRadius: 0}}>Añadir {cantityToAdd} al carrito</Button>
                      <Button onClick={() => setCantityToAdd(cantityToAdd + 1)} style={{borderRadius: '0 8px 8px 0'}}>+</Button>
                    </Col>
                  </Row>
                </Card>}
              
             </Col> : <h1>no se encontro el id</h1>}
          </>}
        </div>
    )
}

export default Detalle

import React, {useState, useEffect} from 'react'
import { where, getDocs, collection, query } from 'firebase/firestore'
import SkeletonCard from '../skeletonCard'
import { getFirestore } from 'firebase/firestore'
import { Col, Carousel, Card, Row, Button, notification} from 'antd'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import Title from 'antd/es/typography/Title'
import Paragraph from 'antd/es/typography/Paragraph'
import { useCartContext } from '../../context/CartContext'


function VelasSinFrasco({condicional}) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [redireccionar, setRedireccionar] = useState(false)
  const [api, contextHolder] = notification.useNotification();
  const {AddToCart, cartCounter, setCartCounter} = useCartContext()

  const openNotificationWithIcon = (placement) => {
    api.success({
      message: 'Añadiste un producto a tu carrito',
      placement
    })
  };

  useEffect(() => {
    setLoading(true)

    const db = getFirestore()

    const ItemsPersonalized = collection(db, 'products')
    const q = query(ItemsPersonalized, where('categoria', '==', 'decorativa'))

    getDocs(q)
      .then((res) => {
        if (res.length == 0) {
        } 
        setItems(res.docs.map((doc) => ({id: doc.id, ...doc.data() })))
      }).catch((err) => {
        console.error("Error al obtener los productos personalizados")
      }).finally(() => {
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    setCartCounter(cartCounter)
  }, [clicked])

    return (
        <Col
        style={{width: '90%', backgroundColor: '#BBB6DF', borderRadius: '8px', marginTop: '1rem', marginBottom: '1rem'}}
        >
          {loading ? <SkeletonCard/> : <>
          {contextHolder}
            <Title style={{display: 'flex', justifyContent: 'center', marginTop: '1rem'}}>{`${condicional ? '' : 'Velas decorativas'}`}</Title>
            <Col style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly'}}>
            {items.map((item, index) => (
                <Col key={index} sm={5} md={10} xl={4} style={{minWidth: '15rem', margin: '1rem', display: 'flex', justifyContent: 'center', width: "100%"}}>
                <Link to={redireccionar ? `/detalle/${item.id}` : ''} onClick={() => (setRedireccionar(true))} style={{zIndex: 1}}>
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
                    <Button
                        size='large'
                        style={{width: '100%', zIndex: 500}}
                        icon={<ShoppingCartOutlined/>}
                        onClick={() => (setRedireccionar(false), AddToCart(item, 1), openNotificationWithIcon('topLeft'), setClicked(!clicked))}
                        >Añadir al carrito</Button>
                    </Row>
                </Card>
                </Link>
                </Col>
            ))}
            </Col>
          </>}
        </Col>
    )
}

export default VelasSinFrasco

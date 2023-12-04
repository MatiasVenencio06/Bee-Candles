import React, { useEffect, useState } from 'react'
import { Button, Card, Carousel, Col, Image, Modal, Row, Typography } from 'antd'
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import Icon from '@ant-design/icons/lib/components/Icon'

function VelaPersonalizada() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    setLoading(true)

    const db = getFirestore()

    const ItemsPersonalized = collection(db, 'products')
    const q = query(ItemsPersonalized, where('categoria', '==', 'personalizada'))

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


    return (
        <Row style={{display: 'flex', justifyContent: 'center', marginTop: '1rem'}}>
            <Card
              title="Proximamente"
              style={{ width: '60vw'}}
              hoverable
              onClick={() => setOpenModal(true)}
            >
             <Carousel autoplay fade>
              {items.map((item, i) => (
                <Row key={i} style={{display: 'flex'}}>
                  <div style={{display: 'flex'}}>
                    <img style={{width: '50%', height: '40%'}} src={item.imgs[0]}/>
                    <img style={{width: '50%', height: '40%'}} src={item.imgs[1]}/>
                  </div>
                </Row>
              ))}
              </Carousel>
            </Card>
            <Modal
              open={openModal}
              onCancel={() => setOpenModal(false)}
              footer={[
                <Button onClick={() => setOpenModal(false)}>Ok</Button>
              ]}
            >
                <h1>Velas Personalizadas</h1>
                <p style={{marginTop: '20px'}}>Lamentamos informarle que de momento la opcion de crear/simular una vela personalizada no se encuentra disponible</p>
                <p style={{marginTop: '20px'}}><b>Estamos trabajando en ello :)</b></p>
            </Modal>
        </Row>
    )
}

export default VelaPersonalizada

import React, {useState, useEffect} from 'react';
import {
    getFirestore,
    getDocs,
    collection,
    doc,
    getDoc,
    query,
    where,
    limit,
} from "firebase/firestore";
import { Link } from "react-router-dom";
import { Col, Row, Card, Carousel, Typography, Button} from 'antd'
import Paragraph from 'antd/es/typography/Paragraph';
import VelaPersonalizada from './velaPersonalizada';
import { ShoppingCartOutlined } from '@ant-design/icons';
  

const Home = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
    
        const db = getFirestore();
    
        const itemsRef = collection(db, "products");
    
        getDocs(itemsRef)
          .then((res) => {
            if (res.size === 0) {
              console.log("No results");
            }
            setItems(res.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
          })
          .catch((err) => console.error(err))
          .finally(() => setLoading(false));
      }, []);
    

    return (
      <Row style={{display: 'flex', justifyContent: "center"}}>
        <VelaPersonalizada/>
        <Row style={{width: '100%'}}>
          {items.map((item, index) => (
            <Col key={index} sm={5} md={10} xl={4} style={{minWidth: '15rem', margin: '1rem', display: 'flex', justifyContent: 'center', width: "100%"}}>
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
                  <h3>Vela de frutilla</h3>
                </Col>
                <Col flex="none">
                  <p style={{ textAlign: 'right', color: 'GrayText', marginRight: '.5rem' }}><b style={{alignItems: 'end', display: 'flex'}}>{`$${item.precio}`}</b></p>
                </Col>
                  <Paragraph ellipsis>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo sunt accusamus commodi, a omnis laudantium aspernatur deleniti, ut voluptatibus voluptatum debitis quidem quia quas necessitatibus asperiores nam? Similique, ut voluptas.</Paragraph>
                <Button
                  size='large'
                  style={{width: '100%'}}
                  end
                  icon={<ShoppingCartOutlined/>}
                >Añadir al carrito</Button>
              </Row>
            </Card>
            </Col>
          ))}
        </Row>
      </Row>
    );
};

export default Home;
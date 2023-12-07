import React, {useState, useEffect} from 'react';
import {
    getFirestore,
    getDocs,
    collection
} from "firebase/firestore";
import { Link } from "react-router-dom";
import { Col, Row, Card, Carousel, notification, Button} from 'antd'
import Paragraph from 'antd/es/typography/Paragraph';
import VelaPersonalizada from './velaPersonalizada';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useCartContext } from '../context/CartContext';
import Loader from './loader';
import Title from 'antd/es/typography/Title';
import VelasFrasco from './categorias/velaFrasco';
import VelasSinFrasco from './categorias/velaSinFrasco';
import Bombones from './categorias/bombonesNudo';
  

const Home = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true)
   
    useEffect(() => {
      setLoading(true)
  
      const db = getFirestore();
  
      const itemsRef = collection(db, "products");
  
      getDocs(itemsRef)
        .then((res) => {
          if (res.size === 0) {
          }
          setData(res.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        })
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
      }, []);

    return (
      <Row style={{display: 'flex', justifyContent: "center"}}>
        {loading ? <Loader loading={loading}></Loader> : <>
          <VelaPersonalizada/>
          <Row style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
            <VelasFrasco/>
            <VelasSinFrasco/>
            <Bombones condicional={false}/>
          </Row>
        </>}
      </Row>
    );
};

export default Home;
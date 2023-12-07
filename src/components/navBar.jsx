import React, {useContext, useState, Fragment, useEffect} from 'react'
import { Menu, Button, Input, Space, Dropdown, Image, Avatar, Typography, Row, Col, Badge, Card, Drawer, Tag} from 'antd'
import {DownOutlined, SearchOutlined, SmileOutlined, UpOutlined, DeleteOutlined, RedEnvelopeTwoTone} from '@ant-design/icons'
import './estilos.css'
import NavBarMobile from './navBarComponents/mobileNavBar'
import { Link } from 'react-router-dom';
import SkeletonCard from './skeletonCard'
import { useCartContext } from '../context/CartContext'


function NavBar({display}) { 
  const [collapsed, setCollapsed] = useState(true)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [productoAdd, setProductoAdd] = useState('')
  const [clicked, setClicked] = useState(false)
  const { cartCounter, setCartCounter, total, AddToCart, RemoveFromCart, DeleteProduct } = useCartContext()
  
  useEffect(() => {
    setProductoAdd('added')
    setTimeout(() => {
      setProductoAdd('')
    }, 1000)
  }, [cartCounter])

  useEffect(() => {
    setCartCounter(cartCounter)
  }, [clicked])

  const showDrawer = () => {
    setDrawerOpen(true)
  }

  const onDrawerClose = () => {
    setDrawerOpen(false)
  }

  const toggleCollapsed = () => {
      setCollapsed(!collapsed);
    };

  const items = [
    {
      key: '1',
      label: (
        <Link rel="noopener noreferrer" to={'categoria/velas-aromaticas'}>
          Velas Aromaticas
        </Link>
      ),
    },
    {
      key: '2',
      label: (
        <Link rel="noopener noreferrer" to={'categoria/velas-sin-frasco'}>
          Velas sin frasco
        </Link>
      ),
    },
    {
      key: '3',
      label: (
        <Link rel="noopener noreferrer" to={'categoria/bombones-aromaticos'}>
          Bombones aromaticos
        </Link>
      ),
    },
  ];

    return (
      <Row style={{display: `${display}`}}>
        <Col xs={{span: 0}} md={{span: 24}}>
          <Menu mode='horizontal' style={{position: 'fixed', zIndex: 1000}}>
              <div style={{width: '100vw', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <div style={{paddingTop: '.4rem', paddingLeft: '1rem'}}>
                  <Link to={'/'}>
                    <Typography style={{fontFamily: 'Graduate, serif', display: 'flex', justifyContent: 'center'}}>Bee</Typography>
                    <Typography style={{fontFamily: 'Graduate, serif', display: 'flex', justifyContent: 'center'}}>Candles</Typography>
                  </Link>
                </div>
                <Menu.ItemGroup style={{display: 'flex', paddingLeft: '0rem'}}>
                  <Menu.Item key={'categoria'} style={{padding: '.3rem', paddingTop: '1rem', paddingBottom: '1rem'}}>
                    <Dropdown menu={{ items }} trigger={['click']} onClick={toggleCollapsed}>
                      <Typography>Categoria <DownOutlined/></Typography>
                    </Dropdown>
                  </Menu.Item>
                  <Menu.Item key={'sobre-nosotros'} style={{padding: '.3rem'}}>
                    <Link to={'/sobre-nosotros'}>
                      Sobre Nosotros
                    </Link>
                  </Menu.Item>
                </Menu.ItemGroup>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <Input size='large' style={{width: '13rem', marginRight: '1rem'}} placeholder='Search...' prefix={<SearchOutlined/>}/>
                      <i style={{paddingRight: '.5rem'}} className={`carritoPanal ${productoAdd}`} onClick={showDrawer}></i>
                      <Drawer
                        style={{backgroundColor: "#BBB6DF", padding: 0}}
                        title='Carrito'
                        closable
                        onClose={onDrawerClose}
                        open={drawerOpen}
                      >
                        {cartCounter.length !== 0 ? 
                        <>
                        {cartCounter.map((item, index) => (
                          <Fragment key={index}>
                            <Row style={{width: '100%', marginBottom: '1rem'}}>
                              <Col style={{width: '83%', border: '1px solid #fff', borderRadius: '8px 0 0 8px', padding: '10px'}}>
                                <Col style={{display: 'flex'}}>
                                  <img style={{width: '4rem', borderRadius: '4px'}} src={item.imgs[0]} alt=""/>
                                  <Col>
                                    <p>{item.cantidad}x {item.nombre}</p> 
                                    <Col style={{marginTop: 'auto'}}>
                                      <Button style={{borderRadius: '8px 0 0 8px'}} onClick={() => (RemoveFromCart(item), setClicked(!clicked))}>-</Button>
                                      <Button style={{borderRadius: '0 8px 8px 0'}} onClick={() => (AddToCart(item, 1), setClicked(!clicked))}>+</Button>
                                    </Col>   
                                  </Col>
                                  <p style={{marginLeft: 'auto', display: 'flex', alignItems: 'center', color: 'GrayText'}}><b>${item.precio * item.cantidad}</b></p>  
                                </Col>
                              </Col>
                              <Col>
                                <Button style={{borderRadius: '0 8px 8px 0', backgroundColor: 'rgb(255 149 149)', height: '100%'}} onClick={() => DeleteProduct(item)}><DeleteOutlined style={{fontSize: 20}}/></Button>
                              </Col>
                            </Row>
                          </Fragment>
                          ))}
                          <h3>Precio total: ${total()}</h3>
                          <Link to={'/generar-orden'}>
                            <Button style={{marginTop: '1rem', width: '100%'}} onClick={() => setDrawerOpen(false)}>
                              Comprar
                            </Button>
                          </Link>
                        </> : <>
                          <Tag color='red' style={{backgroundColor: 'transparent',display: 'flex', justifyContent: 'center', padding: '1rem', fontSize: '1rem'}}>No tienes ningun producto en tu carrito 🥱</Tag>
                        </> 
                        }
                      </Drawer>
                    <Badge count={cartCounter.length} offset={[-20, -30]} status='error' style={{color: 'black'}}/>
                </div>
              </div>
          </Menu>
        </Col>
        {/* NavBar responsive */}
        <NavBarMobile/> 
      </Row>
    )
}

export default NavBar

import React, {useState, useEffect, Fragment} from 'react'
import { Col, Menu, Tag, Typography, Input, Drawer, Button, Badge } from 'antd'
import { MenuOutlined, CloseOutlined, SearchOutlined, ArrowRightOutlined, DeleteOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom';
import { useCartContext } from '../../context/CartContext';

function NavBarMobile() {
    const [drawer, setDrawer] = useState(false)
    const [childrenDrawer, setChildrenDrawer] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [showDrawerCarrito, setShowDrawerCarrito] = useState(false)
    const [productoAdd, setProductoAdd] = useState('')
    const [clicked, setClicked] = useState(false)
    const { cartCounter, setCartCounter, AddToCart, DeleteProduct, total, RemoveFromCart } = useCartContext()

    
    useEffect(() => {
      setProductoAdd('')
      setProductoAdd('added')
      setTimeout(() => {
        setProductoAdd('')
      }, 1000)
    }, [cartCounter])

    useEffect(() => {
      setCartCounter(cartCounter)
    }, [clicked])

    const onDrawerClose = () => {
      setDrawer(false)
    }

    const showDrawer = () => {
        setDrawer(true);
      };

    const showChildrenDrawer = () => {
      setChildrenDrawer(true);
    };
  
    const onChildrenDrawerClose = () => {
      setChildrenDrawer(false);
    };

    const closeSideBar = () => {
      setChildrenDrawer(false)
      setDrawer(false)
    }

    const toggleSearch = () => {
      setShowSearch(!showSearch);
    };

    const showCarrito = () => {
      setShowDrawerCarrito(true)
    }

    const onCarritoClose = () => {
      setShowDrawerCarrito(false)
    }

    return (
      <Col sm={{span: 24}} xs={{span: 24}} md={{span: 0}}>
          <Menu style={{position: 'fixed', zIndex: 1000}}>
            <div style={{width: '100vw', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
              <div style={{paddingTop: '.4rem', paddingLeft: '1rem'}}>
                <Menu.ItemGroup style={{maxWidth: '2rem', padding: 0}}>
                  <MenuOutlined style={{marginTop: '.3rem'}} onClick={showDrawer}/>
                </Menu.ItemGroup>
                  <Drawer
                    style={{backgroundColor: "#BBB6DF"}}
                    width={'50vw'}
                    placement='left'
                    closable
                    onClose={onDrawerClose}
                    open={drawer}
                  >
                    <Button type="text" onClick={showChildrenDrawer}>
                      Categorias <ArrowRightOutlined/>
                    </Button>
                    <Drawer
                    title='Categorias'
                      placement='left'
                      style={{backgroundColor: "#BBB6DF", padding: 0}}
                      width={'52vw'}
                      closable
                      onClose={onChildrenDrawerClose}
                      open={childrenDrawer}
                      styles={{body: {padding: 10}}}
                    >
                      <Button type='text' onClick={closeSideBar}>
                        <Link to={'/categoria/velas-aromaticas'}>Velas Aromaticas</Link>
                      </Button>
                      <Button type='text' onClick={closeSideBar}>
                        <Link to={'/categoria/bombones-aromaticos'}>Bombones Aromaticos</Link>
                      </Button>
                      <Button type='text' onClick={closeSideBar}>
                        <Link to={'/categoria/velas-sin-frasco'}>Velas sin frasco</Link>
                      </Button>
                    </Drawer>
                    <Button type="text" onClick={onDrawerClose}>
                      <Link to='/about-us'>
                        Sobre Nosotros
                      </Link>
                    </Button>
                  </Drawer>
              </div>
              <div style={{paddingLeft: '14vw'}}>
                <Link to={'/'}>
                  <Typography.Title level={5} style={{margin: 0, fontFamily: 'Graduate, serif', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '9vh', paddingTop: '.5rem'}}>Bee Candles</Typography.Title>
                </Link>
              </div>
              <div style={{display: 'flex', alignItems: 'center'}}>
              <Col style={{ textAlign: 'right' }}>
                <Button type="text" icon={<SearchOutlined />} onClick={toggleSearch} />
              </Col>
                <i style={{paddingRight: '.5rem'}} className={`carritoPanal ${productoAdd}`} onClick={showCarrito}></i>
                <Drawer
                  style={{backgroundColor: "#BBB6DF", padding: 0}}
                  title='Carrito'
                  closable
                  width={'70vw'}
                  onClose={onCarritoClose}
                  open={showDrawerCarrito}
                >
                  {cartCounter.length !== 0 ? 
                    <>
                    {cartCounter.map((item, index) => (
                      <Fragment key={index}>
                        <Col style={{marginBottom: '1rem'}}>
                          <Col style={{border: '1px solid #fff', borderRadius: '8px', borderBottomLeftRadius: 0, borderBottomRightRadius: 0, padding: '10px'}}>
                            <Col style={{display: 'flex'}}>
                              <img style={{width: '4rem', borderRadius: '4px'}} src={item.imgs[0]} alt=""/>
                              <p>{item.nombre}</p>
                              <Col>
                                <Button style={{border: 0, paddingRight: 0}} onClick={() => DeleteProduct(item)}>
                                  <DeleteOutlined/>
                                </Button>
                                <p style={{marginLeft: 'auto', display: 'flex', alignItems: 'center', color: 'GrayText', justifyContent: 'end'}}><b>${item.precio * item.cantidad}</b></p>  
                              </Col>
                            </Col>
                          </Col>
                          <Col style={{border: '1px solid #fff', borderRadius: '0 0 8px 8px', display: 'flex', justifyContent: 'space-between'}}>
                            <Button style={{border: 0, borderRight: '1px solid #fff', borderRadius: 0}} onClick={() => (RemoveFromCart(item), setClicked(!clicked))}>Quitar -</Button>
                            <Col style={{display: 'inline-block', display: 'flex', alignItems: 'center'}}>
                              {item.cantidad}
                            </Col>
                            <Button style={{border: 0, borderLeft: '1px solid #fff', borderRadius: 0}} onClick={() => (AddToCart(item, 1), setClicked(!clicked))}>Añadir +</Button>
                          </Col>
                        </Col>
                      </Fragment>
                      ))}
                      <h3 style={{display: 'flex', justifyContent: 'center'}}> Precio total: ${total()}</h3>
                      <Button style={{marginTop: '1rem', width: '100%'}}><Link to={'/generar-orden'} onClick={() => setShowDrawerCarrito(false)}>Comprar</Link></Button>
                    </> : <>
                      <Tag color='red' style={{backgroundColor: 'transparent',display: 'flex', justifyContent: 'center', padding: '1rem', fontSize: '.6rem'}}><b>No tienes ningun producto en tu carrito 🥱</b></Tag>
                    </> 
                    }
                </Drawer>
              <Badge count={cartCounter.length} offset={[-20, -25]} style={{color: 'black'}}>
              </Badge>
              </div>
            </div>
               {showSearch && (
                  <div className="search-bar">
                    <Input placeholder="Buscar..." />
                  </div>
                )}
          </Menu>
        </Col>
    )
}

export default NavBarMobile

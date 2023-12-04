import React, {useState, useEffect, Fragment} from 'react'
import { Col, Menu, Tag, Typography, Input, Drawer, Button, Badge } from 'antd'
import { MenuOutlined, CloseOutlined, SearchOutlined, ArrowRightOutlined, DeleteOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';

function NavBarMobile() {
    const [drawer, setDrawer] = useState(false)
    const [childrenDrawer, setChildrenDrawer] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [showDrawerCarrito, setShowDrawerCarrito] = useState(false)
    const [productoAdd, setProductoAdd] = useState('')
    const { cartCounter, setCartCounter } = useContext(CartContext)

    
    useEffect(() => {
      setProductoAdd('')
      setProductoAdd('added')
      setTimeout(() => {
        setProductoAdd('')
      }, 1000)
    }, [cartCounter])

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
    
    const calcularPrecioTotal = () => {
      let total = 0
      cartCounter.forEach(item => {
        total += item.precio
      });
      return total
    }

    const precioTotal = calcularPrecioTotal()
    
    const groupProducts = (cartItems) => {
      const groupedProducts = {};
      cartItems.forEach((item) => {
        if (!groupedProducts[item.id]) {
          groupedProducts[item.id] = { ...item, cantidad: 1 };
        } else {
          groupedProducts[item.id].cantidad += 1;
        }
      });
      return Object.values(groupedProducts);
    };
    
    const groupedCartItems = groupProducts(cartCounter) 

    const handleAdd = (item) => {
      const updatedCartItems = [...groupedCartItems]
      const data = updatedCartItems.find((object) => (object.id === item.id))
      data.cantidad = data.cantidad + 1
      setCartCounter(updatedCartItems)
      console.log(cartCounter)
    };

    const handleRemove = (item) => {
      const updatedCartItems = [...groupedCartItems]
      const data = updatedCartItems.find((object) => (object.id === item.id))
      data.cantidad = data.cantidad - 1
      setCartCounter(updatedCartItems)
      console.log(cartCounter)
    };

    const handleDeleteProduct = (index) => {
      const updatedCart = cartCounter.filter((_, i) => i !== index)
      setCartCounter(updatedCart)
    }

    return (
      <Col sm={{span: 24}} xs={{span: 24}} md={{span: 0}}>
          <Menu style={{position: 'fixed', zIndex: 1}}>
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
                    {groupedCartItems.map((item, index) => (
                      <Fragment key={index}>
                        <Col style={{marginBottom: '1rem'}}>
                          <Col style={{border: '1px solid #fff', borderRadius: '8px', borderBottomLeftRadius: 0, borderBottomRightRadius: 0, padding: '10px'}}>
                            <Col style={{display: 'flex'}}>
                              <img style={{width: '4rem', borderRadius: '4px'}} src={item.imgs[0]} alt=""/>
                              <p>{item.nombre}</p>
                              <Col>
                                <Button style={{border: 0, paddingRight: 0}} onClick={() => handleDeleteProduct(index)}><DeleteOutlined/></Button>
                                <p style={{marginLeft: 'auto', display: 'flex', alignItems: 'center', color: 'GrayText', justifyContent: 'end'}}><b>${item.precio * item.cantidad}</b></p>  
                              </Col>
                            </Col>
                          </Col>
                          <Col style={{border: '1px solid #fff', borderRadius: '0 0 8px 8px', display: 'flex', justifyContent: 'space-between'}}>
                            <Button style={{border: 0, borderRight: '1px solid #fff', borderRadius: 0}} onClick={() => handleRemove(item)}>Quitar -</Button>
                            <Col style={{display: 'inline-block', display: 'flex', alignItems: 'center'}}>
                              {item.cantidad}
                            </Col>
                            <Button style={{border: 0, borderLeft: '1px solid #fff', borderRadius: 0}} onClick={() => handleAdd(item)}>Añadir +</Button>
                          </Col>
                        </Col>
                      </Fragment>
                      ))}
                      <h3 style={{display: 'flex', justifyContent: 'center'}}> Precio total: ${precioTotal}</h3>
                      <Button style={{marginTop: '1rem', width: '57vw'}}>Comprar</Button>
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

import React, {useState} from 'react'
import { Col, Menu, Dropdown, Typography, Input, Drawer, Button, Badge } from 'antd'
import { MenuOutlined, CloseOutlined, SearchOutlined, ArrowRightOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom';
import SkeletonCard from '../skeletonCard';

function NavBarMobile() {
    const [drawer, setDrawer] = useState(false)
    const [childrenDrawer, setChildrenDrawer] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [showDrawerCarrito, setShowDrawerCarrito] = useState(false)

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
          <Menu style={{padding: 0}}>
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
                <i style={{paddingRight: '.5rem'}} className='carritoPanal' onClick={showCarrito}></i>
                <Drawer
                  style={{backgroundColor: "#BBB6DF", padding: 0}}
                  title='Carrito'
                  closable
                  width={'70vw'}
                  onClose={onCarritoClose}
                  open={showDrawerCarrito}
                >
                  <SkeletonCard></SkeletonCard>
                </Drawer>
              <Badge count={23} offset={[-20, -25]} style={{color: 'black'}}>
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

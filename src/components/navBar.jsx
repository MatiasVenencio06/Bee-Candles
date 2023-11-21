import React, {useState} from 'react'
import { Menu, Button, Input, Space, Dropdown, Image, Avatar, Typography, Row, Col, Layout, Badge, Skeleton, Drawer} from 'antd'
import {DownOutlined, SearchOutlined, SmileOutlined, UpOutlined} from '@ant-design/icons'
import './estilos.css'
import NavBarMobile from './navBarComponents/mobileNavBar'
import { Link } from 'react-router-dom';
import SkeletonCard from './skeletonCard'

function NavBar() { 
  const [collapsed, setCollapsed] = useState(true)
  const [drawerOpen, setDrawerOpen] = useState(false)

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
        <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
          2nd menu item (disabled)
        </a>
      ),
      icon: <SmileOutlined />,
      disabled: true,
    },
    {
      key: '4',
      danger: true,
      label: 'a danger item',
    },
  ];

    return (
      <Row>
        <Col xs={{span: 0}} md={{span: 24}}>
          <Menu mode='horizontal' >
              <div style={{width: '100vw', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <div style={{paddingTop: '.4rem', paddingLeft: '1rem'}}>
                  <Link to={'/'}>
                    <Typography style={{fontFamily: 'Graduate, serif', display: 'flex', justifyContent: 'center'}}>Bee</Typography>
                    <Typography style={{fontFamily: 'Graduate, serif', display: 'flex', justifyContent: 'center'}}>Candles</Typography>
                  </Link>
                </div>
                <Menu.ItemGroup style={{display: 'flex', paddingLeft: '0rem'}}>
                  <Menu.Item style={{padding: '.3rem'}}>
                    <Dropdown menu={{ items }} trigger={['click']} onClick={toggleCollapsed}>
                      <Typography>Categoria{collapsed ? <DownOutlined/> : <UpOutlined/>}</Typography>
                    </Dropdown>
                  </Menu.Item>
                    <Menu.Item style={{padding: '.3rem'}}>
                      <Link to={'/sobre-nosotros'}>
                        Sobre Nosotros
                      </Link>
                    </Menu.Item>
                </Menu.ItemGroup>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <Input size='large' style={{width: '13rem', marginRight: '1rem'}} placeholder='Search...' prefix={<SearchOutlined/>}/>
                      <i style={{paddingRight: '.5rem'}} className='carritoPanal' onClick={showDrawer}></i>
                      <Drawer
                        style={{backgroundColor: "#BBB6DF", padding: 0}}
                        title='Carrito'
                        closable
                        onClose={onDrawerClose}
                        open={drawerOpen}
                      >
                        <SkeletonCard></SkeletonCard>
                      </Drawer>
                    <Badge count={23} offset={[-20, -30]} status='error' style={{color: 'black'}}/>
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

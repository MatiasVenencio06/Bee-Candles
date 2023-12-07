import { Menu, Typography, Col } from 'antd'
import { Link } from 'react-router-dom';
import React from 'react'
import { GithubOutlined, InstagramOutlined, WhatsAppOutlined, LinkedinOutlined } from '@ant-design/icons';


function Footer({display}) {
    return (
        <Menu mode='vertical' style={{marginTop: '1rem', gap: '2rem', position: 'static', display: `${display}`, justifyContent: 'center', alignItems: 'center'}}>
          {window.innerWidth > 500 ? <>
            <Typography style={{color: 'GrayText'}}>©2023 Bee Candles</Typography>
            <img style={{width: '8%', padding: '.5rem'}} src='/beeCandlesLogo.png'/>
            <Col>
                <Typography>Desarrollado por </Typography>
                <Link to={'https://www.linkedin.com/in/mat%C3%ADas-joel-venencio/'} target='_blank'>Matias Venencio<LinkedinOutlined/></Link>
            </Col>
            <Link to={'https://github.com/MatiasVenencio06'} target='_blank'>
                <GithubOutlined style={{fontSize: '1.5rem'}}/>
            </Link>
            <Link to={'https://www.instagram.com/beecandles_23/'} target='_blank' style={{color: '#ff000'}}>
                <InstagramOutlined style={{fontSize: '1.5rem'}}/>
            </Link>
          </> : <Col>
            <Typography style={{color: 'GrayText', textAlign: 'center', marginTop: '.5rem'}}>©2023 Bee Candles</Typography>
            <Typography style={{textAlign: 'center'}}>Desarrollado por <Link to={'https://www.linkedin.com/in/mat%C3%ADas-joel-venencio/'} target='_blank'>Matias Venencio<LinkedinOutlined/></Link></Typography>
            <Col style={{display: 'flex', justifyContent: 'center'}}>
              <img style={{width: '30%'}} src='/beeCandlesLogo.png'/>
            </Col>
            <Col>
            </Col>
            <Col style={{display: 'flex', justifyContent: 'center', gap: 20, marginTop: '.2rem', paddingBottom: '1rem'}}>
              <Link to={'https://github.com/MatiasVenencio06'} target='_blank'>
                  <GithubOutlined style={{fontSize: '1.5rem'}}/>
              </Link>
              <Link to={'https://www.instagram.com/beecandles_23/'} target='_blank' style={{color: '#ff000'}}>
                  <InstagramOutlined style={{fontSize: '1.5rem'}}/>
              </Link>
            </Col>
          </Col>}
            
        </Menu>
    )
}

export default Footer

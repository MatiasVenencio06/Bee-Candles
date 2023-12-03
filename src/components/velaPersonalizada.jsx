import { Card, Carousel, Col, Image, Row, Typography } from 'antd'
import React from 'react'

function VelaPersonalizada() {
    return (
        <Row style={{display: 'flex', justifyContent: 'center', marginTop: '1rem'}}>
            <Card
              title="Proximamente"
              style={{ width: '60vw', height: '50vh' }}
              hoverable
            >
              <Carousel autoplay>
                <div>
                  <h3>Contenido 1</h3>
                  <h3>contenido 1 b</h3>
                </div>
                <div>
                  <h3>Contenido 2</h3>
                </div>
                <div>
                  <h3>Contenido 3</h3>
                </div>
                {/* Agrega más elementos div para más contenido en el carrusel */}
              </Carousel>
                <Typography>Vela personalizada</Typography>
            </Card>
        </Row>
    )
}

export default VelaPersonalizada

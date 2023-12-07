import { Card, Col, Skeleton, Row } from 'antd'
import React from 'react'

function SkeletonCard() {
    return (
        <Row style={{display: 'flex', justifyContent: 'space-between'}}>
            <Col sm={5} md={8} xl={4} style={{minWidth: '15rem'}}>
                <Card bordered style={{margin: '1rem'}}>
                    <Skeleton.Image active/>
                    <Skeleton.Input active size='small' style={{marginTop: '.7rem'}}></Skeleton.Input>
                    <Skeleton.Input active size='small' style={{marginTop: '.7rem'}}></Skeleton.Input>
                    <Skeleton.Input active size='small' style={{marginTop: '.1rem'}}></Skeleton.Input>
                    <Skeleton.Input active size='small' style={{marginTop: '.1rem'}}></Skeleton.Input>
                </Card>
            </Col>
            <Col sm={5} md={8} xl={4} style={{minWidth: '15rem'}}>
                <Card bordered style={{margin: '1rem'}}>
                    <Skeleton.Image active/>
                    <Skeleton.Input active size='small' style={{marginTop: '.7rem'}}></Skeleton.Input>
                    <Skeleton.Input active size='small' style={{marginTop: '.7rem'}}></Skeleton.Input>
                    <Skeleton.Input active size='small' style={{marginTop: '.1rem'}}></Skeleton.Input>
                    <Skeleton.Input active size='small' style={{marginTop: '.1rem'}}></Skeleton.Input>
                </Card>
            </Col>
            <Col sm={5} md={8} xl={4} style={{minWidth: '15rem'}}>
                <Card bordered style={{margin: '1rem'}}>
                    <Skeleton.Image active/>
                    <Skeleton.Input active size='small' style={{marginTop: '.7rem'}}></Skeleton.Input>
                    <Skeleton.Input active size='small' style={{marginTop: '.7rem'}}></Skeleton.Input>
                    <Skeleton.Input active size='small' style={{marginTop: '.1rem'}}></Skeleton.Input>
                    <Skeleton.Input active size='small' style={{marginTop: '.1rem'}}></Skeleton.Input>
                </Card>
            </Col>
            <Col sm={5} md={8} xl={4} style={{minWidth: '15rem'}}>
                <Card bordered style={{margin: '1rem'}}>
                    <Skeleton.Image active/>
                    <Skeleton.Input active size='small' style={{marginTop: '.7rem'}}></Skeleton.Input>
                    <Skeleton.Input active size='small' style={{marginTop: '.7rem'}}></Skeleton.Input>
                    <Skeleton.Input active size='small' style={{marginTop: '.1rem'}}></Skeleton.Input>
                    <Skeleton.Input active size='small' style={{marginTop: '.1rem'}}></Skeleton.Input>
                </Card>
            </Col>
        </Row>
            
    )
}

export default SkeletonCard

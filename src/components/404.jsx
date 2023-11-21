import React from 'react'
import './estilos.css'

function NotFound() {
    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <i style={{paddingRight: '.5rem'}} className='vela404'></i>
        <h1>404: Pagina no encontrada :(</h1>
        </div>
    )
}

export default NotFound

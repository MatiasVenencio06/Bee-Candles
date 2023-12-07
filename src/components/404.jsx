import React from 'react'
import './estilos.css'
import { Link } from 'react-router-dom'

function NotFound() {
    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <i style={{paddingRight: '.5rem'}} className='vela404'></i>
        <h1>404: Pagina no encontrada :(</h1>
        <Link to={'/'}>Volver</Link>
        </div>
    )
}

export default NotFound

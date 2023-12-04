import React, { useEffect, useState } from 'react'
import {getFirestore, getDocs, collection} from 'firebase/firestore'

function Prueba() {
    const [mostrar, setMostrar] = useState('')

    useEffect(() => {

        const db = getFirestore()

        const itemsRef = collection(db, 'items')

        getDocs(itemsRef)
        .then(res => {
            if (res.size === 0) {
                setMostrar('no haay datos que mostrar')
            }
            setMostrar(res.data)
        })
    }, [])

    return (
        <div>
            <h1>{mostrar}</h1>
        </div>
    )
}

export default Prueba

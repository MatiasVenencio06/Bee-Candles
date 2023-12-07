import React from 'react'
import { PuffLoader } from 'react-spinners'

function Loader(loading) {

    const backgroundStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(61, 61, 61, 0.315)',
        backdropFilter: 'blur(5px)',
        zIndex: 1001,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      };
  
      const spinnerStyle = {
        position: 'fixed',
        top: '40%',
        left: '45%'
      };

    return (
        <div style={backgroundStyle}>
            <PuffLoader loading={loading} color='#f37794' size={100} style={spinnerStyle}>  
            </PuffLoader>
        </div>
    )
}

export default Loader

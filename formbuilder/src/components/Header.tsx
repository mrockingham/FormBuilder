import React from 'react'

import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div style={{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        padding:'10px 20px',
        backgroundColor:'lightgray',
        height:'50px'
    }}>
        <Link to={'/'}>Home</Link></div>
  )
}

export default Header
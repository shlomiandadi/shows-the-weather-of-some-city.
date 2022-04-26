import React from 'react'
import { Link } from 'react-router-dom';
import "./header.css";


const Header = ({ isCelsius, setIsCelsius }: any) => {

  return (
    <div className='header-app container-fluid'>
      <div className="container">
        <div className="row justify-content-between align-items-center">
          <h2 className='col-auto'>weather</h2>
          <nav className='col-auto'>
            <Link to='/'>Home | </Link>
            <Link to='/Favorites'>Favorites</Link>
          </nav>
          <button className='btn-unit' onClick={() => setIsCelsius(!isCelsius)}>Replace Unit C° to F° </button>
        </div>
      </div>
    </div>
  )
}

export default Header
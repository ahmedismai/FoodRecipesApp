import React, { useState, useEffect } from 'react';
import style from './NavBar.module.scss';
import logo from '../assets/logo-BfNap0Pe.png';
import { Link, useNavigate } from 'react-router-dom';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(window.innerWidth > 668);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 668);

  function toggleNavbar() {
    if (isMobile) setIsOpen(!isOpen);
  }

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 668);
      if (window.innerWidth > 668) {
        setIsOpen(true); 
      } else {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
   const navigate=useNavigate()
  function handleClick(){
    navigate('/')
  }
  return (
    <>
      {isMobile && ( 
        <button className={style.toggleButton} onClick={toggleNavbar}>
          <i className="fa-solid fa-bars"></i>
        </button>
      )}

      <nav className={`${style.navbar} ${isOpen ? style.open : style.closed}`}>
        <div className={style.container}>
          <div className={style.images}>
            <img src={logo} alt="Logo" className={style.img} />
          </div>

          <ul>
            <li onClick={()=>handleClick()} className={style.BgColor}>
              Meals
            </li>
            <li onClick={()=>handleClick()}>
              Ingredients
            </li>
            <li onClick={()=>handleClick()}>
              Area
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

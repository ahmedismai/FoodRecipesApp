import React from 'react'
import style from './Layout.module.scss'

import { Outlet } from 'react-router-dom';
import NavBar from './../NavBar/NavBar.jsx';
import Footer from '../Footer/Footer';

export default function Layout() {
  return (
    <>
        
          <NavBar />

        <div >
          <Outlet/>
        </div>
        <Footer/>

       
    </>
  )
}

import React from 'react'
import style from './Footer.module.scss'
import logo from '../assets/logo-BfNap0Pe.png'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <>
        <section className={style.Footer}>
            <div className={style.container}>
                <div className={style.contant}>
                    <div className={style.image}>
                        <img src={`${logo}`} alt="" />
                        <div>
                        <span className={style.span}>
                            <Link to={`/`}>
                            Recipe
                            </Link>
                        </span>
                        </div>
                    </div>
                    <div>
                        <span className={style.fonts}>
                             Route
                        </span>
                    </div>
                </div>
                <div className={style.p1}>
                <p class={style.copyright}>
                    <a href="https://www.facebook.com/profile.php?id=100015580123329"><span>&copy;</span>2025 Ahmed Ismail™</a> 
                     <span className=''>.All Rights Reserved.</span></p>
                </div>
                
            </div>
        </section>
    </>
  )
}

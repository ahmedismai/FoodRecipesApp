import React from 'react'
import style from './Home.module.scss'
import Category from '../Category/Category.jsx';
import SengleMeals from './../SengleMeals/SengleMeals';



export default function Home() {
  return (
    <>
      <Category></Category>
      <SengleMeals></SengleMeals>
    </>
  )
}

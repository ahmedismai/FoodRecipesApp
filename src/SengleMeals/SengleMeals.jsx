import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import style from "./SengleMeals.module.scss"



export default function SengleMeals() {

  const {id} = useParams()
  const [meal,setMeal]=useState(null)
  const [loading, setLoading] = useState(true)
  const navigate =useNavigate()
 
  async function mealsDetails(id){
          
    axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((res) => {
        setMeal(res?.data?.meals ? res?.data?.meals[0] : navigate('/notfound'))
      })
      .catch((error) => {
        console.error("Error fetching meal details:", error)
        navigate('/notfound')
      })
      .finally(() => {
        setLoading(false)
      })
    }
  useEffect(()=>{
    mealsDetails(id)
  },[id])
  
  if (loading) {
    return <h2 className={style.loading}>Loading...</h2>
  }

  if (!meal) {
    return <h2 className={style.error}>No meal found</h2>
  }
  const ingredients = []
  for (let i = 1; i <9; i++) {
    const ingredient = meal[`strIngredient${i}`]
    const measure = meal[`strMeasure${i}`]
    if (ingredient && ingredient.trim() !== "") {
      ingredients.push({ ingredient, measure })
    }
  }
  
  return (
    <>
      <section className={style.section}>
      <div className={style.container}>
          <h1 className={style.text}>{meal?.strMeal}</h1>
          <div className={style.item}>
        <div className={style.contant}>
            <div className={style.images}>
            <img className={style.image} src={meal?.strMealThumb} alt={meal?.strMeal} />
            {id && <div className={style.button}>
            <button className={style.youtube}>
            <i class="fa-brands fa-youtube"></i>
              <a href={meal?.strYoutube}>Youtube</a>
            </button>
            <button className={style.source}>
            <i class="fa-solid fa-globe"></i>
              <a href={meal?.strSource}>source</a>
            </button>
            </div>}
            </div>
            
            <p>{meal?.strInstructions}</p>
            <div>
              {id && <div className={style.ingredientsContainer}>
            <h2 className={style.ingredientsTitle}>Ingredients</h2>
            <div className={style.ingredientsList}>
              {ingredients.map((item, index) => (
                <div key={index} className={style.flex}>
                  <span>{item.ingredient}:</span>
                  <span>{item.measure}</span>
                </div>
              ))}
            </div>
            </div>}
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}

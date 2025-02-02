import React, { useEffect, useState } from 'react'
import style from './Category.module.scss'
import logo from '../assets/sytuqu1511553755.jpg'
import { NavLink, Navigate, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

export default function Category() {
    
        // 
        const [products,setproducts]=useState([])
        const [category,setSitCategory]=useState([])
        const [Meals,setMeals]=useState([])
        const [Area,setArea]=useState([])
        const [FiltterMeals,setFiltterMeals]=useState([])
        const [isMobile, setIsMobile] = useState(window.innerWidth <= 668); 
        const [product,setproduct]=useState(null)
        
        const { name} = useParams()
        const navigate=useNavigate()

       async function getProducts(){
          await axios.get(`https://www.themealdb.com/api/json/v1/1/categories.php`)
          .then((res)=>{      
            setproducts(res?.data?.categories);
          })
          .catch((err)=>{
            console.log(err)
            
          })
        }
       async function getArea(){
                await axios.get(`https:///www.themealdb.com/api/json/v1/1/search.php?s`)
          .then((res)=>{
            
            setArea(res?.data?.meals)
            
            
          })
          .catch((err)=>{
            console.log(err)
            
          })
        }
       async function FiltterMealsByCategory(atrabiata){
                await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${atrabiata}`)
          .then((res)=>{
            if (res?.data?.meals) {
              setFiltterMeals(res?.data?.meals);
            } else {
              setFiltterMeals([]);
              navigate("/notfound"); // ✅ فقط إذا لم توجد بيانات
            }
          })
          .catch((err) => {
            console.error("Error fetching meals:", err);
            navigate("/notfound");
          })
        }

        
        
        async function fetchAllMeals() {
          
          axios
            .get("https://www.themealdb.com/api/json/v1/1/categories.php")
            .then((res) => {
              const categoryNames = res.data.categories.map((cat) => cat.strCategory);
              const mealRequests = categoryNames.map((category) =>
                axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
              );
      
              Promise.all(mealRequests)
                .then((responses) => {
                  const allMeals = responses.flatMap((response) => response.data.meals || []);
                  setMeals(allMeals);
                  ;
                })
                .catch((err) => {
                  console.error("Error fetching all meals:", err);
                  ;
                });
            })
          }

      
  
  function mealDetails(id)
  { 
      if(id==id){
        navigate(`/mealsdetails/${id}`)
      }
      
  }

  
      
        useEffect(()=>{
          
          getProducts()
          if (!name || name === "all") {
            fetchAllMeals();
          } else {
            FiltterMealsByCategory(name);
          }
          getArea()
          const handleResize = () => {
            setIsMobile(window.innerWidth <= 668);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    },[name])
        
        const [dFlex , setdFlex]=useState("dFlex")

  
    function changeClassName(){
      if(dFlex==='dFlex'){
          setcount('hidden')
        return
        }else{
          setcount('dFlex')

        }
    
    }
function handleCategoryChange(event) {
        const selectedCategory = event.target.value;
        navigate(`/category/${selectedCategory}`);
    }

  return (
    <>
      <section className={`${style.section} ${style.index}`}>
        <h1 className={style.fonts}>Learn, Cook, Eat Your Food</h1>

        {isMobile ? 
        <div>
        
        <select id="categorySelect" className={style.categorySelect} onChange={handleCategoryChange} value={name || ""}>
            
            {products.map((product) => (
                <option key={product.idCategory} value={product.strCategory}>
                    {product.strCategory}
                </option>
            ))}
        </select>
    </div> : (
                <ul className={style.categoryList}>
                    <li><NavLink to='/' className={style.bg}>All</NavLink></li>
                    {products?.map((product) => (
                        <li key={product.idCategory}>
                            <NavLink className={style.hover} to={`/category/${product.strCategory}`} className={style.bg}>
                                {product.strCategory}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            )
        }
        
        <div className={style.container}>
            {
                FiltterMeals?.length>0 ? FiltterMeals?.map((product)=><>
                
                    <div key={product?.idMeal} className={style.items}>
                <div className={style.contant}>
                <div className={style.images}>
                    <img src={product?.strMealThumb} alt="" className={style.img} />
                </div>
                <div className={style.marginSection}>
                <span >{product?.strMeal.slice().split(" ").slice(0,2).join(" ")}</span>
                
                <span className={style.bgEmralde}>{product?.strArea}</span>
                <button onClick={()=>mealDetails(product?.idMeal)}>View Recipe</button>
                </div>
                </div>
                
            </div>
            
                </>):Area?.map((meal)=><>
                <div key={meal?.idMeal} className={style.items}>
                <div className={style.contant}>
                <div className={style.images}>
                    <img src={meal.strMealThumb} alt="" className={style.img} />
                </div>
                <div className={style.marginSection}>
                <span >{meal?.strMeal?.slice().split(" ").slice(0,2).join(" ")}</span>
                <span className={style.bgEmralde}>{meal?.strArea}</span>
                <button onClick={()=>mealDetails(meal?.idMeal)}>View Recipe</button>
                </div>
                </div>
                
            </div>
                </>)
            }
            
        </div>
      </section>
    </>
  )
}

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './Home/Home.jsx';
import Layout from './Layout/Layout';
import Category from './Category/Category'
import SengleMeals from './SengleMeals/SengleMeals.jsx';
import Notfound from './Notfound/Notfound'

SengleMeals


function App() {

   const x = createBrowserRouter([
    {path:"" , element : <Layout></Layout> , children:[
      {index:true , element:<Home></Home>},
      {path:"category/:name" , element : <Category></Category>},
      {path:"mealsdetails/:id" , element : <SengleMeals></SengleMeals>},
      {path: "*" , element: <Notfound/>},
    ]}
   ])
      
    
    return (
        <>
          <RouterProvider router={x}></RouterProvider>
   
        </>
    )
    
}

export default App

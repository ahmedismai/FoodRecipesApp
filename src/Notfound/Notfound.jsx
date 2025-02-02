import React from 'react'
import { Link } from 'react-router-dom'

export default function Notfound() {
  return (
    <>
      <div className='container'> 
      <div>
      <p className='p1'></p>
      <p className='p2'></p>
      </div>
      </div>
      <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>❌404 - Page Not Found ❌</h1>
      <p>Whoops! That page doesn’t exist. But do not fret, check out our other resources to get started.</p>
      <Link to="/" style={{ textDecoration: "none", color: "blue" }}>Back to home Page</Link>
    </div>
    </>
  )
}

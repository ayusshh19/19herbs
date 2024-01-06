import React from 'react'
import Products from './Products'
import Sidebar from './Sidebar'

function Productspage() {
  return (
    <div>
        <Sidebar />
        <div class="content ml-12 transform ease-in-out duration-500 pt-20 px-2 md:px-5 pb-4 ">
        <Products />
      </div>
    </div>
  )
}

export default Productspage
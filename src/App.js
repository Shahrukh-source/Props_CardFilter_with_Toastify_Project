import React from 'react'
import Navbar from './components/Navbar'
import Filter from './components/Filter'

import { useState } from 'react'
import {toast} from "react-toastify"
import { apiUrl, filterData  } from "./data";
import { useEffect } from 'react'
import Spinner from './components/Spinner'

import Cards from './components/Cards'

export default function App() {
let [course,setcourse] = useState(null)
let [loading,setloading] = useState(true)
let [category,setcategory] = useState(filterData[0].title)

const fetchData = async()=>{
  setloading(true)
  try{
const res = await fetch(apiUrl);
const output = await res.json();
//save data into a variable
setcourse(output.data)
  }
  catch(error){
toast.error("somthing wrong")
  }
  setloading(false)
}

useEffect(()=>{
fetchData()
},[]);
  return (
    <div className='min-h-screen flex flex-col bg-bgDark2'>
      <div>
        <Navbar/> 
      </div>
    <div className="">
    <div >
      <Filter filterData = {filterData} category={category} setcategory={setcategory}/>
      </div>
      <div className="w-11/12 max-w-[1200px] 
        mx-auto flex flex-wrap justify-center items-center min-h-[50vh]">
        {
          loading ? (<Spinner/>) : (<Cards courses={course} category={category}/>)
        }
      </div>
    </div>
    </div>
  )
}

import { useState } from 'react'

import './App.css'
import {BrowserRouter , Routes, Route, Navigate} from 'react-router-dom';
import PageNotFound from './Components/PageNotFound';

import Login from './Components/Login';
import Signup from './Components/SignUp';
import Dashboard from './Components/Dashboard';
import Home from './Components/Home';
function App() {
  const [count, setCount] = useState(0)
 

  return (
   <BrowserRouter>
   <Routes>
 <Route path ='/' element={<Login/>}/>
 <Route path ='/signup' element={<Signup/>}/>
    <Route path ='/dashboard' element={<Dashboard/>}/>
    <Route path ='' element={<PageNotFound/>}/>
   
     <Route path ='/home' element={<Home/>}/>
    <Route path ='*' element={<PageNotFound/>}/>
   
   </Routes>
   
   </BrowserRouter>
  )
}

export default App

import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import { BrowserRouter, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path ="/" element ={<Home></Home>}></Route>
        <Route path ="/" element ={<Login></Login>}></Route>
        <Route path ="/" element ={<Register></Register>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

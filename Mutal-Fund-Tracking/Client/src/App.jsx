import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Service from './pages/Service'
import Header from './components/Header'
import Footer from './components/Footer'
import Register from './pages/Register'
import Login from './pages/Login'
import PrivateRoute from './utils/PrivateRoute'
import Requestotp from './pages/Requestotp'
import Verifyotp from './pages/Verifyotp'

const App = () => {


  return <>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
         <Route path='/request-otp' element={<Requestotp />}></Route>
          <Route path='/verify-otp' element={<Verifyotp />}></Route>

        <Route element={<PrivateRoute />}>
          <Route path='/home' element={<Home />}></Route>
          <Route path='/about' element={<About />}></Route>
          <Route path='/contact' element={<Contact />}></Route>
          <Route path='/service' element={<Service />}></Route>
        </Route>

      </Routes>
      <Footer />
    </BrowserRouter>

  </>
}

export default App
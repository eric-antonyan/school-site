import React from 'react'
import './App.css'
import { NextUIProvider } from "@nextui-org/react"
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Admin from './components/Admin';
import Play from './components/Play';
import Results from './components/Results';
import SignIn from './components/SignIn';
import { AnimatePresence } from 'framer-motion';
import UserRegister from './components/UserRegister';
import PleaseWait from './components/PleaseWait';

const App = () => {
  // const location = useLocation()
  return (
    <AnimatePresence mode='wait'>
      <NextUIProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<UserRegister />} />
            <Route path='/adm' element={<Admin />} />
            <Route path='/play' element={<Play />} />
            <Route path='/results' element={<Results />} />
            <Route path='/signin' element={<SignIn />} />
            <Route path='/wait' element={<PleaseWait />} />
          </Routes>
        </BrowserRouter>
      </NextUIProvider>
    </AnimatePresence>
  )
}

export default App

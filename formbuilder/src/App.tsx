


import { Route, Routes } from 'react-router-dom';

import FormBuilder from './pages/FormBuilder';
import LandingPage from './pages/LandingPage';
import Header from './components/Header';
import './App.css'
const  App = ()=>  {


  return (
    <div style={{height:'100%'}} >

<Header />
<div   style={{height:'100%'}}>
  <Routes>
    <Route path ='/' element={<LandingPage />} />
    <Route path='/builder' element={<FormBuilder/>} />
  </Routes>
</div>
    </div>
  )
}

export default App

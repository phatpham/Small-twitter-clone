import React, { useState } from 'react';
import './App.css';
import Content from './components/Content'
import Header from './components/Header'
import 'bootstrap/dist/css/bootstrap.min.css';



const App = () => {
  //const [page, setPage] = useState('home')
  //const toPage = (page) => (event) => {
  //  event.preventDefault()
  //  setPage(page)
  //}



  //const padding = {
  //  padding: 5
  //}

  //Generate a login form. Should this be a seperate component?
  

  return (
    <div>
      <Header />
      <Content />
      
    </div>
  )
}

export default App;

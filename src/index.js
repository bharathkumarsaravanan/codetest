import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import IndexPage from './components/indexPage';


const root = ReactDOM.createRoot(document.getElementById('root'));

function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPage/>} />
      </Routes>
    </BrowserRouter>
  )
}

root.render(
    <App />
);


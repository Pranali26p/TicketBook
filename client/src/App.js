
import React from 'react';
import './App.css';
import {BrowserRouter ,Route,Routes} from 'react-router-dom'
import BookingPage from './components/BookingPage'; 
 
 
// import { useState } from 'react';
 

function App() {
 
  
  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'row', padding: '20px', margin: 'auto'  }}  > 
   

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BookingPage  
              />} />
        </Routes>
      </BrowserRouter>
    


    </div>
  );
}

export default App;

import React, { useEffect, useState } from 'react'

import axios from 'axios';
import MovieCard from './MovieCard';

function ShowBooking(props) {


  const [movieList, setmovieList] = useState([]);
  const getData = () => {
    axios.get('http://localhost:8080/api/booking').then((res) => {
      setmovieList((res.data));
    })

  }

  useEffect(() => { getData() }, [])

  return (
    <div style={{ display:'flex', flexDirection:'column'}} >
      
      <div style={{ borderBottom: "3px dotted black", marginBottom: '5px' }}>All  Booked movie will be here</div>
      <div id = 'MovieCardParent' style={{  display:'flex' ,flexDirection:'column-reverse' }}>
        {
          movieList.length!==0?(movieList.map((val) =>
        <MovieCard key={val._id} movie={val} />
      )):<div>" NO MOVIE DETAILS FOUND..."</div>
      }
      </div>
   </div>
  )
}

export default ShowBooking
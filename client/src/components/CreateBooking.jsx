import React, { useCallback, useEffect, useReducer } from 'react'
import './style.css';
import axios from 'axios';
import Card from './Card';
import NameComponent from './NameComponent';
import { movies, seats, slots } from '../data';


const setMovieReducer = (movie, action) => {
  switch (action.type) {
    case 'set_title':
      return { ...movie, title: action.payload };
    case 'set_slot':
      return { ...movie, slot: action.payload };
    case 'set_seats':
      console.log("data saved")
      return { ...movie, seats: action.payload, };
    case 'movie_detail':
      return {...movie};
    default:
      throw new Error();
  }
}
const ACTION = {
  SET_TITLE: 'set_title',
  SET_SLOT: 'set_slot',
  SET_SEAT: 'set_seats',
  MOVIE_DETAIL:'movie_detail'
}

function CreateBooking() {


  const [movie, dispatch] = useReducer(setMovieReducer, {
    title: "",
    slot: "",
    seats: {
      A1: 0,
      A2: 0,
      A3: 0,
      A4: 0,
      D1: 0,
      D2: 0
    }
  })




  useEffect(() => {
    const localTitle = localStorage.getItem('title')
    const localSlot = localStorage.getItem('slot')
    const prevSeat = localStorage.getItem('seat')
    if (localTitle) {
      dispatch({ type: ACTION.SET_TITLE, payload: localTitle })
    }
    if (localSlot) {
      dispatch({ type: ACTION.SET_SLOT, payload: localSlot })
    }
    if (prevSeat) {
      console.log("recieved  from local ", JSON.parse(prevSeat));
      dispatch({ type: ACTION.SET_SEAT, payload: JSON.parse(prevSeat) }) 
    }
    const lastTitle = document.getElementById(localStorage.getItem('title'));
    if (lastTitle) lastTitle.className = "active"

    const lastSlot = document.getElementById(localStorage.getItem('slot'));
    if (lastSlot) lastSlot.className = "active"


    if (prevSeat) {
      const seatObject = JSON.parse(prevSeat)
      for (const key in seatObject) {
        if (seatObject[key] > 0) {
          const lastSeat = document.getElementById(key);
          if (lastSeat) lastSeat.value = seatObject[key]
          if (lastSeat) lastSeat.className = "active"
        }
      }
    }
  }, [])




  const postData = (data) => {
    const res = axios.post('http://localhost:8080/api/booking', data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    })
    return res
  }




  function movieSubmitHandler(e) {
    e.target.className = "active"

    if (movie.title === "" || movie.slot === "" || (movie.seats.A1 === 0 && movie.seats.A2 === 0 && movie.seats.A3 === 0 && movie.seats.A4 === 0 && movie.seats.D1 === 0 && movie.seats.D2 === 0)) {
      alert("Please fill the details carefully...");
    }
    else {
      const res = postData(JSON.stringify(
        {
          title: movie.title,
          slot: movie.slot,
          seats: movie.seats
        }
      ))
      res ? console.log("data submitted succesfully...") : console.log("error")
      localStorage.clear();
    }
  }


  function titleClickHandler(e) {
    e.preventDefault();
    if (e.target.className === "child") {
      dispatch({ type: ACTION.SET_TITLE, payload: e.target.innerText })
      e.target.className = "active"
      const lastTitle = document.getElementById(localStorage.getItem('title'));
      if (lastTitle) {
        lastTitle.className = "child"
      }
      localStorage.setItem('title', e.target.id)

    }
  }




  function slotClickHandler(e) {
    e.preventDefault();
    if (e.target.className === "child") {
      dispatch({ type: ACTION.SET_SLOT, payload: e.target.innerText })
      e.target.className = "active"
      const lastSlot = document.getElementById(localStorage.getItem('slot'));
      if (lastSlot) {
        lastSlot.className = "child"
      }
      localStorage.setItem('slot', e.target.id)
    }
  }



  function seatClickHandler(e) {
    e.preventDefault();
    const updatedSeats = { ...movie.seats, [e.target.id]: Number(e.target.value) };
    dispatch({ type: ACTION.SET_SEAT, payload: updatedSeats });
    e.target.className = "active";
  

    localStorage.setItem('seat', JSON.stringify(updatedSeats));
  }
  
  
  useEffect(() => {
    const localTitle = localStorage.getItem('title')
    const localSlot = localStorage.getItem('slot')
    const prevSeat = localStorage.getItem('seat')
    if (localTitle) {
      dispatch({ type: ACTION.SET_TITLE, payload: localTitle })
    }
    if (localSlot) {
      dispatch({ type: ACTION.SET_SLOT, payload: JSON.parse(localSlot) })
    }
    if (prevSeat) {
      console.log("recieved  from local ", JSON.parse(prevSeat));
      dispatch({ type: ACTION.SET_SEAT, payload: JSON.parse(prevSeat) })
    }
    const lastTitle = document.getElementById(localTitle);
    if (lastTitle) lastTitle.className = "active"
  
  
    const lastSlot = document.getElementById(localSlot);
    if (lastSlot) lastSlot.className = "active"
  
  
  
  
    if (prevSeat) {
      const seatObject = JSON.parse(prevSeat)
      for (const key in seatObject) {
        if (seatObject[key] > 0) {
          const lastSeat = document.getElementById(key);
          if (lastSeat) lastSeat.value = seatObject[key]
          if (lastSeat) lastSeat.className = "active"
        }
      }
    }
  }, [])


  return (
    <form className='create-booking-page'>
      <Card >
        <div className='movie-title-parent' style={{ display: 'flex', flexDirection: 'column' }}>
          <h3>Select a Movie </h3>

          <div id="movie-title-row" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }} onClick={titleClickHandler}> {
            movies.map((item, index) => (
              <NameComponent key={index} item={item} />))
          }
          </div>

        </div>
      </Card>



      <Card  >
        <div className='time=slot-parent' style={{ display: 'flex', flexDirection: 'column' }}>
          <h3>Select a slots</h3>
          <div className='slot=row' id="slot-pparent" style={{ display: 'flex', justifyContent: 'center' }} onClick={slotClickHandler}>
            {
              slots.map((item, index) => (
                <NameComponent key={index} item={item} />
              ))
            }
          </div>
        </div>
      </Card>


      <Card>
        <div className='movie-seat-container' style={{ display: 'flex', flexDirection: 'column' }}>
          <h3>Select a seat</h3>
          <div className='movie-seat-row' style={{ display: 'flex', justifyContent: 'center' }} >
            {seats.map((item, index) => (
              <Card key={index} style={{ padding: "1px 5px", border: '', borderRadius: "5px" }}  >
                {item}
                <input id={item} className='child' type="number" min="0" step="1" name={item} style={{ width: "35px" }} onChange={seatClickHandler} />
              </Card>
            ))}
          </div>
        </div>
      </Card>



      <button className="" style={{ margin: '20px', marginTop: '35px', padding: '5px' }} onMouseEnter={(e) => { e.target.className = "active" }} onClick={movieSubmitHandler}>confirm</button>


    </form>
  )
}

export default CreateBooking
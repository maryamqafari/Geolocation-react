import { ADD_BOOKING , DELETE_BOOKING , BOOKINGS_LOADING , EDIT_BOOKING ,GET_BOOKINGS, FETCH_BOOKINGS_FAILURE} from './type';
import axios from 'axios';

export const getBookings =()=> dispatch =>{
    dispatch(BookingsLoading());
    fetch('http://localhost:8000/api/bookings/')
        .then(handleErrors)
        .then(res => res.json())
        .then(res => dispatch(
            {
                type : GET_BOOKINGS,
                payload: res
            }
        ))
}

export const editBooking =() =>{
    return {
        type : EDIT_BOOKING
    }
}

export const BookingsLoading =() =>{
    return {
        type : BOOKINGS_LOADING
    }
}

export const deleteBooking = key => dispatch  =>{
    axios.delete(`http://localhost:8000/api/bookings/${key}`)
    .then(res =>
        dispatch({
          type: DELETE_BOOKING,
          payload: key
        })
      );
    };

export const addBooking = item => dispatch => {
    console.log(item);
    axios.post('http://localhost:8000/api/bookings/',item)
    
   .then(res =>
          dispatch({
            type: ADD_BOOKING,
            payload: res
          })
        );
        
    }

export const fetchaBookingsFailure = error => ({
    type: FETCH_BOOKINGS_FAILURE,
    payload: { error }
  });

   function handleErrors(response) {
    if (!response.ok) {
      console.log(response.statusText);
    }
    return response;
  }
  

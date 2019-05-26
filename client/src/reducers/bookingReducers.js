import { ADD_BOOKING , DELETE_BOOKING , BOOKINGS_LOADING , EDIT_BOOKING ,GET_BOOKINGS , FETCH_BOOKINGS_FAILURE} from '../actions/type';


const initialState = {
  bookings: []	,
  loading: false,
  error: null
};


export default (state=initialState, action) => {
  switch (action.type) {
    case GET_BOOKINGS:
      return {
        ...state,
        bookings: action.payload,
        loading: false
      };
    case DELETE_BOOKING:
      return {
        ...state,
        bookings: state.bookings.filter(item => item.key !== action.payload)
      };
    case ADD_BOOKING:
      return {
        ...state,
        bookings: [action.payload, ...state.bookings]
      };
      case EDIT_BOOKING:
               return {
                   ...state,
                   bookings: state.bookings.map((booking) => {
                     if(booking.key === action.payload.booking.key) {
                       return {
                         ...action.payload.booking,
                     }
                 }
                   return booking;
               }),
                 bookingtoedit: undefined,
             };
      case FETCH_BOOKINGS_FAILURE:
             return {
               ...state,
               loading: false,
               error: action.payload.error,
               bookings: []
             };
    case BOOKINGS_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
  };
  
import {combineReducers} from 'redux';
import bookingReducer from "./bookingReducers";

export default combineReducers({
 bookings : bookingReducer
})
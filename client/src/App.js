import React, { Component } from 'react';
import './App.css';
import {Provider} from 'react-redux';
import store from './store';
import BookingList from './components/bookingList';
import BookingForm from './components/bookingForm';
import {geolocated} from 'react-geolocated';
import Geoloc from './components/Geolocation/Geoloc';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
  render() {
    return (
      <Provider store = {store} >
        <div className="App">
            <div className="navbar">
              <h2 className="center">Test Project</h2>
            </div>  
 
            <div className="row">
              <div className="col-md-6">
                {/* <p>{this.props.coords && this.props.coords.latitude}</p> */}
                <Geoloc {...this.props} />
              </div>
              <div className="col-md-6">
                   <BookingForm />
              </div>  
            </div> 
            <div className="row">
              <div className="container">
                 <BookingList />
                 </div>  
             </div> 
        </div>
      </Provider>
    ); 
  }
}
const MainWithGeoloc = geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(App);


export default MainWithGeoloc;

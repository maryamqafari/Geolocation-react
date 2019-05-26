import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addBooking } from '../actions/bookingActions';

class BookingForm extends Component {
  constructor(props) {
    super(props);
 
    this.handleSubmit = this.handleSubmit.bind(this);
    this.createBooking = this.createBooking.bind(this);
  }
createBooking = item => {
    this.props.addBooking(item);
  }
handleSubmit = (e) => {
          e.preventDefault();
          const username = this.getEmail.value;
          const description = this.getBody.value;
          const date = new Date();
          const propertyId = this.getPropertyId.value;
          const propertyName = this.getTitle.value;
          const city =  this.getVicinity.value;
          const __key = Date.now();
          const data = {
            username,
            description,
            date: date,
            propertyId,
            propertyName,
            city,
            key: __key,
    };
 this.createBooking(data);
 this.getTitle.value = '';
 this.getBody.value = '';
 this.getEmail.value = '';
 this.getPropertyId.value = '';
 this.getVicinity.value = '';
}
render() {
return (
<div className="booking">
  <h1 className="booking_heading">Create Booking</h1>
  <form className="form" onSubmit={this.handleSubmit} >
   <input required type="hidden" id="propertyId" ref={(input) => this.getPropertyId = input}  /><br /><br />
   <input required type="text" id="email" ref={(input) => this.getEmail = input} placeholder="Enter your Email" /><br /><br />
   <input required type="text" id="title" ref={(input) => this.getTitle = input} placeholder="Booking Title" disabled /><br /><br />
   <input required type="text" id="vicinity" ref={(input) => this.getVicinity = input} placeholder="Vicinity" disabled /><br /><br />
   <textarea required rows="5" ref={(input) => this.getBody = input}  cols="28" placeholder="Enter Description" /><br /><br />
   <button>Create</button>
  </form>
</div>
);
}
}
const mapStateToProps = state => ({
  bookings: state.bookings
});
export default connect(
  mapStateToProps, { addBooking })(BookingForm);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBookings, deleteBooking , editBooking } from '../actions/bookingActions';
import propTypes from 'prop-types';

class BookingList extends Component {

  componentDidMount() {
    this.props.getBookings();
  }

  onDeleteClick = key => {
    this.props.deleteBooking(key);
  };

  onEditClick = key =>{
    this.props.editBooking(key);
  };

  render() {
  const { bookings } = this.props.bookings;
  // console.log(JSON.stringify(bookings))
    return (
      <div>
        <div>
          <div>
            {bookings ? bookings.map((item) => (
              <div key={item.key} timeout={500}>
               <div className="booking">
                          <h2 className="booking_title">{item.propertyName}</h2>
                          <p className="booking_message">{item.username}</p>
                          <p className="booking_message">{item.city}</p>
                          <div className="control-buttons">
                            <button className="edit"  onClick={this.onEditClick.bind(this, item.key)} >Edit</button>
                            <button className="delete" onClick={this.onDeleteClick.bind(this, item.key)}>Delete</button>
                          </div>
                        </div>
              </div>     
            ) ): null}
          </div>
        </div>
      </div>
    );
  }
}

BookingList.propTypes = {
  getBookings: propTypes.func.isRequired,
 // booking: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  bookings: state.bookings
});

export default connect(
  mapStateToProps,
  { getBookings, deleteBooking , editBooking }
)(BookingList);
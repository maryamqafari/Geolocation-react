module.exports = function(app) {

    var bookings = require('../controllers/booking.controller.js');

    // Create a new booking
    app.post('/api/bookings', bookings.create);

    // Retrieve all booking
    app.get('/api/bookings', bookings.findAll);

    // Retrieve a single booking by Id
    app.get('/api/bookings/:key', bookings.findOne);

    // Update a booking with Id
    app.put('/api/bookings/:key', bookings.update);

    // Delete a booking with Id
    app.delete('/api/bookings/:key', bookings.delete);
}
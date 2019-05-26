var fs = require('fs')
var data = fs.readFileSync('server/bookings.json');
var bookings = JSON.parse(data);
console.log("booking :" + bookings );

			

exports.create = function(req, res) {
	var newbooking = req.body;
	//newbooking.key = getNextId(bookings);
	bookings.push(newbooking);
	var data = JSON.stringify(bookings, null, 4)
	fs.writeFile('server/bookings.json',data,finished);
	function finished(err){
		console.log("--->After Post, bookings:\n" + data );
	}
    //bookings[newbooking.id] = newbooking;
	//console.log("--->After Post, bookings:\n" + data );
	res.end(JSON.stringify(bookings, null, 4));
	
};

exports.findAll = function(req, res) {
    console.log("--->Find All: \n" + JSON.stringify(bookings, null, 4));
    res.end(JSON.stringify(bookings, null, 4));  
};

exports.findOne = function(req, res) {
    var booking = bookings[req.params.key];
    console.log("--->Find booking: \n" + JSON.stringify(booking, null, 4));
    res.end(JSON.stringify(booking, null, 4));
};

exports.update = function(req, res) {
	var key = parseInt(req.params.key);
	var updatedbooking = req.body; 

	// var updateVal = function() {
	// 	state.forEach(function(s) {
	// 		s.id === updatedbooking.id && (s.val = valID);
	// 	});
	// };
	if(bookings != null){
		// update data
		bookings[key] = updatedbooking;

		console.log("--->Update Successfully, bookings: \n" + JSON.stringify(bookings, null, 4))
		
		// return
		res.end(JSON.stringify(updatedbooking, null, 4));
	}else{
		res.end(JSON.stringify(updatedbooking, null, 4));
	}
};

exports.delete = function(req, res) {
	 var deletebooking = bookings[req.params.key];
	 var index = bookings.indexOf(deletebooking);
	 var removed = bookings.splice(index);
	 console.log(removed);
	 //delete bookings[req.params.id];
	 fs.writeFile('server/bookings.json',JSON.stringify(bookings, null, 4),finished);
	 function finished(err){
	 	console.log("--->After deletion, booking list:\n" + JSON.stringify(bookings, null, 4) );
	 }
	 res.end(JSON.stringify(deletebooking, null, 4));
	};
	

function getNextId(obj) {
	return (Math.max.apply(Math, obj.map(function(o) {
	  return o.key;
	})) + 1);
  }
  
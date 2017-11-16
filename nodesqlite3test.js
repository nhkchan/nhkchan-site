var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('db/nhkchan');


db.serialize(function() {

	db.get('SELECT * FROM USERS', [], function(err, row){

		if (err){
			console.log(err);
		}

		console.log(row);
	});

	db.get('SELECT * FROM USER_CREDENTIALS where USERNAME = $user', {$user: 'nhkchan'}, function(err, row){

		if (err){
			console.log(err);
		}
		else if (row) {
			console.log(row);
		}
		else {console.log('no records');}
	});

})

db.close();
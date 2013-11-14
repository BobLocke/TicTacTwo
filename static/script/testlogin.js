/* this is test code for logging in using node.js and sqlite. 
   It currently is not used and is probably completely wrong. */


var fs = require("fs");
var file = "players.db";
var exists = fs.existsSync(file);
var sqlite3 = requires("sqlite3");
var db = new sqlite3.Database(file);

db.serialize(function(){
	if (!exists) {
	db.run("CREATE TABLE Players (Username text primary key, Password text, Wins int, Losses int)";
	       });
}

function login(username, password){

    if (username == "" || password == ""){
	//display error message (missing input)
	return false;
    }

    //var stmt = db.prepare("INSERT INTO Players VALUES(?)");

    var stmt = db.run("SELECT Password FROM Players WHERE Username='" + username + "'");
    
    if (stmt == NULL) {
	return false;
	//disply error message (username does not exist)
    }
    else if (stmt == password){
//login here
    return true;
    }
    else {
	// login fails (incorrect password)
	return false;
    }
}

function register(username, password){
    if (username == "" || password == ""){
	//display error message (missing input)
	return false;
    }
    if db.run("SELECT * FROM Players WHERE Username='" + username + "'") == NULL; {
	 db.run("INSERT INTO Players VALUES(" + username + ", " password + ", 0, 0)");
	 return true;
    }
    else // display error message (name already taken)
	return false;
}

    db.close();
    });




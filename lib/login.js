var fs = require("fs");
var file = "players.db";
var exists = fs.existsSync(file);
var sqlite3 = requires("sqlite3");
var db = new sqlite3.Database(file);

db.serialize(function(){
	if (!exists) {
	db.run("CREATE TABLE Players (Username text primary key, Password text, Wins int, Losses int)";
	       });
});

function login(username, password, cb){

    //var stmt = db.prepare("INSERT INTO Players VALUES(?)");

    var stmt = db.run("SELECT Password FROM Players WHERE Username='" + username + "'");
    
    if (stmt == NULL) {
	cb("Username Does Not Exist", undefined);
	return;
	//disply error message (username does not exist)
    } 
    else if (stmt == password){
	cb(undefined, true);
    	return;
    }
    else {
	cb("Incorrect Password", undefined);
	return;
    }
}

function register(username, password, cb){
    if (username == "" || password == ""){
	//display error message (missing input)
	cb("Missing Input", undefined);
	return; 
    }
    if db.run("SELECT * FROM Players WHERE Username='" + username + "'") == NULL; {
	db.run("INSERT INTO Players VALUES(" + username + ", " + password + ", 0, 0)");
	cb(undefined, true);
	return;
    }
    else // display error message (name already taken)
	cb("Name Taken", undefined);
	return;
}

module.exports = {login:login, register:register}

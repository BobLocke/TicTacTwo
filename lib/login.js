var fs = require("fs");
var file = "players.db";
var exists = fs.existsSync(file);
var sqlite3 = require("sqlite3");
var db = new sqlite3.Database(file);

db.serialize(function(){
    if (!exists) {
       db.run("CREATE TABLE Players (Username text primary key, Password text, Wins int, Losses int)");
   };
});

function login(username, password, cb){

    //var stmt = db.prepare("INSERT INTO Players VALUES(?)");

    db.get("SELECT Password FROM Players WHERE Username=?", [username], function(err, res){

        if (!res) {
            return cb("Username Does Not Exist", undefined);

            //disply error message (username does not exist)
        } 
        else if (res.Password === password){
            return cb(undefined, true);
        }
        else {
            return cb("Incorrect Password", undefined);
        }
    });
}

function register(username, password, cb){
    if (username === "" || password === ""){
        //display error message (missing input)
        cb("Missing Input", undefined);
        return;
    }
    
    db.get("SELECT * FROM Players WHERE Username=?", [username], function(err, res){
        if (res === undefined) {
            db.run("INSERT INTO Players VALUES(?, ?, 0, 0)", [username, password]);
            return cb(undefined, true);
        }
        else {
            // display error message (name already taken)
            return cb("Name Taken", undefined);
        }
    });
}

module.exports = {login:login, register:register}

var db = require("../lib/login");

function validate(username, password) {
    return !(username == "" || password == "" || username.length > 30 || password.length > 128);
}

function refresh (res, flash) {res.render('login', {title: "Log In", flash: flash})};

module.exports=function(req, res) {
	console.log(require('util').inspect(req.body));
	//req.body.username
	//req.body.password
	//req.body.login
	//req.body.register
	if (!validate(req.body.username, req.body.password)) {
  		return refresh(res, "Name or Password Incorrently Formatted");
	}
	
	if (req.body.Login){
		db.login(req.body.username, req.body.password, function(err,res) {
			if (err){
				return refresh(res, err);
			}
			res.cookie('loggedin', req.body.username);
			res.render('index', {title:"Welcome " + req.body.username});
			
		});
	}
	else if (req.body.Register){
		db.register(req.body.username, req.body.password, function(err,res) {
			if(err){ 
				return refresh(res, err);
			}
			res.cookie('loggedin', req.body.username);
			res.render('index', {title:"Welcome " + req.body.username});
		});

	} else {
		return refresh(res, "Welcome To Warp Zone");
	}
};

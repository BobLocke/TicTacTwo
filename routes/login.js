var db = require("../lib/login");

function validate(username, password) {
    return !(username == "" || password == "" || username.length > 30 || password.length > 128);
}

module.exports=function(req, res) {
	//req.body.username
	//req.body.password
	//req.body.login
	//req.body.register
	if (!validate(req.body.username, req.body.password)) {
	}
	
	if (req.body.login){
		db.login(req.body.username, req.body.password, function(err,res) {
			if (err) {	
			}
		});
	}

	} else if (req.body.register){
		db.register(req.body.username, req.body.password, function(err,res) {

		});

	} else {

	}
};

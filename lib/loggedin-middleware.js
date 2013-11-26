module.exports = function (req, res, next) {
    if (req.cookies.loggedin){
        req.loggedin = true;
        req.username = req.cookies.loggedin;
    } else { req.loggedin = false;
    }
    next();
};
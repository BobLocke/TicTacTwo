module.exports=function(req, res) {
    res.clearCookie("loggedin");
    res.redirect("/");
};
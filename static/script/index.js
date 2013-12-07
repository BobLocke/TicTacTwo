
var parts = document.cookie.split("=");
window.sessionStorage.username = parts[1].replace("%20", " ");
// Get socket connected
socket.on('connect', function(){
	console.log("socket id " + socket.id);

    });
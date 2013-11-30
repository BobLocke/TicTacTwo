
      var socket = io.connect('http://localhost:8080');
      
window.sessionStorage.username = document.cookie.loggedin;
// Get socket connected
socket.on('connect', function(){
	console.log("socket id " + socket.id);

    });
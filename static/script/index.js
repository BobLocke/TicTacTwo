
      var socket = io.connect('http://localhost:8080');
      
var username = prompt("What's your username?");
window.sessionStorage.username = username;
// Get socket connected
socket.on('connect', function(){
	console.log("socket id " + socket.id);

    });
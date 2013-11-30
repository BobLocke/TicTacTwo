

(function(){
	  var socket = io.connect('http://localhost:8080');
           // var socket = io.connect('http://172.16.96.3:8080');
            
            
var username = window.sessionStorage.username;
// When connection is made
socket.on('connect', function(){
               
	// Checks if any hosted games exist
	socket.emit('checkhosted');
    });
            
// Gets event to update hosted game list
socket.on('updategames', function (games) {
	var list = "";
	for (x in games)
	    list += "<a href='/onlinegame/hosted' onclick='window.sessionStorage.opponent = \"" +games[x]+"\";'> Play against " + games[x] + "</a><br>";
	document.getElementById('games').innerHTML = list;
    });
            
                    
$(function(){
	// when the client clicks SEND
	$('#addgame').click( function() {
		socket.emit('addgame', username);
		window.location.href="/onlinegame/hostee";
	    });
    });
}());
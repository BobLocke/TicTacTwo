var Lobby = function(io){

this.clientid = []; // player1 socket.id => [p1 socket.id, p2, p2 socket.id]
this.usernames = {}; // Map of users currently online
this.games_playing = [];// player1 => p1 socket.id
this.games_available = []; // Hosted games available to play

}

Lobby.prototype.addGame = function(usename){
} 
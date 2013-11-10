var express = require('express')
  , app = express()
  , http = require('http')
  , server = http.createServer(app)
  , io = require('socket.io').listen(server);

server.listen(8080);


app.use(express.static(__dirname));
app.get('/', function(req, res) {
        res.render('index.html');
        });


var clientid = []; // Array of clientids (socket session ids)
var usernames = {}; // Map of users currently online
var games_playing = [];//{player1:null, socketid1:null, player2:null, socketid2:null}; // Games currently being played
var games_available = []; // Hosted games available to play

// Connects to client
io.sockets.on('connection', function (socket) {

   // Listner to add game event
   socket.on('addgame', function (username) {
      //io.sockets.emit('updatechat', socket.username, data);
      
      // Add game, each index stores array which stores hosting player followed by 'player2'
      games_available[games_available.length] = [username, 'player2'];
      
      // Emit updated available game array to all listening hostgame.html instances
      io.sockets.emit('updategames', games_available);
   });

   // Listener to set name, gives the socket a variable socket.username with given name
   socket.on('set name', function (name) {
      
      // Remove later
      console.log(io.transports.prototype.id);
      console.log("set name My socket id is " + socket.id);
      var clients = io.sockets.clients();
      console.log("clients " + clients[0]);
      
      // Set socket username to given username
      socket.set('username', name);
      
      // Log the name change to stdout
      socket.get('username', function (error, value) {
         console.log("set name Socket.username " + value);
      });

   });
              
   // Listener for checking hosted games for needed updates
   socket.on('checkhosted', function () {
      
      // Log listener call
      console.log("Checking hosted for " + socket.id);
      
      // Updates available game array to all listening sockets
      io.sockets.emit('updategames', games_available);
   });
        
   // Listener that grabs username from client      
   socket.on('username', function (username) {
      
      // Test log, delete later
      console.log("username My socket id is " + socket.id);
      
      // Set array at socket.id to username, simple map
      clientid[socket.id] = username;
      
      // Test logs, delete later
      console.log("Socket.username " + socket.username);
      console.log("clients " + io.sockets.clients());
   });

   // Listener for getting the user name
   // Identifies user by socket id
   socket.on('getusername', function () {
   
      // Test log, delete later
      console.log("getusername My socket id is " + socket.id);
      
      // Return username to client
      io.sockets.emit('myusername', clientid[socket.id]);
      
      // Test code, delete later
      socket.get('username', function (error, value) {
      console.log("getusername Socket.username " + value);
      });
   });
   
   // Listener to initialize game
   // Sets game in game playing array
   socket.on('initGame', function(username) {
      
      // Update game playing array
      //       key=hostusername = [[host, socket.id], [player2, socket.id]]
      games_playing[username] = socket.id;
      
      // Log new game
      console.log("New game created by " + username  + " with socket.id " + socket.id);
   });
  
   // Listener for setting info for socket.id of player 2
   socket.on('sendPlayer2ID', function(player1) {
   
      // Set value
      games_playing[player1][1] = [username, socket.id];
   });
   
 
   
   // Listener for request player 2 socket.id
   socket.on('requestPlayer2ID', function(username) {
      console.log("requestPlayer2ID " + games_playing[username][1][1]);
         
      // Emit event to send player 1 socket.id
      socket.emit('recievePlayer2ID', games_playing[username][1][1]);
   });


  // Listener for join game, may be implemented later
  socket.on('joingame', function(player1, player2){
       
      // Log join game
      console.log("Game joined by " + player2);
      console.log(games_playing[player1]);
      
      // Send back player1 socket id to player 2
      socket.emit('recievePlayer1ID', games_playing[player1]);
      
      // Send player 2 info to player 1
      io.sockets.socket(games_playing[player1]).emit('startGame', player2, socket.id);
  });

   socket.on('sendMove', function(id, b) {
      io.sockets.socket(id).emit('recieveMove', b);
   });

  // Listener for disconnection
  socket.on('disconnect', function(){
    
    // Implement code for disconnection
    // Delete out of current usernames
  });
});
var express = require('express')
, app = express()
, http = require('http')
, server = http.createServer(app)
, io = require('socket.io').listen(server);

server.listen(8080);

app.set("views", "./templates");
app.set("view engine", "jade");

app.use(express.static(__dirname + "/static"));
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(require('./lib/loggedin-middleware'))
app.use(app.router);

function wizards (template, args) {
  return function (req, res) {
    args.loggedin = req.loggedin;

    res.render(template, args);
  }
}

app.get('/', wizards('index', {title:"Welcome"});
app.get('/live', wizards('tictactwo', {title:"Play Offline", script:"/script/game.js"});
app.post('/login', require("./routes/login"));
app.get('/login', wizards('login', {title:"Login"});
app.get('/lobby', wizards('hostgame', {title:"Host or Join a Game", script:"/script/hostgame.js"});
app.get('/aboutus', wizards('aboutus', {title:"About the Game"});
app.get('/records', wizards('records', {title:"Check Player Scores"});
app.get('/onlinegame/hosted', wizards('onlinegame', {title:"Now Playing Online", script:"/script/hostedgame.js"});
app.get('/onlinegame/hostee', wizards('onlinegame', {title:"Now Playing Online", script:"/script/hostee.js"});


var clientid = []; // player1 socket.id => [p1 socket.id, p2, p2 socket.id]
var usernames = {}; // Map of users currently online
var games_playing = [];// player1 => p1 socket.id
var games_available = []; // Hosted games available to play

// Connects to client
io.sockets.on('connection', function (socket) {

   // Listner to add game event
   socket.on('addgame', function (username) {
      //io.sockets.emit('updatechat', socket.username, data);
      
      // Add game, each index stores array which stores hosting player followed by 'player2'
      
      games_available[games_available.length] = username;
      //games_available[username] = username;
      
      // Emit updated available game array to all listening hostgame.html instances
      io.sockets.emit('updategames', games_available);
    });


   // Listener for checking hosted games for needed updates
   socket.on('checkhosted', function () {

      // Log listener call
      console.log("Checking hosted for " + socket.id);
      
      // Updates available game array to all listening sockets
      io.sockets.emit('updategames', games_available);
    });

   
   // Listener to initialize game
   // Sets game in game playing array
   socket.on('initGame', function(username) {

      // Update game playing array
      games_playing[username] = socket.id;
      
      clientid[socket.id] = [username];
      
      // Log new game
      console.log("New game created by " + username  + " with socket.id " + socket.id);
    });


  // Listener for join game, may be implemented later
  socket.on('joingame', function(player1, player2){

      // Log join game
      console.log("Game joined by " + player2 + " against " + games_playing[player1]);
      
      // Remove game from available list
      console.log("Available game " + player1 + " deleted by " + player2);
      games_available.splice(player1, 1);
      io.sockets.emit('updategames', games_available);
      
      // Send back player1 socket id to player 2
      socket.emit('recievePlayer1ID', games_playing[player1]);
      
      // Send player 2 info to player 1
      io.sockets.socket(games_playing[player1]).emit('startGame', player2, socket.id);
      
      usr_arr = clientid[games_playing[player1]];
      usr_arr.push(player2);
      usr_arr.push(socket.id);
    });

  socket.on('sendMove', function(id, b) {
    io.sockets.socket(id).emit('recieveMove', b);
  });

  // Listener for disconnection
  socket.on('disconnect', function(){

    // Implement code for disconnection
    // Delete out of current usernames
    
    for(x in clientid) {
     console.log("socket.id is " + x + " and clientid[x][0] is " + clientid[x][0]);
            if(x == socket.id) { // If the disconnecting socket is hosting a game

             var i = games_available.indexOf(clientid[x][0]);
             if(i != -1) {
                  // Delete out of available games and notify sockets
                  console.log("Deleting available game by " + clientid[x][0]);
                  
                  games_available.splice(games_available.indexOf(clientid[x][0]), 1);
                  
                  io.sockets.emit('updategames', games_available);
                }

               // Notify opponent user has left, will work if game is playing
               // otherwise will not work
               io.sockets.socket(clientid[x][2]).emit('playerDisconnected');
               console.log(clientid[x][0] + " has disconnected");
               
               // Delete playing game
               games_playing.splice(clientid[x][0], 1);  
               clientid.splice(x, 1); 
            } else if (socket.id == clientid[x][2]) { // Case that disconnecting socket is a player that joined a game

               // Tell host that opponent has disconnected
               io.sockets.socket(x).emit('playerDisconnected');
               console.log(clientid[x][1] + " has disconnected");
               
               // Delete playing game
               games_playing.splice(clientid[x][0], 1);  
               clientid.splice(x, 1); 
             }
           }

           console.log("Available games");
           for(x in games_available)
             console.log(games_available[x]);
         });
});

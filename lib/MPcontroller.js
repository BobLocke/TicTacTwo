var Game = require("./game.js");

var MPcontroller = function() {
  var game = new Game();
  //TODO find player names
  var player1 = "a";
  var player2 = "b";
        
  // Player socket.id's
  var p1_id;
  var p2_id;
        
  var gameStarted = false;
  var winner = 0; // 0 - none, 1 - player 1, 2 - player 2
        
  var win_P1 = 0;
  var win_P2 = 0;
        
  var startPlayer = 2;
  var curPlayer = 1;
  
function  play(field) {
    var c = field.charCodeAt(0) - 65;
    if (winner == 0 && board[c] == 0 && myTurn && gameStarted) {
  board[c] = 1;
  P1_moves.push(c);
  if(P1_moves.length > 3) {
      var remove = P1_moves.shift();
      board[remove] = 0;
      document.images[String.fromCharCode(remove + 65)].src = blank;
  }
  document.images[field].src = x;
  curPlayer++;
  myTurn = !myTurn;
        $("#flash").html(player2 + "'s turn");
  socket.emit('sendMove', p2_id, board);
  checkWin();
    }
         
}
  
function playAgain() {
    curPlayer = startPlayer;
    if(startPlayer == 1)
  startPlayer = 2;
    else
  startPlayer = 1;
    winner = 0;
}
  
function askPlayer() {
    $.prompt("Are You Sure, You Want To Delete ?", { buttons: { Yes: true, No: false }, focus: 0, prefix: 'ValidationMsg', callback: checkPlay });
    //socket.emit('playAgain');
}
function checkPlay() {
      
      
}

    
socket.on('connect', function(){
         
         
  // Init game
  socket.emit('initGame', player1);
  document.getElementById('player1').innerHTML=player1;
    });
                          
// Event that user joined    
socket.on('startGame', function(p2, p2id) {
  player2 = p2;
  p2_id = p2id;
  gameStarted = true;
  document.getElementById('player2').innerHTML=player2;
  $("#flash").html("Player " + p2 + " has joined the game, start at any time");
          //alert("Player " + p2 + " has joined the game");
    });        
              
              
socket.on ('recieveMove', function(b) {
  board = b;
  myTurn = !myTurn;
  updateBoard();
    $("#flash").html("Your turn");
           checkWin();
    });
              
socket.on('playerDisconnected', function() {
  if (winner == 0) {
          $("#flash").html(player2 + " has disconnected");
          winner = 1;
      //alert(player2 + " has disconnected");
      //window.location.href="/";
          }  else {
          $("#flash").append("<br>" + player2 + " has disconnected");
          }
    });    
                
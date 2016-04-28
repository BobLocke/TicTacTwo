$(function () {
      
 //var player1 = window.name;
var player1 = "x";
var player2 = "o";

var $names = {1 : $("#p1-name input"), 
              2 : $("#p2-name input")};
      
// Player socket.id's
var pid;
      
var myTurn = true;
var gameStarted = false;
var x = "/img/x.jpg"
var o = "/img/o.jpg"
var blank = "/img/blank.jpg"
var winner = 0; // 0 - none, 1 - player 1, 2 - player 2
var board = [0,0,0,0,0,0,0,0,0];

var $board = $(".game");
var $images = $(".game img");
      
function help() {
  $("#flash").html("Welcome to Tic-Tac-Two! Play the game like you would normally play, but keep in mind that moves expire after 3 turns.")
}

$board.click(function(event){
  if (winner != 0) {
    $("#flash").html("The game is already over! Please start a new game.")
    return;
  }
  var location = $(event.target).attr("data-name");
  if (!location){
    return;
  }
  var res = game.play({id: curPlayer, location: location});
  if (res === "BadMove"){
    if (winner == 0){
      $("#flash").html("That was not a legal move. Try again!");
      return;
    }
  } else if(res === "Win"){
    board[location] = curPlayer;
    drawBoard();
    winner = curPlayer;
    $("#flash").html($names[curPlayer].val() + " wins!");
    wins[curPlayer]+=1;
    $wins[curPlayer].html(String(wins[curPlayer]));
  } else if(res === "Continue"){
    board[location] = curPlayer;
    curPlayer = curPlayer === 1 ? 2 : 1;
    drawBoard();
  }
});

function getSpace(n) {
    return $($images[n]);
}

function drawBoard() {
  for(var i = 0; i < 9; i++) {
    if(board[i] == 1) {
      getSpace(i).attr("src", x);
    } else if (board[i] == 2) {
      getSpace(i).attr("src", o);
    } else {
      getSpace(i).attr("src", blank);
    }
  }   
  $("#flash").html($names[curPlayer].val() + "'s turn"); 
}
  
$(":button[name='replay']").click( function() {
    if (winner == 0){ $("#flash").html("Unable to restart, game currently in progress."); return; }
    if(startPlayer == 1){
      curPlayer = 2;
      startPlayer = 2;
    } else {
      curPlayer = 1; 
      startPlayer = 1;} 
    winner = 0;
    board = [0,0,0,0,0,0,0,0,0];
    drawBoard();
    game = new Game();
  });


socket.on('connect', function(){
         
         
	// Init game
	socket.emit('initGame', player1);
	document.getElementById('player1').innerHTML=player1;
    });

  socket.emit('join', player2);

                          
// Event that user joined    
socket.on('join', function(p2) {
	player2 = p2;
	gameStarted = true;
	document.getElementById('player2').innerHTML=player2;
	$("#flash").html("Player " + p2 + " has joined the game, start at any time");
          //alert("Player " + p2 + " has joined the game");
    });        
              
              
socket.on ('play', function(move) {
	board = b;
	myTurn = !myTurn;
	updateBoard();
    $("#flash").html("Your turn");
           checkWin();
    });
              
socket.on('disconnect', function() {
	if (winner == 0) {
          $("#flash").html(player2 + " has disconnected");
          winner = 1;
	    //alert(player2 + " has disconnected");
	    //window.location.href="/";
          }  else {
          $("#flash").append("<br>" + player2 + " has disconnected");
          }
    });
});
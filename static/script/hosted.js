
      
   // Code for a player joining a hosted game
      
   // Script is very much a work in progress, needs to be determined how username will be passed
   // from page to page and then the rest can be finished
      
      
      
      
   // Change
   // var names = window.name.split(",");
      var player1 = window.sessionStorage.opponent;
      var player2 = window.sessionStorage.username;
      
// Player socket.id's
var p1_id;
var p2_id;
      
// Player 2 therefore player 1 will start
var myTurn = false;
      var x = "/img/x.jpg"
      var o = "/img/o.jpg"
      var blank = "/img/blank.jpg"
	  var winner = 0; // 0 - none, 1 - player 1, 2 - player 2
var board = [0,0,0,0,0,0,0,0,0];
      
var field;
      
// Win in local games, may be deprecated
var win_P1 = 0;
var win_P2 = 0;
      
// Arrays to store game moves
var P1_moves = new Array();
var P2_moves = new Array();
      
var startPlayer = 2;
var curPlayer = 1;
      
      
function help() {
    alert("Welcome to Tic-Tac-Two!  No help yet")
	}
  
  
function checkWin() {
    if ((board[0] == 1 && board[1] == 1 && board[2] == 1) || (board[0] == 1 && board[3] == 1 && board[6] == 1) || (board[6] == 1 && board[7] == 1 && board[8] == 1) || (board[2] == 1 && board[5] == 1 && board[8] == 1) || (board[0] == 1 && board[4] == 1 && board[8] == 1) || (board[2] == 1 && board[4] == 1 && board[6] == 1) || (board[1] == 1 && board[4] == 1 && board[7] == 1) || (board[3] == 1 && board[4] == 1 && board[5] == 1)) {
	winner = 1;
	win_P1++;
	document.game.P1.value = win_P1;
	$("#flash").html(player1 + " won");
    } else if ((board[0] == 2 && board[1] == 2 && board[2] == 2) || (board[0] == 2 && board[3] == 2 && board[6] == 2) || (board[6] == 2 && board[7] == 2 && board[8] == 2) || (board[2] == 2 && board[5] == 2 && board[8] == 2) || (board[0] == 2 && board[4] == 2 && board[8] == 2) || (board[2] == 2 && board[4] == 2 && board[6] == 2) || (board[1] == 2 && board[4] == 2 && board[7] == 2) || (board[3] == 2 && board[4] == 2 && board[5] == 2)) {
	winner = 2;
	win_P2++;
	document.game.P2.value = win_P2;
	
        $("#flash").html("You won");
    }
}
  
function  play(field) {
    var c = field.charCodeAt(0) - 65;
    if (winner == 0 && board[c] == 0 && myTurn) {
	board[c] = 2;
	P2_moves.push(c);
	if(P2_moves.length > 3) {
	    var remove = P2_moves.shift();
	    board[remove] = 0;
	    document.images[String.fromCharCode(remove + 65)].src = blank;
	}
	document.images[field].src = o;
	curPlayer--;
	myTurn = !myTurn;
        $("#flash").html(player1 + "'s turn");
	socket.emit('sendMove', p1_id, board);
	checkWin();
    }
         
}
  
function updateBoard() {
    for(var i = 0; i < 9; i++) {
	if(board[i] == 1)
	    document.images[String.fromCharCode(i + 65)].src = x;
	else if (board[i] == 2)
	    document.images[String.fromCharCode(i + 65)].src = o;
	else
	    document.images[String.fromCharCode(i + 65)].src = blank;
    }
}
  
function playAgain() {
    curPlayer = startPlayer;
    if(startPlayer == 1)
	startPlayer = 2;
    else
	startPlayer = 1;
         
    P1_moves = new Array();
    P2_moves = new Array();
    winner = 0;
    board = [0,0,0,0,0,0,0,0,0];
    document.images.A.src= blank;
    document.images.B.src= blank;
    document.images.C.src= blank;
    document.images.D.src= blank;
    document.images.E.src= blank;
    document.images.F.src= blank;
    document.images.G.src= blank;
    document.images.H.src= blank;
    document.images.I.src= blank;
}
  

    
// Connect to server
socket.on('connect', function(){
         
	// Get player1 socket.id and join game
	socket.emit('joingame', player1, player2); 
	document.getElementById('player1').innerHTML=player1;
	document.getElementById('player2').innerHTML=player2;
          $("#flash").html(player1 + "'s turn");
    });

socket.on('recievePlayer1ID', function(p1){
          p1_id = p1;
          });

    
              
socket.on ('recieveMove', function(b) {
	board = b;
	myTurn = !myTurn;
	updateBoard();
           $("#flash").html("Your turn");
	checkWin();
    });
              
socket.on('playerDisconnected', function() {
	if(winner == 0) {
          $("#flash").html(player1 + " has disconnected");
          winner = 2;
	    //alert(player1 + " has disconnected");
	    //window.location.href="/";
          } else {
            $("#flash").append("<br>" + player1 + " has disconnected");
          }
    });    
                 
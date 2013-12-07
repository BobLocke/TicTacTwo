
      
 //var player1 = window.name;
    var player1 = window.sessionStorage.username;
var player2 = null;
      
// Player socket.id's
var p1_id;
var p2_id;
      
var myTurn = true;
var gameStarted = false;
      var x = "/img/x.jpg"
      var o = "/img/o.jpg"
      var blank = "/img/blank.jpg"
	  var winner = 0; // 0 - none, 1 - player 1, 2 - player 2
var board = [0,0,0,0,0,0,0,0,0];
      
var field;
      
var win_P1 = 0;
var win_P2 = 0;
      
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
	$("#flash").html("You won");
	return true;
    } else if ((board[0] == 2 && board[1] == 2 && board[2] == 2) || (board[0] == 2 && board[3] == 2 && board[6] == 2) || (board[6] == 2 && board[7] == 2 && board[8] == 2) || (board[2] == 2 && board[5] == 2 && board[8] == 2) || (board[0] == 2 && board[4] == 2 && board[8] == 2) || (board[2] == 2 && board[4] == 2 && board[6] == 2) || (board[1] == 2 && board[4] == 2 && board[7] == 2) || (board[3] == 2 && board[4] == 2 && board[5] == 2)) {
	winner = 2;
	win_P2++;
	document.game.P2.value = win_P2;
	$("#flash").html(player2 + " won");
	return true;
    }
    return false;
}
  
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
                
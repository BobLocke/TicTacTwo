(function () {
 var x = "x.jpg"
      var o = "o.jpg"
      var blank = "blank.jpg"
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
          alert("Player one won");
      } else if ((board[0] == 2 && board[1] == 2 && board[2] == 2) || (board[0] == 2 && board[3] == 2 && board[6] == 2) || (board[6] == 2 && board[7] == 2 && board[8] == 2) || (board[2] == 2 && board[5] == 2 && board[8] == 2) || (board[0] == 2 && board[4] == 2 && board[8] == 2) || (board[2] == 2 && board[4] == 2 && board[6] == 2) || (board[1] == 2 && board[4] == 2 && board[7] == 2) || (board[3] == 2 && board[4] == 2 && board[5] == 2)) {
          winner = 2;
          win_P2++;
          document.game.P2.value = win_P2;
          alert("Player two won");
      }
  }
  
  window.play = function  play(field) {
      var c = field.charCodeAt(0) - 65;
      if (winner == 0 && board[c] == 0) {
          if (curPlayer == 1) {
              board[c] = 1;
              P1_moves.push(c);
              if(P1_moves.length > 3) {
                  var remove = P1_moves.shift();
                  board[remove] = 0;
                  document.images[String.fromCharCode(remove + 65)].src = blank;
              }
              document.images[field].src = x;
              curPlayer++;
          } else {
              board[c] = 2;
              P2_moves.push(c);
              if(P2_moves.length > 3) {
                  var remove = P2_moves.shift();
                  board[remove] = 0;
                  document.images[String.fromCharCode(remove + 65)].src = blank;
              }
              document.images[field].src = o;
              curPlayer--;
          }
          checkWin();
      }
      
  }
  
  function updateBoard() {
      
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
}());
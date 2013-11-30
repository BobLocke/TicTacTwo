$(function () {
  var x = "/img/x.jpg"
  var o = "/img/o.jpg"
  var blank = "/img/blank.jpg"
  var winner = 0; // 0 - none, 1 - player 1, 2 - player 2
  var board = [0,0,0,0,0,0,0,0,0];

  var field;
  var $board = $(".game");
  var $images = $(".game img");

  var win_P1 = 0;
  var win_P2 = 0;

  var P1_moves = [];
  var P2_moves = [];

  var startPlayer = 2;
  var curPlayer = 1;

  $(":button[name='help']").click( function() {
    $("#flash").html("Welcome to Tic-Tac-Two!  Play the game like you would normally play, but keep in mind that moves expire after 3 turns.")
  });

  
  function getSpace(n) {
    return $($images[n]);
  }

  function checkWin() {
    if ((board[0] == 1 && board[1] == 1 && board[2] == 1) || (board[0] == 1 && board[3] == 1 && board[6] == 1) || (board[6] == 1 && board[7] == 1 && board[8] == 1) || (board[2] == 1 && board[5] == 1 && board[8] == 1) || (board[0] == 1 && board[4] == 1 && board[8] == 1) || (board[2] == 1 && board[4] == 1 && board[6] == 1) || (board[1] == 1 && board[4] == 1 && board[7] == 1) || (board[3] == 1 && board[4] == 1 && board[5] == 1)) {
      winner = 1;
      win_P1++;
      $("#p1-score").html(win_P1);
      $("#flash").html("Player one won");
    } else if ((board[0] == 2 && board[1] == 2 && board[2] == 2) || (board[0] == 2 && board[3] == 2 && board[6] == 2) || (board[6] == 2 && board[7] == 2 && board[8] == 2) || (board[2] == 2 && board[5] == 2 && board[8] == 2) || (board[0] == 2 && board[4] == 2 && board[8] == 2) || (board[2] == 2 && board[4] == 2 && board[6] == 2) || (board[1] == 2 && board[4] == 2 && board[7] == 2) || (board[3] == 2 && board[4] == 2 && board[5] == 2)) {
      winner = 2;
      win_P2++;
      $("#p2-score").html(win_P2);
      $("#flash").html("Player two won");
    }
  }


  $board.click(function(event){
    var field = $(event.target).attr("data-name");
    if (!field){
      return;
    }
    play(+field);
  });

  function play(field) {
    if (!(winner == 0 && board[field] == 0)) {
      return;
    }
    if (curPlayer == 1) {
      board[field] = 1;
      P1_moves.push(field);
      if(P1_moves.length > 3) {
        var remove = P1_moves.shift();
        board[remove] = 0;      
      }
      curPlayer += 1;
    } else {
      board[field] = 2;
      P2_moves.push(field);
      if(P2_moves.length > 3) {
        var remove = P2_moves.shift();
        board[remove] = 0;
      }
      curPlayer -= 1;
    }
    updateBoard();
    checkWin();
  }

  function updateBoard() {
    for(var i = 0; i < 9; i++) {
      if(board[i] == 1)
        getSpace(i).attr("src", x);
      else if (board[i] == 2)
        getSpace(i).attr("src", o);
      else
        getSpace(i).attr("src", blank);
    }    
  }

  $(":button[name='replay']").click( function() {
    curPlayer = startPlayer;
    if(startPlayer == 1)
      startPlayer = 2;
    else
      startPlayer = 1;

    P1_moves = [];
    P2_moves = [];
    winner = 0;
    board = [0,0,0,0,0,0,0,0,0];
    updateBoard();
  });

  //$('form[form="game"] img').click(play());
});

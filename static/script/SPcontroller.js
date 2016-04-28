$(function () {

  var $wins = {1 : $("#p1-score"), 
               2 : $("#p2-score")};
  var $names = {1 : $("#p1-name input"), 
               2 : $("#p2-name input")};

  var x = "/img/x.jpg"
  var o = "/img/o.jpg"
  var blank = "/img/blank.jpg"
  var winner = 0; // 0 - none, 1 - player 1, 2 - player 2
  var board = [0,0,0,0,0,0,0,0,0];

  var $board = $(".game");
  var $images = $(".game img");

  var wins = {
    "1" : 0,
    "2" : 0
  }
  var game = new Game();

  var startPlayer = Math.floor(Math.random()*2)+1;
  var curPlayer = startPlayer;

  $(":button[name='help']").click( function() {
    $("#flash").html("Welcome to Tic-Tac-Two! Play the game like you would normally play, but keep in mind that moves expire after 3 turns.")
  });
  
  function getSpace(n) {
    return $($images[n]);
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
    if (res.tag === "BadMove"){
      if (winner == 0){
        $("#flash").html("That was not a legal move. Try again!");
        return;
      }
    } else if(res.tag === "Win"){
      board[location] = curPlayer;
      drawBoard();
      winner = curPlayer;
      $("#flash").html($names[curPlayer].val() + " wins!");
      wins[curPlayer]+=1;
      $wins[curPlayer].html(String(wins[curPlayer]));
    } else if(res.tag === "Continue"){
      board[location] = curPlayer;
      console.log(res.remove);
      console.log(typeof(res.remove));
      if (typeof(res.remove) === "string") {board[res.remove] = 0};
      curPlayer = curPlayer === 1 ? 2 : 1;
      drawBoard();
    }
  });


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
});

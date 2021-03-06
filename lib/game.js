 // Base TTT Core
 //MAKE SURE game.js in lib and static/script are in sync!

//game.js handles:
//board storage
//move validation
//informs players of victory

//the controller handles:
//player turn order
//database communication (updating win/loss records)
//communicaton between players

 var Game = function() { 
  this.winner = 0; // 0 - none, id - player id, 2 - player 2
  this.board = [0,0,0,0,0,0,0,0,0];

  this.moves = {
    "1" : [],
    "2" : []
  }
};

Game.prototype.checkWin = function(id) {
    return ((this.board[0] == id && this.board[1] == id && this.board[2] == id) ||
        (this.board[0] == id && this.board[3] == id && this.board[6] == id) ||
        (this.board[6] == id && this.board[7] == id && this.board[8] == id) ||
        (this.board[2] == id && this.board[5] == id && this.board[8] == id) ||
        (this.board[0] == id && this.board[4] == id && this.board[8] == id) ||
        (this.board[2] == id && this.board[4] == id && this.board[6] == id) ||
        (this.board[1] == id && this.board[4] == id && this.board[7] == id) ||
        (this.board[3] == id && this.board[4] == id && this.board[5] == id));
};

Game.prototype.play = function(field) {
  var id = field.id;
  var location = field.location;


  if (!(this.winner == 0 && this.board[location] == 0)) {
    return {tag: "BadMove"};
  }
  this.board[location] = id;
  this.moves[id].push(location);
  if(this.moves[id].length > 3) {
    var remove = this.moves[id].shift();
    this.board[remove] = 0;      
  }
  if (this.checkWin(id)) {
    this.winner = id;
    return {tag: "Win"};}
  else {return {tag: "Continue", remove: remove}}
};

if (typeof(module) != "undefined" && module.exports) { module.exports = Game; }
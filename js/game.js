/* Variables */
var buttonBlue = $(".btn-primary");
var buttonRed = $(".btn-danger");
var arr =[];
var rY=[], rX=[];
var cell;
var activePlayer, passivePlayer;
var box = $( "div#map > div" );
var adjacents;
var buttonP1A = $("#P1Attack");
var buttonP1D = $("#P1Defend");
var buttonP2A = $("#P2Attack");
var buttonP2D = $("#P2Defend");
var fight = false;

/* Define Block Object*/
function Block(name, image) {
	this.name = name;
	this.image = image;
}

Block.prototype.setPosition = function() {
	for (var i=0;i<10;i++) {
    cell = findAvailableCell();
    arr[cell] = this.name;
    var mybox = document.getElementById(cell);
    mybox.classList.add(this.name);
  }
}

/* Define Player Object*/
function Player(name, image) {
  this.name = name;
  this.image = image;
  this.weapon = null;
  this.lifePoint = 100;
  this.damage = 10;
}

Player.prototype.setPosition = function() {
  cell = findAvailableCell();
  arr[cell] = this.name;
  var mybox = document.getElementById(cell);
  mybox.classList.add(this.name);
      
  mybox.innerHTML = '<img src="../images/'+this.image+'" height="58"></img>';
  //in order not to place players in adjacent divs
  var contacts= [cell-1,cell+1,cell-10,cell+10];
  $.each(contacts, function(index, contact) {
    if ((contact >= 0 && contact < 100) && arr[contact] == null) {
      arr[contact] = 'full';
    }
  });
  return this.position = cell;
}

/* Define Weapon Object*/
function Weapon(name, image, damage) {
  this.name = name;
  this.image = image;
  this.damage = damage;
}

Weapon.prototype.setPosition = function() {
  cell = findAvailableCell();
  arr[cell] = this.name;
  var mybox = document.getElementById(cell);
  mybox.classList.add(this.name);
}

/*  Instantiate objects */
var block = new Block("block", "cactus.png");

var player1 = new Player("player1","native.png");
var player2 = new Player("player2", "cowboy.png");

var knife = new Weapon("knife", "knife.png", 12);
var axe = new Weapon("axe", "axe.png", 14);
var arrow = new Weapon("arrow", "arrow.png", 16);
var gun = new Weapon("gun", "gun.png", 18);

/* Set Positions of each objects*/
block.setPosition(); 
player1.setPosition();
player2.setPosition();
knife.setPosition();
axe.setPosition();
arrow.setPosition();
gun.setPosition();

// Find Available Cell for Objects
function findAvailableCell(){
  do {
    cell = Math.floor((Math.random() * 100));
  }
  while (!(arr[cell] == null))
  return cell;
}



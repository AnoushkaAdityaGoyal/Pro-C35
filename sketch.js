var balloon,balloonImg;
var backgroundImage;
var database,position;

function preload(){
  backgroundImage = loadImage("Hot Air Ballon-01.png")
  balloonImg = loadAnimation("Hot Air Ballon-02.png","Hot Air Ballon-03.png","Hot Air Ballon-04.png");
}
function setup() {
  createCanvas(900,500);
  balloon = createSprite(80,360,80,80);
  balloon.addAnimation( "moving",balloonImg);
  balloon.scale = 0.5;

}

function draw() {
  background(backgroundImage);
  
  textSize(20);
  fill ("black");
  text("Use Arrow Keys To Move",50,50);
  
  if(keyDown(LEFT_ARROW)){
    balloon.x = balloon.x -10;
}
  if(keyDown(RIGHT_ARROW)){
    balloon.x = balloon.x +10;
}
  if(keyDown(UP_ARROW)){
   balloon.y = balloon.y -10;
   updateHeight(0,-10);
   balloon.addAnimation("hotAirBalloon",balloonImg);
   balloon.scale=balloon.scale-0.1;
}
  if(keyDown(DOWN_ARROW)){
   balloon.y = balloon.y +10;
   updateHeight(0,+10);
   balloon.addAnimation("hotAirBalloon",balloonImg);
   balloon.scale=balloon.scale+0.1;
}
  drawSprites();
}
var balloonPosition=database.ref('balloon/height');
balloonPosition.on("value",readPosition,showError);

function updateHeight(x,y){
 database.ref('balloon/height').set({
  'x': height.x + x,
  'y': height.y + y
  })
}

function readHeight(data){
  height = data.val();
  balloon.x = height.x;
  balloon.y = height.y;
}

function showError(){
  console.log("Error in writing to the database")
}

var Bunny,Bunny_running,Bunny_collided,BunnyGroup;
var ground,invisibleground,Background1,Background2;
var carrot,carrotImage,carrotGroup;
var fences,fencesImage,fencesGroup;
var gameState=1;
var PLAY=1;
var END=2;
var gameOver,restart,gameOverImg,restartImg;

 
function preload(){
  
Bunny_running=loadAnimation("Bunny1.png","Bunny2.png","Bunny3.png");
  
  Bunny_collided=loadImage("Bunny4.png");
  
  carrotImage=loadImage("carrot.png");
  
  fencesImage=loadImage("fences.png");
  
  Background1=loadImage("Background.png");
  
  gameOverImg=loadImage("gameOver.png");
  
  restartImg=loadImage("restart.png");
  
}

function setup() {
 createCanvas(810,470);
  
  score=0;
  
   // Creating background
  Background2=createSprite(405,235,810,470);
  Background2.addImage(Background1);
  
  // Creating ground
  ground=createSprite(300,430,1900,20);
  ground.x=(ground.width/2);
  ground.velocityX=-3;
  ground.visible=false;
  ground.shapeColor="brown";
  
  // Invisible ground
  invisibleground=createSprite(400,430,800,20)
  invisibleground.visible=false;
  
  // Creating bunny
  Bunny=createSprite(73,330,10,10);
  Bunny.addAnimation("running",Bunny_running);
  Bunny.addImage("collided", Bunny_collided);
  Bunny.scale=0.4;
  
  Bunny.setCollider("circle",0,0,50);
  Bunny.debug = false;

  // Creating groups
  fencesGroup=createGroup(); 
  BunnyGroup=createGroup();
  carrotGroup=createGroup();
  // Adding bunny
  BunnyGroup.add(Bunny);
  
    
  gameOver= createSprite(390,150);
  gameOver.addImage(gameOverImg);
    gameOver.scale = 2;
  
  restart = createSprite(385,370);
  restart.addImage(restartImg); 
  restart.scale = 0.5;
}

function draw() {
  background("white");
  
  if(gameState===PLAY){
    if (BunnyGroup.isTouching(carrotGroup)) {
  carrotGroup.destroyEach();
      fencesGroup.destroyEach();
    score=score+1;
}

    
  if(ground.x<0){
  ground.x=ground.width/2;
}
// Bunny jumping
  if(keyDown("space") && Bunny.y>400){
    Bunny.velocityY=-9;
  }
 // Gravity code
Bunny.velocityY = Bunny.velocityY + 1.1
Bunny.collide(invisibleground);

//Spawning carrots
  if(frameCount%100===0){
    carrotgang();
    fencesgang();
  }  
    if(BunnyGroup.isTouching(fencesGroup)){
    gameState=2;
 }
     gameOver.visible = false;
      restart.visible = false;
  }

    if(gameState===END){
       Bunny.changeImage("collided",Bunny_collided); 
      // BunnyGroup.setLifetimeEach(-1);
    // BunnyGroup.setVelocityEach(0);
    fencesGroup.setLifetimeEach(-1);
    fencesGroup.setVelocityXEach(0);   
       ground.velocityX=0;
      Bunny.x=73;
      Bunny.y=400;
      fencesGroup.destroyEach();
      carrotGroup.destroyEach();
      
      score=0;
   
      gameOver.visible = true;
      restart.visible = true;
      
    if(mousePressedOver(restart)) {
     reset();
    }
  }
 drawSprites();
  fill("red");
  stroke("black");
  textSize(30);
  text("Score: "+ score, 660,50);
}
 
function reset(){
  gameState=PLAY;
 fencesGroup.destroyEach();
  carrotGroup.destroyEach();
  Bunny.changeAnimation("running",Bunny_running); 
}

function carrotgang(){
   gameState=PLAY;
  carrot=createSprite(650,230,10,10);
  carrot.scale=1.7;
  carrot.addImage(carrotImage);
  carrot.velocityX=-14;
  carrot.lifetime=-1;
  carrotGroup.add(carrot);
}

function fencesgang(){
  gameState=PLAY;
 fences=createSprite(650,400,10,10);
 fences.scale=0.7;
fences.addImage(fencesImage);
  fences.velocityX=-14;
  fences.lifetime=-1;
  fencesGroup.add(fences);
}
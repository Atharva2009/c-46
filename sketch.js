var sc,sc1;
var bullet1,bullet;
var gameState = "serve";
var PLAY = 1;
var END = 2;
var score = 0;

function preload(){
sc1 = loadImage("sc.png")
sp = loadImage("sp.jpg")
bullet = loadImage("bullet.png")
obstacle1 = loadImage("enemy.png")
obstacle2 = loadImage("enemy1.png")
obstacle3 = loadImage("enemy2.png")
obstacle4 = loadImage("enemy3.png")
obstacle5 = loadImage("enemy4.png")
obstacle6 = loadImage("enemy5.png")
}

function setup() {
  createCanvas(600,600);
 
    sc = createSprite(300, 500, 50, 50);
 sc.addImage(sc1);
 sc.scale = 0.159;

}

function draw() {
  background(sp);  

  if(gameState === "serve"){
    textSize(24);
    fill("WHITE")
    text("PRESS Q TO START THE GAME!!!",100,300)
if(keyDown("Q")){
    gameState = PLAY;
  }
}


 if(gameState === PLAY){

  obstaclesGroup = createGroup();

  if(keyDown("UP_ARROW")||keyDown("W")){
    sc.velocityY = -4;
  }

  if(keyDown("DOWN_ARROW")||keyDown("S")){
    sc.velocityY = 4;
  }

  if(keyDown("LEFT_ARROW")||keyDown("A")){
    sc.velocityX = -4;
  }

  if(keyDown("RIGHT_ARROW")||keyDown("D")){
    sc.velocityX = 4;
  }


if (keyDown("Space")||keyDown("E")){
  bullet1 = createSprite(300,500,10,10)
  bullet1.velocityY=-4
  bullet1.addImage(bullet);
  bullet1.scale = 0.1299
  bullet1.x = sc.x;
  bullet1.y = sc.y;
}

spawnObstacles();

if(bullet1.isTouching(obstacle)){
  obstacle.destroy()
}
if(sc.isTouching(obstacle)){
  sc.velocityX = 0;
  sc.velocityY = 0;
  obstaclesGroup.setVelocityYEach(0);
  obstaclesGroup.setVelocityXEach(0);
  gameState = END
}

 }

 if(gameState === END){
var GameOver = createSprite(300,300,20,20)
GameOver.shapeColor="white"
reset();
 }
  
  drawSprites();
}

function spawnObstacles(){
  if (frameCount % 60 === 0){
    var obstacle = createSprite(300,165,10,40);
    obstacle.velocityY = (6 + score*100);
    
     //generate random obstacles
     var rand = Math.round(random(1,6));
     obstacle.x = Math.round(random(50,520))
     obstacle.y = Math.round(random(0,50))
     switch(rand) {
       case 1: obstacle.addImage(obstacle1);
               break;
       case 2: obstacle.addImage(obstacle2);
               break;
       case 3: obstacle.addImage(obstacle3);
               break;
       case 4: obstacle.addImage(obstacle4);
               break;
       case 5: obstacle.addImage(obstacle5);
               break;
       case 6: obstacle.addImage(obstacle6);
               break;
               
       default: break;
     }
            
     //assign scale and lifetime to the obstacle           
     obstacle.scale = 0.199;
    
    //add each obstacle to the group
     obstaclesGroup.add(obstacle);
  }
 }

 

function reset() {
  sc.x = 200;
  sc.y = 200;
  sc.velocityX = 0;
  sc.velocityY = 0;
  spawnObstacles()
    gameState = "serve";
  
}
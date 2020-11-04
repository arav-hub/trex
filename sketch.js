var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var ducking, bird1, bird2
var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var Play = 1
var End = 0
var score;
var gameState = 1
var gameOver,gameOverImage, restart, restartImage;
var die 
var checkpoint
var jump

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  ducking = loadAnimation (" trexducking.png","trexrunning.png");
  bird1 = loadAnimation ("bird1.png","bird2.png")
  groundImage = loadImage("ground2.png");
  restartImage = loadImage("restart.png");
  gameOverImage = loadImage("gameOver.png")
  cloudImage = loadImage("cloud.png");
  die = loadSound ("die.mp3")
  checkpoint = loadSound ("checkPoint.mp3")
  jump = loadSound ("jump.mp3")
  
  
  
  
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
}

function setup() {
  createCanvas(600, 200);
  restart = createSprite(300,130,20,20)
  gameOver = createSprite(300,100,20,20)
  gameOver.addImage(gameOverImage)
  restart.addImage(restartImage)
  gameOver.scale=0.5
  restart.scale=0.5
  gameOver.visible= false;
  restart.visible=false;
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided)
  trex.scale = 0.5;
  trex.setCollider("circle",0 ,0, 40)
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  background(180);
  console.log(trex.y)
    if (gameState ==1){
      ground.velocityX = -4;
    score = score + Math.round(getFrameRate()/60);
   if(keyDown("space")&&(trex.y >164)) {
    trex.velocityY = -12;
     jump.play()
     
     
  }
  if (score  %100 ==0){
    checkpoint.play
  }
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  spawnClouds();
  spawnObstacles();
   if (obstaclesGroup.isTouching(trex)){
     gameState = 0
     die.play()
     
   }   
  }
  else if (gameState == 0){
      gameOver.visible= true;
  restart.visible=true;
    ground.velocityX = 0
    obstaclesGroup.setVelocityXEach(0)
    cloudsGroup.setVelocityXEach(0)
    trex.changeAnimation ("collided",trex_collided)
    obstaclesGroup.setLifetimeEach (-1)
  cloudsGroup.setLifetimeEach (-1)
    trex.velocityY = 0
  }

if (mousePressedOver(restart)){
  reset()
}
  text("Score: "+ score, 500,50);
  
 
  
  trex.collide(invisibleGround);

  drawSprites();
}
function reset(){
  gameState = 1
  trex.changeAnimation("running",trex_running)
  obstaclesGroup.destroyEach()
  cloudsGroup.destroyEach()
  gameOver.visible = false
  restart.visible = false
  score = 0
}
function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
    cloud.lifetime = 200;
    
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -4;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
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
      
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   obstaclesGroup.add(obstacle);
  }
}
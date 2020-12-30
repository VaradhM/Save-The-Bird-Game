var gameState = START;

var START = 1;

var PLAY = 2;

var END = 3;

var start, startImage;

var intermediaryImg, inceptionImg, bg1, bg2;

var bird, flying, crashed;

var log1, logImage;

var FoodGroup, GroundObstaclesGroup, AirObstaclesGroup;

var score, survival;





function preload(){
  
  startImage = loadImage("worjo-1.png");
  
  inceptionImg = loadImage("lol.jpg");
  
  intermediaryImg = loadImage("fluffy.jpg");
  
  flying = loadAnimation("1.png","2.png","3.png","4.png","5.png","6.png","9.png","7.png","8.png")
 
  crashed = loadAnimation("5.png");
  
  food1 = loadImage("grape.png");
  
  food2 = loadImage("banana.png");
  
  food3 = loadImage("apple.png")
  
  groundObstacle1 = loadImage("great1.png");
  
  groundObstacle2 = loadImage("great2.png");
  
  groundObstacle3 = loadImage("great4.png");
  
  airObstacle1 = loadImage("great5.png");
  
  airObstacle2 = loadImage("great6.png");
  
  logImage = loadImage("great3.png");
  
  retry = loadAnimation("retry.png");
  
  jungleSound = loadSound("Lost-Jungle.mp3");
  
 
  
}



function setup() {
  createCanvas(windowWidth,windowHeight);
  
  boundary1 = createSprite(100,height-645,2010,2);
  boundary1.visible = false;
  
  
  boundary2 = createSprite(100,height+30,2010,2);
  boundary2.visible = false;
  
  jungleSound.loop();
 
  
  start = createSprite(width/2,height/2);
  start.addImage(startImage);
  start.scale = 0.8;
  start.visible = true;
  
  bird = createSprite(200,height-200,20,50);
  bird.addAnimation("moving",flying);
  bird.addAnimation("failed",crashed);
  bird.addAnimation("crashed",retry);
  bird.scale = 0.8;
  bird.visible = false;
  bird.debug = false;
  bird.setCollider("rectangle",4,4,   107, 47)
  
  bg1 = createSprite(100,100,100,400);
  bg1.addImage(inceptionImg);
  bg1.scale = 3.245;
  
  bg2 = createSprite(0,0,100,400);
  bg2.addImage(intermediaryImg);
  bg2.scale = 0.8;
  bg2.visible = false;
  
  bg1.depth = bg2.depth;
  bg1.depth = bg1.depth+1;
  
  bg1.depth = start.depth;
  start.depth = start.depth+1;
  
  bg2.depth = bird.depth;
  bird.depth = bird.depth+1;
  
  FoodGroup = new Group();
  AirObstaclesGroup = new Group();
  GroundObstaclesGroup = new Group();
  
 
  
  boundary1.depth = bg1.depth;
  boundary1.depth = boundary1.depth+1;
  
  score = 0;

  survival = 0;
  
  
  
}

function SpawnFood(){
  if(frameCount % 440 === 0){
    var food = createSprite(width+50,height-200);
    food.y = Math.round(random(height-280,height-400));
    food.velocityX = -(13 + 3*survival/400);
    
    var rand = Math.round(random(1,3));
    switch(rand){
      case 1: food.addImage(food1);
        break;
      case 2: food.addImage(food2);
        break;
      case 3: food.addImage(food3);
        break;
      default: break;
    }
    
    food.scale = 0.7;
    food.lifetime = 300;
    FoodGroup.add(food);
  }
}

function SpawnAirObstacles(){
  if(frameCount % 335 === 0){
    var airObstacle = createSprite(width+50,height-520);
    airObstacle.x = Math.round(random(width-100,width-350));
    airObstacle.velocityX = -(9 + 3*survival/400);
    
    var rov = Math.round(random(1,2));
    switch(rov){
      case 1: airObstacle.addImage(airObstacle1);
        break;
      case 2: airObstacle.addImage(airObstacle2);
        break;
      default: break;
    }
    
    airObstacle.scale = 1.6;
    airObstacle.lifetime = 3000;
    AirObstaclesGroup.add(airObstacle);
    
  }
}

function SpawnLog(){
  if(frameCount % 400 === 0){
    var log1 = createSprite(width+50,height-530);
    log1.addImage(logImage);
    log1.velocityX = -(12 + 3*survival/400);
    log1.scale = 1.4;
    log1.lifetime = 500;
    GroundObstaclesGroup.add(log1);
    
  }
}

function SpawnGroundObstacles(){
  if(frameCount % 240 === 0){
    var groundObstacle = createSprite(width+50,height-80);
    groundObstacle.x = Math.round(random(width+180,width+300));
    groundObstacle.velocityX = -(9 + 3*survival/400);
    
    var kirov = Math.round(random(1,3));
    switch(kirov){
      case 1: groundObstacle.addImage(groundObstacle1);
        break;
      case 2: groundObstacle.addImage(groundObstacle2);
        break;
      case 3: groundObstacle.addImage(groundObstacle3);
        break;
      default: break;
    }
    
    groundObstacle.scale = 1.9;
    groundObstacle.lifetime = 3000;
    GroundObstaclesGroup.add(groundObstacle);
    
  }
}


function draw() {
  background(200);
  
 
  
  if(touches.length>0 ||mousePressedOver(start)){
    gameState = PLAY;
    touches=[];
  }
  
  if(gameState === PLAY){
   bg2.visible = true;
   bg2.velocityX = -(9 + 3*survival/400);
   if(bg2.x<0){
     bg2.x = bg2.width/1/8;
   }
   bird.visible = true;
  
   bird.changeAnimation("moving",flying);
 
    
  if(bird.y>height+60){
    gameState = END;
  }
    
    if(touches.length>0){
      bird.velocityY = -10.5;
      touches=[];
    }
    
    if(keyDown("space")) {
      bird.velocityY = -10.5;
      
    }
  bird.collide(boundary1);
  
 
   
  if(bird.isTouching(FoodGroup)){
    FoodGroup.destroyEach();
    score = score+1;
  }
   
    survival = survival + Math.round((getFrameRate()/50));
    
    bird.velocityY = bird.velocityY + 0.675;
    
   SpawnAirObstacles() ;
   SpawnGroundObstacles();
   SpawnFood();
   SpawnLog();
    
  }
  
  if(keyDown("g")){
    gameState = START;
    
  }
  
  if(gameState === START){
    
    bg2.visible = false;
    bird.visible = false;
  
    
  if(touches.length>0 ||mousePressedOver(start)){
    gameState = PLAY;
    touches=[];
  }
    
  }
  
  if(AirObstaclesGroup.isTouching(bird) |(GroundObstaclesGroup.isTouching(bird))){
   
    gameState = END;
    
  }
  
  if(gameState === END){
    
    background(0)
    
    bird.changeAnimation("failed",crashed);
    GroundObstaclesGroup.setVelocityXEach(0);
    GroundObstaclesGroup.setLifetimeEach(-1);
    AirObstaclesGroup.setVelocityXEach(0);
    AirObstaclesGroup.setLifetimeEach(-1);
    FoodGroup.setVelocityXEach(0);
    FoodGroup.setLifetimeEach();
    
    bg2.velocityX = 0;
    bird.velocityY = 0;
    
    
    bird.depth = GroundObstaclesGroup.depth;
    bird.depth = bird.depth+1;
    
    bird.velocityY = bird.velocityY + 0;
    
  }
  
  if(touches.length>0 || keyDown("enter")&& gameState === END){
    GroundObstaclesGroup.destroyEach();
    AirObstaclesGroup.destroyEach();
    FoodGroup.destroyEach();
     bird.y = height-200;
    score = 0;
    survival = 0;
    gameState = PLAY;
    touches=[];
  }
  
  
  drawSprites();
  
  if(gameState === END){
    
    
    fill(250);
    textSize(32);
    stroke(0);
    strokeWeight(2);
    text("Game Over!", width / 2 - 85, height / 2);
    text("Press 'Enter' to Restart", width / 2 - 92, height / 2 + 30);
    
  }
  
  fill("Black");
  textSize(22);
  stroke("white");
  strokeWeight(2);
  text("Score: " + score, 40, height / 8);
  
  
  fill("Black");
  textSize(22);
  stroke("white");
  strokeWeight(2);
  text("Survival: " + survival, 160, height / 8);
} 
  
  


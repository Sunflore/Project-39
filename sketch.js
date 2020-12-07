var monkey,monkey_running;
var bananaImage,obstacleImage;
var foodGroup,obstacleGroup;
var background1, background1Image;
var score;
var survivalTime;
var gameState=PLAY;
var PLAY=1;
var END=0;
function preload()
{
  monkey_running=loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage=loadImage("banana.png");
  obstacleImage=loadImage("obstacle.png");
  
  background1Image=loadImage("jungle.jpg");
}

function setup()
{
  createCanvas(600,400);
  
  //Monkey Spirte 
  monkey=createSprite(180,360,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.13;
  
  //Ground Sprite
  ground=createSprite(400,390,1200,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible=false;
  
  //Create groups
  foodGroup=createGroup();
  foodGroup.visible=true;
  obstacleGroup=createGroup();
  obstacleGroup.visible=true;
  
  //Background1 Sprite
  background1=createSprite(400,200,1600,1600);
  background1.addImage("background1",background1Image);
  background1.scale=1.2;
  background1.velocityX=-4;
  background1.x=background1.width/2;
  
  monkey.setCollider("circle",0,0,260);
  //monkey.debug=true;
  
  survivalTime=0;
  score=0;
}

function draw() 
{ 
  background(0);
  
  //Monkey's depth
  monkey.depth=background1.depth
  monkey.depth=monkey.depth+1;
  
  //Monkey jump,gravity, and collide
   if(keyDown("space")&& monkey.y >=100)
  {
    monkey.velocityY=-10;
  }
    monkey.velocityY=monkey.velocityY+0.8;
    bananas();
    obstacle();
  
  if(gameState===PLAY)
  {
    if(monkey.isTouching(foodGroup))
    {
      foodGroup.destroyEach();
      score=score+1;
    }
    else
    {
      if(monkey.isTouching(obstacleGroup))
      {
        gameState=END;
        foodGroup.destroyEach();
        obstacleGroup.destroyEach();
        foodGroup.setVelocityXEach(0);
        obstacleGroup.setVelocityXEach(0);
        background1.velocityX=0;
        monkey.destroy();
        ground.velocityX=0;
      }
    }
  }
  
  //ground infinite loop
  ground.velocityX=-4;
  if(ground.x<0)
  {
    ground.x=ground.width/2;
  }
  
  //background1 infinite loop
  background1.velocityX=-4;
  if(background1.x<0)
  {
    background1.x=background1.width/2;
  }
   
  switch(score)
  {
    case 10: monkey.scale=0.14;
      break;
    case 20:monkey.scale=0.16;
      break;
    case 30:monkey.scale=0.18;
      break;
    case 40:monkey.scale=0.20;
      break;
    default: break;
  }
  
  monkey.collide(ground);
  
  drawSprites();
  
  //Score text
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+score,400,50);

  //Survival Time
  stroke("lightGray");
  textSize(20);
  fill("lightGray");
  survivalTime=Math.ceil(frameCount/frameRate()); 
  text("Survival Time: "+survivalTime,50,50);
}
function bananas()
{
  if(frameCount%80===0)
  {
    banana=createSprite(600,300,10,10);
    banana.y=Math.round(random(220,290));
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.velocityX=-4;
    banana.lifetime=800;
    
    foodGroup.add(banana);
  }
}

function obstacle()
{
  if(frameCount%300===0)
  {
    obstacles=createSprite(600,370,10,10);
    obstacles.addImage(obstacleImage);
    obstacles.scale=0.13;
    obstacles.velocityX=-4;
    obstacles.lifetime=800;
    
    obstacleGroup.add(obstacles);
  }
}
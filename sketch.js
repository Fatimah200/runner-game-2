var PlAY=1;
var END=0;
var gameState = PlAY;

var runner, runnerimg;
//var ground, groundImg;
var invisibleground;
var backgroundImg;
var strawberryimg;
var SGroup;

var obstacle1, obstacle2, obstacle3;

var obstacleGroup;

var score=0;

var gameOver, restart;

localStorage["HighestScore"]=0;

function preload(){
  runnerimg=loadImage("images/runnerImg.jpg");
//groundImg=loadImage("images/g.jpg");
backgroundImg=loadImage("images/backg.jpg");
strawberryimg=loadImage("images/strawberry.png");

obstacle1=loadImage("images/obstacle1.jpg");
obstacle2=loadImage("images/obstacle2.jpg");
obstacle3=loadImage("images/obstacle3.png");

//gameOverImg=loadImage("images/gameOver.png");
//restartImg=loadImage("images/restart.png");

}

function setup() {
  createCanvas(displayWidth-20, displayHeight-30);
 

  //ground=createSprite(700,200,2000,20);
  //ground.addImage(groundImg);
  //ground.velocityX=-2;
  //ground.x=ground.width/2;

  runner=createSprite(50, 115,displayWidth/2-40, displayHeight/2-80);
  runner.addImage(runnerimg);
  runner.scale=0.8;

  invisibleground=createSprite(700,800,1500,20);
  invisibleground.visible=false;
  invisibleground.velocityX=-2;
  invisibleground.x=invisibleground.width/2;

 // gameOver=createSprite(300,100);
 // gameOver.addImage(gameOverImg);

 // restart=createSprite(300,140);
 // restart.addImage(restartImg);

  //gameoverImg.scale=0.5;
  //restart.scale=0.5;

  SGroup=new Group();
  obstacleGroup=new Group();

  score=0;

  }

function draw() {
  background(backgroundImg);  
  runner.debug=true;
  
  
//console.log(runner.y);


stroke("white");
textSize(20);
fill("black");
text("Score: "+score,1300,50);

//if(gameState===PLAY){
  score=score +Math.round(getFrameRate()/60);
  invisibleground.velocityX=-(6+3*score/100);

  if(keyDown("space")&& runner.y>=712){
    runner.velocityY=-20;
    }

    runner.velocityY=runner.velocityY+0.8;

    if(invisibleground.x<0){
      invisibleground.x=invisibleground.width/2;
  }
  
  runner.collide(invisibleground);

  spawnStrawberry();
spawnObstacles();

if (obstacleGroup.isTouching(runner)){
  gameState=END;
}

//}

drawSprites();

}

function spawnStrawberry(){
  if(frameCount%80===0){
    var strawberry=createSprite(1400,700,40,10);
    strawberry.y=random(900,400);
    strawberry.addImage(strawberryimg);
    strawberry.scale=0.1;
    strawberry.velocityX=-5;
    strawberry.lifetime=300;
    runner.depth=strawberry.depth+1;
    SGroup.add(strawberry);

  }
}
function spawnObstacles(){
  if(frameCount%60===0){
    var obstacle=createSprite(600,750,10,40);
    obstacle.debug=true;
    obstacle.velocityX=-(6+3*score/100);
    
    var rand=Math.round(random(1,3));
    switch(rand){
      case 1:obstacle.addImage(obstacle1);
            break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3:obstacle.addImage(obstacle3);
             break;
        default:break;
    }
    obstacle.scale=0.1;
    obstacle.lifetime=300;
    obstacleGroup.add(obstacle);

  }
}
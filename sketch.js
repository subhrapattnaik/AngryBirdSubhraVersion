const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var fired;
var engine, world;
var box1, pig1,pig3;
var backgroundImg,platform;
var bird, slingshot;
var lives=3
var gameState = "onSling";
var bg = "sprites/bg.png";
var score = 0;
var spaceBarspaceBarCount;
var bird_flying;
function preload() {
    backgroundImg=loadImage(bg)
    getBackgroundImg();
    bird_flying=loadSound("sounds/bird_flying.mp3")
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;
  spaceBarspaceBarCount=0

    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig3 = new Pig(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    bird = new Bird(200,50);
    fired=false;
    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(bird.body,{x:200, y:50});


    bird1=new Bird(50,250);
    bird2=new Bird(80,250);
    bird3=new Bird(130,250);
}

function draw(){
    if(backgroundImg)
        background(backgroundImg);
    
        noStroke();
        textSize(35)
        fill("white")
        text("Score  " + score, width-300, 50)
        text("Lives Left:  " + lives, width/2, 50)
        if(gameState==="over"){
            text("Game Over",width/2,100)
            text("No more Lives Left",width/2,150)
           
        }
    Engine.update(engine);
    //strokeWeight(4);
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    pig1.score();
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
    pig3.score();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    bird.display();
    platform.display();
    //log6.display();
    slingshot.display();
    console.log(bird.body.speed);   
    if(lives===3) {
     bird1.display();
    bird2.display();
    //bird3.display();
    }
    if((spaceBarspaceBarCount==1)&&lives===2){
        bird2.display();
    }
    else if(lives===2){
     bird2.display();
     bird3.display();
    }
    if((spaceBarspaceBarCount==2) && lives===1){
        
    //bird3.display();
       }else if(lives===1){
        
        bird3.display();
       }
    
if((mouseIsPressed)&& (lives!==0)){
    if(mouseX>=0 && mouseX < 200 && gameState!=="launched"){
        Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
    }
}

}

/*function mouseDragged(){
    //if (gameState!=="launched"){
        Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
    //}
}*/


function mouseReleased(){
    if((gameState==="onSling")&& (lives!==0)){
        slingshot.fly();
        bird_flying.play();
        gameState = "launched";
        fired=true;
        lives=lives-1;
        if(lives==0){
            gameState = "over"
           
            }
            
    }
    
}

function keyPressed(){
    if((keyCode === 32 && bird.body.speed < 1)&& (lives!==0)){
       bird.trajectory = [];
       Matter.Body.setPosition(bird.body,{x:200, y:50});
       slingshot.attach(bird.body);
       spaceBarspaceBarCount=spaceBarspaceBarCount+1;
       gameState="onSling"
    }
}

async function getBackgroundImg(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON = await response.json();

    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);
    
    if(hour>=0600 && hour<=1900){
        bg = "sprites/bg1.png";
    }
    else{
        bg = "sprites/bg2.jpg";
    }

    backgroundImg = loadImage(bg);
    console.log(backgroundImg);
}
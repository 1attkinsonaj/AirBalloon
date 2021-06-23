var balloon,balloonImage1,balloonImage2;
var database;
var v_position;
var speed = 4
// create database and position variable here

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(1500,700);

  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  //balloon.scale=0.5;
  var balloonPosition=database.ref('balloon/height');
  balloonPosition.on("value", readPosition, showError);

  textSize(20); 
}

// function to display UI
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in left direction
    writePosition(-speed, 0, 0);
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in right direction
    writePosition(speed, 0, 0);
  }
  else if(keyDown(UP_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in up direction
    writePosition(0, -speed, 0);
   // balloon.scale=balloon.scale - 0.01;
  }
  else if(keyDown(DOWN_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in down direction
    writePosition(0, speed, 0);
  }

     if(keyDown('W')){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in right direction
    writePosition(0, 0, -speed/100);
    console.log("daddy crazy");
  }

  if(keyDown('S')){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in right direction
    writePosition(0, 0, speed/100);
    console.log("daddy crazy");
  }


  
  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon and W and S to move far and close!",40,40);
}

function writePosition(x, y, scale) {
  database.ref('balloon/height').update({
      'x': v_position.x + x,
      'y': v_position.y + y,
      'scale': v_position.scale + scale
  });

}

function showError() {
  console.log("Error in reading Database");
}


function readPosition(data) {
  v_position= data.val();
  balloon.x = v_position.x;
  balloon.y = v_position.y;
  balloon.scale = v_position.scale;
}
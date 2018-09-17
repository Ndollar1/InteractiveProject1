//create variables for the bullets, player,colors, positions, score, timelimit, missed shots and page number
var balls;
var green,red,blue,yellow;
var checkR,checkG,checkB,checkY;
var hit, left,right,dash, aim;
var arrow;
var shoot, ballImg;
var MARGIN = 40;
var portImage;
var r,g,b;
var radius;
var colorR;
var ypos,xpos;
var score;
var fireX,fireY,fireW,fireH;
var resX,resY,resW,resH;
var shot;
var timeLimit;
var page;
var missedshots;
var restartTimer;
var stars;


function setup() {
  //textFont('Helvetica.ttc');
 restartTimer = 300;
  missedshots = 0;
  page = 1;
  timeLimit = 40;
  createCanvas(600, 800);
  ellipseMode(RADIUS);
    //set colorR to be a random number between 1-4, this selects and checks what color the bullets are
  colorR = ceil(random(4));
    checkG = 0;
    checkR = 0;
    checkB = 0;
    checkY = 0;
  xpos = 230;
  ypos = 630;
  radius = 30;
  score = 0;
  shot = false;
  fireX = 250;
  fireY = 710;
  fireW = 100;
  fireH = 100;
    resX = 200;
    resY = 600;
    resW = 200;
    resH = 100;
  generateColor();
  stars = loadImage('Stars.png');
  green = loadImage('green.png');
  blue = loadImage('Blue.png');
  red = loadImage('red.png');
  yellow = loadImage('Yellow.png');
  shoot = loadImage('Rocket.png');
  hit = loadImage('Hit.png');
  left = loadImage('left.png');
  right = loadImage('Right.png');
  dash = loadImage('Dashboard.png');
  aim = loadImage('Preview Target Cover.png');
  arrow = createSprite(width/2, 300);
  arrow.addImage('normal', shoot);
  arrow.rotation = -90;

  balls = new Group();

}

//function to randomize the color shots
function generateColor(){
  if(colorR==1)//green
    {
      r = random(100);
      g = random(150,220);
      b = random(100);
    }
    if(colorR==2)//red
    {
      r = random(150,220);
      g = random(100);
      b = random(100);
    }
    if(colorR==3)//blue
    {
      r = random(100);
      g = random(100);
      b = random(150,220);
    }
    if(colorR==4)//yellow
    {
      r = random(180,220);
      g = random(180,220);
      b = random(100);
    }

  }


function draw() {

  if(page == 1){
    background(0,0,50);
    image(stars,0,0);
      textSize(20);
      //text("Time:",250,50);
      //text("Color",xpos-25,ypos-30);
  if(frameCount%60==0){
    timeLimit--;
  }
  //image(portImage, 600, 400);
  image(green,450,50,100,100);
  image(red,50,50,100,100);
  image(blue,25,450,150,100);
  image(yellow,450,450,100,100);
  //fill(220,40,40);
  //rect(50,50,100,100);
  //fill(40,220,40);
  //rect(450,50,100,100);
//  fill(40,40,220);
//  rect(50,450,100,100);
//  fill(220,220,40);
//  rect(450,450,100,100);
image(dash,0,560);
fill(255);
textSize(30);
text(timeLimit,fireX+200,fireY+50);
image(hit,fireX,fireY);
image(left,fireX-220,fireY);
image(right,fireX-110,fireY);
text(score, 320,650);
  //rect(fireX,fireY,fireW,fireH);
  //rect(fireX+200,fireY,fireW,fireH);
  //rect(fireX-200,fireY,fireW,fireH);
  fill(r,g,b);
  ellipse(xpos,ypos,radius,radius);
  image(aim,xpos-40,ypos-40);
    //var d = dist(mouseX,mouseY,xpos,ypos);

  if(keyDown(LEFT_ARROW)||(mouseIsPressed&&(mouseX>fireX-220)&&(mouseX <fireX+fireW-220)&&(mouseY>fireY)&&(mouseY<fireY+fireH)))
    arrow.rotation -= 4;

  if(keyDown(RIGHT_ARROW)||(mouseIsPressed&&(mouseX>fireX-110)&&(mouseX <fireX+fireW-110)&&(mouseY>fireY)&&(mouseY<fireY+fireH)))
    arrow.rotation += 4;
/*
  if(keyDown(UP_ARROW)){
    arrow.addSpeed(0.2, arrow.rotation);
    arrow.changeAnimation('thrust');
  }else{
    arrow.changeAnimation('normal');
  }

*/


    if((keyWentDown('space')&&!shot)||(mouseIsPressed&&!shot&&(mouseX>fireX)&&(mouseX <fireX+fireW)&&(mouseY>fireY)&&(mouseY<fireY+fireH))){
      shot = true;
      var ball = createSprite(arrow.position.x, arrow.position.y,30,30 );
      //ball.addImage(ballImg);
      //colorMode(RGB);
      //ball.shapeColor = (r, g, b);
      ball.draw = function(){
        fill(r,g,b);
        ellipse(0,0,30,30);
      }
      ball.setSpeed(10+arrow.getSpeed(), arrow.rotation);
      balls.add(ball);
}

      for(var i=0;i<balls.length;i++){
        textSize(30);
        fill(0,0,0);
        if(balls[i].position.x>=50&&balls[i].position.x<=150&&balls[i].position.y>=50&&balls[i].position.y<=150){
          //text(r, 200,50);
          //text(g, 200,90);
          //text(b, 200,130);
          if(colorR ==2){//red
            score++;
          }
          else if(colorR==1){
            checkG++;
                missedshots++;
          }
            else{
                missedshots++;
            }
          balls[i].remove();
          shot = false;
          colorR = ceil(random(4));
          generateColor();
        }
        else if(balls[i].position.x>=50&&balls[i].position.x<=150&&balls[i].position.y>=450&&balls[i].position.x<=550){
          //text("This is blue", 200,50);
          if(colorR ==3){//blue
            score++;
          }
          else if(colorR==4){
            checkB++;
                missedshots++;
          }
            else{
                missedshots++;
            }
          balls[i].remove();
          shot = false;
          colorR = ceil(random(4));
          generateColor();
        }
        else if(balls[i].position.x>=450&&balls[i].position.x<=550&&balls[i].position.y>=450&&balls[i].position.y<=550){
          //text("This is yellow", 200,50);
          if(colorR ==4){//yellow
            score++;
          }
          else if(colorR==3){
            checkY++;
                missedshots++;
          }
            else{
                missedshots++;
            }
          balls[i].remove();
          shot = false;
          colorR = ceil(random(4));
          generateColor();
        }
        else if(balls[i].position.x>=450&&balls[i].position.x<=550&&balls[i].position.y>=50&&balls[i].position.y<=150){
          //text("This is green", 200,50);
          if(colorR ==1){//green
            score++;
          }
          else if(colorR==2){
            checkR++;
                missedshots++;
          }
            else{
                missedshots++;
            }
          balls[i].remove();
          shot = false;
          colorR = ceil(random(4));
          generateColor();
        }
        else if(balls[i].position.x>=600||balls[i].position.x<=0||balls[i].position.y>=600||balls[i].position.y<=0){

          balls[i].remove();
          shot = false;
          missedshots++;
          colorR = ceil(random(4));
          generateColor();
        }

      }

  if(timeLimit<=0){
    page=2;
  }
  drawSprites();

/*
    for(var i=0; i<allSprites.length; i++) {
     var s = allSprites[i];


     if(s.position.y<0) {
       s.position.y = 1;
       s.velocity.y = abs(s.velocity.y);
     }

     if(s.position.y>height) {
       s.position.y = height-1;
       s.velocity.y = -abs(s.velocity.y);
     }
   }
   */
}
if(page ==2){
  background(200);
    textSize(30);
    text("Score:",55,75);
  text(score,175,75);
    text("Missed:",325,75);
  text(missedshots,445,75);
    textSize(20);
    text("Red shots that hit green target:",75,170);
  text(checkR,400,170);
    if(checkR>=5){
        text("It's possible you have some form of",100,200);
        text("red/green colorblindness(deuteranomaly)",100,230);
   }
    text("Green shots that hit red target:",75,270);
  text(checkG,400,270);
    if(checkG>=5){
        text("It's possible you have some form of",100,300);
        text("red/green colorblindness(deuteranomaly)",100,330);
    }
    text("Blue shots that hit yellow target:",75,370);
  text(checkY,400,370);
    if(checkY>=5){
        text("It's possible you have some form of",100,400);
        text("blue/yellow colorblindness(tritanomaly)",100,430);
    }
    text("Yellow shots that hit blue target:",75,470);
  text(checkB,400,470);
    if(checkB>=5){
        text("It's possible you have some form of",100,500);
        text("blue/yellow colorblindness(tritanomaly)",100,530);
    }
    rect(resX,resY,resW,resH);
    text("Restart",resX+(resW/2)-35,resY+(resH/2));
  restartTimer--;
  if(restartTimer<=0&&mouseIsPressed&&(mouseX>resX)&&(mouseX <resX+resW)&&(mouseY>resY)&&(mouseY<resY+resH)){
    score = 0;
    restartTimer = 300;
    missedshots = 0;
      checkR = 0;
      checkB = 0;
      checkY = 0;
      checkG = 0;
    timeLimit = 40;
    page=1;
  }
}
}

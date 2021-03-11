/***********************************************************************************
  Alex Kowalczuk  - Simple timer and button assigment / lab

  Uses the p5.timer.js class to show an animated progress bar on the screen

------------------------------------------------------------------------------------

***********************************************************************************/

// Global timer variable, uninitialized
var simpleTimer;

// Drawing
var progBarWidth;    // init in setup() to match screen width with marget
var progBarHeight = 20;
var hMargin = 40;
var vMargin = 60;
var images = [];
var button;
var alexa = false;

// preload
function preload () {
  images [0] = loadImage ('assets/alexa1.png');
  images [1] = loadImage ('assets/alexa2.png');
}

// Setup code goes here
function setup() {
  createCanvas(windowWidth, windowHeight);
  makeButton ();

  // Allocate a 5-second timer
  simpleTimer = new Timer(5000);

  textAlign(LEFT);
  textSize(24);
  rectMode(CORNER);

  progBarWidth = width - (hMargin*2);    // give some margin to edge
 }

// make button 
function makeButton() {
   // Create the clickable object
  button = new Clickable();
  
  // set the image to be this PNG
  button.text = "Click to make her respond...";

  // This would give it a white background
  button.color = "#69FFFF";

  // set width + height to image size
  button.width = 250;
  button.height = 50;

  // set to middle of screen, since we are drawing from the corners, we need to make an
  // additional calculation here
  button.locate( 100 , 270 );

  // Clickable callback functions, defined below
  button.onPress = buttonPressed;
}

function buttonPressed (){
   simpleTimer.start();
   alexa = true; 
}

// State 1 = Wait for mouse, just draw text on the screen
// State 2 = Progress bar is animating (wait for mouse is false)
function draw() {
  background(255);
  image (images[0], 450, 130, 950, 700);
  button.draw ();
  if (alexa === true) {
    drawProgressBar();
    drawTimerText();
  }

    if( simpleTimer.expired() && alexa == true ) {
      fill(255);
      text("Done", hMargin, 60 );
      image (images[1], 450, 130, 950, 700);
    }
  }


// Looks for elapsed time
function drawTimerText() {
  fill(0);
  textSize(20);
  text( "Wait, I am looking for the answer (%) = " + Math.round(simpleTimer.getPercentageRemaining()*100) + "%", 250, 150 );
  text( "Thinking (%) = " + Math.round(simpleTimer.getPercentageElapsed()*100) + "%", 140, 200 );
  text( "Remaing time (ms) = " + Math.round(simpleTimer.getRemainingTime()), 170, 240 );
}

// draw the bar itself
function drawProgressBar() {
  // Draw a growing rectangle, from left to right
  noStroke();
  fill('pink');
  rect( hMargin, vMargin + progBarHeight, progBarWidth*simpleTimer.getPercentageElapsed(), progBarHeight );
  
  // draw an outline on top of the rect
  noFill();
  stroke(50);
  strokeWeight(1);
  rect( hMargin, vMargin + progBarHeight, progBarWidth, progBarHeight );

  noStroke();
}


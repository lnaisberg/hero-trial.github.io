let message = "Lea Naisberg is a designer & coder based in New York exploring the future of generative design & interactive technologies";
let fontSize;

let letters = [];
let hiddenLetters = [];


// module aliases
let Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint

let engine;
let world;
let runner;
let thickness = 500;

//bodies
let boxes = [];
let box1;
let box2;
let myMouse;
let ground, leftWall, rightWall, ceiling;
let canvas;
let mConstraint;
let col = 255;
let myFont;

function preload(){
  // myFont = loadFont("GeneralSans-Medium.ttf");
  myFont = loadFont("https://cdn.jsdelivr.net/gh/lnaisberg/hero/GeneralSans-Medium.ttf");
}


function setup() {
  engine = Engine.create();
  canvas = createCanvas(windowWidth, windowHeight);
  // fontSize = width * 0.05;
  background(0);
  rectMode(CENTER);

  calcFontSize();

  textSize(fontSize);
  textFont(myFont);
  fillHiddenLetter();
  placeText();
  world = engine.world;
  
  ground = Bodies.rectangle(width/2, height + thickness/2, 3000, thickness, {isStatic: true});
  leftWall = Bodies.rectangle(0 - thickness/2, height/2, thickness, 3000, {isStatic: true});
  rightWall = Bodies.rectangle(width + thickness/2, height/2, thickness, 3000, {isStatic: true});
  ceiling = Bodies.rectangle(width/2, 0 - thickness/2, 3000, thickness, {isStatic: true});

  let myMouse = Mouse.create(canvas.elt);
  myMouse.pixelRatio = pixelDensity();
  
  let options = {
    mouse: myMouse
  }

  
  mConstraint = MouseConstraint.create(engine, options);

  Composite.add(world, [ground, leftWall, rightWall, ceiling, mConstraint]);
  runner = Runner.create();
  Runner.run(runner, engine);
}

function calcFontSize(){
  if(width > 1000){
    fontSize = width * 0.05;
  }

  if(width < 1000 && width > 700){
    fontSize = width * 0.06;
  }

  if(width < 700 && width > 450){
    fontSize = width * 0.08;
  }

  if(width < 300){
    fontSize = width * 0.09;
  }
}

function fillHiddenLetter(){
  for(let i = 0; i < message.length; i++){
    hiddenLetters.push(createVector(i, false));
  }
}

function placeText(){
  
  let posX = width * 0.15;
  let posY = height * 0.3;
  let maxLine = width * 0.70;
  let currentLine = 0;
  let lineCount = 1;
  textSize(fontSize); 

  for (let i = 0; i < message.length; i++) {
    let char = message.charAt(i);
    posX += textWidth(char);
    currentLine += textWidth(char);
    if(char == " "){
      let index = 1;
      let wordLength = 0;
      while(message.charAt(i + index) != " " && (i + index) < message.length){
        let char2 = message.charAt(i + index);
        wordLength += textWidth(char2);
        index++;
      }
      if(wordLength + currentLine > maxLine){
        posX = width * 0.15;
        posY += fontSize * 1.2;
        currentLine = 0;
        lineCount++;
      }
    }
  }

  // print(lineCount);

  let totalHeight = fontSize * 1.2 * (lineCount-1) + fontSize;
  posY = (height - totalHeight)/2;


  posX = width * 0.15;
  // posY = height * 0.3;
  currentLine = 0;

  push();

  for (let i = 0; i < message.length; i++) {
    let char = message.charAt(i);

    letters.push(new Letter(posX, posY, fontSize, message.charAt(i), hiddenLetters[i]));
    posX += textWidth(char);
    currentLine += textWidth(char);

    if(char == " "){
      let index = 1;
      let wordLength = 0;
      while(message.charAt(i + index) != " " && (i + index) < message.length){
        let char2 = message.charAt(i + index);
        wordLength += textWidth(char2);
        index++;
      }
      if(wordLength + currentLine > maxLine){
        posX = width * 0.15;
        posY += fontSize * 1.2;
        currentLine = 0;
      }
    }
    
  }
  pop();
}

function draw() {
  background(0,10);
  // print(getFrameRate());
  push();
  pop();
  blendMode(DIFFERENCE);
  for(let i = 0; i < boxes.length; i++){
    boxes[i].show();
  }
  for (let i = 0; i < message.length; i++) {
    blendMode(BLEND);
    letters[i].show();
  }
}

function keyPressed() {
  if (key == "r" || key == "R") {
    for (let i = 0; i < message.length; i++) {
      letters[i].hide.y = false;
    }
  } else {

  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  calcFontSize();
  // fontSize = width * 0.05;
  background(0);
  letters = [];
  
  for(let i = 0; i < boxes.length; i ++){
    boxes[i].remove();
    // boxes[i].updateSize();
  }
  boxes = [];
  hiddenLetters = [];
  fillHiddenLetter();
  placeText();

  Matter.Body.setPosition(
    ground,
    Matter.Vector.create(
      width/2,
      height + thickness/2
    )
  );

  Matter.Body.setPosition(
   leftWall,
    Matter.Vector.create(
      0 - thickness/2,
      height/2
    )
  );

  Matter.Body.setPosition(
    rightWall,
     Matter.Vector.create(
       width + thickness/2,
       height/2
     )
   );

   Matter.Body.setPosition(
    ceiling,
     Matter.Vector.create(
      width/2,
      0 - thickness/2
     )
   );
}
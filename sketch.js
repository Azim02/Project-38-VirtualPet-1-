//declaring varibles - 

var dog, happyDog, dogImg;
var database;
var foodS, foodStock;

function preload()
{
  //loading Images - 

  dogImg = loadImage("dogImg.png");
  happyDog = loadImage("dogImg1.png");
}

function setup() {
  
  //assigning database in firebase database - 
  database = firebase.database();

  //creating the output screen - 
	createCanvas(500, 500);
  
  //creting dog sprite, add image and scaling it - 

  dog = createSprite(250,250);
  dog.addImage(dogImg);
  dog.scale = 0.2;

  //fetching the food stock
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
}

function draw() {  

  //giving background color -
  background(46, 139, 87);

  //pressing up arrow key-
  if(keyDown(UP_ARROW))
  {
    //changing dog image-
    dog.addImage(happyDog);
    //calling writeStock function -
    writeStock(foodS);
  }

  //drawing all the sprites - 
  drawSprites();

  //styles -


  textSize(20);
  stroke("green");
  fill("white");
  text("Note : Press UP_ARROW Key To Feed Drago Milk!", 25, 75);

  textSize(15);
  stroke("green");
  fill("white");
  text("Food remaining : " + foodS, 150, 150);
}

//readStock function -

function readStock(data)
{
    foodS = data.val();
}

//writeStock function - 

function writeStock(x)
{
  if(x<=0)
  {
   x = 0;
  }else
  {
    x = x -1;
  }

  database.ref('/').update({
    Food:x
  })
}

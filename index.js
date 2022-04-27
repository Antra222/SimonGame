var level = 0;
var started = false;

var buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];


function nextSequence(){

  userClickedPattern=[];
  level = level+1;
  $("h1").text("Level "+level);
  var randomNumber = Math.random();
  randomNumber = Math.floor(randomNumber*4);
  var num = randomNumber;
  var chosenColor = buttonColors[num];
  gamePattern.push(chosenColor);
  $("#"+chosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(chosenColor);
  animatePress(chosenColor);
}

// nextSequence();

$("body").keypress(function(){
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {
    var att = $(this).attr("id");
    userClickedPattern.push(att);
    console.log(userClickedPattern);
    playSound(att);
    animatePress(att);
    checkAnswer(userClickedPattern.length-1);
});

function playSound(name){
  var song = new Audio("sounds/"+name+".mp3");
  song.autoplay=true;
  song.play();
}

function animatePress(val){
  $("#"+val).addClass("pressed");
  setTimeout(function () {
  $("#" + val).removeClass("pressed");
}, 100);
}

//matching user clicked pattern with game pattern

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel]==gamePattern[currentLevel]){
    console.log("Success!");
    if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);
    }
  }
  else{
    console.log("Error!");
    $("h1").text("Game Over, Press Any Key to Restart");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
  }
  $("body").keypress(function(){
    startOver();
  });
  console.log(gamePattern);
}

//Restart the game

function startOver(){
  level=1;
  started=false;
  gamePattern=[];
}

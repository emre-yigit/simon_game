gamePattern = [];
userClickedPattern = [];
var randomChosenColour;
var level = 0;
var count = 0;
var b = true;

function nextSequence(){
  setTimeout(function(){
    var randomNumber = Math.floor(Math.random()*4);
    const buttonColours = ["green","yellow", "blue", "red"];
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour);
    animatePress(randomChosenColour);
    level++;
    $("#level-title").text("Level" + " " + level);
  },1000 );

}

$("body").keydown(function(event){
  gameStart();
  b = false;
});

$(".btn").click(function(){
  if(b){
    gameStart();
    b = false;
  }
  else{
    var userChosenColor = this.id;
    playSound(userChosenColor);
    animatePress(userChosenColor);
    userClickedPattern.push(userChosenColor);
    let isCorr = checkSequence();
    console.log(isCorr);
    if(!isCorr){
      gameOver();
    }
  }
});

function checkSequence(){
  let c = userClickedPattern.length-1;
  //alert(c + " " + gamePattern.length);
  //alert("User: " + userClickedPattern);
  //alert("Game: " + gamePattern);
  console.log("Game: " + gamePattern + " User: " + userClickedPattern);
  if(gamePattern[c] == userClickedPattern[c]){
    if(userClickedPattern.length == gamePattern.length){
      count = 0;
      userClickedPattern = [];
      nextSequence();
    }
    return true;
  }
  return false;
}



function gameOver(){
  playSound("wrong");
  $("body").addClass("red");
  setTimeout(function(){
    $("body").removeClass("red");
  },300);
  gamePattern = [];
  userClickedPattern = [];
  $("#level-title").text("Game Over " + level);
  level = 0;
  count = 0;
  b = true;

}

function gameStart(){
  if(b){
    $("#level-title").text("Level" + " " + 1);
    nextSequence();
  }

}

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play()
}

function animatePress(color){
  $("#" + color).addClass("pressed");
  setTimeout(function(){
    $("#" + color).removeClass("pressed");
  },100);

}

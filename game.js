let level = 0;
let started = false;
buttonColors = ['red','blue','green','yellow'];

gamePattern = [];
userClickedPattern = []
function randomNumberGen() {
    let randomNumber = Math.floor(Math.random() * 4);
    return randomNumber;
}

function nextSequence(){
    userClickedPattern = []
    level++;
    $('#level-title').text('Level '+ level);

    // Selecting and animating random colour
    let randomChosenColor = buttonColors[randomNumberGen()];
    $('#' + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    gamePattern.push(randomChosenColor);

    playSound(randomChosenColor);
}

function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();   
}

$('.btn').click(function() {
    let userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);

})

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
  }

$(document).keydown(function() {
    if (!started) {
  
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
            if (userClickedPattern.length === gamePattern.length) {
                setTimeout(function () {
                    nextSequence();
                  }, 1000);
                }
              } else {
          
                console.log("wrong");
                let wrongAudio = new Audio('sounds/wrong.mp3')
                wrongAudio.play();
                $('body').addClass('game-over');
                $('#level-title').text("Game Over, Press Any Key to Restart");

                setTimeout(function () {$('body').removeClass('game-over')},200);
                
                startOver();
              }
            }
    
function startOver() {
    level = 0
    gamePattern = []
    userClickedPattern = []
    started = false;
}

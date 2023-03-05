//Setting starting variables
let level = 0;
let started = false;
buttonColors = ['red','blue','green','yellow'];
gamePattern = [];
userClickedPattern = []

function randomNumberGen() { //for returning a random number 0-3
    let randomNumber = Math.floor(Math.random() * 4);
    return randomNumber; 
}

function nextSequence(){
    userClickedPattern = []  //Reset the array so user has to click through pattern each iteration
    level++;                // Increment level by 1 every iteration
    $('#level-title').text('Level '+ level); //Change text to display current level

    // Selecting and animating random colour
    let randomChosenColor = buttonColors[randomNumberGen()];         //Generate a random colour each time
    gamePattern.push(randomChosenColor);                             //Append the new colour to array
    $('#' + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100); //Animate which random colour was chosen by selecting corresponding ID
    
    playSound(randomChosenColor); //Plays sound of new colour
}

function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();   
}

$('.btn').click(function() { //Function gets executed when one of the buttons are pressed
    let userChosenColour = $(this).attr('id'); //sets variable to id of whatever button is pressed
    userClickedPattern.push(userChosenColour); //appends color to user array

    playSound(userChosenColour); //plays sound of clicked button
    animatePress(userChosenColour); //animates clicked button
    checkAnswer(userClickedPattern.length-1); //each time button gets clicked, game will check if answer is correct

})

function animatePress(currentColor) { //Function to animate pressed button clicked
    $("#" + currentColor).addClass("pressed"); //adds 'pressed' class attribute to button clicked
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed"); //remove 'pressed' class after 100ms
    }, 100);
  }

$(document).keydown(function() { //Function that gets executed when any key is pressed
    if (!started) {              //Checks if game is already started, won't proceed if game has already started   
  
      $("#level-title").text("Level " + level); //changes level text
      nextSequence();                           //executes nextSequence function
      started = true;                           //changes variable to true so it won't execute again on next keystroke
    }
  });

function checkAnswer(currentLevel) { //Function to check if user's answers are correct, input is last index digit (i.e length of array -1)
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) { //if user's input is correct then proceed
        console.log("success");
            if (userClickedPattern.length === gamePattern.length) {  //check if that is the last/final input, if so, execute nextSequence 
                setTimeout(function () {
                    nextSequence();
                  }, 1000);
                }
              } else {                                                 //if user input wrong
          
                console.log("wrong");
                let wrongAudio = new Audio('sounds/wrong.mp3')          //plays wrong.mp3
                wrongAudio.play();
                $('body').addClass('game-over');                        //turns body container background colour red
                $('#level-title').text("Game Over, Press Any Key to Restart");  //changes text to game over text

                setTimeout(function () {$('body').removeClass('game-over')},200); //turns background color back to normal after 200ms
                
                startOver();                //executes startOver function to reset variables (e.g. level back to 0, pattern array to be empty..etc)
              }
            }
    
function startOver() {
    level = 0
    gamePattern = []
    userClickedPattern = []
    started = false;
}
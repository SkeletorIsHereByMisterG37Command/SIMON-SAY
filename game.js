// Include jQuery auto-complete suggestions
/// <reference path="../typings/globals/jquery/index.d.ts" />

// Global variables
var buttons_color_array = ["red", "blue", "green", "yellow"];
var game_pattern = [];
var user_clicks_pattern_array = [];
var game_started = false;
var current_level = 0;
var start_btn = document.querySelector("button");




$(start_btn).click(function () {
  if (!game_started) {
    $("#level-title").text("Level " + current_level);
    next_sequence();
    game_started = true;
    start_btn.classList.add("hide_start_button");
  }
});



// start the game when any keyboard value is pressed.
$(document).keypress(function () {
  if (!game_started) {
    $("#level-title").text("Level " + current_level);
    next_sequence();
    game_started = true;
    start_btn.classList.add("hide_start_button");
  }
});




// We grab a mouse click on any button.
// That click activates the function.
$(".btn").click(function () {

  // Grab the id attribute value of that clicked button.
  // Store that value (the color of the clicked button) inside 
  //   the user_clicks_pattern_array.
  var user_chosen_button = $(this).attr("id");
  user_clicks_pattern_array.push(user_chosen_button);

  // Play the audio sound designed for the clicked button.
  playSound(user_chosen_button);

  // Show flash animation for that clicked button.
  animatePress(user_chosen_button);

  // Check if the user clicked the currect displayed pattern.
  checkAnswer(user_clicks_pattern_array.length - 1);
});






function checkAnswer(currentLevel) {

  // if the pattern was clicked by the user without any errors
  //     than user advance to next level.
  // The next pattern to follow will start.
  // The user has 1 second to catch the new pattern and follow it succesfully.
  // If the user can't follow the pattern - Game Over.
  if (game_pattern[currentLevel] === user_clicks_pattern_array[currentLevel]) {
    if (user_clicks_pattern_array.length === game_pattern.length) {
      setTimeout(function () {
        next_sequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}




function next_sequence() {

  // Clear the user_clicks_pattern array when new level start.
  user_clicks_pattern = [];

  // Update the level and the title.
  current_level++;
  $("#level-title").text("Level " + current_level);

  // Generate random natural number from 0 to 3.
  // pick a random color from the buttons_color_array.
  var random_natural_number = Math.floor(Math.random() * 4);
  var pick_color_from_array = buttons_color_array[random_natural_number];

  // store that chosen random color in the game_pattern array.
  game_pattern.push(pick_color_from_array);

  // Each colored button has an id attribute.
  // That id attribute has the value of the button color.
  // The variable pick_color_from_array stores such a value.
  // So we basically grab one of the buttons, the randomly chosen button.
  // The button we grab - is being animated in a form of a flash.
  // Then we play the audio sound that match this button.
  $("#" + pick_color_from_array).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(pick_color_from_array);
}





function animatePress(currentColor) {

  // The 'pressed' class holds the animation design.
  $("#" + currentColor).addClass("pressed");

  // Remove the 'pressed' class after 100 milliseconds.
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}





// Each colored button has a unique audio sound.
// When color === 'yellow' - the yellow.mp3 audio file begin to play.
function playSound(color) {
  var audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}




// If Game Over - Present the user a chance so start a new one.
function startOver() {
  current_level = 0;
  game_pattern = [];
  user_clicks_pattern_array = [];
  game_started = false;
  start_btn.classList.remove("hide_start_button");
}
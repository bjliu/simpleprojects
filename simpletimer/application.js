
function updateTimer(){
    //Normal Timer
    if(countTarget == null){
      return
    }
    var currentTime = new Date();
    if(!paused0){
      currentSeconds += 1;
    }
    if(currentSeconds == countTarget)
    {
      currentSeconds = countTarget;
      $("#normal").find("pause").attr("disabled", "true");
      $("#normal").find("reset").attr("disabled", "true");;
    } else if(currentSeconds > countTarget){
      currentSeconds = countTarget;
    }

    //Reverse Timer
    var reverseTime = new Date();
    if(!paused1){
      reverseSeconds -= 1;
    }
    if(reverseSeconds == 0){
      reverseSeconds = 0;
      $("#reverse").find("pause").attr("disabled", "true");
      $("#reverse").find("reset").attr("disabled", "true");;
    } else if(reverseSeconds < 0){
      reverseSeconds = 0;
    }


    displayTimer();
}

function displayTimer(){
    var currentSecondsDisplay = currentSeconds%60;
    var currentMinutes = Math.floor(currentSeconds/60)%60;
    var currentHours = Math.floor(currentSeconds/3600)%24;
    var currentDays = Math.floor(currentSeconds/86400);
    var reverseSecondsDisplay = reverseSeconds%60;
    var reverseMinutes = Math.floor(reverseSeconds/60)%60;
    var reverseHours = Math.floor(reverseSeconds/3600)%24;
    var reverseDays = Math.floor(reverseSeconds/86400);

    // Compose the string for display
    var TimerString = currentDays + " days, " + currentHours + " hours, " + currentMinutes + " minutes, " + currentSecondsDisplay + " seconds";
    var reverseTimerString = reverseDays + " days, " + reverseHours + " hours, " + reverseMinutes + " minutes, " + reverseSecondsDisplay + " seconds";

    // Update the time display
    $("clock0").text(TimerString);
    $("clock1").text(reverseTimerString);
}

var countTarget;
var currentSeconds = 0;
var reverseSeconds = 0;
var paused0 = false;
var paused1 = false;

$(document).ready(function() {
    displayTimer();
    setInterval('updateTimer()', 1000);

    //Clicking on Submit
    $("body").on("click", "#submit", function(){
        if($("input").val() > 0){
            countTarget = $("input").val();
        }
        else{
            alert("Please use a positive integer.");
        }
        currentSeconds = 0;
        reverseSeconds = countTarget;
    });

    //Clicking on Reset
    $("p").on("click", "#reset",
        { str: $(this).closest("h2").text() },
        function(event) {
        var currentTime = new Date();
        switch(event.data.str){
          case "Normal Timer":
          currentSeconds = 0;
          break
          case "Reverse Timer":
          reverseSeconds = countTarget;
          break
        }
    });

    //Clicking on Pause
    $("p").on("click", "#pause", 
        { str: $(this).closest("h2").text() },
        function(event) {
        switch(pausecase){
            case "Normal Timer":
            paused0 = !paused0;
            if(paused0){
                $("#normal").("pause").attr("value", "Start");
            }
            else{
               $("#normal").("pause").attr("value", "Pause");
            }
            break
            case "Reverse Timer":
            paused1 = !paused1;
            if(paused1){
                $("#reverse").("pause").attr("value", "Start");
            }
            else{
                $("#reverse").("pause").attr("value", "Pause");
            }
            break
        }
    });
});

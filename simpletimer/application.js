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
      document.getElementById("pause0").disabled = true;
      document.getElementById("reset0").disabled = true;
    } else if(currentSeconds > countTarget){
      currentSeconds = countTarget;
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
    document.getElementById("clock0").firstChild.nodeValue = TimerString;
    document.getElementById("clock1").firstChild.nodeValue = reverseTimerString;
}

function pause(pausecase){
    switch(pausecase){
      case 0:
      paused0 = !paused0;
      if(paused0){
        document.getElementById("pause0").value= "Start";
      }
      else{
        document.getElementById("pause0").value= "Pause";
      }
      break
      case 1:
      paused1 = !paused1;
      if(paused1){
        document.getElementById("pause1").value= "Start";
      }
      else{
        document.getElementById("pause1").value= "Pause";
      }
      break
    }
}

function reset(resetcase){
    var fdcurrentTime = new Date();
    switch(resetcase){
      case 0:
      currentSeconds = 0;
      break
      case 1:
      reverseSeconds = countTarget;
      break
      case 2:
      if(Number(document.getElementById("input").value > 0)){
        countTarget = Number(document.getElementById("input").value);
      }
      else{
        alert("Please use a positive integer.");
      }
      currentSeconds = 0;
      reverseSeconds = countTarget;
    }
}

$(document).ready(function() {
    var countTarget;
    var currentSeconds = 0;
    var reverseSeconds = 0;
    var paused0 = false;
    var paused1 = false;

    //Reverse Timer
    var reverseTime = new Date();
    if(!paused1){
      reverseSeconds -= 1;
    }
    if(reverseSeconds == 0){
      reverseSeconds = 0;
      document.getElementById("pause1").disabled = true;
      document.getElementById("reset1").disabled = true;
    } else if(reverseSeconds < 0){
      reverseSeconds = 0;
    }
    displayTimer();
    }
});

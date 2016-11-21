var frame = 0;
;(function () {
  function main() {
    window.requestAnimationFrame( main );
    var fps = gameOptions.fps;



    // Your main loop contents.
    if(gameOptions.pointsPerSecond > 0 && frame == fps){
      gameOptions.points = gameOptions.points + gameOptions.pointsPerSecond;
      gameOptions.update();
    }


    frame++;
    if(frame > fps){
      frame = 0;
      gameOptions.checkButtons();
    }
  }

  main(); // Start the cycle
})();

$(document).ready(function(){
  // add buttons to dom
  for (var i = 0; i < gameOptions.upgrades.length; i++) {
    $(gameOptions.buttonList).append('<div class="button-container"><button data-id="'+i+'" id="'+gameOptions.upgrades[i].id+'" type="button">'+gameOptions.upgrades[i].name+'</button></div>');
  }
  // point button
  $(gameOptions.pointAdder).on('click',function(e){
    e.preventDefault();
    gameOptions.points++;
    $(gameOptions.pointHolder).html(gameOptions.points);
  });

  // add button logic
  $('.button-container button').on('click',function(e){
    e.preventDefault();
    var n = $(this).attr('data-id');
    if( gameOptions.points >= gameOptions.upgrades[n].cost ){
      gameOptions.points = gameOptions.points - gameOptions.upgrades[n].cost;
      gameOptions.pointsPerSecond = gameOptions.pointsPerSecond + gameOptions.upgrades[n].pps;
      gameOptions.upgrades[n].purchased++;
    }
  })

});

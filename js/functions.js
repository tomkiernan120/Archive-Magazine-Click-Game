$(document).ready(function(){

  var d = new Date();

  // add buttons to dom
  for (var i = 0; i < gameOptions.upgrades.length; i++) {
    var upgrades = gameOptions.upgrades[i];
    $(gameOptions.buttonList).append('<div class="button-container"><button class data-id="'+i+'" id="'+upgrades.id+'" type="button"><h2>'+upgrades.name+'</h2><p>Price: <span id="button-price">'+upgrades.cost+'</span></p><p>Points per second: <span id="button-pps">'+upgrades.pps+'</span></p><p>Purchased: <span id="button-purchased">'+upgrades.purchased+'</span></p></button></div>');
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
      gameOptions.upgrades[n].purchased = gameOptions.upgrades[n].purchased + 1;
      $(this).find('#button-purchased').html(gameOptions.upgrades[n].purchased);
      gameOptions.updatePurchased();
      $('#purchasedTotal').html(gameOptions.purchasedTotal);
    }
  });

  $('#year').html( d.getFullYear() );

});

$(document).ready(function(){
  function notify(note){
  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }

  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    var notification = new Notification(note,{icon:"http://thomass-macbook-pro.local:5757/webimg.png"});
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        var notification = new Notification(note,{icon:"http://thomass-macbook-pro.local:5757/webimg.png"});
      }
    });
  }

  // At last, if the user has denied notifications, and you
  // want to be respectful there is no need to bother them any more.
}


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

  $('.save-progress').on('click',function(e){
    e.preventDefault();
    if( typeof(Storage) !== "undefined" ){
      // var d = gameOptions;
      var data = {
        "clicks":gameOptions.points,
        "pps": gameOptions.pointsPerSecond,
        "purchasedTotal": gameOptions.purchasedTotal,
        "upgrades": JSON.stringify(gameOptions.upgrades),
      }

      var dataToStore = JSON.stringify(data);
      localStorage.setItem('savedData',dataToStore);
      notify('saved data to local storage');
    } else {
      alert('Sorry storage is not supported for your browser :(');
    }

  });

  $('.load-progress').on('click',function(e){
    e.preventDefault();
    var storedData = localStorage.getItem('savedData');
    if( storedData ){
      var data = JSON.parse(storedData);
      var upgrades = JSON.parse(data.upgrades);

      gameOptions.setOptions('points',data.clicks);
      gameOptions.setOptions('pointsPerSecond',data.pps);
      gameOptions.setOptions('purchasedTotal',data.purchasedTotal);
      gameOptions.setOptions('upgrades',upgrades);

      $(gameOptions.buttonList).empty();
      for (var i = 0; i < gameOptions.upgrades.length; i++) {
        var upgrades = gameOptions.upgrades[i];
        $(gameOptions.buttonList).append('<div class="button-container"><button class data-id="'+i+'" id="'+upgrades.id+'" type="button"><h2>'+upgrades.name+'</h2><p>Price: <span id="button-price">'+upgrades.cost+'</span></p><p>Points per second: <span id="button-pps">'+upgrades.pps+'</span></p><p>Purchased: <span id="button-purchased">'+upgrades.purchased+'</span></p></button></div>');
      }

      gameOptions.updatePurchased();
      gameOptions.update();
      notify('loaded saved game');
    } else {
      alert('No saved data');
    }
  });

});

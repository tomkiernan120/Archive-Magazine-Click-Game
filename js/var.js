var gameOptions = {
  fps: 60,
  pointHolder: "#points",
  ppsholder: '#pps',
  points: 0,
  pointAdder: "#post",
  update: function(){
    $(this.pointHolder).html(this.points);
    $(this.ppsholder).html(this.pointsPerSecond);
  },
  pointsPerSecond: 0,
  buttonList: '.button-list',
  upgrades: [
    {
      name: 'Schedule post',
      cost: 20,
      purchased: 0,
      multiplyer: 2,
      pps: 1,
      id: 'schedulepost',
    },
    {
      name: 'Hire Intern',
      cost: 100,
      purchased: 0,
      multiplyer: 2.5,
      pps: 2,
      id: 'hireintern',
    },
    {
      name: 'Sponsored Post',
      cost: 1000,
      purchased: 0,
      multiplyer: 5,
      pps: 5,
      id: 'sponsoredpost',
    },
    {
      name: 'Hire writer',
      cost: 20000,
      purchased: 0,
      multiplyer: 10,
      pps: 10,
      id: 'hirewriter',
    },
    {
      name: 'Rent office',
      cost: 100000,
      purchased: 0,
      multiplyer: 12,
      pps: 25,
      id: 'rentoffice',
    }
  ],
  checkButtons: function(){
    $(this.buttonList).find('button').each(function(i,el){
      var n = $(el).attr('data-id');
      if($(el).hasClass('disabled') && gameOptions.points >= gameOptions.upgrades[n].cost){
        $(el).removeClass('disabled');
      } else if( !$(el).hasClass('disabled') && gameOptions.points < gameOptions.upgrades[n].cost ){
        $(el).addClass('disabled');
      }
    });
  },
};

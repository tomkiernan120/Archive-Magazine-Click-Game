$(document).ready(function(){for(var t=0;t<gameOptions.upgrades.length;t++)$(gameOptions.buttonList).append('<div class="button-container"><button data-id="'+t+'" id="'+gameOptions.upgrades[t].id+'" type="button">'+gameOptions.upgrades[t].name+"</button></div>");$(gameOptions.pointAdder).on("click",function(t){t.preventDefault(),gameOptions.points++,$(gameOptions.pointHolder).html(gameOptions.points)}),$(".button-container button").on("click",function(t){t.preventDefault();var n=$(this).attr("data-id");gameOptions.points>=gameOptions.upgrades[n].cost&&(gameOptions.points=gameOptions.points-gameOptions.upgrades[n].cost,gameOptions.pointsPerSecond=gameOptions.pointsPerSecond+gameOptions.upgrades[n].pps,gameOptions.upgrades[n].purchased++)})});
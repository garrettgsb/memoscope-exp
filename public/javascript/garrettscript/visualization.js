$(document).ready(function(){
  $.getJSON("/cards/all", function(cardData){
    console.log("Visualization script initialized.");
    var cards = [];
    cardData.forEach(function(card){
      var cardFormatted = {};
      cardFormatted.orbit = card.orbit;
      cardFormatted.notifiedAt = Date.parse(card.created_at);
      cardFormatted.r = 5;
      console.log(cardFormatted);
      cards.push(cardFormatted);
      // cardFormatted['orbit'] = card.orbit
      //   orbit: 5,
      //   notifiedAt: 1466197896701,
      //   r: 5
      // }
    })
    console.log(cardData);
    var canvas = document.getElementById('visualization');
    var ctx = canvas.getContext('2d');

    var xOffset = canvas.width / 2;
    var yOffset = canvas.height / 2;

    var orbits = {
      1: {
        radius: 30,
        time: 5000
      },

      2: {
        radius: 60,
        time: 25000
      },

      3: {
        radius: 90,
        time: 125000
      },

      4: {
        radius: 120,
        time: 250000
      },

      5: {
        radius: 150,
        time: 625000
      },

      6: {
        radius: 180,
        time: 3125000
      },

      7: {
        radius: 210,
        time: 15625000
      },

      8: {
        radius: 240,
        time: 78125000
      }
    };

    var sun = {
      x: xOffset,
      y: yOffset,
      r: 15
    };

    var cardsOld = [{
      orbit: 1,
      notifiedAt: 1466197895701,
      r: 5
    }, {
      orbit: 2,
      notifiedAt: 1466197800701,
      r: 5
    }, {
      orbit: 2,
      notifiedAt: 1466197442401,
      r: 5
    }, {
      orbit: 3,
      notifiedAt: 1466197898701,
      r: 5
    }, {
      orbit: 4,
      notifiedAt: 1466197897701,
      r: 5
    }, {
      orbit: 5,
      notifiedAt: 1466197896701,
      r: 5
    }];
    console.log(cardsOld);
    function moveCard(card) {
      var orbit = orbits[card.orbit];
      var endTime = orbit.time + card.notifiedAt;
      var now = (new Date()).getTime();
      var delta = now - card.notifiedAt;
      var total = endTime - card.notifiedAt;
      // TODO Calculate x and y
      var percent = delta / total;
      var angle = 360 * percent;
      angle = angle * (Math.PI / 180);
      var x = Math.cos(angle) * orbit.radius;
      var y = Math.sin(angle) * orbit.radius;
      card.x = x + xOffset;
      card.y = y + yOffset;
    }

//Soheil's forumla (not working yet):
//    var x = (9 * Math.cos(angle))/(Math.sqrt(10)*(Math.pow(Math.sin(angle),2) + Math.pow(Math.cos(angle),2))) * orbit.radius;
//    var y = (9 * Math.sin(angle))/(Math.sqrt(10)*(Math.pow(Math.sin(angle),2) + Math.pow(Math.cos(angle),2))) * orbit.radius;

    function move() {
      cards.forEach(function (card) {
        moveCard(card);
      });
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "rgb(50,50,50)";
      ctx.beginPath();
      ctx.moveTo(xOffset, yOffset);
      ctx.lineTo(0, yOffset);
      ctx.stroke();
      for (var orbit in orbits) {
        ctx.beginPath();
        ctx.strokeStyle = "rgb(150,150,150)";
        ctx.arc(xOffset, yOffset, orbits[orbit].radius, 0, 2 * Math.PI, true);
        ctx.stroke();
      }
      cards.forEach(function (card) {
        ctx.beginPath();
        ctx.fillStyle = "rgb(0,100,200)";
        ctx.arc(card.x, card.y, card.r, 0, 2 * Math.PI, true);
        ctx.fill();
      });
      ctx.beginPath();
      ctx.fillStyle = "rgb(200,200,0)";
      ctx.arc(sun.x, sun.y, sun.r, 0, 2 * Math.PI, true);
      ctx.fill();
    }

    (function update() {
      move();
      draw();
      requestAnimationFrame(update);
    }());
  });
});

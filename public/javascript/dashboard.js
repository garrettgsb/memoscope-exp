$(document).ready(function(){
  $.getJSON("/cards/all", function(cardData){
    console.log("Visualization script initialized.");
    var oldCards = [];
    cardData.forEach(function(card){
      var cardFormatted = {};
      cardFormatted.orbit = card.orbit;
      cardFormatted.notifiedAt = Date.parse(card.created_at);
      cardFormatted.r = 5;
      console.log(cardFormatted);
      oldCards.push(cardFormatted);
    })
    console.log(cardData);
    var canvas = document.getElementById('visualization');
    window.addEventListener('resize', resizeCanvas, false);

    function resizeCanvas() {
      
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
                
      var ctx = canvas.getContext('2d');

      var xOffset = canvas.width / 2;
      var yOffset = canvas.height / 2;

      var orbits = {
        1: {
          radius: 60,
          time: 10 * 1000
        },

        2: {
          radius: 90,
          time: 30 * 1000
        },

        3: {
          radius: 120,
          time: 2 * 60 * 1000
        },

        4: {
          radius: 150,
          time: 10 * 60 * 1000
        },

        5: {
          radius: 180,
          time: 60 * 60 * 1000
        }
      };

      var sun = {
        x: xOffset,
        y: yOffset,
        r: 30
      };

      var cards = [{
        orbit: 1,
        notifiedAt: 1466197895701,
        r: 15
      }, {
        orbit: 2,
        notifiedAt: 1466197800701,
        r: 12
      }, {
        orbit: 3,
        notifiedAt: 1466197442401,
        r: 10
      }, {
        orbit: 4,
        notifiedAt: 1466197898701,
        r: 8
      }, {
        orbit: 5,
        notifiedAt: 1466197897701,
        r: 6
      }];
      function moveCard(card) {
        var orbit = orbits[card.orbit];
        var endTime = orbit.time + card.notifiedAt;
        var now = (new Date()).getTime();
        var delta = now - card.notifiedAt;
        var total = endTime - card.notifiedAt;
        var percent = delta / total;
        var angle = 360 * percent;
        angle = angle * (Math.PI / 180);
        var x = (2.5 * orbit.radius * Math.cos(angle))/Math.sqrt((6.25 * Math.pow(Math.sin(angle),2)) + Math.pow(Math.cos(angle),2));
        var y = (2.5 * orbit.radius * Math.sin(angle))/Math.sqrt((6.25 * Math.pow(Math.sin(angle),2)) + Math.pow(Math.cos(angle),2));
        card.x = x + xOffset;
        card.y = y + yOffset;
      }

      function move() {
        cards.forEach(function (card) {
          moveCard(card);
        });
      }

      function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (var orbit in orbits) {      
          var b = orbits[orbit].radius;
          var a = 2.5 * b;
          ctx.beginPath();
          ctx.ellipse(xOffset, yOffset, a, b , 0 , 0, 2 * Math.PI);
          ctx.stroke();
          var time = orbits[orbit].time / 1000;
          var orbit_time;
          switch(time) {
              case 10:
                  orbit_time = "10 sec";
                  break;
              case 30:
                  orbit_time = "30 sec";
                  break;
              case 120:
                  orbit_time = "2 min";
                  break;
              case 600:
                  orbit_time = "10 min";
                  break;
              default:
                  orbit_time = "1 hour";
          }
          ctx.font = "20px serif";
          ctx.fillText(orbit_time, xOffset - ( a / 2), (yOffset +  b ));
        }
        cards.forEach(function (card) {
          ctx.beginPath();
          ctx.fillStyle = "rgb(174,52,199)";
          ctx.shadowColor = "black";           
          ctx.arc(card.x, card.y, card.r, 0, 2 * Math.PI, true);
          ctx.fill();
          ctx.beginPath();
          ctx.fillStyle = "rgb(255,255,255)";
          ctx.shadowColor = "white";
          ctx.shadowOffsetX = (card.r / 3) ;
          ctx.shadowOffsetY = (card.r / 3) ;
          ctx.shadowBlur = 40;              
          ctx.arc(card.x - (card.r / 2.5), card.y - (card.r / 2.5) , (card.r/3), 0, 2 * Math.PI, true);
          ctx.fill();
        });
        ctx.beginPath();
        ctx.fillStyle = "rgb(216,232,70)";
        ctx.shadowBlur = 5;
        ctx.arc(sun.x, sun.y, sun.r, 0, 2 * Math.PI, true);
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = "rgb(255,255,255)";
        ctx.shadowColor = "white";
        ctx.arc(sun.x, sun.y, (sun.r / 1.5), 0, 2 * Math.PI, true);
        ctx.fill();
      }

      (function update() {
        move();
        draw();
        requestAnimationFrame(update);
      }());
    }

    resizeCanvas();

  });
});

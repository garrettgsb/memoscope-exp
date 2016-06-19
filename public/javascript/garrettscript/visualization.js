$(document).ready(function(){
  $.getJSON("/cards/all", function(cardData){
    // All code needs to go below here
    console.log("Visualization script initialized.");

    //Notification Logic
    var notifications = [];
    var notification_count = 0;
    $(".notification_count").on('click', function(){
      var foundCard;
      cards.forEach(function(card){
        if (card.id == notifications[0]) {
          foundCard = card;

          // Render card text/HTML and create buttons
          $(".notification_display").text(foundCard.content_html).prepend("<div class='button is-success remembered'>Remembered!</div>").prepend("<div class='button is-danger forgot'>Forgot :(</div>");

          // Success button behavior:
            // - Increment orbit and update timestamp
            // -
          $(".remembered").on('click', function(){
            foundCard.orbit += 1
            foundCard.notifiedAt = Date.now();
            console.log(`Remembered! Orbit for card ${foundCard.id} increased to ${foundCard.orbit}, date changed to ${foundCard.notifiedAt}`)
            $(".remembered").remove();
            $(".forgot").remove();
            //TODO: AJAX: Write card to database
            //TODO: Update card's entry in var `cards` (if persisted in database...?)
            notifications.shift();
          });
          $(".forgot").on('click', function(foundCard){
            foundCard.orbit = 1
            foundCard.notifiedAt = Date.now();
            console.log(`Forgot! Orbit for card ${foundCard.id} reset to ${foundCard.orbit}, date changed to ${foundCard.notifiedAt}`)
            $(".remembered").remove();
            $(".forgot").remove();
            //TODO: AJAX: Write card to database
            //TODO: Update card's entry in var `cards` (if persisted in database...?)
            notifications.shift();
          });
        }
      });
    })

    var cards = [];
    //TODO: Tie in notifications (IDs) with pop-up content
    //TODO: Tie in notification_count with representation of number of pending notifications

    cardData.forEach(function(card){
      var cardFormatted = {};
      cardFormatted.id = card.id;
      cardFormatted.content_html = card.content_html;
      cardFormatted.deck_id = card.deck_id;
      cardFormatted.orbit = card.orbit;
      cardFormatted.notifiedAt = Date.parse(card.created_at);
      cardFormatted.r = Math.floor((Math.random() * 5) + 5);
      // Randomizes dot color for each card; Play with that if you want, or just make it one solid color.
      cardFormatted.colorRed = Math.floor(Math.random() * (150-100)) + 100
      cardFormatted.colorGreen = Math.floor(Math.random() * (100-20)) + 20
      cardFormatted.colorBlue = Math.floor(Math.random() * (255-100)) + 100
      cards.push(cardFormatted);
      // cardFormatted['orbit'] = card.orbit
      //   orbit: 5,
      //   notifiedAt: 1466197896701,
      //   r: 5
      // }
    })
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
    function modifyCard(card) {
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

      // Check for notification
      if(now >= endTime) {
        if (notifications.indexOf(card.id) == -1) {
          notifications.push(card.id);
        }
        console.log(notifications[0]);
        //TODO: Do something with set notifications to render notifications, increment a number.
      }
      notification_count = notifications.length;
    }

//Soheil's forumla (not working yet):
//    var x = (9 * Math.cos(angle))/(Math.sqrt(10)*(Math.pow(Math.sin(angle),2) + Math.pow(Math.cos(angle),2))) * orbit.radius;
//    var y = (9 * Math.sin(angle))/(Math.sqrt(10)*(Math.pow(Math.sin(angle),2) + Math.pow(Math.cos(angle),2))) * orbit.radius;

    function move() {
      cards.forEach(function (card) {
        modifyCard(card);
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
        ctx.fillStyle = `rgba(${card.colorRed},${card.colorGreen},${card.colorBlue},0.6)`;
        ctx.arc(card.x, card.y, card.r, 0, 2 * Math.PI, true);
        ctx.fill();
      });
      ctx.beginPath();
      ctx.fillStyle = "rgb(200,200,0)";
      ctx.arc(sun.x, sun.y, sun.r, 0, 2 * Math.PI, true);
      ctx.fill();

    }

    (function update(notifications) {
      move();
      draw();
      $(".notification_count").text(Math.floor(notification_count));
      requestAnimationFrame(update);
    }());
  });
});

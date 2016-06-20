$(document).ready(function(){
  $.getJSON("/cards/all", function(cardData){
    // All code needs to go below here
    console.log("Visualization script initialized.");

    //Notification Logic
    var notifications = [];
    var notification_count = 0;

    $(".notification_count").on('click', function(){
      function displayNotification(){
        var foundCard;
          cards.forEach(function(card){
            if (card.id == notifications[0]) {
              foundCard = card;

              // Render card text/HTML and create buttons
              $(".notification_display").html("<p>" + foundCard.content_html + "</p>").prepend("<div class='button is-success remembered'>Remembered!</div>").prepend("<div class='button is-danger forgot'>Forgot :(</div>");

              // - TODO: Write updated data to database
              function notificationFinish(){
                card.notifiedAt = Date.now();
                card.notifyFlag = false;
                $(".remembered").remove();
                $(".forgot").remove();
                $(".notification_display").html("");
                //TODO: AJAX: Write card to database
                //TODO: Update card's entry in var `cards` (if persisted in database...?)
                notifications.shift();
                $.post('/cards/update', card, function(response){
                  // Basically if I'm parsing the response properly,
                  // this should return "Derp" and the response.
                  // Currently, nothing seems to return from the server...
                  // Or at least I'm not accessing it properly.
                  // This isn't important at the moment, but if we want to edit cards
                  // and show the edits later, we'll probably want to do that here.
                  return console.log("Derp" + response);
                }, 'json');
                displayNotification();
              };


              // "Remembered" and "Forgot" are identical,
              // except for their effect on card Orbit.
              $(".remembered").on('click', function(){
                card.orbit += 1
                notificationFinish();
              });

              $(".forgot").on('click', function(foundCard){
                card.orbit = 1
                notificationFinish();
              });
            }
          });
      }
      displayNotification();
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
      cardFormatted.notifiedAt = card.notified_at || Date.now();
      cardFormatted.r = card.content_html.length
      cardFormatted.notifyFlag = false;
      cardFormatted.rendered = false;
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
      if (card.orbit > 8) {
        var orbit = 1;
      } else {
        var orbit = orbits[card.orbit];
      };
      var notifiedAt = parseInt(card.notifiedAt);
      var endTime = orbit.time + notifiedAt;
      var now = (new Date()).getTime();
      var delta = now - notifiedAt;
      var total = endTime - notifiedAt;
      var percent = delta / total;
      var angle = 360 * percent;
      angle = angle * (Math.PI / 180);
      var x = Math.cos(angle) * orbit.radius;
      var y = Math.sin(angle) * orbit.radius;
      if (now < endTime || card.rendered == false) {
        card.x = x + xOffset;
        card.y = y + yOffset;
        card.rendered = true;
      } else {
        if (card.notifyFlag == false) {
          notifyMe("Take a look through your memoscope");
          card.notifyFlag = true;
        }
    };

      // Check for notification
      if(now >= endTime) {
      var x = Math.cos(0) * orbit.radius;
      var y = Math.sin(0) * orbit.radius;
      card.x = x + xOffset;
      card.y = y + yOffset;
        if (notifications.indexOf(card.id) == -1) {
          notifications.push(card.id);
        }
        //TODO: Do something with set notifications to render notifications, increment a number.
        //NOTE: I don't remember what this TODO is referring to.
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
      ctx.lineTo(yOffset*2, yOffset);
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

    (function update() {
      move();
      draw();
      $(".notification_count").text(Math.floor(notification_count));
      requestAnimationFrame(update);
    }());

    function notifyMe(message) {
    	if (!("Notification" in window)) {
    		alert("This browser does not support desktop notification");
    	}else if (Notification.permission === "granted") {
    		generateNotification(message);
    	}else if (Notification.permission !== 'denied') {
    		Notification.requestPermission(function (permission) {
    			if (permission === "granted") {
    				generateNotification(message);
    			}
    		});
    	}
    };

    function generateNotification(message) {
    	var options = {
    		body: message,
    		icon: "http://www.marismith.com/wp-content/uploads/2013/07/One-Thing-Remember-Shutterstock.jpg",
    	}
    	var n = new Notification('Memoscope', options);
    	setTimeout(n.close.bind(n), 10000);
    }
  });
});

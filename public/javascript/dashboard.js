//NOTE - HOW TO USE:

// Whatever has the class `notification_count` will
// receive an updating number based on pending notifications.

// The content_html for the current notification will render in
// whatever has the class `notification_display`, along with a
// "Remember" and "Forgot" button.

// Currently, the notification renders when you click
// the `notification_count` object, but you can add
// click handlers by calling displayNotification()
// inside of their callback function.

$(document).ready(function(){

  var canvas = document.getElementById('visualization');

  var closeSideBar = document.getElementById('closeSideBar');
  var openSideBar = document.getElementById('openSideBar');

  
  
  openSideBar.onclick = function() { 
    $(".sidenav").width('30%');
  };

  closeSideBar.onclick = function() { 
    $(".sidenav").width('0%');
  };

  $.getJSON("/cards/all", function(cardData){
    console.log("Visualization script initialized.");

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
      cardFormatted.orbit = card.orbit || 1;
      cardFormatted.notifiedAt = card.notified_at || Date.now();
      cardFormatted.r = (0.04 * Math.sqrt(500 * card.content_html.length)) + 5;
      cardFormatted.notifyFlag = false;
      cardFormatted.rendered = false;
      // Randomizes dot color for each card; Play with that if you want, or just make it one solid color.
      randomRed = Math.floor(Math.random() * (150-100)) + 100
      randomGreen = Math.floor(Math.random() * (100-20)) + 20
      randomBlue = Math.floor(Math.random() * (255-100)) + 100
      randomColor = "rgb("+randomRed+","+randomGreen+","+randomBlue+")"
      cards.push(cardFormatted);
    });

    console.log(cards);

    window.addEventListener('resize', resizeCanvas, false);


    function resizeCanvas() {

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      var ctx = canvas.getContext('2d');

      var xOffset = canvas.width / 2;
      var yOffset = canvas.height / 2;

      var logo = new Image();
      logo.src = '/images/logo-white.png';
      
      
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
        r: 20
      };

      var cardsOld = [{
        orbit: 1,
        notifiedAt: 1466197895701,
        r: 15
      }, {
        orbit: 2,
        notifiedAt: 1466197800701,
        r: 14
      }, {
        orbit: 2,
        notifiedAt: 1466197805701,
        r: 14
      }, {
        orbit: 3,
        notifiedAt: 1466197442401,
        r: 13
      }, {
        orbit: 4,
        notifiedAt: 1466197898701,
        r: 12
      }, {
        orbit: 5,
        notifiedAt: 1466197897701,
        r: 11
      }];
      function modifyCard(card) {
        if (card.orbit > 5) {
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
        var x = (2 * orbit.radius * Math.cos(angle))/Math.sqrt((4 * Math.pow(Math.sin(angle),2)) + Math.pow(Math.cos(angle),2));
        var y = (2 * orbit.radius * Math.sin(angle))/Math.sqrt((4 * Math.pow(Math.sin(angle),2)) + Math.pow(Math.cos(angle),2));
        if (now < endTime || card.rendered == false) {
        card.x = x + xOffset;
        card.y = y + yOffset;
        card.rendered = true;
        } else {
          if (card.notifyFlag == false) {
            notifyMe("Take a look through your memoscope");
            card.notifyFlag = true;
          }
        }
      if(now >= endTime) {
      var x = 2 * orbit.radius;
      var y = 0;
      card.x = x + xOffset;
      card.y = y + yOffset;
      // console.log(card);
        if (notifications.indexOf(card.id) == -1) {
          notifications.push(card.id);
        }
        //TODO: Do something with set notifications to render notifications, increment a number.
        //NOTE: I don't remember what this TODO is referring to.
      }
      notification_count = notifications.length;

      }

      function move() {
        cards.forEach(function (card) {
          modifyCard(card);
        });
      }

      function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(logo,0.8 * xOffset,0,xOffset/2.5,yOffset/5);
        for (var orbit in orbits) {
          var b = orbits[orbit].radius;
          var a = 2 * b;
          ctx.beginPath();
          ctx.ellipse(xOffset, yOffset, a, b , 0 , 0, 2 * Math.PI);
          var time = orbits[orbit].time / 1000;
          var orbit_time;
          switch(time) {
              case 10:
                  orbit_time = "10 sec";
                  ctx.strokeStyle = '#1A0D9E';
                  break;
              case 30:
                  orbit_time = "30 sec";
                  ctx.strokeStyle = '#3B0D9E';
                  break;
              case 120:
                  orbit_time = "2 min";
                  ctx.strokeStyle = '#4F0D9E';
                  break;
              case 600:
                  orbit_time = "10 min";
                  ctx.strokeStyle = '#5E0D9E';
                  break;
              default:
                  orbit_time = "1 hour";
                  ctx.strokeStyle = '#700D9E';
          }
          ctx.stroke();
          ctx.font = "1.25em Herculanum";
          ctx.fillText(orbit_time, xOffset + (a / 3), (yOffset +  b ));
          ctx.font = "1.25em Herculanum";
          ctx.fillText(orbit_time, xOffset - (a / 3), (yOffset -  b ));
        }
        cards.forEach(function (card) {
          ctx.beginPath();
          ctx.fillStyle = "rgb(69,113,181)";
          ctx.shadowColor = "black";
          ctx.arc(card.x, card.y, card.r, 0, 2 * Math.PI, true);
          ctx.fill();
          ctx.beginPath();
          ctx.fillStyle = "rgb(255,255,255)";
          ctx.shadowColor = "white";
          ctx.shadowOffsetX = (card.r / 3) ;
          ctx.shadowOffsetY = (card.r / 3) ;
          ctx.shadowBlur = card.r * 2;
          ctx.arc(card.x - (card.r / 2.5), card.y - (card.r / 2.5) , (card.r/3), 0, 2 * Math.PI, true);
          ctx.fill();
        });
        ctx.beginPath();
        ctx.fillStyle = "rgb(253,184,19)";
        ctx.arc(sun.x, sun.y, sun.r, 0, 2 * Math.PI, true);
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = "rgb(255,255,255)";
        ctx.arc(sun.x - (sun.r / 2.5), sun.y - (sun.r / 2.5) , (sun.r/3), 0, 2 * Math.PI, true);
        ctx.fill();
      }

      (function update() {
        
        move();
        draw();
        $(".notification_count").text(Math.floor(notification_count));
        requestAnimationFrame(update);
      }());
    }

    resizeCanvas();

  });
});

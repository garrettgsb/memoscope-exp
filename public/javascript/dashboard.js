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

  $('.menu-item').each(function(i,e){
    $(e).on('click', function(event){

      // Links logic:
      $('.menu-item a').removeClass('active-nav-link');

      // Modal logic:
      event.preventDefault();
      var toggleOff = false;
      var modalId = $('a', this).attr('href');
      if($(modalId).is('.shown')) {
        toggleOff = true;
      }

      // Hide any visible modals
      $('.modal').removeClass('shown');
      $('.overlay').removeClass('shown');
      $('body').removeClass('modal-open');

      // Only show the target modal if it's not already visible
      // (i.e. If it's visible, leave it off)
      if (toggleOff == false) {
        $('a', this).addClass('active-nav-link');
        $(modalId).addClass('shown');
        $('.overlay').addClass('shown');
        $('body').addClass('modal-open');
      }
    });
  });

  // All timer/visualization/notification related code
  // should be placed inside of this getJSON request.
  $.getJSON("/cards/all", function(cardData){
    console.log("Visualization script initialized.");

    var notifications = [];
    var notification_count = 0;

    $('.notificationButton').on('click', function(){
      function displayNotification(){
        var foundCard;
          cards.forEach(function(card){
            if (card.id == notifications[0]) {
              foundCard = card;
              // Render card text/HTML and create buttons
              $(".notification_display")
                .html("<p id='notificationContent'>" + foundCard.content_html + "</p>")
                .after(`<div class="modal-buttons"><div style="position: relative">
                  <div style="position: abolute; bottom: 0; left: 0;">
                  <svg class="highlight-bar" height="30" width="106">
                    <circle class="highlighter-red" cx="12" cy="12" r="12"></circle>
                    <circle class="highlighter-blue" cx="40" cy="12" r="12"></circle>
                    <circle class="highlighter-green" cx="68" cy="12" r="12"></circle>
                    <circle class="highlighter-yellow" cx="94" cy="12" r="12"></circle>
                  </svg>
                  </div>
                  <div class='button is-success is-pulled-right remembered'>Remembered!</div>
                  <div class='button is-danger is-pulled-right forgot'>Forgot.</div>
                  </div></div>
                  `);

              function hideColor(color){
              // NOTE: This makes the highlighted words disappear.
                $("#notificationContent span").each(function(i,e){
                  if ($(e).hasClass(`highlighter-${color}`)) {
                    $(e).addClass(`highlighter-${color}-hidden`);
                  }
                });
              };

              hideColor('red');
              hideColor('blue');
              hideColor('green');
              hideColor('yellow');

              function toggleColor(color){
                $(`.highlighter-${color}`).on('click', function(){
                  $("#notificationContent span").each(function(i,e){
                    if ($(e).hasClass(`highlighter-${color}`)) {
                      $(e).toggleClass(`highlighter-${color}-hidden`);
                    }
                  });
                })
              }
              toggleColor('red');
              toggleColor('blue');
              toggleColor('green');
              toggleColor('yellow');

              // $(".highlight-bar").each(function(i,e){
              //   $(e).on('click', function() {
              //     console.log(this)
              //     if ($(e).hasClass(`highlighter-red`)) {
              //       $("#notificationContent span").each(function(x,y){
              //         if ($(y).hasClass(`highlighter-red`)) {
              //           $(y).toggleClass(`highlighter-red-hidden`);
              //         }
              //       });
              //     }
              //   });
              // }); // .highlight-bar

              // - TODO: Write updated data to database
              function notificationFinish(){
                card.notifiedAt = Date.now();
                card.notifyFlag = false;
                $(".modal-buttons").remove();
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
      cards.push(cardFormatted);
    });

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
          time: 2 * 60 * 1000
        },

        3: {
          radius: 120,
          time: 60 * 60 * 1000
        },

        4: {
          radius: 150,
          time: 24 * 60 * 60 * 1000
        },

        5: {
          radius: 180,
          time: 7 * 24 * 60 * 60 * 1000
        }
      };

      var sun = {
        x: xOffset,
        y: yOffset,
        r: 20
      };

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
        // ctx.drawImage(logo,0.75 * xOffset,0,xOffset/2,yOffset/4.5);
        ctx.font = "4.5em sans-serif";
        ctx.fillText('memoscope', 0.75 * xOffset,0.16 * yOffset);
        for (var orbit in orbits) {
          var b = orbits[orbit].radius;
          var a = 2 * b;
          ctx.beginPath();
          ctx.ellipse(xOffset, yOffset, a, b , 0 , 0, 2 * Math.PI);
          var time = orbits[orbit].time / 10000;
          var orbit_time;
          switch(time) {
              case 1:
                  orbit_time = "10 sec";
                  break;
              case 12:
                  orbit_time = "2 min";
                  break;
              case 360:
                  orbit_time = "1 hour";
                  break;
              case 8640:
                  orbit_time = "1 day";
                  break;
              default:
                  orbit_time = "7 days";
          }
          ctx.strokeStyle = '#EDB200';
          ctx.stroke();
          ctx.font = "1.25em sans-serif";
          ctx.fillText(orbit_time, xOffset + (a / 3), (yOffset +  b ));
          ctx.font = "1.25em sans-serif";
          ctx.fillText(orbit_time, xOffset - (a / 3), (yOffset -  b ));
        }
        cards.forEach(function (card) {
          ctx.beginPath();
          ctx.fillStyle = "rgb(4,204,36)";
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

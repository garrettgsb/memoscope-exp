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

var inputText;
var selection;
var cc_element;
var cc_text;
var rangeSet;
var answer;


$(document).ready(function(){
  var canvas = document.getElementById('visualization');



//----------------
//  MENU ITEM CONTROLS
//----------------
  //TODO: Refactor this whole thing. It's not very DRY.
  $('.menu-item').each(function(i,e){
    $(e).on('click', function(event){

      // Links logic:
      $('.menu-item a').removeClass('active-nav-link');
      $('.menu-item a').addClass('inactive-nav-link');

      // Modal logic:
      event.preventDefault();
      var toggleOff = false;
      var modalId = $('a', this).attr('href');
      if($(modalId).is('.shown')) {
        toggleOff = true;
      }

      // Clear any other previously active stuff
      $('.modal').removeClass('shown');
      $('.overlay').removeClass('shown');
      $('body').removeClass('modal-open');

      // Only show the target modal if it's not already visible
      // (i.e. If it's visible, leave it off)
      if (toggleOff == false) {
        $('a', this).addClass('active-nav-link');
        $('a', this).removeClass('inactive-nav-link');
        $(modalId).addClass('shown');
        $('.overlay').addClass('shown').on('click', function(){
          $(".shown").removeClass('shown');
          $('.menu-item a').removeClass('active-nav-link inactive-nav-link')
          $('body').removeClass('modal-open');
        });
        $('body').addClass('modal-open');
      }
    });
  });

  //----------------
  //  NEW CARD CONTROLS
  //----------------

  function removeClickers(){
    $(".highlighter-red").off('mousedown')
    $(".highlighter-blue").off('mousedown')
    $(".highlighter-green").off('mousedown')
    $(".highlighter-yellow").off('mousedown')
  }

  $("#edit-card-link").on('click', function(){
    removeClickers();
    $("#new-card-finish").removeClass('active-tab');
    $("#new-card-highlight").removeClass('active-tab');
    $("#new-card-edit").addClass('active-tab');

  });

  $("#highlight-card-link").on('click', function(e){
    rangeSet = [];
    $("#new-card-edit").removeClass('active-tab');
    $("#new-card-finish").removeClass('active-tab');
    $("#new-card-highlight").addClass('active-tab');
    // NOTE: This line interpolates HTML into the user's input text.
    // If the highlighter starts bugging out, this could be a good
    // place to start troubleshooting.
    inputText = $("#newCard").val().replace(/\n/g, "<br />")
    $("#cardHighlight").html(inputText);

    selection = window.getSelection();
    cc_element = $("#cardHighlight");
    cc_text = cc_element.text();
    rangeSet = [[0, cc_text.length, null]]; // overwrite old highlight rules, if any
    answer = [];

    // Event handlers for SVG clickers
    $(".highlighter-red").on('mousedown', function() {
      updateHighlight("highlighter-red");
      inputText = $("#cardHighlight").html();
    });
    $(".highlighter-blue").on('mousedown', function() {
      updateHighlight("highlighter-blue");
      inputText = $("#cardHighlight").html();
    });
    $(".highlighter-green").on('mousedown', function() {
      updateHighlight("highlighter-green");
      inputText = $("#cardHighlight").html();
    });
    $(".highlighter-yellow").on('mousedown', function() {
      updateHighlight("highlighter-yellow");
      inputText = $("#cardHighlight").html();
    });
  });

  $("#finish-card-link").on('click', function(){
    removeClickers();
    console.log(inputText);
    $("#cardFinish").html(inputText);
    $("#new-card-edit").removeClass('active-tab');
    $("#new-card-highlight").removeClass('active-tab');
    $("#new-card-finish").addClass('active-tab');
  });

  $(".activate-card").on('click', function(){
    console.log("Strictly decorative.")
    if ($(".activate-card h1 span").hasClass('is-success') == true) {
      $(".activate-card h1 span")
        .removeClass('is-success')
        .addClass('is-danger')
        .text("Not right now.")
    } else {
      $(".activate-card h1 span")
      .removeClass('is-danger')
      .addClass('is-success')
      .text("Yes please!")
    }
  })

//--------------------------------------------
// NOTE: HIGHLIGHTER ALGO DO NOT TOUCH
//--------------------------------------------
  function updateHighlight(color){
    // assume that we have the variable "selection" from some previous step
    //  (selection is from 'selection = window.getSelection()')
    // (color is from what button was clicked)
    function updateRangeSet(rangeSet, new_left, new_right, new_color){
      var answer = [];
      var pushedNew = false;
      rangeSet.forEach(function(old_range, idx){
        [old_left, old_right, old_color] = old_range;  // fancy destructuring, might not work in old browsers
        if (old_right < new_left || new_right < old_left){ // no overlap:  OONN or NNOO
          answer.push(old_range);
        } else if (new_left < old_left && old_right < new_right) { // old range is enveloped: N O O N
          // do nothing.  thank you, come again.
        } else if (new_left < old_left) { // must be N O N O
          if (!pushedNew){
            answer.push([new_left, new_right, new_color]);
            pushedNew = true;
          }
          answer.push([new_right, old_right, old_color]);
        } else { // must be ONNO or ONON
          if (old_right < new_right){ // must be ONON
            answer.push([old_left, new_left, old_color]);
            if (!pushedNew){
              answer.push([new_left, new_right, new_color]);
              pushedNew = true;
            }
          } else { // at long ast, must be ONNO
            answer.push([old_left, new_left, old_color]);
            if (!pushedNew){
              answer.push([new_left, new_right, new_color]);
              pushedNew = true;
            }
            answer.push([new_right, old_right, old_color]);
          }
        }
      }) // end forEach
      return answer;
    }

    function getTrueOffset(parentish, child_node, child_offset){
      if (parentish.childNodes.length == 1 && parentish.childNodes[0] == child_node){
        return child_offset;
      } else {
        var foundIt = false;
        var preceeding = Array.from(parentish.childNodes).reduce(function(previousValue, currentValue, currentIndex){
          if (foundIt){
            return previousValue;
          } else if (currentValue == child_node.parentNode) {
            foundIt = true;
            return previousValue;
          } else {
            var currLen = $(currentValue).text().length;

            return previousValue + currLen;
          }
        }, 0);

        return preceeding + child_offset;
      }
    }

    var trueAnchorOffset = getTrueOffset(cc_element[0], selection.anchorNode, selection.anchorOffset);
    var trueFocusOffset = getTrueOffset(cc_element[0], selection.focusNode, selection.focusOffset);
    var left = Math.min(trueAnchorOffset, trueFocusOffset);
    var right = Math.max(trueAnchorOffset, trueFocusOffset);

    rangeSet = updateRangeSet(rangeSet, left, right, color);  // look, our color parameter gets used!

    // This is where we render our highlit text.
    cc_element.html(rangeSet.map(function(range){
      var text_fragment = cc_text.substr(range[0], range[1]-range[0]);
      var newclass = range[2] || "";
      return "<span class='chunk " + newclass + "'>" + text_fragment + "</span>";
    }).join(''));
  }
//--------------------------------------------
// NOTE: END HIGHLIGHTER ALGO YOU CAN TOUCH AGAIN
//--------------------------------------------



  //----------------
  //  TIMER/VISUALIZATION/NOTIFICATION CONTROLS
  //----------------
    // All timer/visualization/notification related code
    // should be placed inside of this getJSON request.
    // They're pretty tangled up in there.
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
                  <div style="position: absolute; bottom: 0; left: 0;">
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
      console.log(card)
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

      var fps = 30;
      var fpsNow;
      var fpsThen = Date.now();
      var fpsInterval = 1000/fps;
      var fpsDelta;
      (function update() {
        fpsNow = Date.now();
        fpsDelta = fpsNow - fpsThen;
        if (fpsDelta > fpsInterval) {
          move();
          draw();
          $(".notification_count").text(Math.floor(notification_count));
        }
        requestAnimationFrame(update);

      }());
    }

    resizeCanvas();

  });
});

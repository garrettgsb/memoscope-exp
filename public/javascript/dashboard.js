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
var cards = [];

function manageCards(cards) {
  $(cards).each(function(i, card){
    console.log(card.id)
    // Append card to .manage-cards class, I guess.
    // Give it a class .card-manage, I guess.
    // Probably add some buttons to the end of that guy
    // $(".manage-cards")
  })
}

function getCards() {
  cards.length = 0;
  $.getJSON("/cards/all", function(cardData){
    console.log("Fetching cards. Array should be empty.");
    console.log(cards);
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
    console.log("Fetched cards. Array should be full.");
    console.log(cards);
  });
}

$(document).ready(function(){
  ////////////////////////////////////////////////////
  //REMOVE CARD functionality
  //these codes below are part of amnage cards and will handle card removal from the orbit and 
  //ajax calss to delete the card from the database
  $('.footer-button').on('click', function(e){
    e.stopPropagation();
    // alert($(this).getAttribute("data-id"));
    cardId = $(this).data("id");

    $.ajax({
      type: "DELETE",
      url: '/cards/delete/' + cardId,
      data: cardId,
      success: function(data){
      }
    });
    deleteCard($(this).parent().parent().parent());
  });

  function deleteCard(card){
    $(card).delay(50).fadeOut(600);
    $(card).animate({
      "opacity" : "0",
      },{
      "complete" : function() {
        $(card).remove();
      }
    });
  }
  //////////////////////////////////////////
  //HTML notifications
  function generateNotification(message) {
    var options = {
      body: message,
      icon: "http://www.marismith.com/wp-content/uploads/2013/07/One-Thing-Remember-Shutterstock.jpg",
    }
    var n = new Notification('Memoscope', options);
    setTimeout(n.close.bind(n), 10000);
  }


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
  ////////////////////////////////////////

  var canvas = document.getElementById('visualization');

//----------------
//  TOGGLE TO MAIN MENU
//----------------
  function defaultScreen(){
    //rendering default ashboard with no effects.
    $('body').removeClass('modal-open');
    $(".shown").removeClass('shown');
  };


//----------------
//  MENU ITEM CONTROLS
//----------------
  //TODO: Refactor this whole thing. It's not very DRY.
  $('.menu-item').each(function(i,e){
    $(e).on('click', function(event){

      //Check to see if user clicked on notifications menue when there was no notifications
      var checkMenuItem = $(this).text().includes("NOTIFICATION");
      var checkNotificationEmpty = $(this).text().includes("0");

      //If notificaios are emoty it is menu doesn't pop up
      if (checkMenuItem && checkNotificationEmpty ){
        defaultScreen();
      } else {
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

  $(".edit-card-link").on('click', function(){
    removeClickers();
    $("#new-card-finish").removeClass('active-tab');
    $("#new-card-highlight").removeClass('active-tab');
    $("#new-card-edit").addClass('active-tab');

  });

  $(".highlight-card-link").on('click', function(e){
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

  console.log("I WILL NOW ADD A HANDLER TO FINISH CARD LINK");
  $(".finish-card-link").on('click', function(){
    removeClickers();
    $("#cardFinish").html(inputText);
    $("#new-card-edit").removeClass('active-tab');
    $("#new-card-highlight").removeClass('active-tab');
    $("#new-card-finish").addClass('active-tab');

    // POST NEW CARD TO DATABASE
    function sendNewCard() {
      //TODO: When multiple users are a thing,
      //      include UserId in the JSON.
      console.log("Sending off.");
      var cardContent = $("#cardFinish").html();
      var deck = $("select").val();
      var returnVal = JSON.stringify({
        content_html: cardContent,
        deck: deck,
        user_id: 1 //TODO: Replace with actual session ID... Or delete, depending on how we implement it.
      });
      $.ajax({
        type: 'post',
        data: returnVal,
        url: '/cards/create',
        contentType: 'application/json',
        dataType: 'json',
        success: function(data){
          console.log("sendNewCard AJAX reports success");
        },
        error: function(jqXHR, errTxt, errObj){
          console.log("sendNewCard AJAX reports ERROR ERROR ERROR WILL ROBINSON ERRRROOOORRRRRR: " + errTxt);
        }
      });
      console.log(returnVal);
    }

    $("#submit-button").on('click', function(){
      console.log("Clicked submit button");
      sendNewCard();
      // getCards();
      // defaultScreen();
    });
  });

  $("#add-new-deck").on('click', function(){
    if ($("#add-deck-name").val()) {
      console.log(`Clicked with ${$("#add-deck-name")}`);
      var newDeckName = $("#add-deck-name").val();
      console.log(newDeckName);
      $("select").append(`<option>${newDeckName}</option>`);
      $("select").val(newDeckName);
    };
  })

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
                if (notifications.length == 0) {
                  defaultScreen();
                } else {
                  displayNotification();
                }

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
      var yOffsetDesired = canvas.height -  (yOffset / 2);

      var logo = new Image();
      logo.src = 'images/logo-white.png';

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
          time: 60 * 10 * 1000
        },

        4: {
          radius: 150,
          time: 60 * 30 * 1000
        },

        5: {
          radius: 180,
          time: 2 * 60 * 60 * 1000
        }
      };

      var sun = {
        x: xOffset,
        y: yOffset,
        r: 30
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
        var x = (2.5 * orbit.radius * Math.cos(angle))/Math.sqrt((6.25 * Math.pow(Math.sin(angle),2)) + Math.pow(Math.cos(angle),2));
        var y = (2.5 * orbit.radius * Math.sin(angle))/Math.sqrt((6.25 * Math.pow(Math.sin(angle),2)) + Math.pow(Math.cos(angle),2));
        x = 2.5 * orbit.radius * Math.cos(angle);
        y = orbit.radius * Math.sin(angle);
        if (now < endTime || card.rendered == false) {
        card.x = x + xOffset;
        card.y = y + yOffsetDesired;
        card.rendered = true;
        } else {
          if (card.notifyFlag == false) {
            notifyMe("Take a look through your memoscope");
            card.notifyFlag = true;
          }
        }
      if(now >= endTime) {
      var x = 2.5 * orbit.radius;
      var y = 0;
      card.x = x + xOffset;
      card.y = y + yOffsetDesired;
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
        // ctx.font = "3.5em sans-serif";
        // ctx.textAlign = "center";
        // ctx.fillText('MEMOSCOPE',xOffset, 0.125 * yOffset);
        ctx.drawImage(logo,xOffset - (canvas.width/8),0.1* yOffset,canvas.width/4,canvas.width/20);
        // ctx.drawImage(logo,0,0,300,300);
        for (var orbit in orbits) {
          var b = orbits[orbit].radius;
          var a = 2.5 * b;
          ctx.beginPath();
          ctx.ellipse(xOffset, yOffsetDesired, a, b , 0 , 0, 2 * Math.PI);
          var time = orbits[orbit].time / 10000;
          var orbit_time;
          switch(time) {
              case 1:
                  orbit_time = "10 SEC";
                  break;
              case 12:
                  orbit_time = "2 MIN";
                  break;
              case 360:
                  orbit_time = "10 MIN";
                  break;
              case 8640:
                  orbit_time = "30 MIN";
                  break;
              default:
                  orbit_time = "";
          }
          ctx.strokeStyle = '#E5CCFF';
          ctx.stroke();
          ctx.font = "1.125em sans-serif";
          ctx.fillStyle = 'white';
          ctx.fillText(orbit_time, xOffset + (a * 0.500) , yOffsetDesired + (0.866 * b) );
        }
        cards.forEach(function (card) {
          ctx.beginPath();
          ctx.fillStyle = "rgb(0,0,255)";
          ctx.shadowColor = "white";
          ctx.arc(card.x, card.y, card.r, 0, 2 * Math.PI, true);
          ctx.fill();
          ctx.beginPath();
          ctx.fillStyle = "rgb(255,255,255)";
          ctx.shadowColor = "white";
          ctx.shadowOffsetX = (card.r / 3) ;
          ctx.shadowOffsetY = (card.r / 3) ;
          ctx.shadowBlur = 1.25 * card.r;
          ctx.arc(card.x - (card.r / 2.5), card.y - (card.r / 2.5) , (card.r/3), 0, 2 * Math.PI, true);
          ctx.fill();
        });
        ctx.beginPath();
        ctx.fillStyle = "rgb(253,184,19)";
        ctx.arc(xOffset, yOffsetDesired, sun.r, 0, 2 * Math.PI, true);
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = "rgb(255,255,255)";
        ctx.arc(xOffset- (sun.r / 2.5), yOffsetDesired - (sun.r / 2.5) , (sun.r/3), 0, 2 * Math.PI, true);
        ctx.fill();
      }

      (function update() {
          move();
          draw();
          $(".notification_count").text(Math.floor(notification_count));
        // }
        setTimeout(update, 500);
      }());
    }

    resizeCanvas();

  });
});

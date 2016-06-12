$(document).ready(function() {
  var $aquarium = $(".aquarium");
  $aquarium.append($(bubbleGenerate()));
  $aquarium.append($(bubbleGenerate()));
  $aquarium.append($(bubbleGenerate()));
  $aquarium.append($(bubbleGenerate()));
  $aquarium.append($(bubbleGenerate()));
  $aquarium.append($(bubbleGenerate()));
  setInterval(function(){
    $aquarium.append($(bubbleGenerate()));
    $aquarium.append($(bubbleGenerate()));
    $aquarium.append($(bubbleGenerate()));
    $aquarium.append($(bubbleGenerate()));
    $aquarium.append($(bubbleGenerate()));
    $aquarium.append($(bubbleGenerate()));
    $aquarium.append($(bubbleGenerate()));
    $aquarium.append($(bubbleGenerate()));
    $aquarium.append($(bubbleGenerate()));
    $aquarium.append($(bubbleGenerate()));
    $aquarium.append($(bubbleGenerate()));
    $aquarium.append($(bubbleGenerate()));


    $('.bubble').each(function(i,e) {$(e).animate({marginTop: -40}, $(e).data("riseSpeed"), function(){
      if (parseInt($(e).css("margin-top")) < 1) {
        $(e).remove();
        console.log("Bubble popped.");
      }
    });
    })


  }, 8000);

  var $bottom = $(".footer");
  var $bubble = "<div class='bubble'></div>";
  $bottom.before($bubble);

  var nextId = 0;

  function bubbleGenerate() {
      var diameter = Math.random() * (40-5) + 5;
      var fillColor = "rgba(40,80," + Math.round(240-(diameter*3)) + "," + (5 / diameter);
      bubble = document.createElement("div");
      $(bubble).attr('class', 'bubble');

      //Random diameter between 5 and 30 px
      //Rise speed (and soon, color) is based on diameter

      var horiz = Math.random() * (($(document).width()) - (diameter*2)) + diameter;
      $(bubble).data("riseSpeed", (diameter * 2000));
      $(bubble).css({height: diameter, width: diameter, marginTop: $(window).height() + 50, marginLeft: horiz, borderColor: fillColor});
      console.log("Bubble created.")
      return bubble;
  }

  });

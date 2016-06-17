$(document).ready(function(){
  console.log("Yea runnin yo");
  var cards = $(".content")
  cards.each(function(c){
    var text = $(this).text();
    $(this).html(text);
  });
  $(".dash-drop").on('click', function(){
    var content = $(this).children()[1]
    $(content).toggleClass("dash-hidden");
  });

  $("#trigger_notification").on("click", function(){
    console.log("Click");
    notifyMe("Woohoo!");
  })
});

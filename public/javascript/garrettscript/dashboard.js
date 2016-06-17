$(document).ready(function(){
  console.log("Yea runnin yo");
  var cards = $(".content")
  cards.each(function(c){
    var text = $(this).text();
    $(this).html(text);
  });

  // General version of specific function below
  // Should refactor to use this version if possible
  // $(".dash-display").on('click', function(){
  //   var content = $(this).children()[1]
  //   $(content).toggleClass("dash-hidden");
  // });

  $("#dash-new-card-link").on('click', function(){
    $("#dash-new-card-content").toggleClass("dash-hidden");
  })

  $("#trigger_notification").on("click", function(){
    console.log("Click");
    notifyMe("Woohoo!");
  })
});

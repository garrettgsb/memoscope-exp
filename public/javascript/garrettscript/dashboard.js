$(document).ready(function(){
  console.log("Yea runnin yo");
  var cards = $(".content")
  cards.each(function(c){
    var text = $(this).text();
    $(this).html(text);
  });
});
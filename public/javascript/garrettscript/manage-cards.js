// I don't know if I'm going to actually
// run this script or not... But it's
// nice to write in a clean file.

$(document).ready(function(){
  console.log(`Loaded manage-cards.js`);
  function listCards(cards) {
    $('.cards').each(function(i, card){
      console.log(card.id)
      // $(".manage-cards")
    })
  }
});

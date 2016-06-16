$(document).ready(function(){

  function sendToServer(id,name) { 
    $.post('/decks/new',{user_id: id,deck_name: name},function(res){
      alert('deck: ' + res.deck_name + 'was added for user: ' + res.user_id)
    },"json");
  }
  
  $( "#deck-create" ).on('click',function(event) {
    event.preventDefault();
    var name = $("#deck-name-field").val();
    var id = $(".user_id").val();
    sendToServer(id,name)
  });

});


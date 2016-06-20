$(document).ready(function(){

  function sendToServer(id,name) { 
    $.post('/decks/new',{user_id: id,deck_name: name},function(res){
      alert('deck: ' + res.deck_name + 'was added for user: ' + res.user_id)
    },"json");
  }
  
  $( "#deck-create" ).on('click',function(event) {
    notifyMe();
    event.preventDefault();
    // var name = $("#deck-name-field").val();
    // var id = $(".user_id").val();
    // sendToServer(id,name)
  });

  function generateNotification(message) {
    var options = {
      body: message,
      icon: "http://www.marismith.com/wp-content/uploads/2013/07/One-Thing-Remember-Shutterstock.jpg",
    }
    var n = new Notification('Memoscope', options);
    setTimeout(n.close.bind(n), 10000);
  }




  function notifyMe() {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    }else if (Notification.permission === "granted") {
      generateNotification("Your cards need attention");
    }else if (Notification.permission !== 'denied') {
      Notification.requestPermission(function (permission) {
        if (permission === "granted") {
          generateNotification("Your cards need attention");
        }
      });
    }
  };
  // }Notification.requestPermission().then(function(result) {
  //   console.log(result);
  // });function spawnNotification(theBody,theIcon,theTitle) {
  //   var options = {
  //       body: theBody,
  //       icon: theIcon
  //   }
  //   var n = new Notification(theTitle,options);
  // }

});


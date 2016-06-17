$(function(){

	$(".columns .card-header-icon").on('click', function(){
		var thisCard = $(this).parent().parent().parent();
		deleteCard(thisCard);
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

	$('.card').on('click', function(){
		$('.modal').toggleClass('is-active');
	});
	$('.modal-close').on('click', function(){
		$('.modal').removeClass('is-active');
	});
	$('.modal-background').on('click', function(){
		$('.modal').removeClass('is-active');
	});
});


window.onload = function onLoad() {
    var circle = new ProgressBar.Circle('#progress', {
        color: 'red',
        strokeWidth: 4,
        duration: 0,//5000,
        easing: 'easeInOut'
    });
    var mediumCircle = new ProgressBar.Circle('#progress2', {
        color: 'orange',
        strokeWidth: 4,
        duration: 0,//30000,
        easing: 'easeInOut'
    });
    var smallCircle = new ProgressBar.Circle('#progress3', {
        color: 'green',
        strokeWidth: 4,
        duration: 0,//60000,
        easing: 'easeInOut'
    });
    var centerCircle = new ProgressBar.Circle('#progress4', {
        color: 'purple',
        strokeWidth: 50,
        duration: 0,//60000,
        easing: 'easeInOut'
    });

    centerCircle.animate(1);
    smallCircle.animate(1);
    mediumCircle.animate(1);
    circle.animate(1);
};

// Notification Functions

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

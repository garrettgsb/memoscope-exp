$(function(){

	// $(".columns .card-header-icon").on('click', function(){
	// 	var thisCard = $(this).parent().parent().parent();
	// 	deleteCard(thisCard);
	// });

 //  $('.footer-button').on('click', function(e){
 //    e.stopPropagation();
 //    // alert($(this).getAttribute("data-id"));
 //    cardId = $(this).data("id");
 //    $.ajax({
 //      type: "DELETE",
 //      url: '/cards/delete/' + cardId,
 //      data: cardId,
 //      success: function(data){
 //      }
 //    }).then(function(){
 //      deleteCard($(this).parent().parent().parent());
 //    });
 //  });

	// function deleteCard(card){
	// 	$(card).delay(50).fadeOut(600);
 //    $(card).animate({
 //      "opacity" : "0",
 //      },{
 //      "complete" : function() {
 //        $(card).remove();
 //      }
 //  	});
	// }

// 	$('.card').on('click', function(){
// 		$('.modal').toggleClass('is-active');
// 	});
// 	$('.modal-close').on('click', function(){
// 		$('.modal').removeClass('is-active');
// 	});
// 	$('.modal-background').on('click', function(){
// 		$('.modal').removeClass('is-active');
// 	});

//     //Dropdown Decklist
//     $('.is-tab').on('click',function(){
//         $('ul > li').removeClass('is-active');
//       $(this).addClass('is-active');
//     });

//     $('.tabs .is-tab').on('click', function(){
//         if($('#view').hasClass('is-active')){
//             $(this).parent().parent().parent().addClass('view');
//         }else{
//             $(this).parent().parent().parent().removeClass('view');
//         }
//     });

//     $('.tabs .is-tab').on('click', function(){
//         if($('#edit').hasClass('is-active')){
//             $('#overlay').show();
//             $('.content').attr('contenteditable', 'true');
//             $('#highlighter').css({display: "inline-block"});
//         }else{
//             $('#overlay').hide();
//             $('.content').attr('contenteditable', 'false');
//             $('#highlighter').css({display: "none"});
//         }
//     });

//     $('.card-header').on('click', function(){
//         $('.dropdown-content').toggleClass('show');
//     });

//     $('.dropdown-content li').on('click', function(){
//         $('.dropdown-content').removeClass('show');
//       console.log(  $('card-header-title').text());
//       $('.card-header-title').html($(this).html());
//     });

// });

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

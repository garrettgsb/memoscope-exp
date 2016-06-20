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

    //Dropdown Decklist
    $('.is-tab').on('click',function(){
        $('ul > li').removeClass('is-active');
      $(this).addClass('is-active');
    });

    $('.tabs .is-tab').on('click', function(){
        if($('#view').hasClass('is-active')){
            $(this).parent().parent().parent().addClass('view');
        }else{
            $(this).parent().parent().parent().removeClass('view');
        }
    });

    $('.tabs .is-tab').on('click', function(){
        if($('#edit').hasClass('is-active')){
            $('#overlay').show();
            $('.content').attr('contenteditable', 'true');
            $('#highlighter').css({display: "inline-block"});
        }else{
            $('#overlay').hide();
            $('.content').attr('contenteditable', 'false');
            $('#highlighter').css({display: "none"});
        }
    });

    $('.card-header').on('click', function(){
        $('.dropdown-content').toggleClass('show');
    });

    $('.dropdown-content li').on('click', function(){
        $('.dropdown-content').removeClass('show');
      console.log(  $('card-header-title').text());
      $('.card-header-title').html($(this).html());
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
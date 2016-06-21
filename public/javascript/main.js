$(function(){

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

	// $('.card').on('click', function(){
	// 	$('.modal').toggleClass('is-active');
	// });
	// $('.modal-close').on('click', function(){
	// 	$('.modal').removeClass('is-active');
	// });
	// $('.modal-background').on('click', function(){
	// 	$('.modal').removeClass('is-active');
	// });

    //Dropdown Decklist
    $('.is-tab').on('click',function(){
        $(this).siblings('ul > li').removeClass('is-active');
        $(this).addClass('is-active');
    });

    $('.tabs .is-tab').on('click', function(){
        if($('.view').hasClass('is-active')){
            $(this).parent().parent().parent().addClass('view');
        }else{
            $(this).parent().parent().parent().removeClass('view');
        }
    });

    $('.is-tab').on('click', function(){
        if($('.edit').hasClass('is-active')){
            $('#overlay').show();
            $(this).parents('.tabs').siblings('.card-content').children().attr('contenteditable', 'true');
            console.log("this: ", $(this), " parents.find: ", $(this).parents('.tabs').next('.card-content .content'));
            $(this).closest('.card.is-6').css( "z-index", 6);
            // $(this).parent().children('.highlighter').css({display: "inline-block"});
        }else{
            $('#overlay').hide();
            $(this).closest('.card.is-6').css( "z-index", 3);
            $('.card-content .content').attr('contenteditable', 'false');
            // $('.highlighter').css({display: "none"});
        }
    });

    $('.card-header').on('click', function(e){
        $(this).focus();
        console.log("this: ", $(this), " parent: ", $(this).parent().find('.dropdownlist .dropdown-content'));
        $(this).parent().find('.dropdownlist .dropdown-content')
        .toggleClass('show');
    });

    $('.dropdown-content li').on('click', function(){
        $('.dropdown-content').removeClass('show');
        console.log('dropdown title: ', $(this).parent('.dropdownlist').siblings('.card-header .card-header-title').html($(this).html()));
    });


    $('.card-header').blur(function() {
        console.log('dog');
        $('.dropdown-content').removeClass('show');
    }); 

    $('#overlay').on('click', function(){
        $(this).hide();
        $('.edit').removeClass('is-active');
        $('.card-content .content').attr('contenteditable', 'false');
        $('.view').addClass('is-active');
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
$(function(){

	var $sliderContainer = $('.slider-container');

	$(".columns .card-header-icon").on('click', function(){
		var thisCard = $(this).parent().parent().parent();
		deleteCard(thisCard);
	});

	function deleteCard(card){
		$(card).delay(100).fadeOut(1000);
    $(card).animate({
      "opacity" : "0",
      },{
      "complete" : function() {
        $(card).remove();
      }
  	});
	}
	$('.slick-center').focus();

	$('.slider-container .card-header-icon').on('click', function() {
		var slideIndex = $(".slider-container").slick("slickCurrentSlide");
		var formattedSlide = $('[data-slick-index="'+ slideIndex + '"]');
		// console.log(slideIndex, formattedSlide);
		formattedSlide.delay(100).fadeOut(600);
    formattedSlide.animate({
      "opacity" : "0",
      },{
      "complete" : function() {
      	console.log($sliderContainer.slick("slickCurrentSlide"));
				// $('[data-slick-index="'+ (slideIndex + 1) + '"]').addClass('slick-center');
				$('[data-slick-index=' + slideIndex + ']').addClass('slick-center');
	  		// $('.slider-container').slick('slickRemove', formattedSlide);
	  		$('.slider-container').slick('slickRemove', slideIndex);
    var j = 0;
    $(".slick-slide").each(function(){
       $(this).attr("data-slick-index",j);
       j++;
     });
	  	}
  	});
	});

	$sliderContainer.on('afterChange', function onSlideChange(slick, currentSlide, slideIndex)
	{
		console.log('Changed to', currentSlide, slideIndex);
	});

	// $('.slider-container').on("destroy", function(event, slick){
	// 	console.log("hello world", arguments);
	// });

	$(window).on('scroll', function(){
		if ($(this).scrollTop() > $("#section1").offset().top - 60){
			$(".nav-circle").addClass("unselected");
			$('.section1').removeClass("unselected");
		}
		if ($(this).scrollTop() > $("#section2").offset().top - 60){
			$(".nav-circle").addClass("unselected");
			$('.section2').removeClass("unselected");
		}
		if ($(this).scrollTop() > $("#section3").offset().top - 60){
			$(".nav-circle").addClass("unselected");
			$('.section3').removeClass("unselected");
		}

	});
	  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top - 50
        }, 500);
        return false;
      }
    }
  });
	$('.card').on('click', function(){
		$('.modal').toggleClass('is-active');
	});
	$('.modal-close').on('click', function(){
		$('.modal').removeClass('is-active');
	});
	$('.modal-background').on('click', function(){
		$('.modal').removeClass('is-active');
	});

  $('.slider-container').slick({
	  centerMode: true,
	  centerPadding: '40px',
	  slidesToShow: 3,
	  infinite: false,
	  nextArrow: "<a class='button is-primary'>Next</a>",
	  prevArrow: "<a class='button is-primary'>Previous</a>",
	  responsive: [
	    {
	      breakpoint: 768,
	      settings: {
	        arrows: true,
	        centerMode: true,
	        centerPadding: '0px',
	        slidesToShow: 3
	      }
	    },
	    {
	      breakpoint: 480,
	      settings: {
	        arrows: true,
	        centerMode: true,
	        centerPadding: '0px',
	        slidesToShow: 1
	      }
	    }
	  ]
	});
});

$(function(){
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

	$('.slider-container .card-header-icon').on('click', function() {
		var slideIndex = $(this).parent().parent().parent().data("slick-index");
		console.log(slideIndex);
	  $('.slider-container').slick('slickRemove', slideIndex);
	});

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
	  centerPadding: '60px',
	  slidesToShow: 3,
	  responsive: [
	    {
	      breakpoint: 768,
	      settings: {
	        arrows: true,
	        centerMode: true,
	        centerPadding: '40px',
	        slidesToShow: 3
	      }
	    },
	    {
	      breakpoint: 480,
	      settings: {
	        arrows: false,
	        centerMode: true,
	        centerPadding: '40px',
	        slidesToShow: 1
	      }
	    }
	  ]
	});
	$('.slick-prev').on('click', function(){
		$('.slider-container').slickPrev();
	});
});

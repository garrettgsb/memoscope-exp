$(function(){

	//inititialize slider
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


  //Find out how to give div focus on pageload
	// $('.slick-center').focus();

	//Slide completion logic
	$('.slider-container .card-header-icon').on('click', function() {
		var slideIndex = $(".slider-container").slick("slickCurrentSlide");
		var formattedSlide = $('[data-slick-index="'+ slideIndex + '"]');
		formattedSlide.delay(100).fadeOut(600);
    formattedSlide.animate({
      "opacity" : "0",
      },{
      "complete" : function() {
      	console.log($sliderContainer.slick("slickCurrentSlide"));
				$('[data-slick-index=' + slideIndex + ']').addClass('slick-center');
	  		$('.slider-container').slick('slickRemove', slideIndex);
    var j = 0;
    $(".slick-slide").each(function(){
       $(this).attr("data-slick-index",j);
       j++;
     });
	  	}
  	});
	});
	//AfterChange Event
	// $sliderContainer.on('afterChange', function onSlideChange(slick, currentSlide, slideIndex)
	// {
	// 	console.log('Changed to', currentSlide, slideIndex);
	// });
});
// $(function(){

// 	var $sliderContainer = $('.slider-container');

// 	//inititialize slider
//   $('.slider-container').slick({
// 	  centerMode: true,
// 	  centerPadding: '40px',
// 	  slidesToShow: 3,
// 	  infinite: false,
// 	  nextArrow: "<a class='button is-primary next-arrow'>Next</a>",
// 	  prevArrow: "<a class='button is-primary prev-arrow'>Previous</a>",
// 	  responsive: [
// 	    {
// 	      breakpoint: 768,
// 	      settings: {
// 	        arrows: true,
// 	        centerMode: true,
// 	        centerPadding: '0px',
// 	        slidesToShow: 3
// 	      }
// 	    },
// 	    {
// 	      breakpoint: 480,
// 	      settings: {
// 	        arrows: true,
// 	        centerMode: true,
// 	        centerPadding: '0px',
// 	        slidesToShow: 1
// 	      }
// 	    }
// 	  ]
// 	});	
// 	$('.slick-arrow').click(function(){
// 		var slideIndex = $sliderContainer.slick("slickCurrentSlide");
// 		disableArrows(slideIndex);
// 	});


// 	function disableArrows(slideIndex){
// 		if(slideIndex == 0){
// 			$('prev-arrow').addClass('disabled');
// 		}else{
// 			$('prev-arrow').removeClass('disabled');
// 		}
// 		if(slideIndex == $('.slick-slide').length){
// 			$('next-arrow').addClass('disabled');
// 		}else{
// 			$('next-arrow').removeClass('disabled');
// 		}	
// 	}



//   //Find out how to give div focus on pageload
// 	// $('.slick-center').focus();

// 	//Slide completion logic
// 	$('.slider-container .card-header-icon').on('click', function() {
// 		var slideIndex = $sliderContainer.slick("slickCurrentSlide");
// 		var formattedSlide = $('[data-slick-index="'+ slideIndex + '"]');
// 		formattedSlide.delay(50).fadeOut(600);
//     formattedSlide.animate({
//       "opacity" : "0",
//       },{
//       "complete" : function() {
// 				$('[data-slick-index=' + slideIndex + ']').addClass('slick-center');
// 	  		$sliderContainer.slick('slickRemove', slideIndex);
// 		    var j = 0;
// 		    if ($(".slick-slide").length == 0){
// 		    	$('.hero-body .has-text-centered').append("<div class='title'>well done.</div>").hide().fadeIn(1400);
// 		    	//Load Counters here
// 		    }
// 		    $(".slick-slide").each(function(){
//        		$(this).attr("data-slick-index",j);
//        		j++;
//      		});
// 	  	}
//   	});
// 	});

// 	//AfterChange Event
// 	// $sliderContainer.on('afterChange', function onSlideChange(slick, currentSlide, slideIndex)
// 	// {
// 	// 	console.log('Changed to', currentSlide, slideIndex);
// 	// });
// });
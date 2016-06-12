$(function(){
	$(".card-header-icon").on('click', function(){
		$(this).parent().parent().hide();
	});
	$(window).on('scroll', function(){
		if ($(this).scrollTop() > $("#section1").offset().top){
			$(".nav-circle").addClass("unselected");
			$('.section1').removeClass("unselected");
		}
		if ($(this).scrollTop() > $("#section2").offset().top){
			$(".nav-circle").addClass("unselected");
			$('.section2').removeClass("unselected");
		}
		if ($(this).scrollTop() > $("#section3").offset().top){
			$(".nav-circle").addClass("unselected");
			$('.section3').removeClass("unselected");
		}

	});
});

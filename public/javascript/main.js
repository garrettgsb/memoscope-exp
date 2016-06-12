$(function(){
	$(".card-header-icon").on('click', function(){
		$(this).parent().parent().remove();
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
});

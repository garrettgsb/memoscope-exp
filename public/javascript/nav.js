$(function(){
	$(".user-nav").hover(function(){
		$(".user-menu").css({
			"top": $(".nav").offset().top + $(".nav").outerHeight() -2,
			"right": 0,
			"display": "block"
		})
	}, function(){
			$(".user-menu").css({"display": "none"});
	});

	$(".user-menu").hover(function(){
		$(".user-menu").css({"display": "block"});
	}, function(){
		$(".user-menu").css({"display": "none"});
	});


	$(".deck-nav").hover(function(){
		$(".deck-menu").css({
			"top": $(".nav").offset().top + $(".nav").outerHeight() -2,
			"left": $(".deck-nav").offset().left,
			"display": "block"
		})
	}, function(){
			$(".deck-menu").css({"display": "none"});
	});

	$(".deck-menu").hover(function(){
		$(".deck-menu").css({"display": "block"});
	}, function(){
		$(".deck-menu").css({"display": "none"});
	});


	$(".card-nav").hover(function(){
		$(".card-menu").css({
			"top": $(".nav").offset().top + $(".nav").outerHeight() -2,
			"left": $(".card-nav").offset().left,
			"display": "block"
		})
	}, function(){
			$(".card-menu").css({"display": "none"});
	});

	$(".card-menu").hover(function(){
		$(".card-menu").css({"display": "block"});
	}, function(){
		$(".card-menu").css({"display": "none"});
	});
});
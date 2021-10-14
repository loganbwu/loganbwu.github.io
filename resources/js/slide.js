(function($) {
	$.fn.visible = function() {
		var $t            = $(this),
		$w            = $(window),
		viewBottom    = $w.scrollTop() + $w.height(),
		elTop         = $t.offset().top
		
		return elTop <= viewBottom;
	};
})($);

var win = $(window);

var allMods = $("section");

var allH1 = $("h1");

allMods.each(function(i, el) {
	var el = $(el);
	if (el.visible()) { 
		el.addClass("already-visible"); 
	}
});

allH1.each(function(i, el) {
	var el = $(el); 
	if (el.visible()) {
		el.addClass("reveal"); 
		el.addClass("already-visible");
	}
	else {
		el.addClass("reveal-init");
	}
});

win.scroll(function(event) {
	
	allMods.each(function(i, el) {
		var el = $(el);
		if (el.visible()) {
			el.addClass("come-in"); 
		} 
	});
	
	allH1.each(function(i, el) {
		var el = $(el);
		if (el.visible()) {
			el.addClass("reveal"); 
		} 
	});
	
});	
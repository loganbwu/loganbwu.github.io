/*
Handle slide-in animation for sections and header 1s when actively scrolling.
*/

(function() {
	var elements;
	var windowHeight;
	elements = document.querySelectorAll('section, h1');
	
	function init() {
		windowHeight = window.innerHeight;
		
		for (var i = 0; i < elements.length; i++) {
			var element = elements[i];
			var positionFromTop = elements[i].getBoundingClientRect().top;
			
			if (positionFromTop - windowHeight <= 0) {
				element.classList.add('already-visible');
			}
			if (element.tagName == 'H1') {
				element.classList.add('reveal-init');
			}
		}
		checkPosition();
	}
	
	function onResize() {
		windowHeight = window.innerHeight;
		checkPosition();
	}
	
	function checkPosition() {
		for (var i = 0; i < elements.length; i++) {
			var element = elements[i];
			var positionFromTop = elements[i].getBoundingClientRect().top;
			
			if (positionFromTop - windowHeight <= 0) {
				if (element.tagName == 'SECTION') {
					element.classList.add('come-in');
				}
				else if (element.tagName == 'H1') {
					element.classList.add('reveal');
				}
			}
		}
	}
	
	window.addEventListener('scroll', checkPosition);
	window.addEventListener('resize', onResize);
	document.addEventListener('DOMContentLoaded', init);
})();

// jquery mobile settings on mobile init
$(document).on('mobileinit', function (e) {
	if (e) { e.preventDefault(); }
	$.support.cors = true;
	$.mobile.allowCrossDomainPages = true;
	$.mobile.pushStateEnabled = false;
	$.mobile.buttonMarkup.hoverDelay = 0; // (default: 300) (miliseconds)
	$.mobile.defaultPageTransition = 'none'; // (default: pop)
	$.mobile.defaultDialogTransition = 'none'; // (default: pop)
	$.event.special.swipe.scrollSupressionThreshold = 40;  // (default: 10) (pixels) – More than this horizontal displacement, and we will suppress scrolling.
	$.event.special.swipe.horizontalDistanceThreshold = 30; // (default: 30) (pixels) – Swipe horizontal displacement must 
	$.event.special.swipe.verticalDistanceThreshold = 40; // (default: 75) (pixels) – Swipe vertical displacement must be less than this.
	$.event.special.swipe.durationThreshold = 1000; // (default: 1000) (miliseconds) – More time than this, and it isn't a swipe.
	$.event.special.tap.tapholdThreshold = 750; // (default: 750) (miliseconds) - Duration before taphold fires.
});
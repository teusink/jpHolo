// jquery mobile settings on mobile init
$(document).on('mobileinit', function () {
	$.support.cors = true;
	$.mobile.allowCrossDomainPages = true;
	$.mobile.pushStateEnabled = false;
	$.mobile.buttonMarkup.hoverDelay = 0; // (default: 300) (milliseconds)
	$.mobile.defaultPageTransition = 'none'; // (default: pop)
	$.mobile.defaultDialogTransition = 'none'; // (default: pop)
	$.mobile.transitionFallbacks.slideout = 'none'; // (default: fade)
	$.event.special.swipe.scrollSupressionThreshold = (screen.availWidth) / 10;  // (default: 10) (pixels) – More than this horizontal displacement, and we will suppress scrolling.
	$.event.special.swipe.horizontalDistanceThreshold = (screen.availWidth) / 35; // (default: 30) (pixels) – Swipe horizontal displacement must be more than this.
	$.event.special.swipe.verticalDistanceThreshold = (screen.availHeight) / 6; // (default: 75) (pixels) – Swipe vertical displacement must be less than this.
	$.event.special.swipe.durationThreshold = 1000; // (default: 1000) (milliseconds) – More time than this, and it isn't a swipe.
	$.event.special.tap.tapholdThreshold = 750; // (default: 750) (milliseconds) - Duration before taphold fires.
	jQuery.fx.interval = 10; // (default: 13) (milliseconds) frame rate animations
	$.mobile.activeBtnClass = 'unused'; // remove this line if you want active button class
	$.mobile.loader.prototype.options.text = "";
	$.mobile.loader.prototype.options.textVisible = false;
	$.mobile.loader.prototype.options.theme = "b";
	$.mobile.loader.prototype.options.html = "";
	$.mobile.collapsible.prototype.options.collapsedIcon = "expanderclose";
	$.mobile.collapsible.prototype.options.expandedIcon = "expanderopen";
});
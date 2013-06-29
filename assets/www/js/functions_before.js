// settings on mobile init
$(document).on('mobileinit', function (e) {
	if (e) { e.preventDefault(); }
	$.support.cors = true;
	$.mobile.allowCrossDomainPages = true;
	$.mobile.pushStateEnabled = false;
	$.mobile.buttonMarkup.hoverDelay = 0; // (default: 300ms)
	$.mobile.defaultPageTransition = 'none'; // (default: pop)
	$.mobile.defaultDialogTransition = 'none'; // (default: pop)
	$.event.special.swipe.scrollSupressionThreshold = 40;  // (default: 10px) – More than this horizontal displacement, and we will suppress scrolling.
	$.event.special.swipe.durationThreshold = 1000; // (default: 1000ms) – More time than this, and it isn't a swipe.
	$.event.special.swipe.horizontalDistanceThreshold = 30; // (default: 30px) – Swipe horizontal displacement must 
	$.event.special.swipe.verticalDistanceThreshold = 40; // (default: 75px) – Swipe vertical displacement must be less than this.
});

// device ready
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
	// execute when app resumes from pause
	document.addEventListener("resume", onResume, false);
	// execute when app goes to pause (home button or opening other app)
	document.addEventListener("pause", onPause, false);
	// override default backbutton behavior with own
	document.addEventListener("backbutton", pressBackButton, false);
	// demonstrate panel menu on first boot
	if (window.localStorage.getItem('firstBoot') === null) {
		$("#headerTitle" + window.localStorage.getItem("divIdGlobal")).attr("src", "images/icons/ic_launcher_full_menu_selected.png");
		setTimeout(function () {
			togglePanel('#panelMenuIndex');
		}, 500);
		setTimeout(function () {
			$("#headerTitle" + window.localStorage.getItem("divIdGlobal")).attr("src", "images/icons/ic_launcher_full_menu.png");
			togglePanel('#panelMenuIndex');
		}, 1500);
		window.localStorage.setItem('firstBoot', 'done');
	}
}

// override default back button handling
function pressBackButton() {
	// if panel is not open, then go on
	if (window.localStorage.getItem('panelLeft') === 'closed' && window.localStorage.getItem('panelRight') === 'closed') {
		if ($.mobile.activePage.is('#indexPage')) {
			navigator.app.exitApp();
		} else {
			window.history.back();
		}
	// else close panels first, and stop further action
	} else {
		if (window.localStorage.getItem('panelLeft') === 'open') {
			var divLeftId = '#panelMenu' + window.localStorage.getItem("divIdGlobal");
			$(divLeftId).panel("close");
		} else if (window.localStorage.getItem('panelRight') === 'open') {
			var divRightId = '#panelMenuRight' + window.localStorage.getItem("divIdGlobal");
			$(divRightId).panel("close");
		}
	}
}

// pause app
function onPause() {
	toast('App paused', 'short');
}

// resume app
function onResume() {
	toast('App resumed', 'short');
}

/* PhoneGap plugin functions */

// Toasts
function toast(text, duration) {
	var toasts = cordova.require("cordova/plugin/toasts");
	if (duration === "short") {
		toasts.showShort(text,
			function () {
				//console.log("PhoneGap Plugin: Toast short: callback success");
			},
			function () {
				console.log("PhoneGap Plugin: Toast short: callback error");
			}
			);
	} else if (duration === "long") {
		toasts.showLong(text,
			function () {
				//console.log("PhoneGap Plugin: Toast long: callback success");
			},
			function () {
				console.log("PhoneGap Plugin: Toast long: callback error");
			}
			);
	} else {
		toasts.cancel(
			function () {
				//console.log("PhoneGap Plugin: Toast cancel: callback success");
			},
			function () {
				console.log("PhoneGap Plugin: Toast cancel: callback error");
			}
		);
	}
}

// Share
function share(subject, text) {
	var shares = cordova.require("cordova/plugin/share");
	shares.show({subject: subject, text: text},
		function () {
			//console.log("PhoneGap Plugin: Share: callback success");
		},
		function () {
			console.log("PhoneGap Plugin: Share: callback error");
		}
		);
}

/* END PhoneGap plugins */
/**
*	In this file all the application logic is put.
*/

// JSLint, include this before tests
// var window, navigator, $, device, cordova, document, jQuery, share, toast, togglePanel, initServiceSettings, resetPanelState, panelMenu, panelMenuRight, panelHandling, pressEffectHeader, pressEffectFooter, isDeviceReady, androidServiceHandler, setTimeout, toggleImmersive;

// clear to first boot state
function clearFirstBoot() {
	window.localStorage.clear();
	navigator.app.exitApp();
}

// get the systemspecs
function getSystemSpecs() {
	var $content = $('#systemSpecs'),
		tag;
	if (window.phonegapExcluded === false) {
		tag =	'<p id="systemSpecs">' +
				'Device model: ' + device.model + '<br />' +
				'Device platform: ' + device.platform + ' ' + device.version + '<br />' +
				'PhoneGap version: ' + cordova.version + '<br />' +
				'jQuery version: ' + jQuery.fn.jquery + '<br />' +
				'jQuery Mobile version: ' + $.mobile.version + '<br />' +
				'</p>';
	} else {
		tag =	'<p id="systemSpecs">' +
				'Operating System: ' + navigator.platform + '<br />' +
				'Browser: ' + navigator.appName + ' ' + navigator.appVersion + '<br />' +
				'jQuery version: ' + jQuery.fn.jquery + '<br />' +
				'jQuery Mobile version: ' + $.mobile.version + '<br />' +
				'</p>';
	}
	$content.replaceWith(tag);
}

// show Uri Message in app
function showUriMessage() {
	$('#uriMessage').empty().append(window.localStorage.getItem("uriMessage"));
}

// load other page content with use of loading animation
function loadOtherPageContent() {
	var content = $("#otherPageContent");
	content.empty().append(window.loadingAnimation);
	setTimeout(function () {
		content.empty().append("<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sollicitudin nibh id neque vulputate, eu convallis ligula faucibus. Maecenas tincidunt, magna id convallis accumsan, est magna pulvinar magna, quis commodo augue tellus imperdiet mauris. Proin fermentum ante eget molestie porta. Sed tempor adipiscing interdum. Cras sed sollicitudin justo. Etiam rutrum tristique lacus. In venenatis augue nibh. Aliquam erat volutpat. Cras rhoncus nulla urna, dignissim hendrerit neque sagittis iaculis. Pellentesque euismod mauris lacus, vitae ullamcorper lectus porta volutpat. Pellentesque euismod consequat gravida. Cras ac risus tristique, varius nunc auctor, pellentesque nisi. Vestibulum arcu mi, rhoncus non ultricies vel, iaculis eget nisl. Vivamus faucibus dignissim justo, a euismod mauris commodo vitae. Sed ac mollis tortor. Cras egestas nunc eget magna tincidunt, vel tempor leo iaculis.</p>");
	}, 2000);
}

// initiate immersive content
function initiateImmersive() {
	var pic_real_width,
		pic_real_height,
		imageRatio,
		screenRatio;
	$("<img />")
		.attr("src", "./images/chromecast.jpg")
		.load(function () {
			pic_real_width = this.width;
			pic_real_height = this.height;
			imageRatio = pic_real_width / pic_real_height;
			screenRatio = window.innerWidth / window.innerHeight;
			if (pic_real_width > pic_real_height) {
				if (imageRatio < screenRatio) {
					$('photoImmersive').removeClass("fillwidth");
					$('photoImmersive').addClass("fillheight");
				} else {
					$('photoImmersive').removeClass("fillheight");
					$('photoImmersive').addClass("fillwidth");
				}
			} else if (pic_real_width < pic_real_height) {
				if (imageRatio < screenRatio) {
					$('photoImmersive').removeClass("fillwidth");
					$('photoImmersive').addClass("fillheight");
				} else {
					$('photoImmersive').removeClass("fillheight");
					$('photoImmersive').addClass("fillwidth");
				}
			} else if (pic_real_width === pic_real_height) {
				if (imageRatio > screenRatio) {
					$('photoImmersive').removeClass("fillheight");
					$('photoImmersive').addClass("fillwidth");
				} else {
					$('photoImmersive').removeClass("fillwidth");
					$('photoImmersive').addClass("fillheight");
				}
			}
		});
	$('#photoDiv').off("click").on("click",
		function () {
			toggleImmersive();
		});
	$('#photoInfoDiv').off("click").on("click",
		function () {
			toggleImmersive();
		});
}

// toggle immersive interface
function toggleImmersive() {
	if ($.mobile.pageContainer.pagecontainer("getActivePage")[0].id === 'immersivePage') {
		if ($("#footerImmersive").is(':hidden')) {
			$('#footerImmersive').show();
		} else {
			$('#footerImmersive').hide();
		}
		if ($("#headerImmersive").is(':hidden')) {
			$('#headerImmersive').show();
		} else {
			$('#headerImmersive').hide();
		}
		if ($("#photoInfoDiv").is(':hidden')) {
			$('#photoInfoDiv').show();
		} else {
			$('#photoInfoDiv').hide();
		}
	} else if ($.mobile.pageContainer.pagecontainer("getActivePage")[0].id === 'immersivePage') {
		if ($("#footerImmersive").is(':hidden')) {
			$('#footerImmersive').show();
		} else {
			$('#footerImmersive').hide();
		}
		if ($("#headerImmersive").is(':hidden')) {
			$('#headerImmersive').show();
		} else {
			$('#headerImmersive').hide();
		}
		if ($("#photoInfoDiv").is(':hidden')) {
			$('#photoInfoDiv').show();
		} else {
			$('#photoInfoDiv').hide();
		}
	}
}

// assign click events to elements
function htmlClickEventHandlers(id, action) {
	/** use action "menu" when using app icon as side panel (#panelMenu...)
	*	use action "back" when using app icon as back
	*/
	// every page
	$('#headerTitle' + id).off("click").on("click",
		function () {
			if (action !== "back") {
				togglePanel('#panelMenu' + id);
			} else {
				window.history.back();
			}
		});
	$('#headerShare' + id).off("click").on("click",
		function () {
			share(window.localStorage.getItem('shareTagSubject'), window.localStorage.getItem('shareTagText'));
		});
	$('#headerShare' + id).on("taphold",
		function () {
			toast("Share", "short");
		});
	$('#headerOverflow' + id).off("click").on("click",
		function () {
			togglePanel('#panelMenuRight' + id);
		});
	// specific page...
	if (id === "Index") {
		$('#clearFirstBoot').off("click").on("click",
			function () {
				clearFirstBoot();
			});
	} else if (id === "Second") {
		// do nothing
	} else if (id === "Other") {
		// do nothing
	} else if (id === "Service") {
		initServiceSettings();
	}
	// every page but...
	if (id !== "Other") {
		$('#footerShare' + id).off("click").on("click",
			function () {
				share(window.localStorage.getItem('shareTagSubject'), window.localStorage.getItem('shareTagText'));
			});
		$('#footerShare' + id).on("taphold", function () {
			toast("Share", "short");
		});
		$('#footerToast' + id).off("click").on("click", function () {
			toast('This is a toast message', 'short');
		});
		$('#footerToast' + id).on("taphold", function () {
			toast("Toast", "short");
		});
	}
}

// initialize page variables and elements on create
function initPageVarsOnCreate(id) {
	// every page
	// every page but...
	if (id !== "LandingPage") {
		// nothing needed atm
	}
	if (id === "Index") {
		htmlClickEventHandlers(id, "menu");
	} else if (id !== "LandingPage") {
		htmlClickEventHandlers(id, "back");
	}
	// specific page...
	if (id === "LandingPage") {
		// do nothing
	} else if (id === "Index") {
		// do nothing
	} else if (id === "Other") {
		// do nothing
	} else if (id === "UriMessage") {
		// do nothing
	} else if (id === "Service") {
		// do nothing
	} else if (id === "Immersive") {
		// do nothing
	}
}

// initialize page variables on beforeshow
function initPageVarsOnShow(id) {
	// every page...
	window.localStorage.setItem("divIdGlobal", id);
	// every page but...
	if (id !== "LandingsPage") {
		resetPanelState();
		window.localStorage.setItem("shareTagSubject", 'jpHolo');
		window.localStorage.setItem("shareTagText", '#jpHolo, an application template based on PhoneGap, by Joram #Teusink https://github.com/teusink/jpHolo');
		panelMenu(id);
		panelMenuRight(id);
		panelHandling();
	}
	if (id === "Index") {
		pressEffectHeader(true, "menu");
	} else if (id !== "LandingsPage") {
		pressEffectHeader(true, "back");
	}
	// specific page...
	if (id === "LandingPage") {
		isDeviceReady("", "InitApp"); // TODO
		isDeviceReady("", "InitUri"); // TODO
	} else if (id === "Index") {
		pressEffectFooter(true, true);
	} else if (id === "Other") {
		pressEffectFooter(true, true);
		getSystemSpecs();
		loadOtherPageContent();
	} else if (id === "UriMessage") {
		showUriMessage();
		pressEffectFooter(true, true);
	} else if (id === "Service") {
		pressEffectFooter(true, true);
		androidServiceHandler("getStatus", "none");
	} else if (id === "Immersive") {
		pressEffectFooter(true, true);
		initiateImmersive();
	}
}

// below is to tie page events to pages so that the 2 functions above (initPageVarsOn...) will execute

// detect swiperight to open left panel upon swiperight
$(document).off('swiperight').on('swiperight', function (event) {
	if (window.localStorage.getItem("pageNaveType") === "menu") {
		var w = window,
			d = document,
			e = d.documentElement,
			g = d.getElementsByTagName('body')[0],
			x = w.innerWidth || e.clientWidth || g.clientWidth,
			y = w.innerHeight || e.clientHeight || g.clientHeight;
		// check if there are no open panels, otherwise ignore swipe
		if (checkOpenPanels() === false && event.swipestart.coords[0] < x / 5) {
			togglePanel('#panelMenu' + window.localStorage.getItem("divIdGlobal"));
		}
	}
});

// store important vars, like previous page id
function startBeforeShowVars(data) {
	window.localStorage.setItem("previousPageId", data.prevPage.attr("id"));
}

// #landingPage
$(document).on('pagebeforeshow', '#landingPage', function (event, data) {
	startBeforeShowVars(data);
	initPageVarsOnShow('LandingPage');
});
$(document).on('pagecreate', '#landingPage', function () {
	initPageVarsOnCreate('LandingPage');
});

// #indexPage
$(document).on('pagebeforeshow', '#indexPage', function (event, data) {
	startBeforeShowVars(data);
	initPageVarsOnShow('Index');
});
$(document).on('pagecreate', '#indexPage', function () {
	initPageVarsOnCreate('Index');
});

// #otherPage
$(document).on('pagebeforeshow', '#otherPage', function (event, data) {
	startBeforeShowVars(data);
	initPageVarsOnShow('Other');
});
$(document).on('pagecreate', '#otherPage', function () {
	initPageVarsOnCreate('Other');
});

// #uriPage
$(document).on('pagebeforeshow', '#uriPage', function (event, data) {
	startBeforeShowVars(data);
	initPageVarsOnShow('UriMessage');
});
$(document).on('pagecreate', '#uriPage', function () {
	initPageVarsOnCreate('UriMessage');
});

// #servicePage
$(document).on('pagebeforeshow', '#servicePage', function (event, data) {
	startBeforeShowVars(data);
	initPageVarsOnShow('Service');
});
$(document).on('pagecreate', '#servicePage', function () {
	initPageVarsOnCreate('Service');
});

// #immersivePage
$(document).on('pagebeforeshow', '#immersivePage', function (event, data) {
	startBeforeShowVars(data);
	initPageVarsOnShow('Immersive');
});
$(document).on('pagecreate', '#immersivePage', function () {
	initPageVarsOnCreate('Immersive');
});
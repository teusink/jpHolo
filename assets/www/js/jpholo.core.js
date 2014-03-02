// JSLint, include this before tests
// var window, cordova, $, document, jQuery, navigator, device, onDeviceReady, onResume, onPause, pressBackButton, setTimeout, togglePanel, checkConnection, Connection, hideNonContextButtons, panelMenuLeftOpened, showNonContextButtons, initServiceSettings, panelMenuLeftClosed, androidServiceHandler, startPreLoadImages, onMenuKeyDown, onSearchKeyDown, checkOpenPanels;

// global settings
window.androidPrefsLib = "jpHoloSharedPreferences";
window.loadingAnimation = '<div class="loading"><div class="outer"></div><div class="inner"></div></div>';
$.i18n.init({ getAsync: false, debug: true, fallbackLng: 'en' });

/* PhoneGap plugin functions */

// needed to do an empty callback when setting a value
function emptyCallback() {
}

// AndroidPreferences
function handleAndroidPreferences(action, prefLib, prefName, prefValue, callback) {
	if (window.phonegapExcluded === false) {
		var androidPref = cordova.require("cordova/plugin/androidpreferences"),
			value;
		if (prefLib !== "" && prefName !== "") {
			if (action === "get") {
				androidPref.get(
					{preferenceLib: prefLib, preferenceName: prefName, preferenceValue: prefValue},
					function (returnValue) {
						console.info("PhoneGap Plugin: AndroidPreferences: callback success");
						value = returnValue;
						callback(value);
					},
					function () {
						console.error("PhoneGap Plugin: AndroidPreferences: callback error");
						value = "";
						callback(value);
					}
				);
			} else if (action === "set") {
				androidPref.set(
					{preferenceLib: prefLib, preferenceName: prefName, preferenceValue: prefValue},
					function () {
						console.info("PhoneGap Plugin: AndroidPreferences: callback success");
						value = "";
						callback(value);
					},
					function () {
						console.error("PhoneGap Plugin: AndroidPreferences: callback error");
						value = "";
						callback(value);
					}
				);
			}
		}
	} else {
		if (prefLib !== "" && prefName !== "") {
			if (action === "get") {
				prefValue = window.localStorage.getItem(prefLib + prefName);
				callback(prefValue);
			} else if (action === "set") {
				window.localStorage.setItem(prefLib + prefName, prefValue);
				callback(prefValue);
			}
		}
	}
}

// Appstore
function appstore(link, type) {
	if (window.phonegapExcluded === false) {
		var appstores = cordova.require("cordova/plugin/appstore");
		appstores.show(
			{link: link, type: type},
			function () {
				console.info("PhoneGap Plugin: Appstore: show: callback success");
			},
			function () {
				console.error("PhoneGap Plugin: Appstore: show: callback error");
			}
		);
	} else {
		if (type === 'app') {
			window.open('https://play.google.com/store/apps/details?id=' + link, '_blank');
		} else if (type === 'pub') {
			window.open('https://play.google.com/store/apps/developer?id=' + link, '_blank');
		}
	}
}

// Appstore check
function appstoreCheck(callback) {
	if (window.phonegapExcluded === false) {
		var appstores = cordova.require("cordova/plugin/appstore");
		appstores.check(
			function (appstore) {
				console.info("PhoneGap Plugin: Appstore: check: callback success");
				callback(appstore);
			},
			function () {
				console.error("PhoneGap Plugin: Appstore: check: callback error");
				callback("unknown");
			}
		);
	} else {
		callback("unknown");
	}
}

// PackageVersion
function getPackageVersion(callback) {
	var currentVersion;
	if (window.phonegapExcluded === false) {
		var packageVersion = cordova.require("cordova/plugin/packageversion");
		packageVersion.get(
			function (version) {
				console.info("PhoneGap Plugin: PackageVersion: callback success");
				currentVersion = version;
				callback(currentVersion);
			},
			function () {
				console.error("PhoneGap Plugin: PackageVersion: callback error");
				currentVersion = "unknown";
				callback(currentVersion);
			}
		);
	} else {
		currentVersion = "web";
		callback(currentVersion);
	}
}

// PreferredScreenSize
function handlePreferredScreenSize(callback) {
	if (window.phonegapExcluded === false) {
		var preferredScreenSize = cordova.require("cordova/plugin/preferredscreensize");
		preferredScreenSize.getSystem(
			function (currentScreenSize) {
				console.info("PhoneGap Plugin: PreferredScreenSize: callback success");
				callback(currentScreenSize);
			},
			function () {
				console.error("PhoneGap Plugin: PreferredScreenSize: callback error");
				callback("unknown");
			}
		);
	} else {
		callback("web");
	}
}

// HomeButton
function homeButton() {
	if (window.phonegapExcluded === false) {
		var home = cordova.require("cordova/plugin/homebutton");
		home.show(
			function () {
				console.info("PhoneGap Plugin: HomeButton: callback success");
			},
			function () {
				console.error("PhoneGap Plugin: HomeButton: callback error");
			}
		);
	} else {
		window.open(window.indexFile);
	}
}

// Share
function share(subject, text) {
	if (window.phonegapExcluded === false) {
		var shares = cordova.require("cordova/plugin/share");
		shares.show(
			{subject: subject, text: text},
			function () {
				console.info("PhoneGap Plugin: Share: callback success");
			},
			function () {
				console.error("PhoneGap Plugin: Share: callback error");
			}
		);
	} else {
		subject = subject.replace('', '%20');
		text = text.replace('', '%20');
		window.location.href = "mailto:someone@example.com?subject=" + subject + "&body=" + text;
	}
}

// Toasts
function toast(text, duration) {
	if (window.phonegapExcluded === false) {
		var toasts = cordova.require("cordova/plugin/toasts");
		if (duration === "short") {
			toasts.showShort(
				text,
				function () {
					console.info("PhoneGap Plugin: Toasts short: callback success");
				},
				function () {
					console.error("PhoneGap Plugin: Toasts short: callback error");
				}
			);
		} else if (duration === "long") {
			toasts.showLong(
				text,
				function () {
					console.info("PhoneGap Plugin: Toasts long: callback success");
				},
				function () {
					console.error("PhoneGap Plugin: Toasts long: callback error");
				}
			);
		} else {
			toasts.cancel(
				function () {
					console.info("PhoneGap Plugin: Toasts cancel: callback success");
				},
				function () {
					console.error("PhoneGap Plugin: Toasts cancel: callback error");
				}
			);
		}
	} else {
		alert(text);
	}
}
/* END PhoneGap plugins */

// device ready
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
	// let the function "isDeviceReady" know that the event "deviceready" has been fired
	window.deviceReady = true;
	// prelude app images for faster GUI
	startPreLoadImages();
	// execute when app resumes from pause
	document.addEventListener("resume", onResume, false);
	// execute when app goes to pause (home button or opening other app)
	document.addEventListener("pause", onPause, false);
	// override default backbutton behavior with own
	document.addEventListener("backbutton", pressBackButton, false);
	// override default menubutton behavior with own
	document.addEventListener("menubutton", onMenuKeyDown, false);
	// override default searchbutton behavior with own
	document.addEventListener("searchbutton", onSearchKeyDown, false);
	// check if Android Service is running and needs to be running and act accordingly
	androidServiceHandler("getStatus", "none");
	// demonstrate panel menu on first boot
	if (window.localStorage.getItem('firstBoot') !== 'done') {
		var headerTitle = $("#headerTitle" + window.localStorage.getItem("divIdGlobal"));
		headerTitle.addClass("holoPressEffect");
		setTimeout(function () {
			togglePanel('#panelMenuIndex');
		}, 500);
		setTimeout(function () {
			headerTitle.removeClass("holoPressEffect");
			togglePanel('#panelMenuIndex');
		}, 1500);
		window.localStorage.setItem('firstBoot', 'done');
	}
}

// event handler orientationchange
$(window).bind('orientationchange',
	function (event) {
		if (event.orientation === 'portrait') {
			//do something
		} else if (event.orientation === 'landscape') {
			//do something
		}
	});

// image preloader
jQuery.preloadImages = function () {
	var i;
	for (i = 0; i < arguments.length; i = i + 1) {
		jQuery("<img>").attr("src", arguments[i]);
	}
};

// actually preload images
function startPreLoadImages() {
	$.preloadImages(
		"./images/icons/ic_action_home.png",
		"./images/icons/ic_action_info.png",
		"./images/icons/ic_action_list_header.png",
		"./images/icons/ic_action_overflow_header.png",
		"./images/icons/ic_action_share_header.png",
		"./images/icons/ic_launcher_full_arrow.png",
		"./images/icons/ic_launcher_full_menu.png",
		"./images/icons/ic_launcher_full_menu_opened.png",
		"./images/icons/ic_launcher_full_noarrow.png"
	);
}

// callback function to check if device is ready
function isDeviceReady(value, action) {
	if (window.deviceReady === true) {
		var connection = checkConnection();
		switch (action) {
		case "toastReady":
			toast("Holo Light with Dark action bar example\nDevice is ready according to PhoneGap.\nConnection type: " + connection + "\n\nThis is your value: " + value, "short");
			break;
		case "action2":
			// code
			break;
		case "action3":
			// code
			break;
		}
	} else {
		window.setTimeout("isDeviceReady(\"" + value + "\", \"" + action + "\");", 100);
	}
}

// clean URI preferences variables
function cleanUriVars() {
	handleAndroidPreferences("set", window.androidPrefsLib, "UriMessage", "", emptyCallback);
}

// override default back button handling
function pressBackButton() {
	// if panel is not open, then go on
	if (checkOpenPanels() === false) {
		if ($.mobile.pageContainer.pagecontainer("getActivePage")[0].id === "indexPage") {
			navigator.app.exitApp(); // This will exit the app.
			// homeButton(); // This will push the app to the background.
		} else {
			window.history.back();
		}
	// else close panels first, and stop further action
	} else {
		var divLeftId, divRightId;
		if (window.localStorage.getItem('panelLeft') === 'open') {
			divLeftId = '#panelMenu' + window.localStorage.getItem("divIdGlobal");
			$(divLeftId).panel("close");
		} else if (window.localStorage.getItem('panelRight') === 'open') {
			divRightId = '#panelMenuRight' + window.localStorage.getItem("divIdGlobal");
			$(divRightId).panel("close");
		}
	}
}

// menu button
function onMenuKeyDown() {
    togglePanel('#panelMenuRight' + window.localStorage.getItem("divIdGlobal"));
}

// search button
function onSearchKeyDown() {
    toast('You want to search?', 'short');
}

// pause app
function onPause() {
	toast('App paused', 'short');
}

// resume app
function onResume() {
	toast('App resumed', 'short');
}

// get current date as string
function currentDate() {
	var today = new Date(), dd = today.getDate(), mm = today.getMonth() + 1, yyyy = today.getFullYear(), date = yyyy + "-" + mm + "-" + dd;
	return date;
}

// get current connection type
function checkConnection() {
	var networkState = navigator.connection.type, states = {};
	states[Connection.UNKNOWN] = 'Unknown';
	states[Connection.ETHERNET] = 'Ethernet';
	states[Connection.WIFI] = 'WiFi';
	states[Connection.CELL_2G] = '2G';
	states[Connection.CELL_3G] = '3G';
	states[Connection.CELL_4G] = '4G';
	states[Connection.NONE] = 'None';
	return states[networkState];
}

// clear to first boot state
function clearFirstBoot() {
	window.localStorage.clear();
	navigator.app.exitApp();
}

// default left panelmenu (define menu for all pages)
function panelMenu(divId) {
	var panel = $('#panelMenu' + divId + 'UL');
	panel.children().remove('li');
	panel.append('<li data-icon="false" class="headerSpace"><p>&nbsp;</p></li>'); // empty space, needed for header
	panel.append('<li data-role="list-divider"><p class="panelTextDivider">jpHolo</p></li>');
	panel.append('<li data-icon="false"><a class="panelText" href="#indexPage"><img src="./images/icons/ic_action_home.png" class="ui-li-icon largerIcon">Main page</a></li>');
	panel.append('<li data-role="list-divider"><p class="panelTextDivider">Other pages</p></li>');
	panel.append('<li data-icon="false"><a class="panelText" href="#otherPage"><img src="./images/icons/ic_action_info.png" class="ui-li-icon largerIcon">Other page</a></li>');
	panel.append('<li data-icon="false"><a class="panelText" href="#servicePage"><img src="./images/icons/ic_action_info.png" class="ui-li-icon largerIcon">Service page</a></li>');
	panel.listview('refresh');
}

// default right panelmenu (define menu for all pages)
function panelMenuRight(divId) {
	var panel = $('#panelMenuRight' + divId + 'UL');
	panel.children().remove('li');
	panel.append('<li data-icon="false" class="headerSpace"><p>&nbsp;</p></li>'); // empty space, needed for header
	panel.append('<li data-role="list-divider"><p class="panelTextDivider">Play Store links</p></li>');
	panel.append('<li data-icon="false"><a class="panelText" onclick="appstore(\'org.teusink.droidpapers\', \'app\')"><img src="./images/icons/ic_action_home.png" class="ui-li-icon largerIcon">DroidPapers</a></li>');
	panel.append('<li data-icon="false"><a class="panelText" onclick="appstore(\'Teusink.org\', \'pub\')"><img src="./images/icons/ic_action_info.png" class="ui-li-icon largerIcon">Teusink.org</a></li>');
	panel.append('<li data-role="list-divider"><p class="panelTextDivider">App info</p></li>');
	getPackageVersion(function (version) {
		panel.append('<li data-icon="false"><a class="panelText" onclick="toast(\'Current version: ' + version + '\', \'short\')"><img src="./images/icons/ic_action_info.png" class="ui-li-icon largerIcon">Current version</a></li>').listview('refresh');
	});
	panel.listview('refresh');
}

// panel open and closed handling
function panelHandling() {
	var currentId = window.localStorage.getItem("divIdGlobal");
	$("#panelMenu" + currentId).panel({
		open: function () {
			window.localStorage.setItem("panelLeft", 'open');
			hideNonContextButtons('panel');
			panelMenuLeftOpened();
		}
	});
	$("#panelMenu" + currentId).panel({
		close: function () {
			window.localStorage.setItem("panelLeft", 'closed');
			showNonContextButtons('panel');
			panelMenuLeftClosed();
		}
	});
	$("#panelMenu" + currentId + "UL").on("click", "li", function () {
		$('#panelMenu' + currentId).panel("close");
	});
	$("#panelMenuRight" + currentId).panel({
		open: function () {
			window.localStorage.setItem("panelRight", 'open');
			hideNonContextButtons('panel');
		}
	});
	$("#panelMenuRight" + currentId).panel({
		close: function () {
			window.localStorage.setItem("panelRight", 'closed');
			showNonContextButtons('panel');
		}
	});
	$("#panelMenuRight" + currentId + "UL").on("click", "li", function () {
		$('#panelMenuRight' + currentId).panel("close");
	});
}

// reset panel states
function resetPanelState() {
	window.localStorage.setItem('panelLeft', 'closed');
	window.localStorage.setItem('panelRight', 'closed');
}

// check if there is a panel open or not
function checkOpenPanels() {
	if (window.localStorage.getItem('panelLeft') === "closed" && window.localStorage.getItem('panelRight') === "closed") {
		return false;
	}
	return true;
}

// hide non-contextual buttons when panel opens
function hideNonContextButtons(type) {
	var currentId = window.localStorage.getItem("divIdGlobal");
	if ($('#headerShare' + currentId).length > 0) {
		$('#headerShare' + currentId).hide();
	}
	// use this part if you want to hide buttons in action bars of which the buttons do not apply to every page
	if ($('#headerOtherButton' + currentId).length > 0 && type !== "somethingOtherThenPanel") {
		$('#headerOtherButton' + currentId).hide();
	}
}

// show non-contextual buttons when panel closes
function showNonContextButtons(type) {
	var currentId = window.localStorage.getItem("divIdGlobal");
	if ($('#headerShare' + currentId).length > 0) {
		$('#headerShare' + currentId).show();
	}
	// use this part if you want to show buttons in action bars of which the buttons do not apply to every page
	if ($('#headerOtherButton' + currentId).length > 0 && type !== "somethingOtherThenPanel") {
		$('#headerOtherButton' + currentId).show();
	}
}

// show title icon with the dashes more to the left
function panelMenuLeftOpened() {
	if (window.localStorage.getItem("pageNaveType") === "menu") {
		$("#headerTitle" + window.localStorage.getItem("divIdGlobal")).attr("src", "./images/icons/ic_launcher_full_menu_opened.png");
	}
}

// show title icon with the dashes more to the right
function panelMenuLeftClosed() {
	if (window.localStorage.getItem("pageNaveType") === "menu") {
		$("#headerTitle" + window.localStorage.getItem("divIdGlobal")).attr("src", "./images/icons/ic_launcher_full_menu.png");
	}
}

// toggle panel menu (open/close)
function togglePanel(panel) {
	$(panel).panel("toggle");
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

// press effect in header bar
function pressEffectHeader(share, action) {
	/** use action "menu" when using app icon as side panel (#panelMenu...)
	*	use action "back" when using app icon as back
	*/
	window.localStorage.setItem("pageNaveType", action);
	var currentId = window.localStorage.getItem("divIdGlobal");
	// restore icons
	if (action === "menu") {
		$("#headerTitle" + currentId).attr("src", "./images/icons/ic_launcher_full_menu.png");
		// detect swiperight to open left panel upon swiperight
		$("#" + $.mobile.pageContainer.pagecontainer("getActivePage")[0].id).off('swiperight').on('swiperight', function () {
			// check if there are no open panels, otherwise ignore swipe
			if (window.localStorage.getItem('panelLeft') !== "open" && window.localStorage.getItem('panelRight') !== "open") {
				togglePanel('#panelMenu' + currentId);
			}
		});
	} else {
		// remove swipe event, because there is no page visible with a panelmenu
		$("#" + $.mobile.pageContainer.pagecontainer("getActivePage")[0].id).off('swiperight');
	}
	showNonContextButtons('panel');
	// header title press effect (left panel)
	$("#headerTitle" + currentId).on('touchstart', function () {
		$(this).addClass("holoPressEffect");
	});
	$("#headerTitle" + currentId).on('touchend', function () {
		$(this).removeClass("holoPressEffect");
	});
	// overflow title press effect (right panel)
	$("#headerOverflow" + currentId).on('touchstart', function () {
		$(this).addClass("holoPressEffect");
	});
	$("#headerOverflow" + currentId).on('touchend', function () {
		$(this).removeClass("holoPressEffect");
	});
	// share press effect
	if (share === true) {
		$("#headerShare" + currentId).on('touchstart', function () {
			$(this).addClass("holoPressEffect");
		});
		$("#headerShare" + currentId).on('touchend', function () {
			$(this).removeClass("holoPressEffect");
		});
	}
}

// press effect in footer bar
function pressEffectFooter(button1, button2) {
	var currentId = window.localStorage.getItem("divIdGlobal");
	// button1 press effect
	if (button1 === true) {
		$("#footerShare" + currentId).on('touchstart', function () {
			$(this).addClass("holoPressEffect");
		});
		$("#footerShare" + currentId).on('touchend', function () {
			$(this).removeClass("holoPressEffect");
		});
	}
	// button2 press effect
	if (button2 === true) {
		$("#footerToast" + currentId).on('touchstart', function () {
			$(this).addClass("holoPressEffect");
		});
		$("#footerToast" + currentId).on('touchend', function () {
			$(this).removeClass("holoPressEffect");
		});
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
			toast("Share.", "short");
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
			toast("Share.", "short");
		});
		$('#footerToast' + id).off("click").on("click", function () {
			toast('This is a toast message', 'short');
		});
		$('#footerToast' + id).on("taphold", function () {
			toast("Toast.", "short");
		});
	}
}

// initialize page variables and elements on create
function initPageVarsOnCreate(id) {
	// every page
	// every page but...	
	if (id !== "Index") {
		toast('This is not the Index page', 'short');
	}
	if (id !== "Other") {
		htmlClickEventHandlers(id, "menu");
	} else {
		htmlClickEventHandlers(id, "back");
	}
	// specific page...
	if (id === "Index") {
		isDeviceReady("valueTester", "toastReady");
	} else if (id === "Other") {
		// do nothing
	} else if (id === "Service") {
		// do nothing
	}
}

// initialize page variables on beforeshow
function initPageVarsOnShow(id) {
	// every page...
	resetPanelState();
	window.localStorage.setItem("divIdGlobal", id);
	window.localStorage.setItem("shareTagSubject", 'jpHolo');
	window.localStorage.setItem("shareTagText", 'A nice PhoneGap and JQM example by Teusink.org http://teusink.blogspot.com/2013/04/android-example-app-with-phonegap-and.html #TeusinkOrg');
	panelMenu(id);
	panelMenuRight(id);
	panelHandling();
	// every page but...
	if (id !== "Other") {
		pressEffectHeader(true, "menu");
	} else {
		pressEffectHeader(true, "back");
	}
	// specific page...
	if (id === "Index") {
		pressEffectFooter(true, true);
	} else if (id === "Other") {
		pressEffectFooter(true, true);
		getSystemSpecs();
	} else if (id === "Service") {
		pressEffectFooter(true, true);
		androidServiceHandler("getStatus", "none");
	}
}

// below is to tie page events to pages so that the 2 functions above (initPageVarsOn...) will execute

// store important vars, like previous page id
function startBeforeShowVars(data) {
	window.localStorage.setItem("previousPageId", data.prevPage.attr("id"));
}

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

// #servicePage
$(document).on('pagebeforeshow', '#servicePage', function (event, data) {
	startBeforeShowVars(data);
	initPageVarsOnShow('Service');
});
$(document).on('pagecreate', '#servicePage', function () {
	initPageVarsOnCreate('Service');
});
/**
*	In this file all the core logic is put.
*	This includes panel menus, headers, footers and generic buttons and functions.
*/

// JSLint, include this before tests
// var window, $, document, jQuery, navigator, screen, onDeviceReady, startPreLoadImages, onResume, onPause, pressBackButton, onMenuKeyDown, onSearchKeyDown, androidServiceHandler, setTimeout, togglePanel, checkConnection, toast, handleAndroidPreferences, cleanUriVars, emptyCallback, checkOpenPanels, Connection, getPackageVersion, hideNonContextButtons, panelMenuLeftOpened, showNonContextButtons, panelMenuLeftClosed, adjustStyle, handlePreferredScreenSize;

// global settings
window.androidPrefsLib = "jpHoloSharedPreferences";
window.loadingAnimation = '<div class="loading"><div class="outer"></div><div class="inner"></div></div>';

// device ready
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
	// let the function "isDeviceReady" know that the event "deviceready" has been fired
	window.deviceReady = true;
	// prelude app images for faster GUI
	startPreLoadImages();
	// inject device type specific stylesheet
	adjustStyle();
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
		if (event.orientation) {
			var currentId = $.mobile.pageContainer.pagecontainer("getActivePage")[0].id;
			if (currentId === 'immersivePage') {
				var pic_real_width,
					pic_real_height,
					page,
					imageRatio,
					screenRatio;
				$("<img />")
					.attr("src", $("photoImmersive").attr("src"))
					.load(function () {
						pic_real_width = this.width;
						pic_real_height = this.height;
						imageRatio = pic_real_width / pic_real_height;
						if (event.orientation === "portrait" && window.innerWidth > window.innerHeight) {
							screenRatio = window.innerHeight / window.innerWidth;
						} else if (event.orientation === "landscape" && window.innerWidth < window.innerHeight) {
							screenRatio = window.innerHeight / window.innerWidth;
						} else {
							screenRatio = window.innerWidth / window.innerHeight;
						}
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
			}
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
		case "InitApp":
			startPreLoadImages();
			toast("Holo Light with Dark action bar example\nDevice is ready according to PhoneGap.\nConnection type: " + connection, "short");
			break;
		case "InitUri":
			var message;
			handleAndroidPreferences("get", window.androidPrefsLib, "UriMessage", "", function (prefValue) {
				message = prefValue;
				if (message !== "") {
					cleanUriVars();
					window.localStorage.setItem("uriView", "true");
					window.localStorage.setItem("uriMessage", message);
					$("body").pagecontainer("change", "#uriPage");
				} else {
					window.localStorage.setItem("uriView", "false");
					window.localStorage.setItem("uriMessage", "");
					$("body").pagecontainer("change", "#indexPage");
				}
			});
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
	// exit app if you are viewing URI content
	if (window.localStorage.getItem("uriView") === "true") {
		window.localStorage.setItem("uriView", "false");
		navigator.app.exitApp();
	// if panel is not open, then go on
	} else if (checkOpenPanels() === false) {
		if ($.mobile.pageContainer.pagecontainer("getActivePage")[0].id === "indexPage") {
			navigator.app.exitApp(); // This will exit the app.
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

// adjust specific style to tablet or smartphone view
function adjustStyle() {
	handlePreferredScreenSize(function (screenValue) {
		if (screenValue === "xlarge" || screenValue === "large") {
			$("#sizeStylesheet").attr("href", "./themes/jpholo.tablet.css");
		} else {
			$("#sizeStylesheet").attr("href", "./themes/jpholo.smartphone.css");
		}
	});
}

// Open any anchor with http/https through javascript
$(document).on('click', 'a[href^=http], a[href^=https]', function (event) {
	event.preventDefault();
	var url = $(this);
	window.open(url.attr('href'), '_system');
});

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
	panel.append('<li data-icon="false"><a class="panelText" href="#immersivePage"><img src="./images/icons/ic_action_info.png" class="ui-li-icon largerIcon">Immersive page</a></li>');
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
	}
	showNonContextButtons('panel');
	// header title press effect (left panel)
	$("#headerTitle" + currentId).off('touchstart').on('touchstart', function () {
		$(this).addClass("holoPressEffect");
	});
	$("#headerTitle" + currentId).off('touchend').on('touchend', function () {
		$(this).removeClass("holoPressEffect");
	});
	$("#headerTitle" + currentId).off('touchmove').on('touchmove', function () {
		$(this).removeClass("holoPressEffect");
	});
	// overflow title press effect (right panel)
	$("#headerOverflow" + currentId).off('touchstart').on('touchstart', function () {
		$(this).addClass("holoPressEffect");
	});
	$("#headerOverflow" + currentId).off('touchend').on('touchend', function () {
		$(this).removeClass("holoPressEffect");
	});
	$("#headerOverflow" + currentId).off('touchmove').on('touchmove', function () {
		$(this).removeClass("holoPressEffect");
	});
	// share press effect
	if (share === true) {
		$("#headerShare" + currentId).off('touchstart').on('touchstart', function () {
			$(this).addClass("holoPressEffect");
		});
		$("#headerShare" + currentId).off('touchend').on('touchend', function () {
			$(this).removeClass("holoPressEffect");
		});
		$("#headerShare" + currentId).off('touchmove').on('touchmove', function () {
			$(this).removeClass("holoPressEffect");
		});
	}
}

// press effect in footer bar
function pressEffectFooter(button1, button2) {
	var currentId = window.localStorage.getItem("divIdGlobal");
	// button1 press effect
	if (button1 === true) {
		$("#footerShare" + currentId).off('touchstart').on('touchstart', function () {
			$(this).addClass("holoPressEffect");
		});
		$("#footerShare" + currentId).off('touchend').on('touchend', function () {
			$(this).removeClass("holoPressEffect");
		});
		$("#footerShare" + currentId).off('touchmove').on('touchmove', function () {
			$(this).removeClass("holoPressEffect");
		});
	}
	// button2 press effect
	if (button2 === true) {
		$("#footerToast" + currentId).off('touchstart').on('touchstart', function () {
			$(this).addClass("holoPressEffect");
		});
		$("#footerToast" + currentId).off('touchend').on('touchend', function () {
			$(this).removeClass("holoPressEffect");
		});
		$("#footerToast" + currentId).off('touchmove').on('touchmove', function () {
			$(this).removeClass("holoPressEffect");
		});
	}
}

// check if there is a panel open or not
function checkOpenPanels() {
	if (window.localStorage.getItem('panelLeft') === "closed" && window.localStorage.getItem('panelRight') === "closed") {
		return false;
	}
	return true;
}

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
		"./images/jqm-icons/expander_close_holo_light.9.png",
		"./images/jqm-icons/expander_open_holo_light.9.png",
		"./images/icons/ic_action_home.png",
		"./images/icons/ic_action_info.png",
		"./images/icons/ic_action_list_header.png",
		"./images/icons/ic_action_overflow_header.png",
		"./images/icons/ic_action_share_header.png",
		"./images/icons/ic_launcher_full_arrow.png",
		"./images/icons/ic_launcher_full_menu.png",
		"./images/icons/ic_launcher_full_menu_opened.png",
		"./images/icons/ic_launcher_full_noarrow.png",
		"./images/icons/ic_launcher_small_arrow.png"
	);
}
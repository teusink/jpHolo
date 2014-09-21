// JSLint, include this before tests
// var cordova, window, toast, $, document, handleAndroidServiceSuccess, handleAndroidServiceError, updateView, handleAndroidPreferences, toggleTimerButtons, disableServiceButtons, emptyCallback;

/* PhoneGap plugin services functions */

// Android Service
function androidServiceHandler(action, input) {
	if (window.phonegapExcluded === false) {
		var androidservice = cordova.require('cordova/plugin/androidservice');
		if (action === "getStatus") {
			androidservice.getStatus(
				function (r) { handleAndroidServiceSuccess(r); },
				function (e) { handleAndroidServiceError(e); }
			);
		} else if (action === "runOnce") {
			androidservice.runOnce(
				function (r) { handleAndroidServiceSuccess(r); },
				function (e) { handleAndroidServiceError(e); }
			);
		} else if (action === "startService") {
			androidservice.startService(
				function (r) { handleAndroidServiceSuccess(r); },
				function (e) { handleAndroidServiceError(e); }
			);
		} else if (action === "stopService") {
			androidservice.stopService(
				function (r) { handleAndroidServiceSuccess(r); },
				function (e) { handleAndroidServiceError(e); }
			);
		} else if (action === "registerForBootStart") {
			androidservice.registerForBootStart(
				function (r) { handleAndroidServiceSuccess(r); },
				function (e) { handleAndroidServiceError(e); }
			);
		} else if (action === "deregisterForBootStart") {
			androidservice.deregisterForBootStart(
				function (r) { handleAndroidServiceSuccess(r); },
				function (e) { handleAndroidServiceError(e); }
			);
		} else if (action === "enableTimer") {
			androidservice.enableTimer(
				input,
				function (r) { handleAndroidServiceSuccess(r); },
				function (e) { handleAndroidServiceError(e); }
			);
		} else if (action === "preSetTimer") {
			toast('Setting service timer interval to: ' + input + ' ms.', 'short');
			switch (input) {
			case 60000:
				androidServiceHandler("enableTimer", 60000);
				break;
			case 1800000:
				androidServiceHandler("enableTimer", 1800000);
				break;
			case 3600000:
				androidServiceHandler("enableTimer", 3600000);
				break;
			case 21600000:
				androidServiceHandler("enableTimer", 21600000);
				break;
			case 43200000:
				androidServiceHandler("enableTimer", 43200000);
				break;
			case 86400000:
				androidServiceHandler("enableTimer", 86400000);
				break;
			default:
				androidServiceHandler("enableTimer", 86400000);
				break;
			}
		} else if (action === "disableTimer") {
			androidservice.disableTimer(
				function (r) { handleAndroidServiceSuccess(r); },
				function (e) { handleAndroidServiceError(e); }
			);
		}
	}
}
// handlers for service
function handleAndroidServiceError(data) {
	console.error("PhoneGap Plugin: AndroidService: Error: " + data.ErrorMessage);
	if ($.mobile.activePage.is('#servicePage')) {
		updateView(data);
	}
}
function handleAndroidServiceSuccess(data) {
	handleAndroidPreferences("get", window.androidPrefsLib, "serviceStatus", "", function (prefValue) {
		if (!data.ServiceRunning && prefValue === "on") {
			console.info("PhoneGap Plugin: AndroidService: started service, because it should be running.");
			androidServiceHandler("startService", "none");
		} else if (data.ServiceRunning && prefValue === "off") {
			androidServiceHandler("stopService", "none");
		}
		if ($.mobile.activePage.is('#servicePage')) {
			updateView(data);
		}
	});
}

// service view page
function updateView(data) {
	var currentTimerMilliseconds,
		timeDuration;
	if (data.Configuration !== null) {
		// nothing needed here, because we use AndroidPreferences
	} else if (data.Configuration === null) {
		// nothing needed here, because we use AndroidPreferences
	}
	if (data.ServiceRunning) {
		$('#serviceStatus').val('on');
		$('#serviceStatus').flipswitch('refresh');
		$('#serviceBootStatus').flipswitch("enable");
		$('#serviceTimer').flipswitch("enable");
		$('#serviceToastDuration').flipswitch("enable");
		$('#serviceRunOnce').button("enable");
		if (data.TimerEnabled) {
			try {
				currentTimerMilliseconds = data.TimerMilliseconds;
			} catch (err5) {
				currentTimerMilliseconds = 0;
			}
			$('#serviceTimer').val('on');
			$('#serviceTimer').flipswitch('refresh');
			if (currentTimerMilliseconds === 60000) {
				toggleTimerButtons('disable', 'enable', 'enable', 'enable', 'enable', 'enable');
				timeDuration = '1 minute';
			} else if (currentTimerMilliseconds === 1800000) {
				toggleTimerButtons('enable', 'disable', 'enable', 'enable', 'enable', 'enable');
				timeDuration = '30 minutes';
			} else if (currentTimerMilliseconds === 3600000) {
				toggleTimerButtons('enable', 'enable', 'disable', 'enable', 'enable', 'enable');
				timeDuration = '1 hour';
			} else if (currentTimerMilliseconds === 21600000) {
				toggleTimerButtons('enable', 'enable', 'enable', 'disable', 'enable', 'enable');
				timeDuration = '6 hours';
			} else if (currentTimerMilliseconds === 43200000) {
				toggleTimerButtons('enable', 'enable', 'enable', 'enable', 'disable', 'enable');
				timeDuration = '12 hours';
			} else if (currentTimerMilliseconds === 86400000) {
				toggleTimerButtons('enable', 'enable', 'enable', 'enable', 'enable', 'disable');
				timeDuration = '1 day';
			} else {
				toggleTimerButtons('enable', 'enable', 'enable', 'enable', 'enable', 'enable');
				timeDuration = 'not set';
			}
			$('#timerDurationStatus').empty().append("Current interval: " + timeDuration);
		} else {
			$('#serviceTimer').val('off');
			$('#serviceTimer').flipswitch('refresh');
			toggleTimerButtons('disable', 'disable', 'disable', 'disable', 'disable', 'disable');
			$('#timerDurationStatus').empty().append("No timer interval active.");
		}
		if (data.RegisteredForBootStart) {
			$('#serviceBootStatus').val('on');
			$('#serviceBootStatus').flipswitch('refresh');
		} else {
			$('#serviceBootStatus').val('off');
			$('#serviceBootStatus').flipswitch('refresh');
		}
		handleAndroidPreferences("get", window.androidPrefsLib, "serviceToastDuration", "", function (toastDurPref) {
			if (toastDurPref === "long") {
				$('#serviceToastDuration').val('long');
				$('#serviceToastDuration').flipswitch('refresh');
			} else {
				$('#serviceToastDuration').val('short');
				$('#serviceToastDuration').flipswitch('refresh');
			}
		});
	} else {
		disableServiceButtons();
		toggleTimerButtons('disable', 'disable', 'disable', 'disable', 'disable', 'disable');
	}
}

// toggle state of timer buttons
function toggleTimerButtons(b1, b2, b3, b4, b5, b6) {
	$('#toggleTimer1').button(b1);
	$('#toggleTimer2').button(b2);
	$('#toggleTimer3').button(b3);
	$('#toggleTimer4').button(b4);
	$('#toggleTimer5').button(b5);
	$('#toggleTimer6').button(b6);
}

// disabling all buttons
function disableServiceButtons() {
	// set flipswitch value
	$('#serviceStatus').val('off');
	$('#serviceStatus').flipswitch('refresh');
	$('#serviceBootStatus').val('off');
	$('#serviceBootStatus').flipswitch('refresh');
	$('#serviceTimer').val('off');
	$('#serviceTimer').flipswitch('refresh');
	$('#serviceToastDuration').val('off');
	$('#serviceToastDuration').flipswitch('refresh');
	// disable flipswitch/buttons
	$('#serviceBootStatus').flipswitch("disable");
	$('#serviceTimer').flipswitch("disable");
	$('#serviceToastDuration').flipswitch("disable");
	$('#serviceRunOnce').button("disable");
}

// init service settings flipswitches
function initServiceSettings() {
	$("#serviceStatus").off("change").on("change", function () {
		if ($('#serviceStatus').val() === 'on') {
			// console.info("PhoneGap Plugin: Android Service: started service.");
			handleAndroidPreferences("set", window.androidPrefsLib, "serviceStatus", "on", function () {
				androidServiceHandler("startService", "none");
			});
		} else if ($('#serviceStatus').val() === 'off') {
			// console.info("PhoneGap Plugin: Android Service: stop service.");
			handleAndroidPreferences("set", window.androidPrefsLib, "serviceStatus", "off", function () {
				androidServiceHandler("stopService", "none");
			});
		}
	});
	$("#serviceBootStatus").off("change").on("change", function () {
		if ($('#serviceBootStatus').val() === 'on') {
			// console.info("PhoneGap Plugin: Android Service: registered service for boot start.");
			androidServiceHandler("registerForBootStart", "none");
		} else if ($('#serviceBootStatus').val() === 'off') {
			// console.info("PhoneGap Plugin: Android Service: de-registered service for boot start.");
			androidServiceHandler("deregisterForBootStart", "none");
		}
	});
	$("#serviceTimer").off("change").on("change", function () {
		if ($('#serviceTimer').val() === 'on') {
			// console.info("PhoneGap Plugin: Android Service: enable service timer.");
			androidServiceHandler("enableTimer", 86400000);
		} else if ($('#serviceTimer').val() === 'off') {
			// console.info("PhoneGap Plugin: Android Service: disable service timer.");
			androidServiceHandler("disableTimer", "none");
		}
	});
	$('#toggleTimer1').off("click").on("click",
		function () {
			// console.info("PhoneGap Plugin: Android Service: set service timer to: 60000.");
			androidServiceHandler('preSetTimer', 60000);
		});
	$('#toggleTimer2').off("click").on("click",
		function () {
			// console.info("PhoneGap Plugin: Android Service: set service timer to: 1800000.");
			androidServiceHandler('preSetTimer', 1800000);
		});
	$('#toggleTimer3').off("click").on("click",
		function () {
			// console.info("PhoneGap Plugin: Android Service: set service timer to: 3600000.");
			androidServiceHandler('preSetTimer', 3600000);
		});
	$('#toggleTimer4').off("click").on("click",
		function () {
			// console.info("PhoneGap Plugin: Android Service: set service timer to: 21600000.");
			androidServiceHandler('preSetTimer', 21600000);
		});
	$('#toggleTimer5').off("click").on("click",
		function () {
			// console.info("PhoneGap Plugin: Android Service: set service timer to: 43200000.");
			androidServiceHandler('preSetTimer', 43200000);
		});
	$('#toggleTimer6').off("click").on("click",
		function () {
			// console.info("PhoneGap Plugin: Android Service: set service timer to: 86400000.");
			androidServiceHandler('preSetTimer', 86400000);
		});
	$('#serviceToastDuration').off("change").on("change",
		function () {
			handleAndroidPreferences("get", window.androidPrefsLib, "serviceToastDuration", "", function (prefValue) {
				if (prefValue === "long") {
					handleAndroidPreferences("set", window.androidPrefsLib, "serviceToastDuration", "short", emptyCallback);
				} else {
					handleAndroidPreferences("set", window.androidPrefsLib, "serviceToastDuration", "long", emptyCallback);
				}
			});
		});
	$('#serviceRunOnce').off("click").on("click",
		function () {
			// You could also use the option setConfig here. In the Java code you will have to handle the preferences then. But because of the plugin AndroidPreferences in jpHolo, we will use that.
			// console.info("PhoneGap Plugin: Android Service: run the service once.");
			androidServiceHandler('runOnce', "none");
		});
}

/* END PhoneGap plugins services functions */
// JSLint, include this before tests
// var window, cordova;

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
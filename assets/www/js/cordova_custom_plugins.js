/* PhoneGap plugin constructors */

// AndroidService
cordova.define('cordova/plugin/androidservice', function (require, exports, module) {
	CreateBackgroundService('org.teusink.jpholo.AndroidService', require, exports, module); // JSLint error "Missing 'new' is oke here 
});

// AndroidPreferences
cordova.define("cordova/plugin/androidpreferences", function (require, exports, module) {
    var exec = require("cordova/exec");
	module.exports = {
        get: function (message, win, fail) {
			exec(win, fail, "AndroidPreferences", "get", [message]);
		},
		set: function (message, win, fail) {
			exec(win, fail, "AndroidPreferences", "set", [message]);
		}
    };
});

// Appstore intents
cordova.define("cordova/plugin/appstore", function (require, exports, module) {
    var exec = require("cordova/exec");
	module.exports = {
        show: function (message, win, fail) {
			exec(win, fail, "Appstore", "show", [message]);
		}
    };
});

// PackageVersion
cordova.define("cordova/plugin/packageversion", function (require, exports, module) {
	var exec = require("cordova/exec");
	module.exports = {
		get: function (win, fail) {
			exec(win, fail, "PackageVersion", "get", []);
		}
	};
});

// PreferredScreenSize
cordova.define("cordova/plugin/preferredscreensize", function (require, exports, module) {
	var exec = require("cordova/exec");
	module.exports = {
		getSystem: function (win, fail) {
			exec(win, fail, "PreferredScreenSize", "getSystem", []);
		}
	};
});

// Share
cordova.define("cordova/plugin/share", function (require, exports, module) {
    var exec = require("cordova/exec");
	module.exports = {
        show: function (message, win, fail) {
			exec(win, fail, "Share", "show", [message]);
		}
    };
});

// Toasts
cordova.define("cordova/plugin/toasts", function (require, exports, module) {
    var exec = require("cordova/exec");
	module.exports = {
        showShort: function (message, win, fail) {
            exec(win, fail, "Toasts", "show_short", [message]);
        },
        showLong: function (message, win, fail) {
            exec(win, fail, "Toasts", "show_long", [message]);
        },
        cancel: function (win, fail) {
            exec(win, fail, "Toasts", "cancel", []);
        }
    };
});
/* END PhoneGap constructors */
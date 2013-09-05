/* PhoneGap plugin constructors */
// Appstore intents
cordova.define("cordova/plugin/appstore", function (require, exports, module) {
    var exec = require("cordova/exec");
	module.exports = {
        show: function (message, win, fail) {
			exec(win, fail, "Appstore", "show", [message]);
		}
    };
});

// HomeButton
cordova.define("cordova/plugin/homebutton", function (require, exports, module) {
    var exec = require("cordova/exec");
	module.exports = {
        show: function (win, fail) {
			exec(win, fail, "HomeButton", "show", []);
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
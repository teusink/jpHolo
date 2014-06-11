package org.teusink.plugins;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;

import android.content.res.Configuration;
import android.util.Log;

public class PreferredScreenSize extends CordovaPlugin {

	public static final String LOG_PROV = "jpHoloLog";
	public static final String LOG_NAME = "PreferredScreenSize Plugin: ";

	@Override
	public boolean execute(final String action, final JSONArray args,
			final CallbackContext callbackContext) {
		cordova.getThreadPool().execute(new Runnable() {
			@Override
			public void run() {
				if (action.equals("getSystem")) {
					final String currentScreenSize = checkScreenSize();
					if (currentScreenSize != null && currentScreenSize != "") {
						callbackContext.sendPluginResult(new PluginResult(
								PluginResult.Status.OK, currentScreenSize));
					} else {
						callbackContext.sendPluginResult(new PluginResult(
								PluginResult.Status.OK, "normal"));
					}
				} else {
					Log.e(LOG_PROV, LOG_NAME + "Error: "
							+ PluginResult.Status.INVALID_ACTION);
					callbackContext.sendPluginResult(new PluginResult(
							PluginResult.Status.INVALID_ACTION));
				}
			}
		});
		return true;
	}

	private String checkScreenSize() {
		String screenSize = "normal";
		if ((cordova.getActivity().getResources().getConfiguration().screenLayout & Configuration.SCREENLAYOUT_SIZE_MASK) == Configuration.SCREENLAYOUT_SIZE_XLARGE) {
			screenSize = "xlarge";
		} else if ((cordova.getActivity().getResources().getConfiguration().screenLayout & Configuration.SCREENLAYOUT_SIZE_MASK) == Configuration.SCREENLAYOUT_SIZE_LARGE) {
			screenSize = "large";
		} else if ((cordova.getActivity().getResources().getConfiguration().screenLayout & Configuration.SCREENLAYOUT_SIZE_MASK) == Configuration.SCREENLAYOUT_SIZE_NORMAL) {
			screenSize = "normal";
		} else if ((cordova.getActivity().getResources().getConfiguration().screenLayout & Configuration.SCREENLAYOUT_SIZE_MASK) == Configuration.SCREENLAYOUT_SIZE_SMALL) {
			screenSize = "small";
		} else {
			screenSize = "normal";
		}
		return screenSize;
	}
}
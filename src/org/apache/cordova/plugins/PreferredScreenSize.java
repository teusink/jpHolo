package org.apache.cordova.plugins;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;

import android.content.res.Configuration;
import android.util.Log;

public class PreferredScreenSize extends CordovaPlugin {

	public static final String LOG_PROV = "PhoneGapLog";
	public static final String LOG_NAME = "PreferredScreenSize Plugin";

	@Override
	public boolean execute(String action, JSONArray args, CallbackContext callbackContext) {
		if (action.equals("get")) {
			String currentScreenSize = checkScreenSize();
			if (currentScreenSize != null && currentScreenSize != "") {
				callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK, currentScreenSize));
			} else {
				callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK, "normal"));
			}
			return true;
		} else {
			Log.e(LOG_PROV, LOG_NAME + ": Error: " + PluginResult.Status.INVALID_ACTION);
			callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.INVALID_ACTION));
			return false;
		}
	}

	private String checkScreenSize() {
		String screenSize;
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
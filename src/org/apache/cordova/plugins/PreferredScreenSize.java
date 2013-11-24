package org.apache.cordova.plugins;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.content.SharedPreferences;
import android.content.res.Configuration;
import android.util.Log;

public class PreferredScreenSize extends CordovaPlugin {

	public static final String PREFS_NAME = "DroidPapersPrefs";
	public static final String LOG_PROV = "PhoneGapLog";
	public static final String LOG_NAME = "PreferredScreenSize Plugin";

	@Override
	public boolean execute(final String action, final JSONArray args, final CallbackContext callbackContext) {
		cordova.getThreadPool().execute(new Runnable() {
			@Override
			public void run() {
				try {
					SharedPreferences settings = cordova.getActivity().getSharedPreferences(PREFS_NAME, 0);
					SharedPreferences.Editor editor = settings.edit();
					if (action.equals("set")) {
						JSONObject jo = args.getJSONObject(0);
						String screenSize = jo.getString("screenSize");
						if (screenSize != null) {
							editor.putString("preferScreenSize", screenSize);
						} else {
							editor.putString("preferScreenSize", "auto");
						}
						editor.commit();
						callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK, false));
					} else if (action.equals("get")) {
						String currentScreenSize = settings.getString("preferScreenSize", "");
						if (currentScreenSize != null && currentScreenSize != "") {
							callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK, currentScreenSize));
						} else {
							callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK, "auto"));
						}
					} else if (action.equals("getSystem")) {
						String currentScreenSize = checkScreenSize();
						if (currentScreenSize != null && currentScreenSize != "") {
							callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK, currentScreenSize));
						} else {
							callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK, "normal"));
						}
					} else {
						Log.e(LOG_PROV, LOG_NAME + ": Error: " + PluginResult.Status.INVALID_ACTION);
						callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.INVALID_ACTION));
					}
				} catch (JSONException e) {
					Log.e(LOG_PROV, LOG_NAME + ": Error: " + PluginResult.Status.JSON_EXCEPTION);
					e.printStackTrace();
					callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.JSON_EXCEPTION));
				}
			}
		});
		return true;
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
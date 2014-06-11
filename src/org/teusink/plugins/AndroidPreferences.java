package org.teusink.plugins;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.content.Context;
import android.content.SharedPreferences;
import android.util.Log;

public class AndroidPreferences extends CordovaPlugin {

	public static final String LOG_PROV = "jpHoloLog";
	public static final String LOG_NAME = "AndroidPreferences Plugin: ";

	@Override
	public boolean execute(final String action, final JSONArray args,
			final CallbackContext callbackContext) {
		cordova.getThreadPool().execute(new Runnable() {
			@Override
			public void run() {
				try {
					final JSONObject params = args.getJSONObject(0);
					final String preferenceLib = params
							.getString("preferenceLib");
					final String preferenceName = params
							.getString("preferenceName");
					final String preferenceValue = params
							.getString("preferenceValue");
					if (preferenceLib != null && preferenceName != null
							&& preferenceValue != null
							&& !preferenceLib.equals("")
							&& !preferenceName.equals("")) {
						final SharedPreferences settings = cordova
								.getActivity().getSharedPreferences(
										preferenceLib, Context.MODE_PRIVATE);
						final SharedPreferences.Editor editor = settings.edit();
						if (action.equals("set") && settings != null
								&& editor != null) {
							editor.putString(preferenceName, preferenceValue);
							editor.commit();
							callbackContext.sendPluginResult(new PluginResult(
									PluginResult.Status.OK));
						} else if (action.equals("get") && settings != null
								&& editor != null) {
							final String returnValue = settings.getString(
									preferenceName, "");
							callbackContext.sendPluginResult(new PluginResult(
									PluginResult.Status.OK, returnValue));
						} else {
							Log.e(LOG_PROV, LOG_NAME + "Error: "
									+ PluginResult.Status.INVALID_ACTION);
							callbackContext.sendPluginResult(new PluginResult(
									PluginResult.Status.INVALID_ACTION));
						}
					} else {
						Log.e(LOG_PROV, LOG_NAME + "Error: "
								+ PluginResult.Status.ERROR);
						callbackContext.sendPluginResult(new PluginResult(
								PluginResult.Status.ERROR));
					}
				} catch (final JSONException e) {
					e.printStackTrace();
					Log.e(LOG_PROV, LOG_NAME + "Error: "
							+ PluginResult.Status.JSON_EXCEPTION);
					callbackContext.sendPluginResult(new PluginResult(
							PluginResult.Status.JSON_EXCEPTION));
				}
			}
		});
		return true;
	}
}
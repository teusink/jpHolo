package org.apache.cordova.plugins;

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

	public static final String LOG_PROV = "PhoneGapLog";
	public static final String LOG_NAME = "AndroidPreferences Plugin";

	@Override
	public boolean execute(final String action, final JSONArray args, final CallbackContext callbackContext) {
		cordova.getThreadPool().execute(new Runnable() {
			@Override
			public void run() {
				String preferenceLib = "";
				String preferenceName = "";
				String preferenceValue = "";
				SharedPreferences settings = null;
				SharedPreferences.Editor editor = null;
				try {
					JSONObject params = args.getJSONObject(0);
					preferenceLib = params.getString("preferenceLib");
					preferenceName = params.getString("preferenceName");
					preferenceValue = params.getString("preferenceValue");
					if (preferenceLib != null && preferenceName != null && preferenceValue != null && preferenceLib != "" && preferenceName != "") {
						settings = cordova.getActivity().getSharedPreferences(preferenceLib, Context.MODE_PRIVATE);
						editor = settings.edit();
					} else {
						Log.e(LOG_PROV, LOG_NAME + ": Error: " + PluginResult.Status.ERROR);
						callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.ERROR));
					}
					if (action.equals("set") && settings != null && editor != null) {
						editor.putString(preferenceName, preferenceValue);
						editor.commit();
						callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK));
					} else if (action.equals("get") && settings != null && editor != null) {
						String returnValue = settings.getString(preferenceName, "");
						callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK, returnValue));
					} else {
						Log.e(LOG_PROV, LOG_NAME + ": Error: " + PluginResult.Status.INVALID_ACTION);
						callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.INVALID_ACTION));
					}
				} catch (JSONException e) {
					e.printStackTrace();
					Log.e(LOG_PROV, LOG_NAME + ": Error: " + PluginResult.Status.JSON_EXCEPTION);
					callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.JSON_EXCEPTION));
				}
			}
		});
		return true;
	}
}
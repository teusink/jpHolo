package org.apache.cordova.plugins;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;

import android.content.Intent;
import android.util.Log;

public class HomeButton extends CordovaPlugin {

	public static final String LOG_PROV = "PhoneGapLog";
	public static final String LOG_NAME = "HomeButton Plugin";

	@Override
	public boolean execute(final String action, final JSONArray args, final CallbackContext callbackContext) {
		cordova.getThreadPool().execute(new Runnable() {
			@Override
			public void run() {
				Log.d(LOG_PROV, LOG_NAME + ": Simulated home button.");
				Intent i = new Intent(Intent.ACTION_MAIN);
				i.addCategory(Intent.CATEGORY_HOME);
				cordova.getActivity().startActivityForResult(i, 0);
				callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK));
			}
		});
		return true;
	}

}

package org.teusink.plugins;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;

import android.util.Log;
import android.widget.Toast;

public class Toasts extends CordovaPlugin {

	public static final String LOG_PROV = "jpHoloLog";
	public static final String LOG_NAME = "Toasts Plugin: ";

	private Toast toast = null;

	@Override
	public boolean execute(final String action, final JSONArray args,
			final CallbackContext callbackContext) {
		cordova.getThreadPool().execute(new Runnable() {
			@Override
			public void run() {
				if (action.equals("cancel")) {
					cancelToast();
				} else {
					try {
						final String message = args.getString(0);
						if (action.equals("show_long")) {
							showToast(message, Toast.LENGTH_LONG);
						} else {
							showToast(message, Toast.LENGTH_SHORT);
						}
					} catch (final JSONException e) {
						Log.e(LOG_PROV, LOG_NAME + "Error: "
								+ PluginResult.Status.JSON_EXCEPTION);
						e.printStackTrace();
						callbackContext.sendPluginResult(new PluginResult(
								PluginResult.Status.JSON_EXCEPTION));
					}
				}
				callbackContext.sendPluginResult(new PluginResult(
						PluginResult.Status.OK));
			}
		});
		return true;
	}

	private void cancelToast() {
		cordova.getActivity().runOnUiThread(new Runnable() {
			@Override
			public void run() {
				if (toast != null) {
					toast.cancel();
				}
			}
		});
	}

	private void showToast(final String message, final int length) {
		cordova.getActivity().runOnUiThread(new Runnable() {
			@Override
			public void run() {
				toast = Toast.makeText(cordova.getActivity(), message, length);
				toast.show();
			}
		});
	}
}
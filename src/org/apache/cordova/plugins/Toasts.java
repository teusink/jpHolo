package org.apache.cordova.plugins;

import org.apache.cordova.api.CallbackContext;
import org.apache.cordova.api.CordovaPlugin;
import org.apache.cordova.api.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;

import android.util.Log;
import android.widget.Toast;

public class Toasts extends CordovaPlugin {

	private static final String LONG_TOAST_ACTION = "show_long";
	private static final String CANCEL_ACTION = "cancel";
	private static final int TOAST_MESSAGE_INDEX = 0;
	private Toast toast = null;

	@Override
	public boolean execute(String action, JSONArray args, CallbackContext callbackContext) {
		if (action.equals(CANCEL_ACTION)) {
			cancelToast();
		} else {
			String message;
			try {
				message = args.getString(TOAST_MESSAGE_INDEX);
			} catch (JSONException e) {
				Log.e("PhoneGapLog", "Toasts Plugin: Error: " + PluginResult.Status.JSON_EXCEPTION);
				e.printStackTrace();
				callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.JSON_EXCEPTION));
				return false;
			}
			if (action.equals(LONG_TOAST_ACTION)) {
				showToast(message, Toast.LENGTH_LONG);
			} else {
				showToast(message, Toast.LENGTH_SHORT);
			}
		}
		callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK));
		return true;
	}

	private void cancelToast() {
		cordova.getActivity().runOnUiThread(new Runnable() {
			public void run() {
				if (toast != null) {
					toast.cancel();
				}
			}
		});
	}

	private void showToast(final String message, final int length) {
		cordova.getActivity().runOnUiThread(new Runnable() {
			public void run() {
				toast = Toast.makeText(cordova.getActivity(), message, length);
				toast.show();
			}
		});
	}
}
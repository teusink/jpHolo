package org.teusink.plugins;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.content.Intent;
import android.util.Log;

public class Share extends CordovaPlugin {

	public static final String LOG_PROV = "jpHoloLog";
	public static final String LOG_NAME = "Share Plugin: ";

	@Override
	public boolean execute(final String action, final JSONArray args,
			final CallbackContext callbackContext) {
		cordova.getThreadPool().execute(new Runnable() {
			@Override
			public void run() {
				try {
					final JSONObject jo = args.getJSONObject(0);
					doSendIntent(jo.getString("subject"), jo.getString("text"));
					callbackContext.sendPluginResult(new PluginResult(
							PluginResult.Status.OK));
				} catch (final JSONException e) {
					Log.e(LOG_PROV, LOG_NAME + "Error: "
							+ PluginResult.Status.JSON_EXCEPTION);
					e.printStackTrace();
					callbackContext.sendPluginResult(new PluginResult(
							PluginResult.Status.JSON_EXCEPTION));
				}
			}
		});
		return true;
	}

	private void doSendIntent(final String subject, final String text) {
		final Intent sendIntent = new Intent(android.content.Intent.ACTION_SEND);
		sendIntent.setType("text/plain");
		sendIntent.putExtra(android.content.Intent.EXTRA_SUBJECT, subject);
		sendIntent.putExtra(android.content.Intent.EXTRA_TEXT, text);
		cordova.getActivity().startActivityForResult(sendIntent, 0);
	}
}

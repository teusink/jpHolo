package org.teusink.plugins;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;

import android.content.pm.PackageInfo;
import android.content.pm.PackageManager.NameNotFoundException;
import android.util.Log;

public class PackageVersion extends CordovaPlugin {

	public static final String LOG_PROV = "jpHoloLog";
	public static final String LOG_NAME = "PackageVersion Plugin: ";

	@Override
	public boolean execute(final String action, final JSONArray args,
			final CallbackContext callbackContext) {
		if (action.equals("get")) {
			cordova.getThreadPool().execute(new Runnable() {
				@Override
				public void run() {
					final String version = getPackageVersion();
					if (version != null) {
						callbackContext.sendPluginResult(new PluginResult(
								PluginResult.Status.OK, version));
					} else {
						callbackContext.sendPluginResult(new PluginResult(
								PluginResult.Status.OK, false));
					}
				}
			});
			return true;
		} else {
			Log.e(LOG_PROV, LOG_NAME + "Error: "
					+ PluginResult.Status.INVALID_ACTION);
			callbackContext.sendPluginResult(new PluginResult(
					PluginResult.Status.INVALID_ACTION));
			return false;
		}
	}

	private String getPackageVersion() {
		String version = "0.0.0";
		try {
			final PackageInfo pInfo = cordova.getActivity().getPackageManager()
					.getPackageInfo("org.teusink.jpholo", 0);
			version = pInfo.versionName;
		} catch (final NameNotFoundException e) {
			version = "0.0.0";
		}
		return version;
	}
}
package org.apache.cordova.plugins;

import org.apache.cordova.api.CallbackContext;
import org.apache.cordova.api.CordovaPlugin;
import org.apache.cordova.api.PluginResult;
import org.json.JSONArray;

import android.content.pm.PackageInfo;
import android.content.pm.PackageManager.NameNotFoundException;
import android.util.Log;

public class PackageVersion extends CordovaPlugin {

	@Override
	public boolean execute(String action, JSONArray args, CallbackContext callbackContext) {
		if (action.equals("get")) {
			String version = getPackageVersion();
			if (version != null) {
				callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK, version));
			} else {
				callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK, false));
			}
			return true;
		} else {
			Log.e("PhoneGapLog", "PackageVersion Plugin: Error: " + PluginResult.Status.INVALID_ACTION);
			callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.INVALID_ACTION));
			return false;
		}
	}

	private String getPackageVersion() {
		PackageInfo pInfo;
		String version;
		try {
			pInfo = cordova.getActivity().getPackageManager().getPackageInfo("org.teusink.jpholo", 0);
			version = pInfo.versionName;
		} catch (NameNotFoundException e) {
			version = "0";
		}
		return version;
	}
}
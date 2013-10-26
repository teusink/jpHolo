package org.apache.cordova.plugins;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.util.Log;

public class Appstore extends CordovaPlugin {

	public static final String LOG_PROV = "PhoneGapLog";
	public static final String LOG_NAME = "Appstore Plugin";

	@Override
	public boolean execute(String action, JSONArray args, CallbackContext callbackContext) {
		try {
			JSONObject jo = args.getJSONObject(0);
			String appstoreLink = jo.getString("link");
			String appstoreType = jo.getString("type");
			if (action.equals("show")) {
				Intent intent = new Intent(Intent.ACTION_VIEW);
				if (appInstalledOrNot("com.android.vending")) {
					if (appstoreType.equals("app")) {
						// org.teusink.droidpapers
						intent.setData(Uri.parse("market://details?id=" + appstoreLink));
					} else if (appstoreType.equals("pub")) {
						// Teusink.org
						intent.setData(Uri.parse("market://search?q=pub:" + appstoreLink));
					}
				} else {
					if (appstoreType.equals("app")) {
						// org.teusink.droidpapers
						intent.setData(Uri.parse("https://play.google.com/store/apps/details?id=" + appstoreLink));
					} else if (appstoreType.equals("pub")) {
						// Teusink.org
						intent.setData(Uri.parse("https://play.google.com/store/apps/developer?id=" + appstoreLink));
					}
				}
				this.cordova.startActivityForResult(this, intent, 0);
				callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK, false));
				return true;
			} else {
				Log.e(LOG_PROV, LOG_NAME + ": Error: " + PluginResult.Status.INVALID_ACTION);
				callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.INVALID_ACTION));
				return false;
			}
		} catch (JSONException e) {
			Log.e(LOG_PROV, LOG_NAME + ": Error: " + PluginResult.Status.JSON_EXCEPTION);
			e.printStackTrace();
			callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.JSON_EXCEPTION));
			return false;
		}
	}

	private boolean appInstalledOrNot(String uri)
	{
		PackageManager manager = cordova.getActivity().getPackageManager();
		boolean app_installed = false;
		try {
			manager.getPackageInfo(uri, PackageManager.GET_ACTIVITIES);
			app_installed = true;
		} catch (PackageManager.NameNotFoundException e) {
			app_installed = false;
		}
		return app_installed ;
	}
}
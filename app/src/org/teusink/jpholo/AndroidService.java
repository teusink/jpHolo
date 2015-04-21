package org.teusink.jpholo;

import org.json.JSONException;
import org.json.JSONObject;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.SharedPreferences;
import android.os.Handler;
import android.util.Log;
import android.widget.Toast;

import com.red_folder.phonegap.plugin.backgroundservice.BackgroundService;

@SuppressLint("DefaultLocale")
public class AndroidService extends BackgroundService {

	private String configSetting = "";

	public static final String PREFS_NAME = "jpHoloSharedPreferences";
	public static final String LOG_PROV = "jpHoloLog";
	public static final String LOG_NAME = "Background Service: ";

	Handler handler = new Handler();

	@Override
	protected JSONObject doWork() {
		final JSONObject result = new JSONObject();
		final String msg = "Service executed.";
		runService();
		try {
			result.put("Message", msg);
		} catch (final JSONException e) {
			Log.e(LOG_PROV, LOG_NAME + "JSONException Error");
			e.printStackTrace();
		}
		Log.d(LOG_PROV, LOG_NAME + msg);
		return result;
	}

	@Override
	protected JSONObject getConfig() {
		final JSONObject result = new JSONObject();
		try {
			result.put("mConfig", this.configSetting);
		} catch (final JSONException e) {
			Log.e(LOG_PROV, LOG_NAME + "JSONException Error");
			e.printStackTrace();
		}
		return result;
	}

	@Override
	protected void setConfig(final JSONObject config) {
		try {
			if (config.has("mConfig")) {
				this.configSetting = config.getString("mConfig");
			}
		} catch (final JSONException e) {
			Log.e(LOG_PROV, LOG_NAME + "JSONException Error");
			e.printStackTrace();
		}

	}

	@Override
	protected JSONObject initialiseLatestResult() {
		return null;
	}

	@Override
	protected void onTimerEnabled() {
	}

	@Override
	protected void onTimerDisabled() {
	}

	private void runService() {
		final SharedPreferences settings = getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
		String serviceToastDuration = settings.getString("serviceToastDuration", "");
		if (!serviceToastDuration.equals("long")) {
			serviceToastDuration = "short";
		}
		showToast("Service executed with toast duration: " + serviceToastDuration, serviceToastDuration);
	}

	private void showToast(final String message, final String duration) {
		handler.post(new Runnable() {
			@Override
			public void run() {
				Toast toast;
				if(duration.equals("long")) {
					toast = Toast.makeText(getBaseContext(), message, Toast.LENGTH_LONG);
				} else {
					toast = Toast.makeText(getBaseContext(), message, Toast.LENGTH_SHORT);
				}
				toast.show();
			}
		});
	}

}

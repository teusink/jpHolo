package org.teusink.jpholo;

import org.apache.cordova.CordovaActivity;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.SharedPreferences;
import android.content.pm.ApplicationInfo;
import android.content.res.Configuration;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.webkit.WebView;

public class StartActivityUri extends CordovaActivity {

	public static final String PREFS_NAME = "jpHoloSharedPreferences";

	@SuppressLint("NewApi")
	@Override
	public void onCreate(final Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		super.init();
		if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
			if ( 0 != ( getApplicationInfo().flags &= ApplicationInfo.FLAG_DEBUGGABLE ) ) {
				WebView.setWebContentsDebuggingEnabled(true);
			}
		}
		final SharedPreferences settings = getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
		final SharedPreferences.Editor editor = settings.edit();
		final Uri data = getIntent().getData();
		// final String scheme = data.getScheme(); // Not needed
		// final String host = data.getHost(); // Not needed
		// final String path = data.getPath(); // Not needed
		final String message = data.getQueryParameter("message");
		editor.putString("UriMessage", message);
		editor.commit();
		if (checkScreenSize().equals("large") || checkScreenSize().equals("xlarge")) {
			initiateApp("tablet");
		} else {
			initiateApp("smartphone");
		}
	}

	private void initiateApp(final String screenSize) {
		if (screenSize.equals("tablet")) {
			super.loadUrl("file:///android_asset/www/main.html");
		} else {
			super.loadUrl("file:///android_asset/www/main.html");
		}
	}

	private String checkScreenSize() {
		String screenSize = "normal";
		if ((getResources().getConfiguration().screenLayout & Configuration.SCREENLAYOUT_SIZE_MASK) == Configuration.SCREENLAYOUT_SIZE_XLARGE) {
			screenSize = "xlarge";
		} else if ((getResources().getConfiguration().screenLayout & Configuration.SCREENLAYOUT_SIZE_MASK) == Configuration.SCREENLAYOUT_SIZE_LARGE) {
			screenSize = "large";
		} else if ((getResources().getConfiguration().screenLayout & Configuration.SCREENLAYOUT_SIZE_MASK) == Configuration.SCREENLAYOUT_SIZE_NORMAL) {
			screenSize = "normal";
		} else if ((getResources().getConfiguration().screenLayout & Configuration.SCREENLAYOUT_SIZE_MASK) == Configuration.SCREENLAYOUT_SIZE_SMALL) {
			screenSize = "small";
		} else {
			screenSize = "normal";
		}
		return screenSize;
	}
}

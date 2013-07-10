package org.teusink.jpholo;

import org.apache.cordova.DroidGap;

import android.content.res.Configuration;
import android.os.Bundle;

public class StartActivity extends DroidGap {

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		super.init();
		if (checkScreenSize().equals("large") || checkScreenSize().equals("xlarge")) {
			initiateApp("tablet");
		} else {
			initiateApp("smartphone");
		}
	}

	private void initiateApp(String screenSize) {
		if (screenSize.equals("tablet")) {
			super.loadUrl("file:///android_asset/www/index_tablet.html");
		} else {
			super.loadUrl("file:///android_asset/www/index_smartphone.html");
		}
	}

	private String checkScreenSize() {
		String screenSize;
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

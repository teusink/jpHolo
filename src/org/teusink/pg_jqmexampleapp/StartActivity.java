package org.teusink.pg_jqmexampleapp;

import org.apache.cordova.DroidGap;

import android.content.res.Configuration;
import android.os.Bundle;

public class StartActivity extends DroidGap {

	@Override
	public void onCreate(Bundle savedInstanceState) {
		if (checkScreenSize().equals("large") || checkScreenSize().equals("xlarge")) {
			super.onCreate(savedInstanceState);
			super.init();
			super.loadUrl("file:///android_asset/www/index_tablet.html");
		} else {
			super.onCreate(savedInstanceState);
			super.init();
			super.loadUrl("file:///android_asset/www/index.html");
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

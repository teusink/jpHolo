jpHolo
======

<h2>What is jpHolo?</h2>

An application template based on jQuery Mobile and Cordova PhoneGap, featuring an Android Holo styled interface.

<h3>Features</h3>

- Application template based on jQuery Mobile and Cordova PhoneGap.
- Android Holo Theme (light theme, dark action bar).
- Navigation Drawer, header and footer in Holo style.
- Loading Animation in Holo style.
- Toast messages.
- Share Intent.
- Uri Intent.
- Google Play Store and Amazon Appstore Intent.
- Retrieve current package version that is set in the manifest file.

<h3>Requirements</h3>

- Android 4.0.0 (API 14) and higher.
- It is an Eclipse project, so you need to use Eclipse or convert the project to another IDE.

<h3>Included resources</h3>

- Gimp images files (XCF) to make your own PNG/JPG files.
- All HTML, CSS, and JavaScript sources.

<h2>PhoneGap instructions</h2>
- Setup a development environment. Follow this blog of mine to do that for Windows: http://www.teusink.eu/2013/07/guide-phonegap-3-android-windows.html
- Download this project.
- Import this project in Eclipse.
- Start developing!

<h3>PhoneGap examples</h3>

See my blog about this: http://www.teusink.eu/2013/04/android-example-app-with-phonegap-and.html
Working examples can be found here.
- jpHolo APK file: https://github.com/teusink/jpHolo/raw/master/app/res_sources/jpHolo.apk

<h3>Screenshots</h3>
![alt tag](https://github.com/teusink/jpHolo/blob/master/app/res_sources/screenshots/phone1.png)
![alt tag](https://github.com/teusink/jpHolo/blob/master/app/res_sources/screenshots/phone2.png)
![alt tag](https://github.com/teusink/jpHolo/blob/master/app/res_sources/screenshots/tablet1.png)
![alt tag](https://github.com/teusink/jpHolo/blob/master/app/res_sources/screenshots/tablet2.png)

<h2>Web instructions</h2>
- Set in main.html the value "window.phonegapExcluded" to true.
- Exclude the scripts that are mentioned below "<!-- Cordova PhoneGap -->". The scripts are: cordova.js, backgroundService-x.x.x.js and cordova_custom_plugins.js.
- Upload the contents of the www folder from the project to your webhosting.
- Start developing!

<h3>Web examples</h3>
- jpHolo on the Web: https://rawgit.com/teusink/jpHolo/master/web-app/main.html

<h2>Change-log</h2>

<h3>Commits after 2014-11-09</h3>
- Various small fixes.

<h3>2.1.3: 2014-11-09</h3>
- Update to jQuery Mobile 1.4.5
- Added back the image preloader
- Fixed broken links

<h3>2.1.2: 2014-10-01</h3>
- Update to Cordova PhoneGap 3.6.3

<h3>2.1.1: 2014-09-21</h3>
- Border CSS fix with immersive page

<h3>2.1.0: 2014-09-20</h3>
- Upgrade to jQuery Mobile 1.4.4
- Upgrade to Cordova PhoneGap 3.5.1
- Panel menu is now only openend when swiped from bezel
- Press effects in header are now gone when there is a touch move
- Fully implemented an example how to process an Uri intent
- Added a page called LandingPage to support the Uri process (some form of deep linking)
- Improved app icon and sources to create own icon
- Merged smartphone and tablet html files with the use of jQuery Mobile's gridview into main.html
- Added a immersive page example including rotation event with a photo
- Seperated the Javascript files more to make editing easier
- Removed HomeButton plugin (it is not advised according Google Design Guidelines)
- Removed i18next for not being used (it's a nice framework for multi-language though!)
- Improved swipe and moved out of page specific code
- Updated fonts

<h3>2.0.2: 2014-06-11</h3>
- Improvements to the theme.

<h3>2.0.1: 2014-06-11</h3>
- Upgrade to Cordova PhoneGap 3.5.0.
- Upgrade to jQuery 2.1.1.
- Upgrade to i18next 1.7.3.
- Updated Cordova PhoneGap plugins.
- Updated fastclick.js.
- Code improvements to plugins.

<h3>2.0.0: 2014-03-02</h3>
- Upgrade to Cordova PhoneGap 3.3.0.
- Upgrade to jQuery Mobile 1.4.2.
- Upgrade to jQuery 2.1.0.
- Dropped support for Gingerbread (it might still work, but you will have to test it yourself).
- Added Service Boot listener.
- Added URI Receiver.
- Added Chrome ADB support for ChromeView.
- Added Amazon Appstore support in Appstore plugin.
- Improved code of many plugins.
- Moved from the energize.js plugin to the Fastclick.js plugin (improved tap behavior).
- Improved swipe settings of jQuery Mobile.
- Improved custom CSS.
- Added a way to store previous page id.
- Changed to one holo theme.
- Implemented press effect of buttons with CSS instead of images (easy implementing own color now).
- When clicking a list item in a panel, the panel always closes now.
- Moved custom PhoneGap plugins to the folder: org.teusink.jpholo.
- Replaced sliders with the new flipswitches.

<h3>1.4.5: 2013-11-24</h3>
- Upgrade to jQuery Mobile 1.4.0.
- Upgrade to PhoneGap 3.3.0.
- Chrome Remote Debugging.
- Multi-language.
- Remove of energize.js due to incompatibilities with ChromeView in Android KitKat 4.4.

<h3>1.4.4: 2013-11-24</h3>
- Some small changes and improvements.

<h3>1.4.3: 2013-11-17</h3>
- Changed the core scripts and html files a bit to make easy transfer to a webhosting possible. See the instructions above.

<h3>1.4.2: 2013-10-26</h3>
- Upgraded to the new PhoneGap 3.1.0 framework.
- Added system specifications on second page (Holo Dark).

<h3>1.4.1: 2013-10-24</h3>
- Added event (swipe to right) to open left panel menu.

<h3>1.4.0: 2013-10-04</h3>
- Bit better screen estate usage for smaller tablets.
- Added Holo Light theme header and icons (theme complete now).
- Improved theme. Also included a picture of all jQuery Mobile theme swatches.
- Moved JavaScript and onclick listeners from HTML files to JavaScript files.
- Changed function "getPackageVersion" to a callback function.
- Renamed jpHolo related JavaScript libraries and CSS files.
- Added PhoneGap plugin: AndroidPreferences.
- Added	PhoneGap plugin: BackgroundService ( https://github.com/Red-Folder/Cordova-Plugin-BackgroundService ), with thanks to Red-Folder.
- Added Android Service feature (based on plugin BackgroundService) to demonstrate the way how to incorporate a service in a web-app.
- Reinstated the back-button handling to before. HomeButton plugin is still included, but not used.

<h3>1.3.1: 2013-09-05</h3>
- Changed PhoneGap plugins a bit with logging (nothing special).
- Back-button does not exit app any more, but push it to background (saves reloading). When Android does not have enough memory it will eventually push the app out of memory.

<h3>1.3.0: 2013-09-02</h3>
- When left panel opens the header icon changes to the opened style. Like Google meant it.
- Included 2 new image files because of the change above.
- When a panel opens, non-contextual action bar buttons hide (and show when panel closes). Like Google meant it :).
- Changed energize.js a bit. Anchor tags aren't speed up now to prevent click events being fired twice. Moved from minified version to normal version.
- Added a note to application.smartphone.css when using virtual keyboard in your app.

<h3>1.2.5: 2013-08-14</h3>
- Improved click energizer (energize-min.js).
- Completed all references on homepage.
- Remove jQuery Mobile pop-up.
- Removed not needed files.

<h3>1.2.4: 2013-08-11</h3>
- Improved logging commands (console.info, console.warn, console.error, instead of console.log only).

<h3>1.2.3: 2013-08-09</h3>
- Footer action buttons height fix.

<h3>1.2.2: 2013-08-06</h3>
- Removed reference to non-existing script.
- Made example (menu items, toasts etc.) bit more better to understand.
- Added Appstore plugin to invoke an intent to open Play Store.
- Added PackageVersion plugin to get current package version set in manifest file in Android.
- Changed right navigation drawer with menu items to demonstrate the two new plugins.
- Upgraded package to Android 4.3 (API 18).

<h3>1.2.1: 2013-07-26</h3>
- Add the new (and all) Roboto TrueType fonts.
- Improved icon images with new Roboto font.
- Improved CSS a bit due to new fonts.

<h3>1.2.0: 2013-07-21</h3>
- Upgrade to jQuery Mobile 1.3.2.

<h3>1.1.2: 2013-07-20</h3>
- Paved the way for PhoneGap 3.0.0. Project is still using PhoneGap 2.9.0.

<h3>1.1.1: 2013-07-12</h3>
- improved Gimp image resource files (easier to adjust app title)
- improved interface (icon title button)
- added non-minified custom jQuery Mobile Theme
- removed Holo light images (they will return improved)
- more image resources
- fixed tablet layout not showing

<h3>1.1.0: 2013-07-10</h3>
- renamed style.css to application.css
- renamed style_tablet to application.splitview.css
- added application.tablet.css
- added application.smartphone.css
- merged jQuery Mobile settings to jquery.mobile.settings.js (loaded before jQuery Mobile loads)
- merged functions_before.js and functions_after.js to application.core.js (loaded at the end of all other scripts)
- updated energize.js from: https://github.com/davidcalhoun/energize.js
- included function that executes a piece of code AFTER the deviceready event has been fired.
- GUI now better imitates native look and feel (including action bar resizing with landscape mode)
- Now using official color codes that are selected by Google for Holo
- renamed entire app and code from JQM-Example to jpHolo (adjusted images also)

<h3>1.0.0: 2013-06-29</h3>
- Added to GitHub public repo now
- Added tablet view support.
- Improved Holo colors.

<h3>0.3.0: 2013-05-23 (on Blog)</h3>
- Changed app to remove the blink issue (meta viewport). App now functions without blinking.

<h3>0.2.0: 2013-05-22 (on Blog)</h3>
- PhoneGap 2.7.0
- Improved JavaScript code with JSLint
- Changed panel behaviour to the official Google style presented at Google I/O 2013.

<h3>0.1.0: 2013-04-29 (on Blog)</h3>
- Initial release

<h2>License</h2>

Copyright (c) 2015 Joram Teusink

MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

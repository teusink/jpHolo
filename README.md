jpHolo
======

An application template based on jQuery Mobile and PhoneGap, featuring an Android Holo styled interface.

<h2>Features</h2>

- Application template based on jQuery Mobile 1.3.2 and PhoneGap 2.9.0.
- Android Holo Theme look: Light with Dark action bar (full), Dark (full), and Light (partial).
- Toast messages.
- Share intent.
- Google Play Store intent.
- Retrieve current package version that is set in the manifest file.
- Navigation Drawer.

<h2>Requirements</h2>

- Android 2.3.3 and higher. Android 4.0.x may have some small different behaviours in the GUI compared to 2.3.x and 4.1.x and higher.
- It is an Eclipse project, so you need to use Eclipse or convert the project to another IDE.

<h3>Included resources</h3>

- Gimp images files (xcf) to make your own png/jpg files.
- Full html, css, and javascript sources.

<h3>Examples</h3>

See my blog about this: http://teusink.blogspot.nl/2013/04/android-example-app-with-phonegap-and.html
Working example can be found on Google Play Store. It is my own app DroidPapers: https://play.google.com/store/apps/details?id=org.teusink.droidpapers

<h2>Planned work</h2>
- Upgrade to jQuery Mobile 1.4.0.
- Upgrade to PhoneGap 3.0.4 (perhaps skip to PhoneGap 3.1.0).
- Completing the Light interface.

<h2>Change-log</h2>

<h3>2013-09-02</h3>
- When left panel opens the header icon changes to the opened style. Like Google meant it.
- Included 2 new image files because of the change above.
- When a panel opens, non-contextual action bar buttons hide (and show when panel closes). Like Google meant it :).
- Changed energize.js a bit. Ancher tags (<a>) aren't speed up now to prevent click events being fired twice. Moved from minified version to normal version.
- Added a note to application.smartphone.css when using virtual keyboard in your app.

<h3>2013-08-14</h3>
- Improved click energizer (energize-min.js).
- Completed all references on homepage.
- Remove jQuery Mobile popup.
- Removed not needed files.

<h3>2013-08-11</h3>
- Improved logging commands (console.info, console.warn, console.error, instead of console.log only).

<h3>2013-08-09</h3>
- Footer action buttons height fix.

<h3>2013-08-06</h3>
- Removed reference to non-existing script.
- Made example (menu items, toasts etc.) bit more better to understand.
- Added Appstore plugin to invoke an intent to open Play Store.
- Added PackageVersion plugin to get current package version set in manifest file in Android.
- Changed right navigation drawer with menu items to demonstrate the two new plugins.
- Upgraded package to Android 4.3 (API 18).

<h3>2013-07-26</h3>
- Add the new (and all) Roboto TrueType fonts.
- Improved icon images with new Roboto font.
- Improved css a bit due to new fonts.

<h3>2013-07-21</h3>
- Upgrade to jQuery Mobile 1.3.2.

<h3>2013-07-20</h3>
- Paved the way for PhoneGap 3.0.0. Project is still using PhoneGap 2.9.0.

<h3>2013-07-12</h3>
- improved Gimp image resource files (easier to adjust app title)
- improved interface (icon title button)
- added non-minified custom jQuery Mobile Theme
- removed Holo light images (they will return improved)
- more image resources
- fixed tablet layout not showing

<h3>2013-07-10</h3>
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

<h3>2013-06-29</h3>
- Added to GitHub public repo now
- Added tablet view support.
- Improved Holo colors.

<h3>2013-05-23 (on Teusink.org Blog)</h3>
- Changed app to remove the blink issue (meta viewport). App now functions without blinking.

<h3>2013-05-22 (on Teusink.org Blog)</h3>
- PhoneGap 2.7.0
- Improved JavaScript code with JSLint
- Changed panel behavior to the official Google style presented at Google I/O 2013.

<h3>2013-04-29 (on Teusink.org Blog)</h3>
- Initial release

<h2>License</h2>

This program is free software: you can redistribute it and/or modify it under the terms of the GNU LesserGeneral Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details. To read more about the GNU Lesser General Public License that belongs to this program, see http://www.gnu.org/licenses/
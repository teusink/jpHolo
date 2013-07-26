jpHolo
======

An application template based on jQuery Mobile and PhoneGap, featuring an Android Holo styled interface.

<h2>Features</h2>

- Application template based on jQuery Mobile 1.3.1 and PhoneGap 2.9.0.
- Android Holo Theme look: Light with Dark action bar (full), Dark (full), and Light (partial).
- Toast messages.
- Share intent.
- Navigation Drawer.

<h2>Requirements</h2>

- jQuery Mobile 1.3.0 and up.
- PhoneGap 2.7.0 and up (may work on earlier versions, but that is not tested).
- It is an Eclipse project, so you might need to use Eclipse or convert the project.

<h3>Included resources</h3>

- Gimp images files to make your own png/jpg files.
- Full html, css, and javascript sources.

<h3>Examples</h3>

See my blog about this: http://teusink.blogspot.nl/2013/04/android-example-app-with-phonegap-and.html
Working example can be found on Google Play Store. It is my own app DroidPapers: https://play.google.com/store/apps/details?id=org.teusink.droidpapers

<h2>Changelog</h2>

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
Platform-specific web assets (HTML, CSS and JavaScript files) are contained within appropriate subfolders in this directory. These are deployed during a prepare to the appropriate native directory. Files placed under merges/ will override matching files in the www/ folder for the relevant platform. A quick example, assuming a project structure of:

```
merges/
|-- ios/
| `-- app.js
|-- android/
| `-- android.js
www/
`-- app.js
```

After building the Android and iOS projects, the Android application will contain both app.js and android.js. However, the iOS application will only contain an app.js, and it will be the one from merges/ios/app.js, overriding the "common" app.js located inside www/.

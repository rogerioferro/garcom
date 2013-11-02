Contains the project's web artifacts, such as .html, .css and .js files. These are your main application assets. They will be copied on a cordova prepare to each platform's www directory.

**Your Blanket: config.xml**

This file is what you should be editing to modify your application's metadata. Any time you run any cordova-cli commands, the tool will look at the contents of config.xml and use all relevant info from this file to define native application information. cordova-cli supports changing your application's data via the following elements inside the config.xml file:

* The user-facing name can be modified via the contents of the <name> element.
* The package name (AKA bundle identifier or application id) can be modified via the id attribute from the top-level <widget> element.
* The version can be modified via the version attribute from the top-level <widget> element.
* The whitelist can be modified using the <access> elements. Make sure the origin attribute of your <access> element points to a valid URL (you can use * as wildcard). For more information on the whitelisting syntax, see the docs.phonegap.com. You can use either attribute uri (BlackBerry-proprietary) or origin (standards-compliant) to denote the domain.
* Platform-specific preferences can be customized via <preference> tags. See docs.phonegap.com for a list of preferences you can use.
* The entry/start page for your application can be defined via the <content src> element + attribute.

/**
 * This file is the application's main JavaScript file. It is listed as a dependency in run.js and will automatically
 * load when run.js loads.
 *
 * Because this file has the special filename `main.js`, and because we've registered the `app` package in run.js,
 * whatever object this module returns can be loaded by other files simply by requiring `app` (instead of `app/main`).
 *
 * Our first dependency is to the `dojo/has` module, which allows us to conditionally execute code based on
 * configuration settings or environmental information. Unlike a normal conditional, these branches can be compiled
 * away by the build system; see `staticHasFeatures` in app.profile.js for more information.
 *
 * Our second dependency is to the special module `require`; this allows us to make additional require calls using
 * module IDs relative to this module within the body of the define callback.
 *
 * In all cases, whatever function is passed to define() is only invoked once, and the returned value is cached.
 *
 * More information about everything described about the loader throughout this file can be found at
 * <http://dojotoolkit.org/reference-guide/loader/amd.html>.
 */


app = {};
 define(['dojo/has', 'require'],
function (has, require) {
  require(["dojox/mobile/parser",
           "app/view",
           "dojox/mobile",
           "dojox/mobile/ScrollableView",
           "dojox/mobile/TabBar",
           "dojox/mobile/TextBox",
           "dojox/mobile/Button",
           "dojox/mobile/RadioButton",
           "dojox/mobile/GridLayout",
           "dojox/mobile/ValuePickerSlot",
           "dojo/domReady!"], // dojo/domReady! This "!" command waits finish the command (get ready). In this case make the programm waits to load the DOM
  function(mobileParser, view, query, on) {
    view.createDom();

    mobileParser.parse();

    view.start();

    app.view = view;
    // Wait for device API libraries to load
    document.addEventListener("deviceready", onDeviceReady, false);
  });
});


// device APIs are available
function onDeviceReady() {
  var db = window.openDatabase("test", "1.0", "Test DB", 1000000);
}


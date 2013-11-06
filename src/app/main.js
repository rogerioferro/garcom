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
  require(["dojox/mobile/parser","app/view",
           "dojox/mobile","dojox/mobile/ScrollableView",
           "dojox/mobile/Accordion",
           "dojox/mobile/TabBar",
           "dojox/mobile/compat","dojo/domReady!"], // dojo/domReady! comando ! aguarda carregar toda a biblioteca da DOM
  function(mobileParser, view) {
    view.createDom();
    mobileParser.parse();
    view.pizzas.activate();

    app.view = view;
    // Wait for device API libraries to load
    document.addEventListener("deviceready", onDeviceReady, false);
  });
});


// device APIs are available
function onDeviceReady() {
  var networkState = navigator.connection.type;
  var states = {};
  states[Connection.UNKNOWN]  = 'Unknown connection';
  states[Connection.ETHERNET] = 'Ethernet connection';
  states[Connection.WIFI]     = 'WiFi connection';
  states[Connection.CELL_2G]  = 'Cell 2G connection';
  states[Connection.CELL_3G]  = 'Cell 3G connection';
  states[Connection.CELL_4G]  = 'Cell 4G connection';
  states[Connection.CELL]     = 'Cell generic connection';
  states[Connection.NONE]     = 'No network connection';
  var element = document.getElementById('deviceProperties');
  element.innerHTML =  'Connection type: ' + states[networkState] + '<br />';

  var about = app.view.about;
  about.setModel(device.model);
  about.setCordova(device.cordova);
  about.setPlatform(device.platform);
  about.setUUID(device.uuid);
  about.setVersion(device.version);
}


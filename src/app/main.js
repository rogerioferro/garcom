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


define(['dojo/request/xhr',
        "app/views/menu", //default view
        "app/views/login",
        "app/views/cart",
        "app/views/footer"],
function(xhr, menu,login,cart) {
    // Wait for device API libraries to load
    document.addEventListener("deviceready", onDeviceReady, false);

    //~ setInterval(function(){
      //~ console.log('testing...');
      //~ xhr("http://www.hcel.com.br").then(function(data){
        //~ console.log(data);
      //~ });
    //~ },10000);
    
    // device APIs are available
    function onDeviceReady() {
      navigator.splashscreen.hide();

      //~ var msg = window.localStorage.getItem("item-0");
      //~ alert('[item-0:]'+msg);
//~ 
      //~ msg = window.localStorage.getItem("item-1");
      //~ if (!msg) {
        //~ alert('writing on storage...');
        //~ window.localStorage.setItem("item-1", "Storage item-1");
        //~ msg = window.localStorage.getItem("item-1");
      //~ }
//~ 
//~ 
      //~ alert(msg);
      
    }
});




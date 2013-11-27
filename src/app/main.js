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

define(['dojo/request/script',
        "dojo/request/iframe",
        "app/views/menu", //default view
        "app/views/login",
        "app/views/cart",
        "app/views/footer",
        "app/image",
        "dojo/json",
        "dojo/text!app/views/menu.json"],
function(script, iframe, menu, login, cart, footer, image, json, textJson) {
    // Wait for device API libraries to load
    document.addEventListener("deviceready", onDeviceReady, false);
    
    //~ var i = 0;
    //~ var urls =[
      //~ "http://validate.jsontest.com/",
      //~ "http://localhost:8080/jsonp",
      //~ "http://jsfiddle.net/echo/jsonp/",
      //~ "http://date.jsontest.com/",
      //~ "http://ip.jsontest.com/",
      //~ "http://md5.jsontest.com/?text=mariano_bundao",
      //~ "http://echo.jsontest.com/key1/value1/key2/value2",
    //~ ];
    //~ setInterval(function(){
      //~ 
      //~ //console.log('requesting '+urls[i]);
      //~ //alert("hello");
     //~ 
      //~ //script.get(urls[i],{
      //~ script.get("http://www.hcel.com.br/jsonp",{
        //~ jsonp: "callback",
        //~ preventCache: true,
        //~ query:{email:"test@gmail.com",teste:"some text go here..."} //data to send
      //~ }).then(function(data){
        //~ // handle data
        //~ console.log(data);
        //~ //alert(json.stringify(data));
      //~ }, function(err){
        //~ // handle an error condition
        //~ console.log(err);
      //~ });
      //~ //i = (i+1)%7;
    //~ },5000);
    //console.log(textJson);
    var menuObj = json.parse(textJson);
    //console.log(json.stringify(menuObj));
    // device APIs are available
    function onDeviceReady() {
     // navigator.splashscreen.hide();

      //Load from menu.json all the menu information and add it to an object

      menu.updateMenu(menuObj);

      var images = menuObj['images'];
      for (i in images){
        img = images[i];
        image.addImage(img);
      }


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

  onDeviceReady();

  //~ setInterval(function(){
    //~ console.log('update menu...');
    //~ //menu.updateMenu(menuObj);
      //~ var images = menuObj['images'];
      //~ for (i in images){
        //~ img = images[i];
        //~ image.addImage(img);
      //~ }
  //~ },30000);

});




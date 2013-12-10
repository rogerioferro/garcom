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

define(["app/views/menu", //default view
        "app/views/login",
        "app/views/cart",
        "app/views/item",
        "app/image",
        "dojo/json",
        "dojo/text!app/views/menu.json"],
function(menuView, loginView, cartView, itemView,
         image, json, textJson) {


    app.cartView = new cartView({app:app});

    // Wait for device API libraries to load
    document.addEventListener("deviceready", onDeviceReady, false);

    app.menuView = new menuView({app:app});
    app.loginView = new loginView({app:app});
    app.itemView = new itemView({app:app});


    function onDeviceReady() {


      //Get data from memory
      app.menuData = json.parse(textJson);

      app.products = app.menuData['products'];
      app.cart = {"1":{quant:2},
                  "11":{quant:1}
                  }; //"cod" is the key
      
      //upload images
      var images = app.menuData['images'];
      for (i in images){
        img = images[i];
        image.addImage(img);
      }


      app.menuView.updateMenu(app.menuData);


      //uncoment it to mobile version
      navigator.splashscreen.hide();

    }

  //Coment it to mobile version
  onDeviceReady();

});



app.getIcon = function (obj){
  if (!('hcelIcon' in obj)){
    if('icon' in obj){
      obj['hcelIcon'] = 'mblDomButtonHcel' + obj['icon'];
    }
    else{
      obj['hcelIcon'] = 'app/resources/img/pacote_64.png';
    }
  }
  return obj['hcelIcon'];
};

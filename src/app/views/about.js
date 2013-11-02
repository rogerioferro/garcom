define(["dojo/text!app/views/about.html",
        "app/screenClass",
        "dojo/_base/declare",
        "dijit/registry"],
function(html, screenClass, declare, registry){
  var myClass = declare(screenClass,{
      constructor : function(args){
        declare.safeMixin(this, args);
      },
      setModel : function(model){
        registry.byId('about-model').set('rightText', model);
      },
      setCordova : function(cordova){
        registry.byId('about-cordova').set('rightText', cordova);
      },
      setPlatform : function(platform){
        registry.byId('about-platform').set('rightText', platform);
      },
      setUUID : function(uuid){
        registry.byId('about-uuid').set('rightText', uuid);
      },
      setVersion : function(version){
        registry.byId('about-version').set('rightText', version);
      }
  });
  return new myClass(html);
});

define(["dojo/text!app/views/menu.html",
        "app/screenClass",
        "dojo/_base/declare"],
function(html, screenClass, declare){
  var myClass = declare(screenClass,{
      constructor : function(args){
        declare.safeMixin(this, args);
      }
  });
  return new myClass(html);
});

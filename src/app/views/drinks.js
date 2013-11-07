define(["dojo/text!app/views/drinks.html",
        "app/screenClass",
        "dojo/_base/declare",
        "dijit/registry",
        "dojo/on"],
function(html, screenClass, declare, registry, on){
  var myClass = declare(screenClass,{
      constructor : function(args){
        declare.safeMixin(this, args);
      },
      activate : function(){
        var item = registry.byId("drinks-juices");
        on(item.domNode, "click", function(){
          var icon = (item.icon=='mblDomButtonBluePlus')?
                          'mblDomButtonDarkBlueCheck':
                          'mblDomButtonBluePlus';
          item.set('icon',icon);
        });
      }
  });
  return new myClass(html);
});
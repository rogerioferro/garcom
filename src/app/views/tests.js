define(["dojo/text!app/views/tests.html",
        "app/screenClass",
        "dojo/_base/declare"],
function(html, screenClass, declare){
  var
      myClass = declare(screenClass,{
        constructor : function(args){
          declare.safeMixin(this, args);
        }
      });

  return new myClass(html);

});

define(["dojo/on", "dojo/dom", "dojo/dom-style", "dojo/mouse", "dojo/domReady!"],
    function(on, dom, domStyle, mouse) {
        var myButton = dom.byId("myButton"),
            myDiv = dom.byId("myDiv");

        on(myButton, "click", function(evt){
            domStyle.set(myDiv, "backgroundColor", "blue");
        });
        on(myDiv, mouse.enter, function(evt){
            domStyle.set(myDiv, "backgroundColor", "red");
        });
        on(myDiv, mouse.leave, function(evt){
            domStyle.set(myDiv, "backgroundColor", "");
        });
});


define(["dijit/_WidgetBase",
        "dojo/_base/declare",
        "dojo/dom-construct"],
function(_WidgetBase, declare, window, domConstruct){
  return declare(_WidgetBase, {
    buildRendering: function() {
      //this.domNode = domConstruct(div
    },
    postCreate: function(){
      this.inherited(arguments);
    }
  });
});

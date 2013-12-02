define(["dojox/mobile/ScrollableView",
        "app/hcel/_hcelView",
        "dojo/_base/declare",
        "dojo/_base/window",
        "dojo/dom-class"],
function(mblScrollableView, _hcelView, declare, window, domClass){
  return declare([mblScrollableView, _hcelView], {
    postCreate: function(){
      domClass.add(this.domNode, "hcelScrollableView");
      this.inherited(arguments);
      /*start view*/
      this.startup();
    }
  });
});

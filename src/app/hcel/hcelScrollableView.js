define(["dojox/mobile/ScrollableView",
        "app/hcel/_hcelView",
        "dojo/_base/declare",
        "dojo/_base/window",
        "dojo/dom-class"],
function(mblScrollableView, _hcelView, declare, window, domClass){
  return declare([mblScrollableView, _hcelView], {
    scroll: true,
    postCreate: function(){
      domClass.add(this.domNode, "hcelScrollableView");
      this.inherited(arguments);
      /*start view*/
      this.startup();
    },
    resize : function (){
      this.inherited(arguments);
      var height = this.getScreenSize().h;
      if (this.isLocalHeader){
        height -= this.fixedHeaderHeight;
      }
      if (this.isLocalFooter){
        height -= this.fixedFooterHeight;
      }
      this.containerNode.style.height = height + 'px';
    },
    onTouchStart : function(e){
      if (this.scroll){
        this.inherited(arguments);
      }
    }
  });
});

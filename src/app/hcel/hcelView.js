define(["dojox/mobile/ScrollableView",
        "dojo/_base/declare",
        "dojo/_base/window",
        "dojo/dom-construct",
        "dojo/dom-class"],
function(mblScrollableView, declare, win, domConstruct, domClass){
  return declare(mblScrollableView, {
    scroll: true,
    postCreate: function(){
      domClass.add(this.domNode, "hcelScrollableView");
      /*place view on body*/
      this.placeAt(win.body());
      /*register handles to disconect on destroy*/
      this.own(
        /*Create Dom on First View*/
        this.on("StartView", this._createDom),
        this.on("BeforeTransitionIn", this._createDom)
      );            
      this.inherited(arguments);
      /*start view*/
      this.startup();
    },
    _createDom : function () {
      if (!this.firstView) {
        this.firstView = true;
        this.createDom();
      }
    },
    createDom : function() {
    },
    addNode : function(node) {
      return domConstruct.place(node, this.containerNode);
    },
    clearView : function() {
      this.destroyDescendants();
    },
    resize : function (){
      this.containerNode.style.height = 'auto';
      this.inherited(arguments);
      var height = this.getScreenSize().h;
      if (this.isLocalHeader){
        height -= this.fixedHeaderHeight;
      }
      if (this.isLocalFooter){
        height -= this.fixedFooterHeight;
      }
      if (height > this.containerNode.offsetHeight){
        this.containerNode.style.height = height + 'px';
      }
    },
    onTouchStart : function(e){
      if (this.scroll){
        this.inherited(arguments);
      }
    }
  });
});
;

var VIEW_POSITION = 1; /*position of view on body*/

define(["dojox/mobile/ScrollableView",
        "dojo/_base/declare",
        "dojo/_base/window",
        "dojo/dom-construct"],
function(view, declare, window, domConstruct){
  return declare(view, {
    /*index to insert child*/
    index : 0,
    postCreate: function(){
      this.inherited(arguments);
      /*create space to footer*/
      domConstruct.create('div',{style:"height:32px"},this.domNode);
      /*place view on body*/
      this.placeAt(window.body(), VIEW_POSITION++);
      /*Create Dom on First View*/
      this.on("StartView", this._createDom);
      this.on("BeforeTransitionIn", this._createDom);
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
      console.log("empty view");
    },
    addChild : function(widget) {
      var supermethod = this.getInherited(arguments);
      supermethod.apply(this,[widget, this.index++]);
    },
    addNode : function(node) {
      return domConstruct.place(node, this.containerNode, this.index++);
    },
    clearView : function() {
      this.destroyDescendants();
    },
    destroyDescendants : function() {
      this.index = 0;
      this.inherited(arguments);
    },
    destroy : function() {
      VIEW_POSITION--;
      this.inherited(arguments);
    }
  });
});

define(["dojo/_base/declare",
        "dojo/_base/window",
        "dojo/dom-construct"],
function(declare, win, domConstruct){
  return declare('hcel-view', null, {
    postCreate: function(){
      console.log("_hcelView");
      /*place view on body*/
      this.placeAt(win.body());
      /*register handles to disconect on destroy*/
      this.own(
        /*Create Dom on First View*/
        this.on("StartView", this._createDom),
        this.on("BeforeTransitionIn", this._createDom)
      );

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
    }//,
    //~ getScreenSize: function(){
      //~ // summary:
      //~ //		Returns the dimensions of the browser window.
      //~ return {
        //~ h: win.global.innerHeight||win.doc.documentElement.clientHeight||win.doc.documentElement.offsetHeight,
        //~ w: win.global.innerWidth||win.doc.documentElement.clientWidth||win.doc.documentElement.offsetWidth
      //~ };
    //~ }
    
  });
});

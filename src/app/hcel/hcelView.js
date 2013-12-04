define(["dojox/mobile/View",
        "app/hcel/_hcelView",
        "dojo/_base/declare",
        "dojo/_base/window",
        "dojo/dom-class",
        "dojo/dom-construct"],
function(mblView, _hcelView, declare, window, domClass, domConstruct){
  return declare([mblView, _hcelView], {
    postCreate: function(){
      domClass.add(this.domNode, "hcelView");
      this.domNode.style.overflow = "hidden";
      this.domNode.style.top = "0px";
      this.containerNode = domConstruct.create("div",
        {className:"hcelViewContainer"}, this.domNode);
      this.containerNode.style.position = "absolute";
      this.containerNode.style.top = "0px";
      this.containerNode.style.bottom = "0px";
      this.containerNode.style.width = "100%";

      this.inherited(arguments);
      /*start view*/
      this.startup();
    },
    addFixedBar: function(/*Widget*/widget){
      // summary:
      //		Adds a view local fixed bar to this widget.
      // description:
      //		This method can be used to programmatically add a view local
      //		fixed bar to ScrollableView. The bar is appended to this
      //		widget's domNode. The addChild API cannot be used for this
      //		purpose, because it adds the given widget to containerNode.
      var c = widget.domNode;
      var fixed = widget.fixed;
      c.style.position = 'absolute';
      // Fixed bar has to be added to domNode, not containerNode.
      this.domNode.appendChild(c);
      if(fixed === "top"){
        this.fixedHeaderHeight = c.offsetHeight;
        this.isLocalHeader = true;
      }else if(fixed === "bottom"){
        this.fixedFooterHeight = c.offsetHeight;
        this.isLocalFooter = true;
        c.style.bottom = "0px";
      }
      this.resize();
    },
    resize : function(){
      var height = this.getScreenSize().h; 
      this.domNode.style.height = ((height > 350)?height:350) + 'px';
      if (this.isLocalHeader){
        this.containerNode.style.top = this.fixedHeaderHeight + 'px';
      }
      if (this.isLocalFooter){
        this.containerNode.style.bottom = this.fixedFooterHeight + "px";
      }
      this.inherited(arguments);      
    } 
  });
});

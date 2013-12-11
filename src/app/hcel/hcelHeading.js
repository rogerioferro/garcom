define(["dijit/_WidgetBase",
        "dojo/_base/lang",
        "dojo/_base/declare",
        "app/hcel/hcelButton",
        "dojo/dom-class",
        "dojo/dom-construct",
        "dojox/mobile/TransitionEvent"],
function(_WidgetBase, lang, declare, hcelButton, domClass, domConstruct, mblTransitionEvent){
  return declare("hcel_heading", _WidgetBase, {
    rightText : '',
    buildRendering: function() {
      this.inherited(arguments);
      this.domNode = domConstruct.create('div',{'class':'hcelHeading'});
    },
    //~ startup: function(){
      //~ if(this._started){ return; }
      //~ var parent = this.getParent && this.getParent();
      //~ if(!parent || !parent.resize){ // top level widget
        //~ var _this = this;
        //~ _this.defer(function(){ // necessary to render correctly
          //~ _this.resize();
        //~ });
      //~ }
      //~ this.inherited(arguments);
    //~ },
    resize: function(){
      this.inherited(arguments);
      var width;
      if (this.labelNode) {
        width = this.labelNode.offsetLeft - 2;
      }
      else{
        width = this.domNode.offsetWidth/2 - 2;
      }
      if (this.leftButton){
        this.leftButton.domNode.style.width = width + 'px';
      }
      if (this.rightButton){
        this.rightButton.domNode.style.width = width + 'px';
      }
    },
    _setLabelAttr: function(/*String*/label){
      this._set("label", label);
      if (!this.labelNode){
        this.labelNode = domConstruct.create('span',{'class':'hcelHeadingSpanTitle'}, this.domNode);
      }
      this.labelNode.innerHTML = this.label;
      if (this.leftButton){
        this.resize();
      }
    },
    _setMoveToAttr: function(/*String*/moveTo){
      this._set("moveTo", moveTo);
      if (!this.leftButton){
        this.leftButton = new hcelButton({baseClass:'hcelHeadingLeftButton',
                                          icon:'mblDomButtonWhiteLeftArrow',
                                          iconSelected:'mblDomButtonGrayLeftArrow'});
        this.leftButton.placeAt(this.domNode);
        this.resize();
      }
      this.leftButton.set('moveTo',this.moveTo);
    },
    _setRightTextAttr : function(rightText){
      this._set("rightText", rightText);
      if (this.rightButton){
        this.rightButton.set('innerHTML',this.rightText);
      }
    },
    _setRightMoveToAttr : function(rightMoveTo){
      this._set("rightMoveTo", rightMoveTo);
      if (!this.rightButton){
        this.rightButton = new hcelButton({baseClass:'hcelHeadingRightButton',
                                           innerHTML:this.rightText});
        this.rightButton.placeAt(this.domNode);
        this.resize();
      }
      this.rightButton.set('moveTo',this.rightMoveTo);
    }
  });
});

define(["dijit/_WidgetBase",
        "dojo/_base/lang",
        "dojo/_base/declare",
        "app/hcel/hcelButton",
        "dojo/dom-class",
        "dojo/dom-construct",
        "dojox/mobile/TransitionEvent"],
function(_WidgetBase, lang, declare, hcelButton, domClass, domConstruct, mblTransitionEvent){
  return declare("hcel_heading", _WidgetBase, {
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
      if (this.backIconButton){
        var height;
        if (this.labelNode) {
          height = this.labelNode.offsetLeft - 2;
        }
        else{
          height = this.domNode.offsetHeight;
        }
        this.backIconButton.domNode.style.width = height + 'px';
      }
    },
    _setLabelAttr: function(/*String*/label){
      this._set("label", label);
      if (!this.labelNode){
        this.labelNode = domConstruct.create('span',{'class':'hcelHeadingSpanTitle'}, this.domNode);
      }
      this.labelNode.innerHTML = this.label;
      if (this.backIconButton){
        this.resize();
      }
    },
    _setMoveToAttr: function(/*String*/moveTo){
      this._set("moveTo", moveTo);
      if (!this.backIconButton){
        this.backIconButton = new hcelButton({baseClass:'hcelHeadingButtonBack',
                                          icon:'mblDomButtonWhiteLeftArrow',
                                          iconSelected:'mblDomButtonGrayLeftArrow'});
        this.backIconButton.placeAt(this.domNode);
        this.backIconButton.on('click',lang.hitch(this, function(e){
          var opts ={moveTo:this.moveTo, transition:this.transition};
          new mblTransitionEvent(this.domNode,opts,e).dispatch();
        }));
        this.resize();
      }
    }
  });
});

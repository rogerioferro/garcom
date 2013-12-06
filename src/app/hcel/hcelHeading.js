define(["dojox/mobile/Heading",
        "dojo/_base/lang",
        "dojo/_base/declare",
        "app/hcel/hcelButton",
        "dojo/dom-class",
        "dojox/mobile/TransitionEvent"],
function(mblHeading, lang, declare, hcelButton, domClass, mblTransitionEvent){
  return declare(mblHeading, {
    postCreate: function(){
      this.inherited(arguments);
      domClass.add(this.domNode, 'hcelHeading');
    },
    resize: function(){
      if (this.backIconButton){
        var height = this.labelNode.offsetLeft - 2;
        console.log(height);
        this.backIconButton.domNode.style.width = height + 'px';
      }
      else if (this.backButton){
        this.inherited(arguments);
      }
    },
    _setLabelAttr: function(/*String*/label){
      this.inherited(arguments);
      if (this.backIconButton){
        this.resize();
      }
    },
    _setMoveToAttr: function(/*String*/moveTo){
      // tags:
      //    private
      if (this.backButton){
        this.inherited(arguments);
      }
      else {
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
    },
    _setBackAttr: function(/*String*/back){
      if (this.backIconButton) {
        this.backIconButton.destroyRecursive();
        this.backIconButton = undefined;
      }
      this.inherited(arguments);
    }
  });
});

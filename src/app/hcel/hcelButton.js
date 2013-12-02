
define(["dijit/_WidgetBase",
        "dojo/on",
        "dojo/touch",
        "dojo/_base/lang",
        "dojo/_base/declare",
        "dojo/_base/array",
        "dojo/dom-construct",
        "dojo/dom-class"],
function(_WidgetBase, on, touch, lang, declare, array, domConstruct, domClass){
  return declare('hcel_button',_WidgetBase, {
    baseClass:'hcelButton',
    buildRendering: function() {
      this.inherited(arguments);

      this.domNode = domConstruct.create('div',{'class':this.baseClass});
    },
    postCreate: function(){
      this.inherited(arguments);
      this.own(
        on(this.domNode, touch.leave, lang.hitch(this,"_onLeave")),
        on(this.domNode, touch.press, lang.hitch(this,"_onPress")),
        on(this.domNode, touch.release, lang.hitch(this,"_onRelease"))
      );
    },
    _onLeave: function(e){
      if (this.newStateClasses){
        domClass.remove(this.domNode, this.newStateClasses);
      }
    },
    _onPress: function(e){
      var newStateClasses = (this.baseClass+' '+this["class"]).split(" ");
      this.newStateClasses = array.map(newStateClasses, function(c){ return c+"Selected"; });
      
      domClass.add(this.domNode, this.newStateClasses);
      return false;
    },
    _onRelease: function(e){
      this._onLeave(e);
      this.onClick(e);
      return false;
    },
    onClick: function(value){
    }
  });
});

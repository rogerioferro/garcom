
define(["dijit/_WidgetBase",
        "dojo/on",
        "dojo/touch",
        "dojo/_base/lang",
        "dojo/_base/declare",
        "dojo/_base/array",
        "dojox/mobile/iconUtils",
        "dojo/dom-construct",
        "dojo/dom-class",
        "dojox/mobile/TransitionEvent"],
function(_WidgetBase, on, touch, lang, declare, array,
         mblIconUtils, domConstruct, domClass, mblTransitionEvent){
  return declare('hcel_button',_WidgetBase, {
    baseClass:'hcelButton',
    selected:false,
    _setSelectedAttr : function(selected){
      this._set('selected',selected);
      this._updateSelected();
    },
    _setLabelAttr : function(label){
      this._set('label',label);
      if (!this.labelNode){
       this.labelNode = domConstruct.create('div',
            {'class':'hcelButtonLabel'}, this.domNode);
      }
      this.labelNode.innerHTML = this.label;
    },
    _updateSelected : function(){
      if (this.iconDomNode){
        this.iconDomNode.style.display =
            (!this.iconSelectedDomNode || !this.selected)?'block':'none';
      }
      if (this.iconSelectedDomNode){
        this.iconSelectedDomNode.style.display = (this.selected)?'block':'none';
      }
    },
    _setIconAttr : function(icon){
      this._set('icon',icon);
      this.iconDomNode = mblIconUtils.setIcon(this.icon,
                    null, this.iconDomNode, null, this.domNode);
      this._updateSelected();      
    },
    _setIconSelectedAttr : function(icon){
      this._set('iconSelected',icon);
      this.iconSelectedDomNode = mblIconUtils.setIcon(this.iconSelected,
                    null, this.iconSelectedDomNode, null, this.domNode);
      this._updateSelected();
    },
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
      this.set('selected', false);
    },
    _onPress: function(e){
      var newStateClasses = (this.baseClass+' '+this["class"]).split(" ");
      this.newStateClasses = array.map(newStateClasses, function(c){ return c+"Selected"; });
      this.set('selected', true);
      domClass.add(this.domNode, this.newStateClasses);
      return false;
    },
    _onRelease: function(e){
      this._onLeave(e);
      if (this.moveTo){
        var opts ={moveTo:this.moveTo};
        new mblTransitionEvent(this.domNode,opts,e).dispatch();
      }
      this.onClick(e);
      return false;
    },
    onClick: function(value){
    }
  });
});

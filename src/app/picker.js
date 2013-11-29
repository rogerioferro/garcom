
define(["dijit/_WidgetBase",
        "dojo/on",
        "dojo/touch",
        "dojo/_base/lang",
        "dojo/_base/declare",
        "dojo/dom-construct",
        "dojo/dom-class",
        "dojox/mobile/Icon"],
function(_WidgetBase, on, touch, lang, declare, domConstruct, domClass, mblIcon){
  return declare('hcel_picker',_WidgetBase, {
    minValue:0,
    _setMinValueAttr: function(value){
      this._set("minValue",value);
      if(this.value < this.minValue) this.set("value",this.minValue);
    },
    maxValue:99,
    _setMaxValueAttr: function(value){
      this._set("maxValue",value);
      if(this.value > this.maxValue) this.set("value",this.maxValue);
    },
    value: 0,
    _setValueAttr: function(value){
      this._set("value",value);
      this.updateValue();
    },
    buildRendering: function() {
      this.inherited(arguments);

      this.domNode = domConstruct.create('div',{'class':'hcelPicker'});

      this.minusBtnNode = domConstruct.create('div', {
        className:'hcelPickerButton hcelPickerButtonMinus',
        title: '-'
      }, this.domNode);
      this.valueNode = domConstruct.create('div',{
          className:'hcelPickerValue'
      }, this.domNode);
      this.plusBtnNode = domConstruct.create('div', {
        className:'hcelPickerButton hcelPickerButtonPlus',
        title: '+'
      }, this.domNode);

      new mblIcon({icon:"mblDomButtonGrayPlus"},this.plusBtnNode);
      new mblIcon({icon:"mblDomButtonGrayMinus"},this.minusBtnNode);
      
      this.updateValue();
    },
    postCreate: function(){
      this.inherited(arguments);
      this.own(
        on(this.plusBtnNode, touch.leave, lang.hitch(this,"_onLeave")),
        on(this.plusBtnNode, touch.press, lang.hitch(this,"_onPress")),
        on(this.plusBtnNode, touch.release, lang.hitch(this,"_onRelease")),
        on(this.minusBtnNode, touch.leave, lang.hitch(this,"_onLeave")),
        on(this.minusBtnNode, touch.press, lang.hitch(this,"_onPress")),
        on(this.minusBtnNode, touch.release, lang.hitch(this,"_onRelease"))
      );
    },
    _onLeave: function(e){
      var node = e.currentTarget;
      domClass.remove(node, "hcelPickerButtonSelected");
    },
    _onPress: function(e){
      var node = e.currentTarget;
      domClass.add(node, "hcelPickerButtonSelected");
      return false;
    },
    _onRelease: function(e){
      var node = e.currentTarget;
      if(node == this.plusBtnNode){
        if (this.value < this.maxValue)
          this.value++;
      }
      else{
        if (this.value > this.minValue)
          this.value--;
      }
      this.updateValue();
      this._onLeave(e);
      return false;
    },
    updateValue: function(){
      if (this.value != this.lastValue){
        this.valueNode.innerHTML = this.value;
        this.lastValue = this.value;
        this.onChange(this.value);
      }
    },
    onChange: function(value){
    }
  });
});

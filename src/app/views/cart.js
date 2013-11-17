define(["app/screenClass",
        "dojo/_base/declare",
        "dojox/mobile/Heading",
        "dojox/mobile/RoundRect",
        "dojox/mobile/Icon",
        "dojox/mobile/ValuePickerSlot",
        "dojox/mobile/TextBox",
        "dojox/mobile/Button"],
function(screenClass, declare,
         mblHeading, mblRoundRect,
         mblIcon, mblValuePickerSlot, mblTextBox, mblButton){
  var view = declare(screenClass,{

    id : "cart",
    
    createDom : function(){
      this.addFixedBar(
        new mblHeading({label : "Pedido", fixed : "top"}));

      var rect = new mblRoundRect({'class':"center-container"});

      var bt = new mblButton({'class':'mblIconButton', duration:200}).placeAt(rect.domNode);
      new mblIcon({icon:"mblDomButtonGrayPlus"},bt.domNode);

      new mblIcon({icon:"mblDomButtonTransparent19"},rect.domNode);
      
      
      var bt = new mblButton({'class':'mblIconButton', duration:200}).placeAt(rect.domNode);
      new mblIcon({icon:"mblDomButtonGrayMinus"},bt.domNode);

      new mblValuePickerSlot().placeAt(rect.domNode);

      new mblIcon({icon:"mblDomButtonBluePlus"},rect.domNode);
      new mblIcon({icon:"mblDomButtonBlueMinus"},rect.domNode);
      new mblIcon({icon:"mblDomButtonDarkBluePlus"},rect.domNode);
      new mblIcon({icon:"mblDomButtonDarkBlueMinus"},rect.domNode);
      new mblIcon({icon:"mblDomButtonRedPlus"},rect.domNode);
      new mblIcon({icon:"mblDomButtonRedMinus"},rect.domNode);
      new mblIcon({icon:"mblDomButtonGreyPlus"},rect.domNode);
      new mblIcon({icon:"mblDomButtonGreyMinus"},rect.domNode);
      new mblIcon({icon:"mblDomButtonWhitePlus"},rect.domNode);
      new mblIcon({icon:"mblDomButtonWhiteMinus"},rect.domNode);
      new mblIcon({icon:"mblDomButtonSilverCircleGrayButton"},rect.domNode);
      new mblIcon({icon:"mblDomButtonSilverCircleOrangeButton"},rect.domNode);
      new mblIcon({icon:"mblDomButtonSilverCircleGreenButton"},rect.domNode);

      new mblIcon({icon:"mblDomButtonSilverCircleGreenPlus"},rect.domNode);
      new mblIcon({icon:"mblDomButtonSilverCircleRedCross"},rect.domNode);

      new mblIcon({icon:"mblDomButtonGrayKnob"},rect.domNode);

      new mblIcon({icon:"mblDomButtonBlueCirclePlus"},rect.domNode);
      new mblIcon({icon:"mblDomButtonBlueCircleMinus"},rect.domNode);
      
      new mblIcon({icon:"mblDomButtonYellowStar"},rect.domNode);

      this.addChild(rect);        
    }
    
  });
  return new view({});
});



//~ var MAX_VALUE = 99; /*MAX VALUE OF Picker*/
//~ 
//~ define(["dojo/text!app/views/cart.html",
        //~ "app/screenClass",
        //~ "dojo/_base/declare",
        //~ "dojox/mobile",
        //~ "dojo/dom-construct",
        //~ "dijit/registry",
        //~ "dojo/query",
        //~ "dojo/on",
        //~ "dojo/_base/lang",
        //~ "dojo/dom-class"],
//~ function(html, screenClass, declare, mobile, domConstruct, registry, query, on, lang, domClass){
  //~ var myClass = declare(screenClass,{
      //~ constructor : function(args){
        //~ declare.safeMixin(this, args);
      //~ },
      //~ start : function(){
        //~ this.listArray = [];
        //~ this.view = registry.byId("cart");
        //~ this.view.on("BeforeTransitionIn",lang.hitch(this,function(){
          //~ this.updateScreen();
        //~ }));
        //~ this.domList = query("ul",this.view.domNode)[0];
        //~ this.domFooter = query(".cart-footer", this.domList)[0];
        //~ this.domTotal = query(".cart-total", this.domFooter)[0];
        //~ this.domButton = query('button',this.domFooter)[0];
        //~ on(this.domButton,"click", lang.hitch(this,function(){
          //~ domClass.toggle(this.domList,'cart-edit');
          //~ if(domClass.contains(this.domList,'cart-edit')){
            //~ this.domButton.innerHTML = "Ok";
          //~ }
          //~ else{
            //~ this.domButton.innerHTML = "Remover";
          //~ }
        //~ }));
        //~ 
        //~ 
      //~ },
      //~ updateScreen : function(){
        //~ this.clearList();
        //~ this.addItem(2,'Vinho Sarget de Gruaud Larose 2005', 222.22);
        //~ this.addItem(1,'Vinho Gruaud Larose 2005', 555.55);
        //~ this.addItem(1,'Pão com banha', 1.25);
        //~ this.updateTotal();
      //~ },
      //~ clearList: function(){
        //~ query('.cart-list',this.list).forEach(domConstruct.destroy);
        //~ this.listArray.length = 0;
      //~ },
      //~ addItem : function(quant, desc, price){
        //~ var item = new mobile.ListItem({'class':'cart-list','icon':'mblDomButtonRedCircleMinus'});
        //~ item.domNode.innerHTML = '<div class="cart-quant"></div>\
                                  //~ <div class="cart-desc"><span>'+desc+'</span></div>\
                                  //~ <div class="cart-price-un">'+Number(price).toFixed(2)+'</div>\
                                  //~ <div class="cart-price-tot">'+Number(price*quant).toFixed(2)+'</div>';
        //~ var obj = { quant:quant,
                    //~ desc:desc,
                    //~ price:price,
                    //~ item:item };
        //~ this.listArray.push(obj);
//~ 
        //~ var picker = new mobile.ValuePickerSlot({value:quant, labelFrom:1, labelTo:MAX_VALUE, readOnly:true});
        //~ picker.placeAt(query(".cart-quant", item.domNode)[0]);
        //~ on(query('.mblValuePickerSlotPlusButton',picker.domNode)[0],"click",
        //~ lang.hitch(this,function(picker,obj,e){
          //~ var val = Number(picker.get('value'));
          //~ if (val == 1){
            //~ val = MAX_VALUE;
            //~ picker.set('value',MAX_VALUE);
          //~ }
          //~ obj.quant = val;
          //~ this.updateTotal();
        //~ },picker,obj));
        //~ on(query('.mblValuePickerSlotMinusButton',picker.domNode)[0],"click",
        //~ lang.hitch(this,function(picker,e){
          //~ var val = Number(picker.get('value'));
          //~ if (val == MAX_VALUE){
            //~ val = 1;
            //~ picker.set('value',1);
          //~ }
          //~ obj.quant = val;
          //~ this.updateTotal();
        //~ },picker,obj));
        //~ item.placeAt(this.domFooter,"before");
//~ 
        //~ on(query('.mblListItemIcon',item.domNode)[0],"click",
        //~ lang.hitch(this,function(obj,e){
          //~ var item = obj.item;
          //~ var i = this.listArray.indexOf(obj);
          //~ this.listArray.splice(i,1);
          //~ item.destroy();
          //~ this.updateTotal();
        //~ },obj));
//~ 
      //~ },
//~ 
      //~ updateTotal : function(){
        //~ var total = 0;
        //~ for (var i = 0; i < this.listArray.length; i++){
          //~ var obj = this.listArray[i];
          //~ line = obj.quant * obj.price;
          //~ total += line;
          //~ var dom = query('.cart-price-tot', obj.item.domNode)[0];
          //~ dom.innerHTML =Number(line).toFixed(2); /*onde insere o valor na lista?*/
        //~ }
        //~ this.domTotal.innerHTML = 'R$ '+Number(total).toFixed(2);
      //~ }
  //~ });
  //~ return new myClass(html);
//~ });
//~ 

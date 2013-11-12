
var MAX_VALUE = 99;

define(["dojo/text!app/views/cart.html",
        "app/screenClass",
        "dojo/_base/declare",
        "dojox/mobile",
        "dojo/dom-construct",
        "dijit/registry",
        "dojo/query",
        "dojo/on",
        "dojo/_base/lang"],
function(html, screenClass, declare, mobile, domConstruct, registry, query, on, lang){
  var myClass = declare(screenClass,{
      constructor : function(args){
        declare.safeMixin(this, args);
      },
      start : function(){
        this.listArray = [];
        this.view = registry.byId("cart");
        this.view.on("BeforeTransitionIn",lang.hitch(this,function(){
          this.updateScreen();
        }));
        this.DomList = query("ul",this.view.domNode)[0];
        this.DomFooter = query(".cart-footer", this.DomList)[0];
        this.DomTotal = query(".cart-c23", this.DomFooter)[0];
      },
      updateScreen : function(){
        this.clearList();
        this.addItem(2,'suco de maria mole', 2.00);
        this.addItem(1,'salada de pirulito', 3.30);
        this.addItem(1,'sanduiche de macarrão', 10.25);
        this.updateTotal();
      },
      clearList: function(){
        query('.cart-list',this.list).orphan();
        this.listArray.length = 0;
      },
      addItem : function(quant, desc, price){
        var obj = {quant:quant, desc:desc, price:price};
        this.listArray.push(obj);
        var item = new mobile.ListItem({class:'cart-list'});
        item.domNode.innerHTML = '<div class="cart-c3"></div>\
                                   <div class="cart-c2">'+Number(price).toFixed(2)+'</div>\
                                   <div class="cart-c1"><span>'+desc+'<\span></div>';
        var picker = new mobile.ValuePickerSlot({value:quant, labelFrom:1, labelTo:MAX_VALUE, readOnly:true});
        picker.placeAt(query(".cart-c3", item.domNode)[0]);
        on(query('.mblValuePickerSlotPlusButton',picker.domNode)[0],"click",
        lang.hitch(this,function(picker,obj,e){
          var val = Number(picker.get('value'));
          if (val == 1){
            val = MAX_VALUE;
            picker.set('value',MAX_VALUE);
          }
          obj.quant = val;
          this.updateTotal();
        },picker,obj));
        on(query('.mblValuePickerSlotMinusButton',picker.domNode)[0],"click",
        lang.hitch(this,function(picker,e){
          var val = Number(picker.get('value'));
          if (val == MAX_VALUE){
            val = 1;
            picker.set('value',1);
          }
          obj.quant = val;
          this.updateTotal();
        },picker,obj));
        item.placeAt(this.DomFooter,"before");
      },
      updateTotal : function(){
        var total = 0;
        for (var i = 0; i < this.listArray.length; i++){
          var obj = this.listArray[i];
          total += obj.quant * obj.price;
        }
        this.DomTotal.innerHTML = "R$ "+Number(total).toFixed(2);
      }
  });
  return new myClass(html);
});


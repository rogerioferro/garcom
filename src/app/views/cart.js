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
        this.view = registry.byId("cart");
        this.view.on("BeforeTransitionIn",lang.hitch(this,function(
          moveTo, dir, transition, context, method){
          this.updateScreen();
        }));
        this.list = query("ul",this.view.domNode)[0];
        this.footer = query(".cart-footer", this.list)[0];

        
        //~ query(".mblValuePickerSlotInput").forEach(function(node, index, nodelist){
          //~ node.readOnly = true;
          //~ on(node, "change", function(){
          //~ });
        //~ });
        //~ 
        //~ query(".mblValuePickerSlotPlusButton").forEach(function(node, index, nodelist){
          //~ on(node, "click", function(){
            //~ console.log("click plus");
          //~ });      
        //~ });
//~ 
        //~ query(".mblValuePickerSlotMinusButton").forEach(function(node, index, nodelist){
          //~ on(node, "click", function(){
            //~ console.log("click minus");
          //~ });      
        //~ });
      },
      updateScreen : function(){
        console.log("Into in Cart");
        var item = new mobile.ListItem({class:'cart-list'});
        item.domNode.innerHTML = '<div class="cart-c3"></div>\
                                   <div class="cart-c2">5,50</div>\
                                   <div class="cart-c1"><span>suco de maria mole<\span></div>';
        item.placeAt(this.footer,"before");
        var quant = new mobile.ValuePickerSlot({value:'1',labelFrom:0,labelTo:30});
        var node = query(".cart-c3", item.domNode)[0];
        quant.placeAt(node);
      }
  });
  return new myClass(html);
});


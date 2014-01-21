define(["app/hcel/hcelView",
        "dojo/_base/declare",
        "dojo/request/iframe",
        'dojo/request/script',
        "dojo/json",
        "dojo/_base/lang",
        "dojo/on",
        "dojo/dom-construct",
        "dojo/dom-class",
        "app/hcel/hcelHeading",
        "dojox/mobile/EdgeToEdgeList",
        "dojox/mobile/ListItem",
        "app/hcel/hcelButton",
        "dojox/mobile/Container",
        "dojox/mobile/TransitionEvent"],
function(screenClass, declare, iframe, script, json, lang, on,
         domConstruct, domClass,
         hcelHeading,  mblList, mblListItem,
         hcelButton, mblContainer,
         mblTransitionEvent){

  var cartView = declare(screenClass,{
    id : "cartView",
    createDom : function(){

      this.on("AfterTransitionIn", this.resize);

      this.addFixedBar(
        new hcelHeading({label : "Pedido",
                         leftText : "Card&aacute;pio",
                         moveTo : "menuView",
                         rightText : "Enviar",
                         fixed : "top"}));

      //Foot
      var foot = new mblContainer({'class':'cartFoot',
                                    fixed:'bottom'});
      var totalLabel = domConstruct.create('div',
                          {'class':'cartTotalLabel',
                           innerHTML:'Valor Total:'}, foot.domNode);
      this.totalPriceDomNode = domConstruct.create('span',
                          {'class':'cartPrice'}, totalLabel);
      this.updateTotal();
      this.addFixedBar(foot);
      //---

      this.list = new mblList();
      for (cod in this.app.cart){
        this._createDomItem(cod);
      }
      this.addChild(this.list);

    },
    _createDomItem : function(cod){
      var cartItem = this.app.cart[cod];
      var quant = Number(cartItem.quant);
      var attr = this.app.products[cod];
      var item_attr = {
        'class' : 'cartList',
        transition : 'none',
        clickable : true,
        noArrow : true,
        moveTo : attr['moveTo'],
        innerHTML : ""
      };
      item_attr['icon'] = this.app.getIcon(attr);
      var item = new mblListItem(item_attr);
      item.cod = cod;
      item.app = this.app;
      item.on('click',lang.hitch(this, function(cod){
          this.app.itemView.start(this, cod);
      }, cod));

      var content = domConstruct.create('div',
        {'class':'cartItemTitle'}, item.domNode);
      item.title1DomNode = domConstruct.create('div',
        {'class':'cartItemTitle1'},content);
      item.title2DomNode = domConstruct.create('div',
        {'class':'cartItemTitle2'},content);
      item.quantDomNode = domConstruct.create('span',
        null,item.title2DomNode);
      item.priceUniDomNode = domConstruct.create('span',
        {'class':'cartItemPriceUni'},item.title2DomNode);
      item.priceTotDomNode = domConstruct.create('div',
        {'class':'cartItemPriceTot'},item.domNode);

      item.updateDom = function(){
        var quant = Number(this.app.cart[this.cod].quant);
        var attr = this.app.products[this.cod];
        this.title1DomNode.innerHTML = attr['label'];
        this.quantDomNode.innerHTML = quant + ' un.';
        this.priceUniDomNode.innerHTML = 'R$ '+ Number(attr['price']).toFixed(2);
        this.priceTotDomNode.innerHTML = 'R$ '+ (quant * Number(attr['price'])).toFixed(2);
      };
      item.update = function(){
        this.updateDom();
        this.app.cartView.updateTotal();
      }

      if (!('item' in cartItem)){
        cartItem['item'] = item;
      }
      item.updateDom();

      this.list.addChild(item);
    },
    addItem : function(cod, quant){
      var cart = this.app.cart;
      if (!(cod in cart)){
        //if there is no Item in the Cart, it will be done in this function,
        //so ENABLE button "Concluir Pedido"
        if (Object.keys(this.app.cart).length == 0){
          app.menuView.head.set("enableRightButton", true);
          for (var index in app.menuView.subScreens){//like foreach, run all the array
            var view = app.menuView.subScreens[index];
            if (view.head){ //If the screen is already dinamically created
              view.head.set("enableRightButton", true);
            }
          }
        }
        cart[cod] = {'quant':quant};
        if (this.list){
          this._createDomItem(cod);
          this.updateTotal();
        }
        prod = this.app.products[cod];
        if ('item' in prod){
          prod['item'].set('rightIcon','mblDomButtonCheck');
        }
      }
    },
    removeItem : function(cod){
      var zeroItem = false;
      var cart = this.app.cart;
      if (cod in cart){
        var itemCart = cart[cod];
        if ('item' in itemCart){
          itemCart['item'].destroyRecursive();
        }
        delete this.app.cart[cod];
        //if there is no Item in the Cart
        //DISABLE button "Concluir Pedido"
        if (Object.keys(this.app.cart).length == 0){
          app.menuView.head.set("enableRightButton", false);
          for (var index in app.menuView.subScreens){//like foreach, run all the array
            var view = app.menuView.subScreens[index];
            if (view.head){ //If the screen is already dinamically created
              view.head.set("enableRightButton", false);
            }
          }
          zeroItem = true;
        }
        this.updateTotal();
        prod = this.app.products[cod];
        if ('item' in prod){
          prod['item'].set('rightIcon','mblDomButtonGrayPlus');
        }
      }
      return zeroItem; //Return to the function if exist or not item in the cart
    },
    updateTotal : function(){
      if (!this.totalPriceDomNode) return;
      var total = 0;
      for (cod in this.app.cart){
        var quant = Number(this.app.cart[cod].quant);
        var attr = this.app.products[cod];
        total += (quant * Number(attr['price']));
      }
      this.totalPriceDomNode.innerHTML = "R$ "+total.toFixed(2);
    }
  });

  return cartView;
});




    //~ addItem : function(code, quant){
      //~ if( !products[code] || !products[code].desc || !products[code].price)
        //~ return;
        //~
      //~ quant = Number(quant) || 1;
//~
      //~ for (var i in this.listArray){
        //~ var obj = this.listArray[i];
        //~ if (obj.code == code){
          //~ var q = Number(obj.picker.get('value')) + quant;
          //~ obj.picker.set('value',q);
          //~ return;
        //~ }
      //~ }
      //~
      //~ desc = products[code].desc;
      //~ price = Number(products[code].price);
      //~ /*create a new item*/
      //~ var item = new mblListItem({'class':'cart-list'});
      //~ /*clear content...*/
      //~ item.containerNode.innerHTML = "";
      //~ /*insert icon element*/
      //~ var div_icon = domConstruct.create('div',
                                          //~ {'class':'mblListItemIcon'},
                                          //~ item.containerNode);
      //~ new mblIcon({icon:'mblDomButtonRedCircleMinus'}, div_icon);
      //~ /*insert quantity element*/
      //~ var div_quant = domConstruct.create('div',
                                          //~ {'class':'cart-quant'},
                                          //~ item.containerNode);
      //~ /*insert description element*/
      //~ domConstruct.create('div',
                          //~ {'class':'cart-desc',
                           //~ 'innerHTML':'<span>'+desc},
                          //~ item.containerNode);
      //~ /*insert unit price element*/
      //~ domConstruct.create('div',
                          //~ {'class':'cart-price-un',
                           //~ 'innerHTML':price.toFixed(2)},
                          //~ item.containerNode);
      //~ /*insert total price element*/
      //~ var div_price_tot =
        //~ domConstruct.create('div',
                            //~ {'class':'cart-price-tot',
                             //~ 'innerHTML':(price*quant).toFixed(2)},
                            //~ item.containerNode);
//~
      //~ var picker = new hcelPicker({value:quant, minValue:1, maxValue:99});
      //~ picker.placeAt(div_quant);
      //~ picker.on("change",lang.hitch(this,function(value){
        //~ this.updateTotal();
      //~ }));
//~
      //~ var obj = { code:code,
                  //~ desc:desc,
                  //~ price:price,
                  //~ div_price_tot:div_price_tot,
                  //~ picker:picker,
                  //~ item:item };
      //~ this.listArray.push(obj);
//~
      //~ item.own(on.once(div_icon,"click", lang.hitch(this,function(obj,e){
        //~ var item = obj.item;
        //~ var picker = obj.picker;
        //~ var i = this.listArray.indexOf(obj);
        //~ this.listArray.splice(i,1);
        //~ picker.destroyRecursive();
        //~ item.destroyRecursive();
        //~ this.updateTotal();
      //~ },obj)));
//~
      //~ item.placeAt(this.footer.domNode,"before");
//~
    //~ },
    //~ updateTotal : function(){
      //~ var total = 0;
      //~ for (var i in this.listArray){
        //~ var obj = this.listArray[i];
        //~ var quant = Number(obj.picker.get('value'));
        //~ var line = quant * obj.price;
        //~ total += line;
        //~ obj.div_price_tot.innerHTML =Number(line).toFixed(2);
      //~ }
      //~ this.total.innerHTML = 'R$ '+Number(total).toFixed(2);
    //~ }



      //~ var btn = new mblButton({'class':'mblBlueButton mblBigButton',label:'Enviar'});
      //~ btn.on("click", lang.hitch(this,function(){
        //~ obj = {};
        //~ for ( i in this.listArray) {
          //~ arr = this.listArray[i];
          //~ obj[i] = json.stringify({
              //~ code : arr.code,
              //~ desc : arr.desc,
              //~ price : arr.price,
              //~ quant : arr.picker.get('value')
          //~ });
        //~ }
        //~ var promise = iframe("http://www.hcel.com.br/jsonp",{
          //~ handleAs:"json",
          //~ //data: {data:json.stringify(obj)},
          //~ data: obj,
          //~ timeout: 2000,
          //~ query: {send:'cart'}
        //~ });
//~
        //~ promise.response.always(function(response){
          //~ promise.cancel();
          //~ script.get("http://www.hcel.com.br/jsonp",{
            //~ jsonp: "callback",
            //~ preventCache: true,
            //~ query:{email:"test@gmail.com",teste:"some text go here..."} //data to send
          //~ }).then(function(data){
            //~ // handle data
            //~ console.log( json.stringify(data) == json.stringify(obj) );
          //~ }, function(err){
            //~ // handle an error condition
            //~ console.log(err);
          //~ });
        //~ });
      //~ }));

var products = {
  0 : {desc : "Vinho Sarget de Gruaud Larose 2005", price: 222.22},
  1 : {desc : "Vinho Gruaud Larose 2005", price: 555.55},
  2 : {desc : "Pão com banha", price: 1.25}
};

define(["app/hcel/hcelScrollableView",
        "dojo/_base/declare",
        "dojo/request/iframe",
        'dojo/request/script',
        "dojo/json",
        "dojo/_base/lang",
        "dojo/on",
        "dojo/dom-construct",
        "dojo/dom-class",
        "dojox/mobile/Heading",
        "dojox/mobile/RoundRect",
        "dojox/mobile/RoundRectList",
        "dojox/mobile/ListItem",
        "app/hcel/hcelPicker",
        "dojox/mobile/Icon",
        "dojox/mobile/Button"],
function(screenClass, declare, iframe, script, json, lang, on,
         domConstruct, domClass,
         mblHeading, mblRoundRect, mblRoundRectList, mblListItem, hcelPicker,
         mblIcon, mblButton){
           
  var cartView = declare(screenClass,{

    id : "cartView",

    listArray : [],
    
    createDom : function(){
      this.addFixedBar(
        new mblHeading({label : "Pedido", fixed : "top"}));

      var rect = new mblRoundRect({'class':"center-container"});

      this.list = new mblRoundRectList({'class':"center-container"})
        .placeAt(rect.domNode);

      /*Title*/
      this.title = new mblListItem({'class':"cart-title"});
      this.title.domNode.innerHTML = '<div class="cart-quant">*</div><div class="cart-desc">Descri&ccedil;&atilde;o</div><div class="cart-price-un">R$ un.</div><div class="cart-price-tot">R$ Total</div>';
      this.list.addChild(this.title);

      /*Footer*/
      this.footer = new mblListItem({'class':"cart-footer"});
      var div = domConstruct.create('div',{'class':'cart-button'},this.footer.domNode,'only');
      var btn = new mblButton({'class':'mblBlueButton',label:'Remover'}).placeAt(div);
      domConstruct.create('div',{'class':'cart-desc','innerHTML':'TOTAL GERAL:'},this.footer.domNode);
      this.total = domConstruct.create('div',{'class':'cart-total','innerHTML':'R$'},this.footer.domNode);
      this.list.addChild(this.footer);

      btn.on("click", lang.hitch(this,function(btn){
        domClass.toggle(this.list.domNode,'cart-edit');
        if(domClass.contains(this.list.domNode,'cart-edit')){
          btn.set('label',"Ok");
        }
        else{
          btn.set('label', "Remover");
        }
      },btn));

      this.addItem(0);
      this.addItem(1,2);
      this.addItem(2);
      this.addItem(2,3);
      this.updateTotal();

      var btn = new mblButton({'class':'mblBlueButton mblBigButton',label:'Enviar'});
      btn.on("click", lang.hitch(this,function(){
        obj = {};
        for ( i in this.listArray) {
          arr = this.listArray[i];
          obj[i] = json.stringify({
              code : arr.code,
              desc : arr.desc,
              price : arr.price,
              quant : arr.picker.get('value')
          });
        }
        var promise = iframe("http://www.hcel.com.br/jsonp",{
          handleAs:"json",
          //data: {data:json.stringify(obj)},
          data: obj,
          timeout: 2000,
          query: {send:'cart'}
        });

        promise.response.always(function(response){
          promise.cancel();
          script.get("http://www.hcel.com.br/jsonp",{
            jsonp: "callback",
            preventCache: true,
            query:{email:"test@gmail.com",teste:"some text go here..."} //data to send
          }).then(function(data){
            // handle data
            console.log( json.stringify(data) == json.stringify(obj) );
          }, function(err){
            // handle an error condition
            console.log(err);
          });
        });
      }));

      rect.addChild(btn);
      
      this.addChild(rect);

    },
    addItem : function(code, quant){
      if( !products[code] || !products[code].desc || !products[code].price)
        return;
        
      quant = Number(quant) || 1;

      for (var i in this.listArray){
        var obj = this.listArray[i];
        if (obj.code == code){
          var q = Number(obj.picker.get('value')) + quant;
          obj.picker.set('value',q);
          return;
        }
      }
      
      desc = products[code].desc;
      price = Number(products[code].price);
      /*create a new item*/
      var item = new mblListItem({'class':'cart-list'});
      /*clear content...*/
      item.containerNode.innerHTML = "";
      /*insert icon element*/
      var div_icon = domConstruct.create('div',
                                          {'class':'mblListItemIcon'},
                                          item.containerNode);
      new mblIcon({icon:'mblDomButtonRedCircleMinus'}, div_icon);
      /*insert quantity element*/
      var div_quant = domConstruct.create('div',
                                          {'class':'cart-quant'},
                                          item.containerNode);
      /*insert description element*/
      domConstruct.create('div',
                          {'class':'cart-desc',
                           'innerHTML':'<span>'+desc},
                          item.containerNode);
      /*insert unit price element*/
      domConstruct.create('div',
                          {'class':'cart-price-un',
                           'innerHTML':price.toFixed(2)},
                          item.containerNode);
      /*insert total price element*/
      var div_price_tot =
        domConstruct.create('div',
                            {'class':'cart-price-tot',
                             'innerHTML':(price*quant).toFixed(2)},
                            item.containerNode);

      var picker = new hcelPicker({value:quant, minValue:1, maxValue:99});
      picker.placeAt(div_quant);
      picker.on("change",lang.hitch(this,function(value){
        this.updateTotal();
      }));

      var obj = { code:code,
                  desc:desc,
                  price:price,
                  div_price_tot:div_price_tot,
                  picker:picker,
                  item:item };
      this.listArray.push(obj);

      item.own(on.once(div_icon,"click", lang.hitch(this,function(obj,e){
        var item = obj.item;
        var picker = obj.picker;
        var i = this.listArray.indexOf(obj);
        this.listArray.splice(i,1);
        picker.destroyRecursive();
        item.destroyRecursive();
        this.updateTotal();
      },obj)));

      item.placeAt(this.footer.domNode,"before");

    },
    updateTotal : function(){
      var total = 0;
      for (var i in this.listArray){
        var obj = this.listArray[i];
        var quant = Number(obj.picker.get('value'));
        var line = quant * obj.price;
        total += line;
        obj.div_price_tot.innerHTML =Number(line).toFixed(2); 
      }
      this.total.innerHTML = 'R$ '+Number(total).toFixed(2);
    }
  });
  
  return cartView;
});

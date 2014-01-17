define(["app/hcel/hcelView",
        "dojo/_base/declare",
        "dojo/dom-construct",
        "dojo/dom-class",
        "dojo/_base/lang",
        "app/hcel/hcelHeading",
        "dojox/mobile/iconUtils",
        "app/hcel/hcelPicker",
        "app/hcel/hcelButton",
        "dojox/mobile/Container"],
function(hcelView, declare, domConstruct, domClass, lang,
         hcelHeading, mblIconUtils, hcelPicker, hcelButton, mblContainer){

  var itemView = declare(hcelView, {
      id : 'itemView',
      quant : 1,
      createDom : function(){

        this.on("BeforeTransitionOut", this.goOut);

        //Head
        this.head = new hcelHeading({'class':'itemHead',
                                    label:'Detalhes',
                                    rightText:'OK',
                                    fixed:'top',
                                    transition:'none'});
        this.addFixedBar(this.head);
        this.head.startup();

        this.head.rightButton.on('click',lang.hitch(this,function(){
          if (!this.onCart){
            this.app.cartView.addItem(this.cod, this.quant);
          }
        }));
        //---

        //Foot
        this.foot = new mblContainer({'class':'itemFoot',
                                      fixed:'bottom'});

        var totalLabel = domConstruct.create('div',
                            {'class':'itemTotal  itemBigLabel',
                             innerHTML:'Valor Total:'}, this.foot.domNode);
        this.totalPriceDomNode = domConstruct.create('span',
                            {'class':'itemPrice'}, totalLabel);

        this.removeButton = new hcelButton({'class':'itemButton itemRemoveButton',
                                            'icon':'mblDomButtonTrash'});
        this.removeButton.on('click',lang.hitch(this, function(){
          if (this.onCart){
            this.app.cartView.removeItem(this.cod);
            this.performTransition(this.moveTo);
          }
          this.updateState();
        }));
        this.foot.addChild(this.removeButton);
        var btn1 = new hcelButton({'class':'itemButton itemFavButton',
                                   icon:'mblDomButtonGrayStar',
                                   iconSelected:'mblDomButtonYellowStar'});
        this.foot.addChild(btn1);
        this.addFixedBar(this.foot);
        //---

        this.itemContainerNode = domConstruct.create('div',
                      {'class':'itemContainer'});

        //Title
        var titleContainer = domConstruct.create('div',
                      {'class':'itemTitleContainer'}, this.itemContainerNode);
        this.iconDomNode = domConstruct.create('div',
                      {'class':'itemIcon'}, titleContainer);
        var title = domConstruct.create('div',
                      {'class':'itemTitle'}, titleContainer);
        this.titleDomNode = domConstruct.create('span',null,title);
        //---


        //Price
        var priceLabel = domConstruct.create('div',
                            {'class':'itemPriceLabel itemBigLabel',
                             innerHTML:'Preço:'}, this.itemContainerNode);
        this.priceDomNode = domConstruct.create('span',
                            {'class':'itemPrice'}, priceLabel);
        //---


        //Description
        domConstruct.create('div',
                      {'class':'itemLabel',
                       innerHTML:'Detalhes:'}, this.itemContainerNode);
        this.descrDomNode = domConstruct.create('div',
                      {'class':'itemDescr'}, this.itemContainerNode);
        //--

        //Quantity
        var quantDomNode = domConstruct.create('div',
                      {'class':'itemQuant'}, this.itemContainerNode);
        domConstruct.create('div',
                      { 'class': 'itemQuantLabel itemBigLabel',
                        innerHTML: 'Quantidade:'}, quantDomNode);
        this.picker = new hcelPicker({value:1, minValue:1, maxValue:99});
        this.picker.placeAt(quantDomNode);
        this.picker.on('change', lang.hitch(this,function(value){
          this.quant = value;
          if (this.onCart){
            this.app.cart[this.cod].quant = this.quant;
            this.updateTotalValue(value);
          }
        }));
        //--

        this.addNode(this.itemContainerNode);
      },
      resizeDescr : function(){
        if (!this.descrDomNode) return;
        var h0 = this.descrDomNode.offsetHeight
        var h1 = this.containerNode.offsetHeight - this.itemContainerNode.offsetHeight;
        this.descrDomNode.style.height = (h0 + h1 - 19) + 'px';
      },
      resize : function(){
        if (this.descrDomNode){
          this.descrDomNode.style.height = 'auto';
        }
        //this.fixedFooterHeight = this.onCart?65:40;
        this.inherited(arguments);
        this.scroll = this.containerNode.offsetHeight > this.viewHeight;
        this.resizeDescr();
      },
      updateState : function(){
        this.onCart = this.cod in this.app.cart;
        domClass[this.onCart?'add':'remove'](this.domNode,'itemEdit');
        this.head.set('enableRightButton',!this.onCart);

        this.head.set('leftText',this.onCart?'Voltar':'Cancelar');

        var quant = this.onCart?Number(this.app.cart[this.cod].quant):1;
        this.picker.set('value',quant)
        this.updateTotalValue(quant);
        this.resize();
      },
      start : function(view, cod){
        this.cod = cod;
        this.attr = this.app.products[this.cod];
        view.performTransition(this.id);

        this.moveTo = view.id;
        this.head.set('moveTo',this.moveTo);
        this.head.set('rightMoveTo',this.moveTo);
        var label = this.onCart?'Editar':'Detalhes';
        this.head.set('label', label);

        this.icon = mblIconUtils.setIcon(app.getIcon(this.attr),
                      null, this.icon, null, this.iconDomNode);
        this.titleDomNode.innerHTML = this.attr['label'];
        this.priceDomNode.innerHTML = 'R$ '+ Number(this.attr['price']).toFixed(2);
        this.descrDomNode.innerHTML = this.attr['descr'] || this.attr['label'];
        this.updateState();
      },
      updateTotalValue : function(quant){
          this.totalPriceDomNode.innerHTML = 'R$ ' +
            (Number(this.attr['price']) * quant).toFixed(2);
      },
      goOut : function(){
        var cart = this.app.cart;
        if (this.cod in cart){
          var itemCart = cart[this.cod];
          if ('item' in itemCart){
            itemCart['item'].update();
          }
        }
      }
  });

  return itemView;
});

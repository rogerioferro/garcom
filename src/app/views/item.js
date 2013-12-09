define(["app/hcel/hcelView",
        "dojo/_base/declare",
        "dojo/dom-construct",
        "dojo/_base/window",
        "dojo/_base/lang",
        "app/hcel/hcelHeading",
        "dojox/mobile/iconUtils",
        "app/hcel/hcelPicker",
        "app/hcel/hcelButton",
        "dojox/mobile/Container",
        "dojox/mobile/Button"],
function(screenClass, declare, domConstruct, win, lang,
         mblHeading, mblIconUtils, hcelPicker, hcelButton, mblContainer, mblButton){

  var itemView = declare(screenClass, {
      id : 'itemView',
      createDom : function(){
        //Head
        this.head = new mblHeading({'class':'itemHead',
                                    label:'Detalhes',
                                    fixed:'top',
                                    transition:'none'});
        this.addFixedBar(this.head);
        this.head.startup();
        //---

        //Foot
        this.foot = new mblContainer({'class':'itemFoot',
                                      fixed:'bottom'});
        var btn0 = new hcelButton({'class':'itemButton itemAddButton',
                                   icon:'mblDomButtonGrayPlus'});
        this.foot.addChild(btn0);
        var btn1 = new hcelButton({'class':'itemButton itemFavButton',
                                   icon:'mblDomButtonGrayStar',
                                   iconSelected:'mblDomButtonYellowStar'});
        this.foot.addChild(btn1);
        this.addFixedBar(this.foot);
        //---


        //Title
        var titleContainer = domConstruct.create('div',
                      {'class':'itemTitleContainer'});
        this.iconDomNode = domConstruct.create('div',
                      {'class':'itemIcon'}, titleContainer);
        var title = domConstruct.create('div',
                      {'class':'itemTitle'}, titleContainer);
        this.titleDomNode = domConstruct.create('span',null,title);
        this.priceDomNode = domConstruct.create('span',
                      {'class':'itemPrice'}, titleContainer);
        this.addNode(titleContainer);
        //---

        //Description
        this.addNode(domConstruct.create('div',
                                         {'class':'itemLabel',
                                          innerHTML:'Detalhes:'}));
        this.descrDomNode = domConstruct.create('div',
                                         {'class':'itemDescr'});
        this.addNode(this.descrDomNode);
        //--

        //Edit
        this.editDomNode = domConstruct.create('div',
                                           {'class':'itemEdit'});        
        domConstruct.create('div',
                      { 'class': 'itemLabel',
                        innerHTML: 'Quantidade:'}, this.editDomNode);
        this.picker = new hcelPicker({value:1, minValue:1, maxValue:99});
        this.picker.placeAt(this.editDomNode);
        var totalLabel = domConstruct.create('div',
                            {'class':'itemTotal',
                             innerHTML:'Valor Total:'}, this.editDomNode);
        this.totalPriceDomNode = domConstruct.create('span',
                            {'class':'itemPrice'}, totalLabel);
        this.addNode(this.editDomNode);
        //--

        this.resizeDescr();

      },
      resizeDescr : function(){
        if (!this.descrDomNode) return;
        var descrTop = this.descrDomNode.offsetTop;
        var editTop = this.editDomNode.offsetTop;
        this.descrDomNode.style.height = (editTop - descrTop - 15) + 'px';
      },
      resize : function(){
        var minSize = 300;
        if (this.descrDomNode)
          this.descrDomNode.style.height = 0;
        this.inherited(arguments);
        var height = this.containerNode.offsetHeight;
        if (height > minSize){
          this.scroll = false;
        }
        else{
          this.scroll = true;
          height = minSize;
          this.containerNode.style.height = height + 'px';
        }
        this.resizeDescr();
      },
      start : function(view, cod){
        var onCart = cod in app.cart;
        var attr = app.products[cod];
        view.performTransition(this.id);
        this.resizeDescr();
        
        this.head.set('moveTo',view.id);
        var label = onCart?'Editar':'Detalhes';
        this.head.set('label', label);
        
        this.icon = mblIconUtils.setIcon(app.getIcon(attr),
                      null, this.icon, null, this.iconDomNode);
        this.titleDomNode.innerHTML = attr['label'];
        this.priceDomNode.innerHTML = 'R$ '+ Number(attr['price']).toFixed(2);
        this.descrDomNode.innerHTML = attr['descr'] || attr['label'];
        this.totalPriceDomNode.innerHTML = 'R$ ' +
          (Number(attr['price']) * this.picker.get('value')).toFixed(2);
        
        this.inherited(arguments);
      }
  });

  return itemView;
});

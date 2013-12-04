define(["app/hcel/hcelView",
        "dojo/_base/declare",
        "dojo/dom-construct",
        "dojo/_base/window",
        "dojo/_base/lang",
        "dojox/mobile/Heading",
        "dojox/mobile/iconUtils",
        "app/hcel/hcelPicker",
        "app/hcel/hcelButton",
        "dojox/mobile/Container",
        "dojox/mobile/Button"],
function(screenClass, declare, domConstruct, win, lang,
         mblHeading, mblIconUtils, hcelPicker, hcelFlatButton, mblContainer, mblButton){

  var itemView = declare(screenClass, {
      id : 'itemView',
      createDom : function(){
        //Head
        this.head = new mblHeading({'class':'itemHead',
                                    back:'Voltar',
                                    fixed:'top',
                                    transition:'none'});
        this.addFixedBar(this.head);
        this.head.startup();
        //---

        //Foot
        this.foot = new mblContainer({'class':'itemFoot',
                                      fixed:'bottom'});
        var btn0 = new hcelFlatButton({'class':'itemButton itemAddButton'});
        mblIconUtils.createIcon('mblDomButtonGrayPlus',null, null, null, btn0.domNode);
        //mblIconUtils.createIcon('mblDomButtonTrash',null, null, null, btn0.domNode);
        this.foot.addChild(btn0);
        var btn1 = new hcelFlatButton({'class':'itemButton itemFavButton'});
        mblIconUtils.createIcon('mblDomButtonYellowStar',null, null, null, btn1.domNode);
        //mblIconUtils.createIcon('mblDomButtonGrayStar',null, null, null, btn1.domNode);
        this.foot.addChild(btn1);
        this.addFixedBar(this.foot);
        //---


        //Title
        var titleContainer = domConstruct.create('div',
                      {'class':'itemTitleContainer'});
        this.iconDomNode = domConstruct.create('div',
                      {'class':'itemIcon'}, titleContainer);
        this.titleDomNode = domConstruct.create('div',
                      {'class':'itemTitle'}, titleContainer);
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
        this.inherited(arguments);
        this.resizeDescr();
      },
      start : function(view, attr){
        view.performTransition(this.id);
        
        this.head.set('moveTo',view.id);
        this.head.set('label','Detalhes');
        
        this.icon = mblIconUtils.setIcon(attr['icon'],
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

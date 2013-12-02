define(["app/hcel/hcelView",
        "dojo/_base/declare",
        "dojo/dom-construct",
        "dojo/_base/window",
        "dojo/_base/lang",
        "dojox/mobile/Heading",
        "dojox/mobile/iconUtils",
        "app/hcel/hcelPicker",
        "app/hcel/hcelButton",
        "dojox/mobile/Pane",
        "dojox/mobile/Button"],
function(screenClass, declare, domConstruct, win, lang,
         mblHeading, mblIconUtils, hcelPicker, hcelFlatButton, mblPane, mblButton){

  var itemView = declare(screenClass, {
      id : 'itemView',
      createDom : function(){
        this.head = new mblHeading({'class':'itemHead',
                                    back:'Voltar',
                                    fixed:'top',
                                    transition:'none'});
        this.addFixedBar(this.head);
        this.head.startup();

        this.foot = new mblHeading({'class':'itemFoot',
                                    fixed:'bottom'});
        this.addFixedBar(this.foot);
        this.foot.startup();

        var btn = new hcelFlatButton({innerHTML:'Test...'});
        this.foot.addChild(btn);


        //Title
        var titleContainer = domConstruct.create('div',
                      {'class':'itemTitleContainer'});
        this.iconDomNode = domConstruct.create('div',
                      {'class':'itemIcon'}, titleContainer);
        this.title = domConstruct.create('div',
                      {'class':'itemTitle'}, titleContainer);
        this.price = domConstruct.create('span',
                      {'class':'itemPrice'}, titleContainer);
        this.addNode(titleContainer);
        //---

        this.addNode(domConstruct.create('div',
                                         {'class': 'itemLabel',
                                          innerHTML: 'Detalhes:'}));
                        
        this.descr = domConstruct.create('div',
                                         {'class': 'itemDescr'});
        this.addNode(this.descr);
        
        this.editDomNode = domConstruct.create('div',
                                           {'class':'itemEdit'});        
        domConstruct.create('div',
                      { 'class': 'itemLabel',
                        innerHTML: 'Quantidade:'},this.editDomNode);
        var picker = new hcelPicker({value:1, minValue:1, maxValue:99});
        picker.placeAt(this.editDomNode);
        var btnTrash = new hcelFlatButton({'class':'mblFlatButton itemTrashButton'})
          .placeAt(this.editDomNode);
        mblIconUtils.createIcon('mblDomButtonTrash',null, null, null, btnTrash.domNode);
        this.addNode(this.editDomNode);

        this.resizeDescr();

      },
      resizeDescr : function(){
        if (!this.descr) return;
        var top = this.descr.offsetTop;
        var height = this.containerNode.offsetHeight;
        var edit_height = this.editDomNode.offsetHeight;
        var other = 22; // border + padding + margin
        this.descr.style.height = (height - top - other - edit_height) + 'px';
        
      },
      resize : function(){
        this.inherited(arguments);
        this.resizeDescr();
        //~ console.log('domNode:');
        //~ console.log(this.containerNode.offsetHeight);
        //~ if (this.descr){
          //~ console.log('descr top:');
          //~ console.log(this.descr.offsetTop);
        //~ }
      },
      start : function(view, attr){
        view.performTransition(this.id);
        
        this.head.set('moveTo',view.id);
        this.head.set('label','Detalhes');
        
        this.icon = mblIconUtils.setIcon(attr['icon'],
                      null, this.icon, null, this.iconDomNode);
        this.title.innerHTML = attr['label'];
        this.price.innerHTML = 'R$ '+attr['price'];
        this.descr.innerHTML = attr['descr'] || attr['label'];
        
        this.inherited(arguments);
      }
  });

  return itemView;
});


  //~ return {
    //~ _create : function(){
      //~ if (!this.dlg){
        //~ this.dlg = new mblSimpleDialog({'class':'menu-dlg'});
        //~ this.dlg.placeAt(win.body());
//~ 
        //~ var title = domConstruct.create('div',
                      //~ {'class':'mblSimpleDialogTitle'},
                        //~ this.dlg.containerNode);
//~ 
        //~ this.div_icon = domConstruct.create('div',
                      //~ {'class':'menu-icon'}, title);
//~ 
        //~ this.label = domConstruct.create('div',
                      //~ {'class':'menu-title'}, title);
        //~ 
        //~ domConstruct.create('div',
                      //~ { 'class': 'menu-label',
                        //~ innerHTML: 'Detalhes:'}, this.dlg.containerNode);
                        //~ 
        //~ this.descr = domConstruct.create('div',
                      //~ { 'class': 'menu-descr'}, this.dlg.containerNode);
                      //~ 
//~ 
        //~ var div_edit = domConstruct.create('div',
                      //~ {'class':'menu-edit'}, this.dlg.containerNode);
        //~ 
        //~ domConstruct.create('div',
                      //~ { 'class': 'menu-label',
                        //~ innerHTML: 'Quantidade:'},div_edit);
        //~ var picker = new hcelPicker({value:1, minValue:1, maxValue:99});
        //~ picker.placeAt(div_edit);
//~ 
        //~ var btnTrash = new hcelFlatButton({'class':'mblFlatButton menu-trash-button'})
          //~ .placeAt(div_edit);
//~ 
        //~ mblIconUtils.createIcon('mblDomButtonTrash',null, null, null, btnTrash.domNode);
          //~ 
        //~ new hcelFlatButton({'class':'mblFlatButton', innerHTML: 'OK'})
          //~ .placeAt(this.dlg.containerNode)
          //~ .on('click',lang.hitch(this,function(){
            //~ this.dlg.hide();
          //~ }));
//~ 
      //~ }
    //~ },
    //~ setAttr : function(attr){
      //~ this._create();
      //~ this.icon = mblIconUtils.setIcon(attr['icon'],
                    //~ null, this.icon, null, this.div_icon);
      //~ this.label.innerHTML = attr['label'];
      //~ this.descr.innerHTML = attr['descr'] || attr['label'];
    //~ },
    //~ show : function(){
      //~ this._create();
      //~ this.dlg.show();
    //~ }
  //~ };

define(["app/screenClass",
        "dojo/_base/declare",
        "dojo/dom-construct",
        "dojo/_base/window",
        "dojo/_base/lang",
        "dojox/mobile/Heading",
        "dojox/mobile/iconUtils",
        "app/picker",
        "app/flatButton",
        "dojox/mobile/Button"],
function(screenClass, declare, domConstruct, win, lang,
         mblHeading, mblIconUtils, hcelPicker, hcelFlatButton, mblButton){

  var itemView = declare(screenClass, {
      id : 'itemView',
      createDom : function(){
        this.head = new mblHeading({'class':'itemHead',
                                    back:'Voltar',
                                    fixed:'top',
                                    transition:'none'});
        this.addFixedBar(this.head);
        this.head.startup();

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


        var editDomNode = domConstruct.create('div',
                                           {'class':'itemEdit'});
        this.addNode(editDomNode);
        
        domConstruct.create('div',
                      { 'class': 'itemLabel',
                        innerHTML: 'Quantidade:'},editDomNode);
        var picker = new hcelPicker({value:1, minValue:1, maxValue:99});
        picker.placeAt(editDomNode);

        var btnTrash = new hcelFlatButton({'class':'mblFlatButton itemTrashButton'})
          .placeAt(editDomNode);

        mblIconUtils.createIcon('mblDomButtonTrash',null, null, null, btnTrash.domNode);


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

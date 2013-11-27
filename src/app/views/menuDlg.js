

define(["dojo/dom-construct",
        "dojo/_base/window",
        "dojo/_base/lang",
        "dojox/mobile/SimpleDialog",
        "dojox/mobile/Button"],
function(domConstruct, win, lang,
         mblSimpleDialog, mblButton){
  return {
    _create : function(){
      if (!this.dlg){
        this.dlg = new mblSimpleDialog();        
        win.body().appendChild(this.dlg.domNode);
        this.title = domConstruct.create('div',
              { 'class': 'mblSimpleDialogTitle'},
                this.dlg.containerNode);
        this.descr = domConstruct.create('div',
              { 'class': 'mblSimpleDialogText'},
                this.dlg.containerNode);
        new mblButton({'class':'mblSimpleDialogButton', innerHTML: 'OK'})
          .placeAt(this.dlg.containerNode)
          .on('click',lang.hitch(this,function(){
            this.dlg.hide();
          }));
            
      }
    },
    setAttr : function(attr){
      this._create();
      this.title.innerHTML = attr['label'];
      
      this.descr.innerHTML = attr['descr'] || 'sem descrição';
    },
    show : function(){
      this._create();
      this.dlg.show();
    }
  };
});

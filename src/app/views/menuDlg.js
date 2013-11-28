

define(["dojo/dom-construct",
        "dojo/_base/window",
        "dojo/_base/lang",
        "dojox/mobile/SimpleDialog",
        "dojox/mobile/iconUtils",
        "dojox/mobile/Button"],
function(domConstruct, win, lang,
         mblSimpleDialog, mblIconUtils, mblButton){
  return {
    _create : function(){
      if (!this.dlg){
        this.dlg = new mblSimpleDialog({'class':'menu-dlg'});
        this.dlg.placeAt(win.body());

        var title = domConstruct.create('div',
                      {'class':'mblSimpleDialogTitle'},
                        this.dlg.containerNode);

        this.div_icon = domConstruct.create('div',
                      {'class':'menu-icon'}, title);

        this.label = domConstruct.create('div',
                      {'class':'menu-label'}, title);


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
      this.icon = mblIconUtils.setIcon(attr['icon'],
                    null, this.icon, null, this.div_icon);
      this.label.innerHTML = attr['label'];
      this.descr.innerHTML = attr['descr'] || 'sem descrição';
    },
    show : function(){
      this._create();
      this.dlg.show();
    }
  };
});

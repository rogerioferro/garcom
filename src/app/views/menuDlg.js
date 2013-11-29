

define(["dojo/dom-construct",
        "dojo/_base/window",
        "dojo/_base/lang",
        "dojox/mobile/SimpleDialog",
        "dojox/mobile/iconUtils",
        "app/picker",
        "dojox/mobile/Button"],
function(domConstruct, win, lang,
         mblSimpleDialog, mblIconUtils, hcelPicker, mblButton){
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
                      {'class':'menu-title'}, title);
        
        domConstruct.create('div',
                      { 'class': 'menu-label',
                        innerHTML: 'Detalhes:'}, this.dlg.containerNode);
                        
        this.descr = domConstruct.create('div',
                      { 'class': 'menu-descr'}, this.dlg.containerNode);

        domConstruct.create('div',
                      { 'class': 'menu-label',
                        innerHTML: 'Quantidade:'},this.dlg.containerNode);
        var picker = new hcelPicker({value:1, minValue:1, maxValue:99});
        picker.placeAt(this.dlg.containerNode);
                      
          
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
      this.descr.innerHTML = attr['descr'] || attr['label'];
    },
    show : function(){
      this._create();
      this.dlg.show();
    }
  };
});

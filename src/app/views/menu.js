define(["app/hcel/hcelView",
        "dojo/_base/declare",
        "dojo/dom-construct",
        "dojo/_base/window",
        "dojo/_base/lang",
        "app/views/item",
        "app/hcel/hcelHeading",
        "dojox/mobile/EdgeToEdgeList",
        "dojox/mobile/ListItem",
        "dojox/mobile/Button"],
function(hcelView, declare, domConstruct, win, lang, itemView,
         hcelHeading, mblList, mblListItem, mblButton){

  var subView = declare(hcelView,{
      createDom : function(){
        /*Head creation*/
        var data = this.viewData['head'];
        var head_attr = {};
        head_attr.label = data.label || "Card&aacute;pio";
        head_attr.fixed = "top";
        head_attr.transition = 'none';
        head_attr.rightText = 'Concluir';
        head_attr.rightMoveTo = 'cartView';
        if ('moveTo' in data){
          head_attr.leftText = 'Voltar';
          head_attr.moveTo = data.moveTo;
        }
        var head = new hcelHeading(head_attr);

        this.addFixedBar(head);
        head.startup();
        /* */

        if(!this.viewData) return;

        /*List creation*/
        var list = new mblList();
        /* */

        //var showItem = this.viewData['type'] != 'group';
        
        var itemList = this.viewData['list'] || this.viewData['codes'];
        
        /*List Item add*/
        for(var i in itemList){
          var showItem = false;
          var attr = itemList[i];
          if (typeof attr != 'object'){
            attr = app.products[attr];
            showItem = true;
          }
          var item_attr = {
            'class' : 'menuList'+(showItem?'':' menuGroupList'),
            innerHTML : '<div class = "menuTitle">' +
              attr['label']+'</div>'+
              (showItem?('<span class = "menuPrice"> R$ '+attr['price']+'</span>'):'')
              ,
            transition : 'none',
            icon: app.getIcon(attr)
          };

          if (showItem){
            var onCart = attr['cod'] in app.cart;
            item_attr['rightIcon'] =  onCart?'mblDomButtonCheck':'mblDomButtonGrayPlus';
            item_attr['clickable'] = true;
            item_attr['noArrow'] = true;
          }else{
            item_attr['moveTo'] = attr['moveTo'];
          }
          var item = new mblListItem(item_attr);
          attr['item'] = item;
          if (showItem){
            item.on('click',lang.hitch(this, function(cod){
                this.app.itemView.start(this, cod);
              }, attr['cod']));
          }
          
          list.addChild(item);
        }

        this.addChild(list);
      }
  });

  var menuView = declare(subView, {
    id:'menuView',
    subScreens:[],
    updateMenu: function(obj){

      var screens = this.app.menuData['screens'];

      //clear old screens
      while (this.subScreens.length > 0){
        var screen = this.subScreens.pop();
        if(screen.isVisible()){
          this.show();
        }
        screen.destroyRecursive();
      }
      
      this.clearView();
      
      for (var screen in screens){
        if (screen == 'menuView'){
          this.viewData = screens[screen];
          if (this.isVisible() && this.firstView){
            this.createDom();
          }
          else{
            this.firstView = false;
          }
        }
        else{
          this.subScreens.push(new subView(
            {viewData:screens[screen],
             id:screen,
             app: this.app}));
        }
      }
    }
  });


  return menuView;
})
;

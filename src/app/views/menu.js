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
        if (this.id == 'menuView'){
          data.moveTo = 'cartView';
        }
        if ('moveTo' in data){
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

        var showItem = this.viewData['type'] != 'group';
        
        var itemList = this.viewData['list'] || this.viewData['codes'];
        
        /*List Item add*/
        for(var i in itemList){
          var attr = itemList[i];
          if (typeof attr != 'object'){
            attr = app.products[attr];
          }
          var item_attr = {
            'class' : 'menuList',
            innerHTML : '<div class = "menuTitle">' +
              attr['label']+
              (showItem?('<span class = "menuPrice"> R$ '+attr['price']+'</span>'):'')+ 
              '</div>',
            transition : 'none'
          };
          if('icon' in attr){
            item_attr['icon'] = 'mblDomButtonHcel' + attr['icon'];
          }
          else{
            item_attr['icon'] = 'app/resources/img/pacote_64.png';
          }
          attr['icon'] = item_attr['icon'];

          if (showItem){
            item_attr['clickable'] = true;
            item_attr['noArrow'] = true;
            item_attr['rightIcon'] = 'mblDomButtonGrayPlus';
          }else{
            item_attr['moveTo'] = attr['moveTo'];
          }
          var item = new mblListItem(item_attr);
          if (showItem){
            item.on('click',lang.hitch(this, function(attr, item){
                this.app.itemView.start(this, attr);
                item.set('rightIcon','mblDomButtonCheck');
              }, attr, item));
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

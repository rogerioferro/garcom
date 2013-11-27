define(["app/screenClass",
        "dojo/_base/declare",
        "dojo/dom-construct",
        "dojo/_base/window",
        "dojo/_base/lang",
        "app/views/menuDlg",
        "dojox/mobile/Heading",
        "dojox/mobile/EdgeToEdgeList",
        "dojox/mobile/ListItem",
        "dojox/mobile/SimpleDialog",
        "dojox/mobile/Button"],
function(screenClass, declare, domConstruct, win, lang, menuDlg,
         mblHeading, mblRoundRectList, mblListItem, mblSimpleDialog, mblButton){

  var view = declare(screenClass,{
      
      createDom : function(){
        //console.log('create Dom:'+this.id);
        /*Head creation*/
        var data = this.viewData || {head:{}};
        var head_attr = data['head'] || {};
        head_attr.label = head_attr.label || "Card&aacute;pio";
        head_attr.fixed = head_attr.fixed || "top";
        var head = new mblHeading(head_attr);
        this.addFixedBar(head);
        head.startup();
        /* */

        if(!this.viewData) return;

        /*RoundRectList creation*/
        var list_attr = {'class':"center-container"};

        var list = new mblRoundRectList(list_attr);
        this.addChild(list);
        /* */

        var itemList = this.viewData['list'];

        var showDlg = this.viewData['type'] != 'group';
        
        /*List Item add*/
        for(var i in itemList){
          var attr = itemList[i];
          var item_attr = {label:attr['label']};
          item_attr['class'] = 'menu-list';
          if('icon' in attr){
            item_attr['icon'] = 'mblDomButtonHcel' + attr['icon'];
          }
          else{
            item_attr['icon'] = 'app/resources/img/pacote_64.png';
          }
          if (showDlg){
            item_attr['clickable'] = true;
            item_attr['noArrow'] = true;
            item_attr['rightText'] = attr['price'];
            item_attr['onClick'] = lang.hitch(this, function(attr){
              menuDlg.setAttr(attr);
              menuDlg.show();
            },attr);
          }else{
            item_attr['moveTo'] = attr['moveTo'];
          }
          var listItem = new mblListItem(item_attr);
          list.addChild(listItem);
        }
      }
  });

  return new view({
    id:'menu',
    subScreens:[],
    updateMenu: function(obj){
      var screens = obj['screens'];

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
        if (screen == 'menu'){
          this.viewData = screens[screen];
          if (this.isVisible() && this.firstView){
            this.createDom();
          }
          else{
            this.firstView = false;
          }
        }
        else{
          this.subScreens.push(new view({viewData:screens[screen], id:screen}));
        }
      }
    }
  });
});

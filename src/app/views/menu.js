define(["app/screenClass",
        "dojo/_base/declare",
        "dojox/html/styles",
        "dojox/mobile/Heading",
        "dojox/mobile/RoundRectList",
        "dojox/mobile/ListItem"],
function(screenClass, declare, styles,
         mblHeading, mblRoundRectList, mblListItem){

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
        if (this.viewData['select']) list_attr.select = 'multiple';
        var list = new mblRoundRectList(list_attr);
        this.addChild(list);
        /* */

        var itemList = this.viewData['list'];

        /*List Item add*/
        for( var i = 0; i < itemList.length; i++){
          itemList[i]['class'] = 'menu-list';
          if(!('icon' in itemList[i])){
            itemList[i]['icon'] = 'app/resources/img/pacote_64.png'
          }
          list.addChild(new mblListItem(itemList[i]));
        }
      }
  });

  return new view({
    id:'menu',
    subScreens:[],
    updateMenu: function(obj){
      var screens = obj['screens'];

      //clear old screens
      while (this.subScreens.length > 0) {
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

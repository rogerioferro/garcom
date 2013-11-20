define(["app/screenClass",
        "dojo/_base/declare",
        "dojox/html/styles",
        "dojox/mobile/Heading",
        "dojox/mobile/RoundRectList",
        "dojox/mobile/ListItem"],
function(screenClass, declare, styles,
         mblHeading, mblRoundRectList, mblListItem){
    var view = declare(screenClass,{

      viewData: {},
      createDom : function(){

        /*Head creation*/
        var head_attr = this.viewData['head'] || {};
        head_attr.label = head_attr.label || "Card&aacute;pio";
        head_attr.fixed = head_attr.fixed || "top";
        var head = new mblHeading(head_attr);
        this.addFixedBar(head);
        head.startup();

        /*RoundRectList creation*/
        var list_attr = {'class':"center-container"};
        if (this.viewData['select']) list_attr.select = 'multiple';
        var list = new mblRoundRectList(list_attr);
        this.addChild(list);

        var itemList = this.viewData['list'];

        /*List Item add*/
        for( var i = 0; i < itemList.length; i++){
          itemList[i]['class'] = 'menu-list';
          list.addChild(new mblListItem(itemList[i]));
        }
      }
  });

  var screens = menuObj['screens'];
  var images = menuObj['images'];

  /*add base64 image to CSS*/
  for( var i = 0; i < images.length; i++){
    var img = images[i];
    var name = img.name;
    var url = img.url;
    var width = img.width || '64px';
    var height = img.height || '64px';

    styles.insertCssRule('.'+name,
        'width:'+width+';height:'+height+';background-image:'+url);
  }
  /*---*/

  for (var screen in screens){
    new view({viewData:screens[screen], id:screen});
  }
  return;
});

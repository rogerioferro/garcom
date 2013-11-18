var menuObj = { 'menu':
                    { 'head': {'label':"Card&aacute;pio"},
                      'list': [
                        {'icon': 'mblDomButtonHcelImage',
                          'variableHeight' : true,
                          'label': 'Pizzas', 'moveTo': 'pizzas'},
                        {'icon': '...', 'label': 'Bebidas', 'moveTo': 'drinks'} ]
                    },
                'pizzas':
                    { 'head' : { 'label':"Pizzas",'back':'Card&aacute;pio', 'moveTo':"menu"},
                      'list': [
                         {'label':'pizzas 1', 'descr':'Descrição da pizza 1'},
                         {'label':'pizzas 2', 'descr':'Descrição da pizza 2'}]
                    },
                'drinks':
                    { 'head': {'label':"Bebidas", 'back':'Card&aacute;pio','moveTo':'menu'},
                      'list': [
                         {'label':'Sucos', 'descr':'Descrição da bebida 1'},
                         {'label':'Cervejas', 'descr':'Descrição da bebida 2'}]
                    }
              };

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
      _setViewDataAttr: function(viewData){
        this._set("viewData",viewData);
      },
      createDom : function(){

        var head_attr = this.viewData['head'] || {};
        head_attr.label = head_attr.label || "Card&aacute;pio";
        head_attr.fixed = head_attr.fixed || "top";
        var head = new mblHeading(head_attr);
        this.addFixedBar(head);
        head.startup();
        
        var list = new mblRoundRectList({'class':"center-container"});
        this.addChild(list);

        var itemList = this.viewData['list'];

        for( var i = 0; i < itemList.length; i++){
          list.addChild(new mblListItem(itemList[i]));
        }
      }
  });


  /*add base64 image to CSS*/
  styles.insertCssRule('.mblDomButtonHcelImage',
  "width:64px;height:64px;background-image: url(data:image/png;base64,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);"
  );
  /*---*/

  var menu = menuObj;
  for (var screen in menu){
    new view({viewData:menu[screen], id:screen});
  }
  return;
});

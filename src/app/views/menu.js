var menuObj = { 'menu':
                    { 'head': {'label':"Card&aacute;pio"},
                      'list': [
                        {'icon': '...', 'label': 'Pizzas', 'moveTo': 'pizzas'},
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
        "dojox/mobile/Heading",
        "dojox/mobile/RoundRectList",
        "dojox/mobile/ListItem"],
function(screenClass, declare,
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

  var menu = menuObj;
  for (var screen in menu){
    new view({viewData:menu[screen], id:screen});
  }
  return;
});

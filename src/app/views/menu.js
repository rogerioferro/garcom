var menuObj = { 'menu':
                    { 'head': "Card&aacute;pio", 'list': [
                      {'icon': '...', 'label': 'Pizzas', 'moveTo': 'pizzas'},
                      {'icon': '...', 'label': 'Bebidas', 'moveTo': 'drinks'} ]
                    },
                'pizzas':
                    { 'head': "Pizzas", 'list': [
                       {'label':'pizzas 1', 'descr':'Descrição da pizza 1', 'moveTo': 'drinks'},
                       {'label':'pizzas 2', 'descr':'Descrição da pizza 2', 'moveTo': 'drinks'}]
                    },
                'drinks':
                    { 'head': "Bebidas", 'list': [
                       {'label':'Sucos', 'descr':'Descrição da bebida 1', 'moveTo': 'drinks'},
                       {'label':'Cerbejas', 'descr':'Descrição da bebida 2', 'moveTo': 'drinks'}]
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

      createDom : function(){
        menu = menuObj;

        var node;
        for (node in menu){
          var page = menu[node];
          var head = page.head || "Card&aacute;pio";
          this.addFixedBar(
            new mblHeading({label : head , fixed : "top"}));

          var list = new mblRoundRectList({'class':"center-container"});
          this.addChild(list);

          var memberList = page.list;
          var member;
          for (member in memberList){
            list.addChild(
              new mblListItem({label:member.label, moveTo: member.moveTo}));
          }
          //create the page in this point.
        }
      }
  });
  return new view();
});

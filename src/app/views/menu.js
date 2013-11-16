define(["app/screenClass",
        "dojo/_base/declare",
        "dojox/mobile/Heading",
        "dojox/mobile/RoundRectList",
        "dojox/mobile/ListItem"],
function(screenClass, declare,
         mblHeading, mblRoundRectList, mblListItem){
  var view = declare(screenClass,{
    createDom : function(){
      this.addFixedBar(
        new mblHeading({label : "Card&aacute;pio", fixed : "top"}));

      var list = new mblRoundRectList({'class':"center-container"});
      this.addChild(list);

      var pizzas = new mblListItem({label:'Pizzas', moveTo:'pizzas'})

      pizzas.on("click",function(){
        console.log("pizzas");
      });
      list.addChild(pizzas);

      list.addChild(
      new mblListItem({label:'Bebidas', moveTo:'drinks'}));
    }
  });
  return new view({id:"menu"});
});

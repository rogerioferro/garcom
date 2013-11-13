define(["dojo/text!app/views/tests.html",
        "app/screenClass",
        "dojox/mobile",
        "dojo/query",
        "dojo/_base/declare"],
function(html, screenClass, mobile, query, declare){
  var myClass = declare(screenClass,{
      constructor : function(args){
        declare.safeMixin(this, args);
      },

      start : function(){
        var roundRectList = new mobile.RoundRectList({
            label: "RoundRectList",
            id: "RoundRectList"
        });

        var listItem = new mobile.ListItem({
          label:'Pizzas',
          moveTo:'pizzas'
        });
        listItem.placeAt(roundRectList.domNode, "last");

        listItem = new mobile.ListItem({
          label:'Bebidas',
          moveTo:'drinks'
        });
        listItem.placeAt(roundRectList.domNode, "last");

        this.dom = query("#tests")[0];
        roundRectList.placeAt(this.dom, "last");

      }
  });

  return new myClass(html);
});

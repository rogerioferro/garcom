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
        this.dom = query("#tests")[0];
        roundRectList.placeAt(this.dom, "last");

        var listItem = new mobile.ListItem({
          label:'Pizzas',
          moveTo:'pizzas'
        });
        this.roundRectList = query("#RoundRectList")[0];
        listItem.placeAt(this.roundRectList, "last");

        var listItem = new mobile.ListItem({
          label:'Bebidas',
          moveTo:'drinks'
        });
        this.roundRectList = query("#RoundRectList")[0];
        listItem.placeAt(this.roundRectList, "last");
      }
  });

  return new myClass(html);
});

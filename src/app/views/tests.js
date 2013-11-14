define(["dojo/text!app/views/tests.html",
        "app/screenClass",
        "dojox/mobile",
        "dojo/query",
        "dojox/mobile/Heading",
        "dojo/_base/declare"],
function(html, screenClass, mobile, query, heading, declare){
  var myClass = declare(screenClass,{
      constructor : function(args){
        declare.safeMixin(this, args);
      },

      start : function(){

        var tests = new mobile.ScrollableView(null, "tests");
        var heading1 = new heading({
          label: "Tests",
          fixed:'top',
          back:'Card&aacute;pio',
          moveTo:'menu'
        });
        tests.addChild(heading1);

        var roundRectList = new mobile.RoundRectList({
            label: "RoundRectList",
            id: "RoundRectList"
        });

        tests.addChild(roundRectList);

        var listItem = new mobile.ListItem({
          label:'Pizzas',
          moveTo:'pizzas'
        });
        roundRectList.addChild(listItem);

        listItem = new mobile.ListItem({
          label:'Bebidas',
          moveTo:'drinks'
        });
        roundRectList.addChild(listItem);

        tests.startup();
      }
  });

  return new myClass(html);
});

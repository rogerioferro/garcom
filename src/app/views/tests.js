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

        var tests = new View(null, "tests");
        var heading1 = new Heading({
          label: "Tests"
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
        //~ listItem.placeAt(roundRectList.domNode, "last");

        listItem = new mobile.ListItem({
          label:'Bebidas',
          moveTo:'drinks'
        });
        roundRectList.addChild(listItem);
        //~ listItem.placeAt(roundRectList.domNode, "last");

        //~ this.dom = query("#tests")[0];
        //~ roundRectList.placeAt(this.dom, "last");

        tests.startup();
        tests.show();
      }
  });

  return new myClass(html);
});

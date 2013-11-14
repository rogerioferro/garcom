define(["dojo/text!app/views/tests.html",
        "app/screenClass",
        "dojox/mobile",
        "dojox/mobile/Heading",
        "dojo/dom-construct",
        "dojo/_base/window",
        "dojo/_base/declare"],
function(html, screenClass, mobile, heading, domConstruct, window, declare){
  var myClass = declare(screenClass,{
      constructor : function(args){
        declare.safeMixin(this, args);
      },

      start : function(){

        var rootNode = domConstruct.create("div", null, window.body());

        var tests = new mobile.ScrollableView({id: 'tests'}, rootNode);

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

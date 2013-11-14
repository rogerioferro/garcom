define(["dojo/text!app/views/drinkz.html",
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

        var drinkz = new mobile.ScrollableView({id: 'drinkz'}, rootNode);

        var heading1 = new heading({
          label: "drinkz",
          fixed:'top',
          back:'Card&aacute;pio',
          moveTo:'menu'
        });
        drinkz.addChild(heading1);

        var roundRectList = new mobile.RoundRectList({
            label: "RoundRectList"
        });

        drinkz.addChild(roundRectList);

        var listItem = new mobile.ListItem({
          label:"Sucos",
          moveTo:"juices",
          icon:"app/resources/img/juices_64.png",
          rightIcon:"mblDomButtonBlueCircleArrow",
          class: "menu-list"
        });
        roundRectList.addChild(listItem);

        listItem = new mobile.ListItem({
          label:"Refrigerantes",
          moveTo:"tests",
          icon:"app/resources/img/sodas_64.png",
          rightIcon:"mblDomButtonBlueCircleArrow",
          class: "menu-list"
        });
        roundRectList.addChild(listItem);

        listItem = new mobile.ListItem({
          label:"Cervejas",
          moveTo:"tests",
          icon:"app/resources/img/beers_64.png",
          rightIcon:"mblDomButtonBlueCircleArrow",
          class: "menu-list"
        });
        roundRectList.addChild(listItem);

        drinkz.startup();
      }
  });

  return new myClass(html);
});

define(["dojo/_base/window",
        "dojox/mobile/TabBar",
        "dojox/mobile/TabBarButton"],
function(win, mblTabBar, mblTabBarButton){
  var bar = new mblTabBar({barType:"slimTab", style:"margin-top:-32px"});
  bar.addChild(new mblTabBarButton({label:"Login",moveTo:"login"}));
  bar.addChild(new mblTabBarButton({
      label:"Card&aacute;pio",
      moveTo:"menu",
      selected:true}));
  bar.addChild(new mblTabBarButton({label:"Pedido",moveTo:"cart"}));
  bar.placeAt(win.body(),"last");
  bar.startup();
});

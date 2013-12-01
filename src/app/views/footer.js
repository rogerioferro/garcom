define(["dojo/_base/window",
        "dojox/mobile/TabBar",
        "dojox/mobile/TabBarButton"],
function(win, mblTabBar, mblTabBarButton){
  var bar = new mblTabBar({barType:"slimTab", style:"margin-top:-32px"});
  bar.addChild(new mblTabBarButton({label:"Login",moveTo:"loginView"}));
  bar.addChild(new mblTabBarButton({
      label:"Card&aacute;pio",
      moveTo:"menuView",
      selected:true}));
  bar.addChild(new mblTabBarButton({label:"Pedido",moveTo:"cartView"}));
  bar.placeAt(win.body(),"last");
  bar.startup();
});

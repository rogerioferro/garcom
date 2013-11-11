define(["app/views/menu",
        "app/views/pizzas",
        "app/views/drinks",
        "app/views/juices",
        "app/views/login",
        "app/views/cart",
        "app/views/footer",
        "dojo/_base/window",
        "require",
        "dijit/registry"],
function(menu, pizzas, drinks, juices, login, cart, footer,
         win, require, registry) {
  return {
    //expose screens
    screens:{
      menu:menu,
      pizzas:pizzas,
      drinks:drinks,
      juices:juices,
      login:login,
      cart:cart,
      footer:footer
    },
    //createDom
    createDom : function() {
      var body = win.body();
      body.innerHTML = menu.getHtml() +
                       pizzas.getHtml() +
                       drinks.getHtml() +
                       juices.getHtml() +
                       login.getHtml() +
                       cart.getHtml() +
                       footer.getHtml(); // show in all upper screens
    },
    show : function(viewId) {
      registry.byId(viewId).show();
    },
    start : function () {
      for (var key in this.screens){
        this.screens[key].start();
      }
    }
  };
});


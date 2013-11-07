define(["app/views/menu",
        "app/views/pizzas",
        "app/views/drinks",
        "app/views/footer",
        "app/views/cart",
        "dojo/_base/window",
        "require",
        "dijit/registry"],
function(menu, pizzas, drinks, footer,
         cart,
         win, require, registry) {
  return {
    //expose screens
    menu : menu,
    pizzas : pizzas,
    drinks : drinks,
    cart: cart,
    footer: footer,
    //createDom
    createDom : function() {
      var body = win.body();
      body.innerHTML = menu.getHtml() +
                       pizzas.getHtml() +
                       drinks.getHtml() +
                       cart.getHtml() +
                       footer.getHtml(); //show in all upper screens
    },
    show : function(viewId) {
      registry.byId(viewId).show();
    }
  };
});

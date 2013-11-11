define(["app/views/menu",
        "app/views/pizzas",
        "app/views/drinks",
        "app/views/juices",
        "app/views/login",
        "app/views/cart",
        "app/views/tests",
        "app/views/footer",
        "dojo/_base/window",
        "require",
        "dijit/registry"],
function(menu, pizzas, drinks, juices, login, cart, tests, footer,
         win, require, registry) {
  return {
    //expose screens
    menu : menu,
    pizzas : pizzas,
    drinks : drinks,
    juices : juices,
    login : login,
    cart: cart,
    tests : tests,
    footer: footer,
    //createDom
    createDom : function() {
      var body = win.body();
      body.innerHTML = menu.getHtml() +
                       pizzas.getHtml() +
                       drinks.getHtml() +
                       juices.getHtml() +
                       login.getHtml() +
                       cart.getHtml() +
                       tests.getHtml() +
                       footer.getHtml(); // show in all upper screens
    },
    show : function(viewId) {
      registry.byId(viewId).show();
    }
  };
});

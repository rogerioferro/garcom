define(["app/views/menu",
        "app/views/pizzas",
        "app/views/drinks",
        "app/views/footer",
        "dojo/_base/window",
        "require",
        "dijit/registry"],
function(menu, pizzas, drinks, footer, win, require, registry) {
  return {
    //expose screens
    menu : menu,
    pizzas : pizzas,
    drinks : drinks,
    footer: footer,
    //createDom
    createDom : function() {
      var body = win.body();
      body.innerHTML = menu.getHtml() +
                       pizzas.getHtml() +
                       drinks.getHtml() +
                       footer.getHtml(); //show in all upper screens
    },
    show : function(viewId) {
      registry.byId(viewId).show();
    }
  };
});

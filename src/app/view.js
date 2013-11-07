define(["app/views/home",
        "app/views/pizzas",
        "app/views/bebidas",
        "app/views/about",
        "app/views/footer",
        "dojo/_base/window",
        "require",
        "dijit/registry"],
function(home, pizzas, bebidas, about, footer, win, require, registry) {
  return {
    //expose screens
    home : home,
    pizzas : pizzas,
    bebidas : bebidas,
    about : about,
    footer: footer,
    //createDom
    createDom : function() {
      var body = win.body();
      body.innerHTML = home.getHtml() +
                       pizzas.getHtml() +
                       bebidas.getHtml() +
                       about.getHtml() +
                       footer.getHtml(); //show in all upper screens
    },
    show : function(viewId) {
      registry.byId(viewId).show();
    }
  };
});

define(["app/views/home",
        "app/views/pizzas",
        "app/views/drinks",
        "app/views/about",
        "app/views/footer",
        "dojo/_base/window",
        "require",
        "dijit/registry"],
function(home, pizzas, drinks, about, footer, win, require, registry) {
  return {
    //expose screens
    home : home,
    pizzas : pizzas,
    drinks : drinks,
    about : about,
    footer: footer,
    //createDom
    createDom : function() {
      var body = win.body();
      body.innerHTML = home.getHtml() +
                       pizzas.getHtml() +
                       drinks.getHtml() +
                       about.getHtml() +
                       footer.getHtml(); //show in all upper screens
    },
    show : function(viewId) {
      registry.byId(viewId).show();
    }
  };
});

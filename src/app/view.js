define(["app/views/home",
        "app/views/pizzas",
        "app/views/about",
        "app/views/footer",
        "dojo/_base/window",
        "require",
        "dijit/registry"],
function(home, pizzas, about, footer, win, require, registry) {
  return {
    //expose screens
    home : home,
    pizzas : pizzas,
    about : about,
    footer: footer,
    //createDom
    createDom : function() {
      var body = win.body();
      body.innerHTML = home.getHtml() +
                       pizzas.getHtml() +
                       about.getHtml() +
                       footer.getHtml(); //show in all upper screens
    },
    show : function(viewId) {
      registry.byId(viewId).show();
    }
  };
});

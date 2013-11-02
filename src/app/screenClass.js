define(["dojo/_base/declare"],
function(declare){
  return declare(null, {
    constructor: function(html){
      this.html = html;
    },
    getHtml : function() {
      return this.html;
    }
  });

});

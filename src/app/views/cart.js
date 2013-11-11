define(["dojo/text!app/views/cart.html",
        "app/screenClass",
        "dojo/_base/declare"],
function(html, screenClass, declare){
  var myClass = declare(screenClass,{
      constructor : function(args){
        declare.safeMixin(this, args);
      },
      start : function(){
        require(["dojo/query", "dojo/on"],function(query, on){
          query(".mblValuePickerSlotInput").forEach(function(node, index, nodelist){
            node.readOnly = true;
            on(node, "change", function(){
            });
          });

          query(".mblValuePickerSlotPlusButton").forEach(function(node, index, nodelist){
            on(node, "click", function(){
              console.log("click plus");
            });      
          });

          query(".mblValuePickerSlotMinusButton").forEach(function(node, index, nodelist){
            on(node, "click", function(){
              console.log("click minus");
            });      
          });
        });
      }
  });
  return new myClass(html);
});


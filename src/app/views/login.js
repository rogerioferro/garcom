define(["app/screenClass",
        "dojo/_base/declare",
        "dojo/dom-construct",
        "dojox/mobile/Heading",
        "dojox/mobile/RoundRect",
        "dojox/mobile/TextBox",
        "dojox/mobile/Button"],
function(screenClass, declare, domConstruct,
         mblHeading, mblRoundRect, mblTextBox, mblButton){
  var view = declare(screenClass,{
    createDom : function(){
      this.addFixedBar(
        new mblHeading({label : "Login", fixed : "top"}));
      var rect = new mblRoundRect({'class':"center-container"});

      var innerBox = "<div class='innerBox'>";

      domConstruct.create(
        'label', {'class':'login-label', 'for':'login-login'}, rect.domNode)
        .innerHTML = "Login (CPF ou e-mail):";
      new mblTextBox({id:'login-login',placeHolder:"CPF ou e-mail"})
        .placeAt(domConstruct.place(innerBox, rect.domNode));

      domConstruct.create(
        'label', {'class':'login-label', 'for':'login-password'}, rect.domNode)
        .innerHTML = "Senha:";
      new mblTextBox({id:'login-password',placeHolder:"senha"})
        .placeAt(domConstruct.place(innerBox, rect.domNode));

      var div = domConstruct.create("div", {'class':'center-content'}, rect.domNode);
      /*add Send Button*/
      new mblButton({label:"ENVIAR", 'class':"mblBlueButton mblBigButton"})
        .placeAt(div)
        .on("click",function(){
          console.log("send event");
        });

      /*add New Register Button*/
      new mblButton({label:"NOVO CADASTRO", 'class':"mblBlueButton mblBigButton"})
        .placeAt(div)
        .on("click",function(){
          console.log("new register event");
        });
      
      this.addChild(rect);
    }
  });
  return new view({id:"login"});
});

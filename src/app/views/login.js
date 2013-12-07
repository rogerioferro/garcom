define(["app/hcel/hcelView",
        "dojo/_base/declare",
        "dojo/_base/lang",
        "dojo/dom-construct",
        "dojox/mobile/Heading",
        "dojox/mobile/RoundRect",
        "dojox/mobile/TextBox",
        "dojox/mobile/Button"],
function(screenClass, declare, lang, domConstruct,
         mblHeading, mblRoundRect, mblTextBox, mblButton){
           
  var loginView = declare(screenClass,{
    
    id : "loginView",
    
    createDom : function(){
      var head = new mblHeading({label : "Login", fixed : "top"});
      this.addFixedBar(head);
      head.startup();
        
      var rect = new mblRoundRect({'class':"center-container"});

      var innerBox = "<div class='innerBox'>";
      
      /*add login input*/
      domConstruct.create(
        'label', {'class':'login-label', 'for':'login-login'}, rect.domNode)
        .innerHTML = "Login (CPF ou e-mail):";
      this.login = new mblTextBox({'id':'login-login',
                                   'placeHolder':"CPF ou e-mail"});
      this.login.placeAt(domConstruct.place(innerBox, rect.domNode));

      /*add password input*/
      domConstruct.create(
        'label', {'class':'login-label','for':'login-password'}, rect.domNode)
        .innerHTML = "Senha:";
      this.password = new mblTextBox({'id':'login-password',
                                      'type': 'password',
                                      'placeHolder':'senha'});
      this.password.placeAt(domConstruct.place(innerBox, rect.domNode));

      var div = domConstruct.create("div", {'class':'center-content'}, rect.domNode);
      /*add Send Button*/
      new mblButton({label:"ENVIAR", 'class':"mblBlueButton mblBigButton"})
        .placeAt(div)
        .on("click", lang.hitch(this, function(){
          console.log("sending...");
          console.log('login:'+this.login.value);
          console.log('password:'+this.password.value);
        }));

      /*add New Register Button*/
      new mblButton({label:"NOVO CADASTRO", 'class':"mblBlueButton mblBigButton"})
        .placeAt(div)
        .on("click", lang.hitch(this, function(){
          console.log("new register event");
        }));
      
      this.addChild(rect);
    }
  });
  
  return loginView;
});

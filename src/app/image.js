define(["dojox/html/styles"],
function(styles){
  return{
    styleSheet : "imageStyleSheet",
    images : {},
    removeImage : function(img){
      var name = img.name;
      if(name in this.images){
        styles.removeCssRule(this.getSelector(img),
          this.images[name], this.styleSheet);
        delete this.images[name];
      }
    },
    addImage : function(img){
      this.removeImage(img);
      var declaration = this.getDeclaration(img);
      this.images[img.name] = declaration;
      styles.insertCssRule(this.getSelector(img), declaration, this.styleSheet);
    },
    getSelector : function(img){
      return '.mblDomButtonHcel'+img.name;
    },
    getDeclaration : function(img){
      var url = 'url(data:image/png;base64,'+img.data+')';
      var width = img.width || '64px';
      var height = img.height || '64px';
      return 'width:'+width+';height:'+height+';background-image:'+url;
    }
  };
});




      //~ /*add base64 image to CSS*/
      //~ for( var i = 0; i < images.length; i++){
        //~ var img = images[i];
        //~ var name = img.name;
        //~ var url = img.url;
        //~ var width = img.width || '64px';
        //~ var height = img.height || '64px';
//~ 
        //~ styles.insertCssRule('.'+name,
            //~ 'width:'+width+';height:'+height+';background-image:'+url);
      //~ };
      //~ /*---*/

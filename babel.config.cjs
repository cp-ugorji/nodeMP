module.exports = {
    presets: [
      [
        "@babel/env",
        {
          targets: {
            node: "current"
          }
        }
      ]
    ]
  };
  
  // babel.config.js: 
  // Error while loading config - 
  // You appear to be using a native ECMAScript module configuration file, 
  // which is only supported when running Babel asynchronously

  // babel.config.cjs. 
  // cjs is what is applicable for Nodejs when using "type"="module"
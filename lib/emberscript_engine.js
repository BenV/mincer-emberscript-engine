'use strict';

// Second param is not mandatory, used only to force specific
// module version when nested dependencies cause conflict.
module.exports = function addEmberScriptEngine(Mincer, es) {

  var EmberScriptEngine = Mincer.EmberScriptEngine = function EmberScriptEngine() {
    Mincer.Template.apply(this, arguments);
    es = es || Mincer.Template.libs.emberscript || require('ember-script');
  };

  EmberScriptEngine.defaultMimeType = 'application/javascript';

  EmberScriptEngine.prototype.evaluate = function evaluate(context, locals) {
     var csAst = es.parse(this.data, {raw: true});
     var jsAst = es.compile(csAst);
     this.data = es.js(jsAst);
  };

  Mincer.registerEngine('.em', Mincer.EmberScriptEngine);
};

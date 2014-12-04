var nunjucks = require("nunjucks");


(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["layout.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<!DOCTYPE html>\n<html>\n<head>\n\t<meta charset=\"utf-8\">\n\t<meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge,chrome=1\">\n\t<!-- <meta content=\"width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0\" name=\"viewport\" /> -->\n\t<meta name=\"viewport\" content=\"initial-scale=1.0, maximum-scale=1.0, user-scalable=0\">\n\t<meta content=\"yes\" name=\"apple-mobile-web-app-capable\" />\n\t<meta name=\"format-detection\" content=\"telephone=no\" />\n\t<meta name=\"format-detection\" content=\"email=no\" />\n\t<meta name=\"apple-mobile-web-app-title\" content=\"爱抢购\">\n\t<meta name=\"ipm\" content=\"h5.login\">\n\t<title>";
context.getBlock("title")(env, context, frame, runtime, function(t_2,t_1) {
if(t_2) { cb(t_2); return; }
output += t_1;
output += " - 爱抢购</title>\n\t<!--<link rel=\"stylesheet\" type=\"text/css\" href=\"/static/modules/??normalize/normalize.css,common/style.css\">-->\n\t<link rel=\"stylesheet\" href=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "globalStyle"), env.autoesc);
output += "\">\n</head>\n<body>\n<div id=\"content\">\n\t";
context.getBlock("content")(env, context, frame, runtime, function(t_4,t_3) {
if(t_4) { cb(t_4); return; }
output += t_3;
output += "\n</div>\n<script src=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "globalScript"), env.autoesc);
output += "\"></script>\n<!--<script src=\"/static/??modules/seajs/sea.js,modules/seajs/seajs-combo.js,modules/seajs/seajs-patch.js,modules/zepto/zepto.js,modules/zepto/zepto-fx.js,modules/zepto/zepto-fx-method.js\"></script>-->\n<!--<script src=\"/static/??modules/seajs/sea.js,modules/seajs/seajs-combo.js,modules/seajs/seajs-patch.js,modules/zepto/zepto.js,modules/zepto/zepto-fx.js,modules/zepto/zepto-fx-method.js\"></script>-->\n<!--\nTODO: seajs 的全局配置，使用工具来生成\n";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "globalSeajsConfig"), env.autoesc);
output += "\n-->\n<script>\n//\tseajs.config({\n//\t\tbase: '/static',\n//\t\talias: {\n//\t\t\t'nunjucks': 'modules/nunjucks/nunjucks-slim',\n//\t\t\t'inherit': 'modules/inherit/inherit',\n//\t\t\t'emitter': 'modules/emitter/emitter',\n//\t\t\t'hammer': 'modules/hammer/hammer',\n//\n//\t\t\t'util': 'modules/util/util',\n//\t\t\t'nav': 'widgets/nav/nav'\n//\t\t}\n//\t});\n//\tseajs.use('pages/log/";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "version"), env.autoesc);
output += "/log');\nimod.config(";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "configJSON"), env.autoesc);
output += ")\n</script>\n";
context.getBlock("mainScript")(env, context, frame, runtime, function(t_6,t_5) {
if(t_6) { cb(t_6); return; }
output += t_5;
output += "\n</body>\n</html>";
cb(null, output);
})})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_title(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_content(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "\n\t";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_mainScript(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
b_title: b_title,
b_content: b_content,
b_mainScript: b_mainScript,
root: root
};
})();
return function(ctx, cb) { return nunjucks.render("layout.html", ctx, cb); }})();


module.exports = function(ctx){
return nunjucks.render("layout.html", ctx)
};
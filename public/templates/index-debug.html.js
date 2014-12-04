var nunjucks = require("nunjucks");


(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["index-debug.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<!DOCTYPE html>\n<html>\n\t<head>\n\t\t";
output += runtime.suppressValue(env.getFilter("style").call(context, runtime.contextOrFrameLookup(context, frame, "globalStyle"),runtime.contextOrFrameLookup(context, frame, "baseUrl")), env.autoesc);
output += "\n\t</head>\n\t<body>\n\t\t";
output += runtime.suppressValue(env.getFilter("script").call(context, runtime.contextOrFrameLookup(context, frame, "globalScript"),runtime.contextOrFrameLookup(context, frame, "baseUrl")), env.autoesc);
output += "\n\t\t";
output += runtime.suppressValue(env.getFilter("scriptInline").call(context, env.getFilter("config").call(context, runtime.contextOrFrameLookup(context, frame, "imodConfig"))), env.autoesc);
output += "\n\t\t";
output += runtime.suppressValue(env.getFilter("scriptInline").call(context, env.getFilter("main").call(context, "pages/index/index")), env.autoesc);
output += "\n\t</body>\n</html>";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
return function(ctx, cb) { return nunjucks.render("index-debug.html", ctx, cb); }})();


module.exports = function(ctx){
return nunjucks.render("index-debug.html", ctx)
};
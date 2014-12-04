var nunjucks = require("nunjucks");

    require("folder/a.html");

    require("f2/b.html");


(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["head.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<h1>这是一个小区块，可以被 include 进来</h1>\n<p></p>\n";
env.getTemplate("folder/a.html", function(t_3,t_1) {
if(t_3) { cb(t_3); return; }
t_1.render(context.getVariables(), frame.push(), function(t_4,t_2) {
if(t_4) { cb(t_4); return; }
output += t_2
output += "\n";
env.getTemplate("f2/b.html", function(t_7,t_5) {
if(t_7) { cb(t_7); return; }
t_5.render(context.getVariables(), frame.push(), function(t_8,t_6) {
if(t_8) { cb(t_8); return; }
output += t_6
cb(null, output);
})})})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
return function(ctx, cb) { return nunjucks.render("head.html", ctx, cb); }})();


module.exports = function(ctx){
return nunjucks.render("head.html", ctx)
};
var nunjucks = require("nunjucks");

    require("f2/b.html");


(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["folder/a.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div>templates/folder/a.html</div>\n";
env.getTemplate("f2/b.html", function(t_3,t_1) {
if(t_3) { cb(t_3); return; }
t_1.render(context.getVariables(), frame.push(), function(t_4,t_2) {
if(t_4) { cb(t_4); return; }
output += t_2
cb(null, output);
})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
return function(ctx, cb) { return nunjucks.render("folder/a.html", ctx, cb); }})();


module.exports = function(ctx){
return nunjucks.render("folder/a.html", ctx)
};
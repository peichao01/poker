var nunjucks = require("nunjucks");

    require("layout.html");

    require("head.html");


(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["item-detail.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
env.getTemplate("layout.html", true, function(t_2,parentTemplate) {
if(t_2) { cb(t_2); return; }
for(var t_1 in parentTemplate.blocks) {
context.addBlock(t_1, parentTemplate.blocks[t_1]);
}
output += "\n\n";
output += "\n\n";
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_title(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "\n";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "title"), env.autoesc);
output += "\n";
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
env.getTemplate("head.html", function(t_5,t_3) {
if(t_5) { cb(t_5); return; }
t_3.render(context.getVariables(), frame.push(), function(t_6,t_4) {
if(t_6) { cb(t_6); return; }
output += t_4
output += "\n\t<div>\n\t\t<h1>";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "data")),"name", env.autoesc), env.autoesc);
output += "</h1>\n\t\t<p>";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "data")),"desc", env.autoesc), env.autoesc);
output += "</p>\n\t</div>\n";
cb(null, output);
})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
b_title: b_title,
b_content: b_content,
root: root
};
})();
return function(ctx, cb) { return nunjucks.render("item-detail.html", ctx, cb); }})();


module.exports = function(ctx){
return nunjucks.render("item-detail.html", ctx)
};
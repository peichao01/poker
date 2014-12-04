var nunjucks = require("nunjucks");

    require("layout.html");

    require("head.html");


(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["item-list.html"] = (function() {function root(env, context, frame, runtime, cb) {
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
output += "\n\t";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "title"), env.autoesc);
output += "\n";
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
output += "\n<script>\n\timod.use('pages/log/')\n</script>\n";
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
output += "\n\t<div>\n\t\t<ul>\n\t\t";
frame = frame.push();
var t_9 = runtime.contextOrFrameLookup(context, frame, "items");
if(t_9) {var t_8 = t_9.length;
for(var t_7=0; t_7 < t_9.length; t_7++) {
var t_10 = t_9[t_7];
frame.set("item", t_10);
frame.set("loop.index", t_7 + 1);
frame.set("loop.index0", t_7);
frame.set("loop.revindex", t_8 - t_7);
frame.set("loop.revindex0", t_8 - t_7 - 1);
frame.set("loop.first", t_7 === 0);
frame.set("loop.last", t_7 === t_8 - 1);
frame.set("loop.length", t_8);
output += "\n\t\t\t<li><a href=\"/item/";
output += runtime.suppressValue(runtime.memberLookup((t_10),"id", env.autoesc), env.autoesc);
output += "\">";
output += runtime.suppressValue(runtime.memberLookup((t_10),"name", env.autoesc), env.autoesc);
output += "</a></li>\n\t\t";
;
}
}
frame = frame.pop();
output += "\n\t\t</ul>\n\t</div>\n";
cb(null, output);
})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
b_title: b_title,
b_mainScript: b_mainScript,
b_content: b_content,
root: root
};
})();
return function(ctx, cb) { return nunjucks.render("item-list.html", ctx, cb); }})();


module.exports = function(ctx){
return nunjucks.render("item-list.html", ctx)
};
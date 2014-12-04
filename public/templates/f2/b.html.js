var nunjucks = require("nunjucks");


(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["f2/b.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<p>templates/f2/b.html</p>";
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
return function(ctx, cb) { return nunjucks.render("f2/b.html", ctx, cb); }})();


module.exports = function(ctx){
return nunjucks.render("f2/b.html", ctx)
};
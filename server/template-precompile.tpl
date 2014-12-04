var nunjucks = require("nunjucks");
{% for req in requires %}
    require("{{req}}");
{% endfor %}

{{moduleContent}}

module.exports = function(ctx){
return nunjucks.render("{{moduleName}}", ctx)
};
/**
 * generate by itools
 * contact @author: peichao <380692952@qq.com>
 */
 "use strict"
 {% if transform %}

define("{{id}}", function(require, exports, module){
	{{content}}
})

{% else %}

{{content}}

{% endif %}
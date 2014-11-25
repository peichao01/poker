/**
 * generate by poker
 * contact @author: peichao <380692952@qq.com>
 */
 "use strict"
 {% if transform %}

define("{{id | safe}}", function(require, exports, module){
	{{content | safe}}
})

{% else %}

{{content | safe}}

{% endif %}
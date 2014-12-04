/**
 * generate by poker
 * contact @author: peichao <380692952@qq.com>
 */

 {% if transform %}

define("{{id | safe}}", function(require, exports, module){
    {{ '"use strict";' | safe if useStrict }}
	{{content | safe}}
});

{% else %}

    {% if useStrict %}

    ;(function(){"use strict";{{content | safe}}})();

    {% else %}

    ;{{content | safe}}

    {% endif %}

{% endif %}
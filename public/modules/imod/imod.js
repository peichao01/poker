!function (exports) {
	var imod = {}

	var STATUS = {
		INIT: 1,
		EXPORTED: 2
	}

	imod._config = {}

	imod.store = (function(){
		var store = {}

		var getKey = function(id){
			return '~' + id
		}

		var getContent = function(id, factory){
			return 'define("'+id+'", '+factory+')'
		}

		store.set = function(id, content){
			if(!isEnvDev()){
				localStorage.setItem(getKey(id), getContent(content))
			}
		}

		store.get = function(id){
			if(!isEnvDev()){
				localStorage.getItem(getKey(id))
			}
		}

		return store
	})()

	imod.caches = {}
	imod.config = function(conf){
		for(var key in conf){
			if(conf.hasOwnProperty(key)) imod._config[key] = conf[key]
		}
	}
	imod.use = function (id, dependencies) {
		// var module = imod.caches[id]
		// if(module && module.status == STATUS.INIT){
		// 	module.factory(require, module.exports, module)
		// 	module.status = STATUS.EXPORTED
		// }
		imod._use = id
		dependencies.push(id)
		dependencies = filter(dependencies, function(id){
			return !imod.store.get(id)
		})
		// TODO
	}
	function define (id, factory) {
		var module = {
			exports: {},
			status: STATUS.INIT,
			STATUS: STATUS
		}
		module.factory = factory
		imod.caches[id] = module
	}
	function require (id) {
		var module = imod.caches[id]
		if(module){
			if(module.status == STATUS.INIT){
				module.factory(require, module.exports, module)
				module.status = STATUS.EXPORTED
			}
			return module.exports
		}
		else{
			throw new Error('[ERROR] can not find "' + id + '"')
			return {}
		}
	}

	function isEnvDev () {
		return imod._config.env === 'development'
	}

	function filter(arr, fn){
		var _return = []
		for(var i = 0, len = arr.length; i<len; i++){
			if(fn(arr[i], i, arr)) _return.push(arr[i])
		}
		return _return
	}

	define.icmd = {}
	exports.imod = imod
	exports.define = define
}(this)
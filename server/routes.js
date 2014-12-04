var _path = require('path')
var fs = require('fs-extra')
var async = require('async')
var colors = require('colors')

var common = require('./common')

var seedPath = _path.join(process.cwd(), 'seed.json')
module.exports = function(app){
	async.parallel([
		common.readConfig,
		function(cb){fs.readJson(seedPath, cb)}
	], function(err, results){

		var params = {
			mixModel: mixModel,
			addMainModule: addMainModule,
			config: results[0],
			seed: results[1]
		}

		if(!params.seed) throw new Error(colors.red("[ERROR]") + " " + seedPath + " is not exists. run " + colors.red("`gulp seed`") + " first!")

		app.get('/items', require('../controllers/item/list')(params))
		app.get('/item/:item_id', require('../controllers/item/detail')(params))

		function mixModel(model){
			var imod = params.config.imod
			for(var key in imod){
				if(['config', 'server'].indexOf(key) == -1){
					model[key] = imod[key]
				}
			}
			model.configJSON = JSON.stringify(imod.config, null, 4)
			return model
		}

		function addMainModule(model, mainModule){
			model.mainModule = mainModule

			model.mainModuleDepsJSON = JSON.stringify(findDepsRecursive(params.seed.js, mainModule, []))

			return model
		}

		function findDepsRecursive(o, key, output){
			if(o[key] && o[key].requires && o[key].requires.length > 0){
				o[key].requires.forEach(function(req){
					findDepsRecursive(o, req, output)
					if(output.indexOf(req) == -1) output.push(req)
				})
			}
			return output
		}
	})
}
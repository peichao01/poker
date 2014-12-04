var modelItem = require('../../models/item/list')

module.exports = function(params){
	return function(req, res, next){
		res.render('item-list.html', params.mixModel(params.addMainModule(modelItem, 'pages/item/list')))
	}
}
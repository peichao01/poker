var modelItem = require('../../models/item/detail')

module.exports = function(params){
	return function(req, res, next){
		res.render('item-detail.html', params.mixModel(params.addMainModule(modelItem, 'pages/item/detail')))
	}
}
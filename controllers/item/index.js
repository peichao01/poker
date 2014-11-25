var ModelItem = require('../../models/item')

module.exports = function(req, res, next){
	res.render('items.html', {
		title: 'Nunjucks with Express'
	})
}
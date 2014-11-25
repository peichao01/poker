module.exports = function(app){
	app.get('/items', require('../controllers/item'))
}
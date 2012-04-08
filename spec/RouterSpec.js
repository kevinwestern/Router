var Router = require('../router');

describe('Router', function(){

	var callback = function(){ return 'callback'; }
		router = null;

	beforeEach(function(){
		router = new Router();
	});

	it ('should add and remember routes', function(){
		router.addRoute('home', '/home', callback);
		expect(router.routes['home']).toBeDefined();
	});

});
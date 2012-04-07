var Router = require('../router');

describe('Route class', function(){
	var callback = function(){};
	describe ('construction', function(){
		it ('should assign a name, url and callback to class variables', function(){
			var route = new Router.Route('name', '/some/url', callback);
			expect([route.name, route.url, route.callback]).toEqual(['name', '/some/url', callback]);
		});
		it ('should assign the number of parameters the route has to a class variable', function(){
			var route = new Router.Route('name', '/url', callback);
			expect(route.numParams).toNotEqual(-1);
		});
	});

	describe('getNumParams', function(){
		it ('should return 0 when there are no params', function(){
			var route = new Router.Route('name', '/url', callback);
			expect(route.numParams).toNotEqual(-1);
		});
		it ('should return the number of params defined in the url', function(){
			var route = new Router.Route('name', '/url/:with/:three/:params', callback);
			expect(route.getNumParams()).toEqual(3);
		});
	});
});
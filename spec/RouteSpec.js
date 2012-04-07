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

	describe ('route matching', function(){

		it ('should match a route with no parameters', function(){
			var route = new Router.Route('no_params_route', '/some/url', callback);
			expect(route.urlMatches('/some/url')).toBe(true);
		});

		it ('should match a route that contains parms', function(){
			var route = new Router.Route('two_params', '/url/:firstname/:lastname', callback);
			expect(route.urlMatches('/url/john/doe')).toBe(true);
		});

		it ('should match a route with alternating parameter and non-parameter segments', function(){
			var route = new Router.Route('alernating_route', '/url/:with/alternating/:params', callback);
			expect(route.urlMatches('/url/one/alternating/two')).toBe(true);
		});

		it ('should match a route when the url does not contain enough parameters', function (){
			var route = new Router.Route('test_route', '/url/:with/:four/:params/:test', callback);
			expect(route.urlMatches('/url/two/params')).toBe(true);
		});

		it ('should not match a route when an alternating value does not align', function(){
			var url = '/posts/:topic/user/:id';
			var route = new Router.Route('test', url, callback);
			expect(route.urlMatches('/posts/programming/comments/5')).toBe(false);
		});
	});
});
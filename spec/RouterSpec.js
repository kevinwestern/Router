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

	describe ('url building', function(){

		var params = {
			one: 'param1',
			two: 'param2'
		};

		it ('should return a url with parameters supplied by params',function() {
			router.addRoute('test1', '/test/:one/:two', callback);
			expect(router.buildRouteWithParams('test1', params)).toEqual('/test/param1/param2');
		});

		it ('should remove named params when named url params exceed passed params', function (){
			router.addRoute('test2', '/test/:one/:two/:three', callback);
			var builtURL = router.buildRouteWithParams('test2', params);
			expect(builtURL).toEqual('/test/param1/param2');
		});

		it ('should fill unmatched params with an empty string when passed params exceeds url params', function(){
			router.addRoute('test3', '/test/:one/:dne/:two', callback);
			var builtURL = router.buildRouteWithParams('test3', params);
			expect(builtURL).toEqual('/test/param1//param2');
		});
	});

	describe ('route matching', function(){

		it ('should match a route with no parameters', function(){
			router.addRoute('no_params_route', '/some/url', callback);
			expect(router.matchRoute('/some/url')).toEqual('no_params_route');
		});

		it ('should match a route that contains parms', function(){
			router.addRoute('two_params', '/url/:firstname/:lastname', callback);
			expect(router.matchRoute('/url/john/doe')).toEqual('two_params');
		});

		it ('should match a route with alternating parameter and non-parameter segments', function(){
			router.addRoute('alernating_route', '/url/:with/alternating/:params', callback);
			expect(router.matchRoute('/url/one/alternating/two')).toEqual('alernating_route');
		});

		it ('should match a route when the url does not contain enough parameters', function (){
			router.addRoute('test_route', '/url/:with/:four/:params/:test', callback);
			expect(router.matchRoute('/url/two/params')).toEqual('test_route');
		});

		it ('should not match a route when an alternating value does not align', function(){
			var url = '/posts/:topic/user/:id';
			router.addRoute('test', url, callback);
			expect(router.matchRoute('/posts/programming/comments/5')).toBe(null);
		});

	});
});
var Router = require('../router');

describe('Router', function(){

	var callback = function(){}
		router = null;

	beforeEach(function(){
		router = new Router();
	});

	it ('should add and remember routes', function(){
		router.addRoute('/home', callback);
		expect(router.routes['/home']).toEqual(callback);
	});

	it ('should associate route names with the route and callback', function(){
		router.addNamedRoute('home', '/home', callback);
		expect(router.getNamedRoute('home')).toEqual('/home');
	});

	describe ('url building', function(){

		var params = {
			one: 'param1',
			two: 'param2'
		};

		it ('should return a url with parameters supplied by params',function() {
			router.addNamedRoute('test1', '/test/:one/:two', callback);
			expect(router.buildRouteWithParams('test1', params)).toEqual('/test/param1/param2');
		});

		it ('should remove named params when named params exceed passed params', function (){
			router.addNamedRoute('test2', '/test/:one/:two/:three', callback);
			var builtURL = router.buildRouteWithParams('test2', params);
			expect(builtURL).toEqual('/test/param1/param2');
		});

		it ('should fill unmatched params with an empty string', function(){
			router.addNamedRoute('test3', '/test/:one/:dne/:two', callback);
			var builtURL = router.buildRouteWithParams('test3', params);
			expect(builtURL).toEqual('/test/param1//param2');
		});
	});
});
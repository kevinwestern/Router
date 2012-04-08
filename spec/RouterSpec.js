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

	describe ('getRoute', function (){
		it ('should return a route object when passed a route name', function (){
			router.addRoute('home', '/home', callback);
			expect(router.getRoute('home')).toEqual({name: 'home', url: '/home', callback: callback});
		});
	});	

	describe ('buildRouteWithParams', function(){
		it ('should build a url by replace parameters with passed params', function (){
			var params = {param1: 'one', param2: 'two'};
			router.addRoute('home', '/home/:param1/:param2', callback);
			expect(router.buildRouteWithParams('home', params)).toEqual('/home/one/two');
		});
	});

	describe ('matchRoute', function(){
		it ("should match a url with a route, if defined, and return the route's name", function(){
			var url1 = '/home/url1/:param1/:param2',
				url2 = '/home/url2/static/:id';
			router.addRoute('url1', url1, callback);
			router.addRoute('url2', url2, callback);

			expect(router.matchRoute('/home/url2/static/5')).toEqual('url2');
		});
	})

});
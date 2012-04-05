var Router = function(){
	this.routes = {};
	this.nameToRoute = {};
};
var RouterProto = {

	routes: {},
	nameToRoute: {},

	addRoute: function (route, callback){
		this.routes[route] = callback;
	},

	addNamedRoute: function (name, route, callback){
		this.addRoute(route, callback);
		this.nameToRoute[name] = route;
	},

	getNamedRoute: function (routeName){
		return this.nameToRoute[routeName];
	},

	buildRouteWithParams: function (routeName, params){
		var route = this.getNamedRoute(routeName),
			self = this,
			paramsLength = params.length,
			url = route.replace(/\/:\w+/gi, function(param){
				param = param.substring(2);
				return '/' + (params[param] || '');
			});

		// trim off remaining tailing '/'
		if (url.charAt(url.length - 1) === '/') url = url.substring(0, url.length-1);
		return url;
	}
};

Router.prototype = RouterProto;

module.exports = Router;
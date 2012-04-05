var has = function(self, prop){ return Object.prototype.hasOwnProperty.call(self, prop); };

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
	},

	matchRoute: function (route){
		var routeParts = route.split('/'),
			storedRouteParts = [],
			matches = 0,
			self = this;

		if (this.routes[route]) return this.routes[route];
		for (var storedRoute in this.routes){
			if (!has(this.routes, storedRoute)) continue;
			storedRouteParts = storedRoute.split('/');

			for (var i = 0, l = storedRouteParts.length; i < l && i < routeParts.length; i++){
				if (routeParts[i] === storedRouteParts[i]) matches++;
			}

			if (matches === storedRouteParts.length) return this.routes[storedRoute];

			matches = 0;
		}
	},
};

Router.prototype = RouterProto;

module.exports = Router;
var has = function(self, prop){ return Object.prototype.hasOwnProperty.call(self, prop); };

var Route = function (name, url, callback){
	this.name = name;
	this.url = url;
	this.callback = callback;
	this.numParams = this.getNumParams(this.url);
}

Route.prototype = {
	numParams: -1,
	name: '',
	url: '',
	callback: function(){},

	constructor: Route,

	getUrl: function(){
		return this.url;
	},

	getNumParams: function (url){
		if (this.numParams !== -1) return this.numParams;
		var params = 0;
		url.replace(/\/:\w+/gi, function(){ params++; });

		return this.numParams = params;
	},

	injectParams: function (params){
		var route = this.url,
			paramsLength = params.length,
			url = route.replace(/\/:\w+/gi, function(param){
				param = param.substring(2);
				return '/' + (params[param] || '');
			});

		// trim off remaining tailing '/'
		if (url.charAt(url.length - 1) === '/') url = url.substring(0, url.length-1);
		return url;
	},

	urlMatches: function (urlToMatch){
		var matchSegments = urlToMatch.split('/'),
			selfSegments = this.getUrl().split('/'),
			numMatchedSegments = 0;

		for (var i = 0, l = selfSegments.length; i < l && i < matchSegments.length; i++){
			if (matchSegments[i] !== selfSegments[i] && selfSegments[i][0] !== ':') return false;
		}

		return true;
	},

	toLiteral: function (){
		return {name: this.name, url: this.url, callback: this.callback};
	}
}

var Router = function(){
	this.routes = {};
	this.nameToRoute = {};
};
var RouterProto = {

	routes: {},
	constructor: Router,

	addRoute: function (name, route, callback){
		this.routes[name] = new Route(name, route, callback);
	},

	getRoute: function (name){
		return this.routes[name].toLiteral();
	},

	buildRouteWithParams: function (routeName, params){
		return this.routes[routeName].injectParams(params);		
	},

	matchRoute: function (url){
		for (var routeName in this.routes){
			if (!has(this.routes, routeName)) continue;
			if (this.routes[routeName].urlMatches(url)) return routeName;
		}
		return null;
	},
};

Router.prototype = RouterProto;

Router.Route = Route;

module.exports = Router;
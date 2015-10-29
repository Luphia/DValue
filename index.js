var dvalue = function () {};
dvalue.clone = function (obj) {
	var rs;

	if(typeof obj == 'object') {
		rs = Array.isArray(obj)? []: {};
		for(var k in obj) {
			rs[k] = this.clone(obj[k]);
		}
	}
	else {
		rs = obj;
	}

	return rs;
};

dvalue.randomPick = function (arr, n) {
	if(!Array.isArray(arr)) { return []; }
	var tmp = this.clone(arr);
	var rs = [];
	while(tmp.length > 0 && rs.length < n) {
		rs.push(tmp.splice(Math.floor(Math.random() * tmp.length), 1)[0]);
	}

	return rs;
};

dvalue.merge = function () {
	var rs = [];
	for(var k in arguments) {
		if(Array.isArray(arguments[k])) { arguments[k].map(function (v, i) { if(typeof(v) != 'undefined') { rs.push(v); } }); }
		else if(typeof(arguments[k]) != 'undefined') { rs.push(arguments[k]); }
	}
	return rs;
};

dvalue.default = function (config, defaultConfig) {
	if(typeof(defaultConfig) == 'object') {
		if(config == undefined) { config = Array.isArray(defaultConfig)? []: {}; }
		for(var k in defaultConfig) {
			var v = defaultConfig[k];
			if(typeof(v) == 'object') { config[k] = this.default(config[k], v); }
			else if(config[k] === undefined) { config[k] = v; }
		}
	}
	else {
		if(config == undefined) { config = defaultConfig; }
	}

	return config;
};

module.exports = dvalue;

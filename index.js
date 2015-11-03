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

dvalue.guid = function () {
	var s4 = function() {
		return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
	};
	return s4() + s4() + '-' + s4() + '-' + s4() + '-' +s4() + '-' + s4() + s4() + s4();
};

dvalue.randomID = function (n) {
	var ID = '';
	var text = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
	n = parseInt(n); 
	if(!(n > 0)) { n = 8; }
	while(ID.length < n) {
		ID = ID.concat(text.charAt(parseInt(Math.random() * text.length)));
	}
	return ID;
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

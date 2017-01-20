(function(window) {

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

dvalue.randomCode = function (n, options) {
	var code = '', tmparr = [], tmpstring, text = ['0123456789', 'abcdefghijklmnopqrstuvwxyz', 'ABCDEFGHIJKLMNOPQRSTUVWXY', '~!@#$%^&*()_+-=,./<>?;:[]{}|\\/\'"'];
	if(!(n > 0)) { n = 8; }
	options = options || {number: 1, lower: 1, upper: 0, symbol: 0};
	for(var k = 0; k < options.number; k++) { tmparr.push(text[0]); }
	for(var k = 0; k < options.lower; k++) { tmparr.push(text[1]); }
	for(var k = 0; k < options.upper; k++) { tmparr.push(text[2]); }
	for(var k = 0; k < options.symbol; k++) { tmparr.push(text[3]); }
	tmpstring = tmparr.join('');
	while(code.length < n) {
		code = code.concat(tmpstring.charAt(parseInt(Math.random() * tmpstring.length)));
	}
	return code;
}

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

dvalue.distinct = function (arr) {
	if(!Array.isArray(arr)) { return; }
	return arr.filter(function (v, i, self) { return self.indexOf(v) === i; });
};

dvalue.default = function (config, defaultConfig) {
	if(typeof(defaultConfig) == 'object' && defaultConfig != null) {
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

dvalue.shuffle = function (arr) {
	var j, x, i;
	for (i = (arr.length - 1); i; i--) {
		j = Math.floor(Math.random() * arr.length);
		x = arr[i];
		arr[i] = arr[j];
		arr[j] = x;
	}
	return arr;
};

dvalue.sprintf = (function() {
	function get_type(variable) {
		return Object.prototype.toString.call(variable).slice(8, -1).toLowerCase();
	}
	function str_repeat(input, multiplier) {
		for (var output = []; multiplier > 0; output[--multiplier] = input) {/* do nothing */}
		return output.join('');
	}

	var str_format = function() {
		if (!str_format.cache.hasOwnProperty(arguments[0])) {
			str_format.cache[arguments[0]] = str_format.parse(arguments[0]);
		}
		return str_format.format.call(null, str_format.cache[arguments[0]], arguments);
	};

	str_format.object_stringify = function(obj, depth, maxdepth, seen) {
		var str = '';
		if (obj != null) {
			switch( typeof(obj) ) {
			case 'function':
				return '[Function' + (obj.name ? ': '+obj.name : '') + ']';
			  break;
			case 'object':
				if ( obj instanceof Error) { return '[' + obj.toString() + ']' };
				if (depth >= maxdepth) return '[Object]'
				if (seen) {
					// add object to seen list
					seen = seen.slice(0)
					seen.push(obj);
				}
				if (obj.length != null) { //array
					str += '[';
					var arr = []
					for (var i in obj) {
						if (seen && seen.indexOf(obj[i]) >= 0) arr.push('[Circular]');
						else arr.push(str_format.object_stringify(obj[i], depth+1, maxdepth, seen));
					}
					str += arr.join(', ') + ']';
				} else if ('getMonth' in obj) { // date
					return 'Date(' + obj + ')';
				} else { // object
					str += '{';
					var arr = []
					for (var k in obj) {
						if(obj.hasOwnProperty(k)) {
							if (seen && seen.indexOf(obj[k]) >= 0) arr.push(k + ': [Circular]');
							else arr.push(k +': ' +str_format.object_stringify(obj[k], depth+1, maxdepth, seen));
						}
					}
					str += arr.join(', ') + '}';
				}
				return str;
				break;
			case 'string':
				return '"' + obj + '"';
				break;
			}
		}
		return '' + obj;
	}

	str_format.format = function(parse_tree, argv) {
		var cursor = 1, tree_length = parse_tree.length, node_type = '', arg, output = [], i, k, match, pad, pad_character, pad_length;
		for (i = 0; i < tree_length; i++) {
			node_type = get_type(parse_tree[i]);
			if (node_type === 'string') {
				output.push(parse_tree[i]);
			}
			else if (node_type === 'array') {
				match = parse_tree[i]; // convenience purposes only
				if (match[2]) { // keyword argument
					arg = argv[cursor];
					for (k = 0; k < match[2].length; k++) {
						if (!arg.hasOwnProperty(match[2][k])) {
							throw new Error(sprintf('[sprintf] property "%s" does not exist', match[2][k]));
						}
						arg = arg[match[2][k]];
					}
				}
				else if (match[1]) { // positional argument (explicit)
					arg = argv[match[1]];
				}
				else { // positional argument (implicit)
					arg = argv[cursor++];
				}

				if (/[^sO]/.test(match[8]) && (get_type(arg) != 'number')) {
					throw new Error(sprintf('[sprintf] expecting number but found %s "' + arg + '"', get_type(arg)));
				}
				switch (match[8]) {
					case 'b': arg = arg.toString(2); break;
					case 'c': arg = String.fromCharCode(arg); break;
					case 'd': arg = parseInt(arg, 10); break;
					case 'e': arg = match[7] ? arg.toExponential(match[7]) : arg.toExponential(); break;
					case 'f': arg = match[7] ? parseFloat(arg).toFixed(match[7]) : parseFloat(arg); break;
				  case 'O': arg = str_format.object_stringify(arg, 0, parseInt(match[7]) || 5); break;
					case 'o': arg = arg.toString(8); break;
					case 's': arg = ((arg = String(arg)) && match[7] ? arg.substring(0, match[7]) : arg); break;
					case 'u': arg = Math.abs(arg); break;
					case 'x': arg = arg.toString(16); break;
					case 'X': arg = arg.toString(16).toUpperCase(); break;
				}
				arg = (/[def]/.test(match[8]) && match[3] && arg >= 0 ? '+'+ arg : arg);
				pad_character = match[4] ? match[4] == '0' ? '0' : match[4].charAt(1) : ' ';
				pad_length = match[6] - String(arg).length;
				pad = match[6] ? str_repeat(pad_character, pad_length) : '';
				output.push(match[5] ? arg + pad : pad + arg);
			}
		}
		return output.join('');
	};

	str_format.cache = {};

	str_format.parse = function(fmt) {
		var _fmt = fmt, match = [], parse_tree = [], arg_names = 0;
		while (_fmt) {
			if ((match = /^[^\x25]+/.exec(_fmt)) !== null) {
				parse_tree.push(match[0]);
			}
			else if ((match = /^\x25{2}/.exec(_fmt)) !== null) {
				parse_tree.push('%');
			}
			else if ((match = /^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosOuxX])/.exec(_fmt)) !== null) {
				if (match[2]) {
					arg_names |= 1;
					var field_list = [], replacement_field = match[2], field_match = [];
					if ((field_match = /^([a-z_][a-z_\d]*)/i.exec(replacement_field)) !== null) {
						field_list.push(field_match[1]);
						while ((replacement_field = replacement_field.substring(field_match[0].length)) !== '') {
							if ((field_match = /^\.([a-z_][a-z_\d]*)/i.exec(replacement_field)) !== null) {
								field_list.push(field_match[1]);
							}
							else if ((field_match = /^\[(\d+)\]/.exec(replacement_field)) !== null) {
								field_list.push(field_match[1]);
							}
							else {
								throw new Error('[sprintf] ' + replacement_field);
							}
						}
					}
					else {
						throw new Error('[sprintf] ' + replacement_field);
					}
					match[2] = field_list;
				}
				else {
					arg_names |= 2;
				}
				if (arg_names === 3) {
					throw new Error('[sprintf] mixing positional and named placeholders is not (yet) supported');
				}
				parse_tree.push(match);
			}
			else {
				throw new Error('[sprintf] ' + _fmt);
			}
			_fmt = _fmt.substring(match[0].length);
		}
		return parse_tree;
	};

	return str_format;
})();

dvalue.displayByte = function (n, unit) {
	var unit = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
	var base = 1024;
	var n = parseInt(n) > 0? parseInt(n): 0;
	var pow = parseInt(n) > 0? parseInt(Math.log(n) / Math.log(1024)): 0;
	var v, u;
	if(unit[pow]) {
		u = unit[pow]
	}
	else {
		pow = unit.length - 1;
		u = unit[pow];
	}
	v = parseInt(n / Math.pow(1024, pow) * 100) / 100;
	return [v, u];
};

dvalue.search = function (arr, obj) {
	if(Array.isArray(obj) && !Array.isArray(arr)) { return this.search(obj, arr); }
	var isMapping = function (obj1, obj2) {
		if(obj2 === undefined) { return false; }
		else if(typeof(obj1) == 'object') {
			for(var k in obj1) {
				if(!isMapping(obj1[k], obj2[k])) { return false; }
			}
			return true;
		}
		else {
			return obj1 == obj2;
		}
	};
	for(var i in arr) {
		if(isMapping(obj, arr[i])) { return arr[i]; }
	}
};

dvalue.multiSearch = function (arr, obj) {
	if(Array.isArray(obj) && !Array.isArray(arr)) { return this.multiSearch(obj, arr); }
	var result = [];
	var isMapping = function (obj1, obj2) {
		if(obj2 === undefined) { return false; }
		else if(typeof(obj1) == 'object') {
			for(var k in obj1) {
				if(!isMapping(obj1[k], obj2[k])) { return false; }
			}
			return true;
		}
		else {
			return obj1 == obj2;
		}
	};
	for(var i in arr) {
		if(isMapping(obj, arr[i])) { result.push(arr[i]); }
	}
	return result;
};

dvalue.XOR = function (content, key) {
	if(!Buffer.isBuffer(content) || !Buffer.isBuffer(key)) { return false; }
	var res = [];
	for(var i = 0; i < content.length; i++) {
		res.push(content[i] ^ key[i % key.length]);
	}
	return new Buffer(res);
};

dvalue.CRC32 = function (buffer) {
	var CRCTable = (function() {
		var c = 0, table = new Array(256);

		for(var n = 0; n != 256; ++n) {
			c = n;
			c = ((c&1) ? (-306674912 ^ (c >>> 1)) : (c >>> 1));
			c = ((c&1) ? (-306674912 ^ (c >>> 1)) : (c >>> 1));
			c = ((c&1) ? (-306674912 ^ (c >>> 1)) : (c >>> 1));
			c = ((c&1) ? (-306674912 ^ (c >>> 1)) : (c >>> 1));
			c = ((c&1) ? (-306674912 ^ (c >>> 1)) : (c >>> 1));
			c = ((c&1) ? (-306674912 ^ (c >>> 1)) : (c >>> 1));
			c = ((c&1) ? (-306674912 ^ (c >>> 1)) : (c >>> 1));
			c = ((c&1) ? (-306674912 ^ (c >>> 1)) : (c >>> 1));
			table[n] = c;
		}

		return typeof Int32Array !== 'undefined' ? new Int32Array(table) : table;
	})();
	var b, crc, i, len, code;
	if(!Buffer.isBuffer(buffer)) { buffer = new Buffer(new String(buffer)); }
	if(buffer.length > 10000) return CRC32_8(buffer);

	for(var crc = -1, i = 0, len = buffer.length - 3; i < len;) {
		crc = (crc >>> 8) ^ CRCTable[(crc ^ buffer[i++])&0xFF];
		crc = (crc >>> 8) ^ CRCTable[(crc ^ buffer[i++])&0xFF];
		crc = (crc >>> 8) ^ CRCTable[(crc ^ buffer[i++])&0xFF];
		crc = (crc >>> 8) ^ CRCTable[(crc ^ buffer[i++])&0xFF];
	}
	while(i < len + 3) { crc = (crc >>> 8) ^ CRCTable[(crc ^ buffer[i++]) & 0xFF]; }
	code = (crc > 0? crc: crc * -1).toString(16);
	while(code.length < 8) { code = '0' + code; }
	return code;
};

dvalue.hashPassword = function (password) {
	var salt = this.randomID();
	password = password || "";
	return {
		hash: require('crypto').createHash('sha1').update(password).update(salt).digest("hex"),
		salt: salt
	};
};
dvalue.checkPassword = function (options) {
	options = options || {};
	var password = options.password || "";
	var salt = options.salt || "";
	var hash = options.hash || "";
	return require('crypto').createHash('sha1').update(password).update(salt).digest("hex") == hash;
};

module.exports = dvalue;

if (typeof exports !== "undefined") {
	exports.dvalue = dvalue;
}
else {
	window.dvalue = dvalue

	if (typeof define === "function" && define.amd) {
		define(function() {
			return {
				dvalue: dvalue
			}
		})
	}
}

})(typeof window === "undefined" ? this : window);

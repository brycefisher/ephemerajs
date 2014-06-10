// Helper function that slices and floats a uuid.
function uuidToFloat(uuid, source) {
	var pureHex = uuid.replace(/-/g,''),
		fragment = pureHex.slice(source[0], source[1]),
		maxHex = '';
	
	for (var i=0; i<fragment.length; i++) {
		maxHex += 'f';
	}
	
	return (parseInt(fragment, 16) / parseInt(maxHex, 16));
}

// Creates the ephemera constructor method and exposes it other modules.
exports.objectFactory = function() {
	// Property metadata is stored privately inside the closure.
	var props = [],
		factory = function(uuid) {
			var obj = {},
				i = 0,
				p;

			for (; i<props.length; i++) {
				p = props[i];
				obj[p.label] = p.callback(uuidToFloat(uuid, p.source));
			}
			
			return obj;
		};
	
	// This method on the constructor adds more properties to the final objects 
	// returned from the constructor.
	factory.addProperty = function(label, source, callback) {
		props.push({
			label: label,
			source: source,
			callback: callback
		});
	};
	
	return factory;
}

exports.int = function(min, max) {
	return function(float) {
		var range = max - min;
		return Math.round(float * range + min);
	}
};

exports.float = function(min, max) {
	return function(float) {
		var range = max - min;
		return (float * range + min);
	}
};

exports.arr = function(items) {
	return function(float) {
		return items[ Math.round(float * items.length)];
	}
};

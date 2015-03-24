function loadFileForFN(_src,_fnName) {
	var d = $.Deferred();
	if ($.isFunction(_fnName)) {
		console.log('found: ' + _fnName);
		d.resolve();
	} else {
		console.log('Fetch: ' + _src);
		$.getScript(_src, function( data, textStatus, jqxhr ) {
			console.log('Fetch Complete: ' + _src);
			d.resolve();
		}).fail(function(e) {
			console.log("Failed to Laod: " + _src);
			console.log(e);
			d.fail();
		});
	}
	return d.promise();
}
module.exports = function( content, map ) {
	if ( map != null ) {
		console.log( `Sourcemap for '${this.resourcePath}': \n${JSON.stringify(map, null, "  ")}\n` );
	}

	this.callback( null, content, map );
}
const path = require( "path" );
const fs = require( "fs" );
const MiniCssExtractPlugin = require( "mini-css-extract-plugin" );

module.exports = env => {
	return {
		mode    : "development",
		devtool : "source-map",
		context : path.resolve( "./src" ),
		entry   : {
			app : "./app/index.js",
		},
		output  : {
			path     : path.resolve( "./dist" ),
			filename : "js/[name].js"
		},
		plugins : [
			new MiniCssExtractPlugin({
				filename : "style/[name].css"
			}),
			{
				apply: compiler => {
					compiler.hooks.afterEmit.tap( "AfterEmitPlugin", compilation => {
						let map = fs
							.readFileSync( "./dist/style/app.css.map" )
							.toString()

						map = JSON.parse( map );

						console.log("Results for 'dist/style/app.css.map':")
						console.log(`Found    -- sources: ${JSON.stringify(map.sources)}`);
						console.log(`Expected -- sources: ${JSON.stringify([ "webpack:./style/content.less" ])}\n`);
					});
				}
			}
		],
		module : {
			rules : [{
				test : /\.css$/i,
				use  : [
					MiniCssExtractPlugin.loader,
					{
						loader  : "css-loader",
						options : { sourceMap : true }
					},
					require.resolve( "./source-map-spy" ),
					"source-map-loader"
				]
			}]
		}
	}
	
};
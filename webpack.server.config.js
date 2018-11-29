const path = require('path');
const webpack = require('webpack');

module.exports = {
  	entry: {
    	server: './server.ts',
  	},
    resolve: { extensions: ['.ts', '.js'] },
  	target: 'node',
    mode: 'none',
  	externals: [/node_modules/],
 	output: {
      	path: path.join(__dirname, 'dist'),
    	filename: '[name].js'
  	},
  	module: {
    	rules: [
      		{ test: /\.ts$/, loader: 'ts-loader' }
    	]
  	},
  	plugins: [
		new webpack.ContextReplacementPlugin( 
			/(.+)?angular(\\|\/)core(.+)?/, 
			path.join(__dirname, 'src'), 
			{} 
		),
    	new webpack.ContextReplacementPlugin(
      		// fixes WARNING Critical dependency: the request of a dependency is an expression
      		/(.+)?express(\\|\/)(.+)?/,
      		path.join(__dirname, 'src'),
      		{}
    	)
  	]
}

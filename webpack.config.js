const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist')
	},
	plugins: [
		new CopyWebpackPlugin([
			{ from: 'static' }
		]),
	    new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
		new webpack.ProvidePlugin({
            d3: "d3"
        })
	]
};
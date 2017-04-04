let {append, pipe, lensPath, over, concat} = require('ramda');
let {resolve} = require('path');
let webpack = require('webpack');

let d = (...r) => resolve(__dirname, ...r);

let cfg = {
	entry: d('build', 'index.js'),
	output: {
		path: d('umd'),
		filename: 'appr-core.js',
		library: "ApprCore",
		libraryTarget: "umd"
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: [
					{
						loader: 'babel-loader'
					}
				]
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			NODE_ENV: JSON.stringify(process.env.NODE_ENV),
		})
	]
};
let minCfg = pipe(
	over(lensPath(['output', 'filename']), (s) => 'appr-core.min.js'),
	over(lensPath(['plugins']), concat([
		new webpack.optimize.UglifyJsPlugin({
			mangle: true
		}),
		new webpack.optimize.OccurrenceOrderPlugin()
	]))
)(cfg);

module.exports = [
	cfg,
	minCfg
];
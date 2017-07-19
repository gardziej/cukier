 const path = require('path');
 const webpack = require('webpack');

 const DEVELOPMENT = process.env.NODE_ENV === "development";
 const PRODUCTION = process.env.NODE_ENV === "production";

const  entry = PRODUCTION
	?	[
			'./src/index.ts'
		]
	:	[
			'./src/index.ts',
			'webpack/hot/dev-server',
			'webpack-dev-server/client?http://localhost:8080'
		];

const  plugins = PRODUCTION
  ? [
      // new webpack.optimize.UglifyJsPlugin({
      //   comments: true,
      //   mangle: false,
      //   compress: {
      //     warnings: false
      //   }
      // })
    ]
  : [
      new webpack.HotModuleReplacementPlugin()
    ];

module.exports = {
  entry: entry,
  plugins: plugins,
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: 'bundle.js'
  },
  resolve: {
      // Add `.ts` and `.tsx` as a resolvable extension.
      extensions: ['.ts', '.tsx', '.js'] // note if using webpack 1 you'd also need a '' in the array as well
    },
    module: {
      loaders: [
        // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
        { test: /\.tsx?$/, loader: 'ts-loader' }
      ]
    }
}

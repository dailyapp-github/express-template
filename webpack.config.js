const path = require("path");
// const slsw = require("serverless-webpack");
// const nodeExternals = require("webpack-node-externals");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
	target: "node",
	entry: "./src/app.ts",
	mode: "production",
	// externals: [/aws-sdk/],
	resolve: {
		extensions: [".mjs", ".ts", ".js", ".json", ".tsx", ".node"],
	},
	output: {
		libraryTarget: "commonjs",
		path: path.join(__dirname, "dist"),
		filename: "[name].js",
	},
	module: {
		rules: [
			{
				test: /\.ts(x?)$/,
				loader: "ts-loader",
				exclude: /node_modules/,
				options: {
					transpileOnly: true,
					experimentalWatchApi: true,
				},
			},
		],
	},
	externals: ["saslprep", "kerberos", "@mongodb-js/zstd", "snappy", "mongodb-client-encryption", ""],
	optimization: {
		usedExports: false,
	},
	// plugins: [new BundleAnalyzerPlugin()],
};

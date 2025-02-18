const path = require("path")

module.exports = {
	pageExtensions: ["js", "jsx", "ts", "tsx"],
	output: "standalone",
	webpack: (config, { isServer }) => {
		if (!isServer) {
			// Handle Jest
			config.externals = config.externals || {}
			config.externals["jest"] = "jest"
		}
		// Exclude test files from the build
		config.module.rules.push({
			test: /\.test\.js$/,
			loader: "ignore-loader"
		})
		return config
	}
}

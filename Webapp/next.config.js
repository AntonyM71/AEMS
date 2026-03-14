const { existsSync } = require("node:fs")
const { execSync } = require("node:child_process")

const resolveDefaultGraphicsOrigin = () => {
	if (!existsSync("/.dockerenv")) {
		return "http://localhost:82"
	}

	try {
		execSync("getent hosts host.docker.internal", {
			stdio: "ignore"
		})
		return "http://host.docker.internal:82"
	} catch {
		try {
			const gatewayIp = execSync(
				"ip route show default | awk '{print $3}' | head -n1",
				{ encoding: "utf8" }
			).trim()

			if (gatewayIp) {
				return `http://${gatewayIp}:82`
			}
		} catch {
			// Fall back below when route lookup fails.
		}
	}

	return "http://localhost:82"
}

module.exports = {
	pageExtensions: ["js", "jsx", "ts", "tsx"],
	output: "standalone",
	async rewrites() {
		if (process.env.NODE_ENV !== "development") {
			return []
		}

		const graphicsOrigin =
			process.env.GRAPHICS_SERVER_ORIGIN || resolveDefaultGraphicsOrigin()

		return [
			{
				source: "/componentInfo/:path*",
				destination: `${graphicsOrigin}/componentInfo/:path*`
			},
			{
				source: "/assets/:path*",
				destination: `${graphicsOrigin}/assets/:path*`
			}
		]
	},
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

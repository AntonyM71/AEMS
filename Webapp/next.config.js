const { lookup } = require("node:dns").promises
const { existsSync, readFileSync } = require("node:fs")

const resolveDefaultGraphicsOrigin = async () => {
	if (!existsSync("/.dockerenv")) {
		return "http://localhost:82"
	}

	try {
		await lookup("host.docker.internal")
		return "http://host.docker.internal:82"
	} catch {
		try {
			const gatewayIp = readFileSync("/proc/net/route", "utf8")
				.split("\n")
				.slice(1)
				.map((line) => line.trim().split(/\s+/))
				.find((fields) => fields[1] === "00000000")?.[2]

			if (gatewayIp) {
				const octets = gatewayIp.match(/../g)
				if (octets) {
					return `http://${octets
						.map((octet) => Number.parseInt(octet, 16))
						.reverse()
						.join(".")}:82`
				}
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
			process.env.GRAPHICS_SERVER_ORIGIN ||
			(await resolveDefaultGraphicsOrigin())

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

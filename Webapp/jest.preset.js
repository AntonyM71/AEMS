module.exports = {
	transform: {
		"^.+\\.(t|j)sx?$": "esbuild-jest"
	},

	transformIgnorePatterns: [
		"[/\\\\]node_modules[/\\\\].+\\.(cjs|js|jsx|ts|tsx)$"
	]
}

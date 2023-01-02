module.exports = {
	transform: {
		"^.+\\.(js|jsx|ts|tsx)$": [
			"babel-jest",
			{
				rootMode: "upward"
			}
		],
		"^(?!.*\\.(js|jsx|ts|tsx|css|json)$)": "jest-transform-stub"
	},
	transformIgnorePatterns: [
		"[/\\\\]node_modules[/\\\\].+\\.(cjs|js|jsx|ts|tsx)$"
	]
}

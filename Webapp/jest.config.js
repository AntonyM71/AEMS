const nextJest = require("next/jest")

const createJestConfig = nextJest({
	dir: "./"
})

const customJestConfig = {
	testEnvironment: "jsdom",
	moduleNameMapper: {
		"^@/components/(.*)$": "<rootDir>/src/components/$1",
		"^@/pages/(.*)$": "<rootDir>/src/pages/$1"
	},
	setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
	collectCoverage: true,
	coverageDirectory: "coverage",
	coverageReporters: ["json", "lcov", "text", "clover"]
}

module.exports = createJestConfig(customJestConfig)

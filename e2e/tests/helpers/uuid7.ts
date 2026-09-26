export function makeUuid7(ms: number, suffix = 0): string {
	const timestampHex = ms.toString(16).padStart(12, "0")
	const tailHex = suffix.toString(16).padStart(18, "0").slice(-18)

	return (
		`${timestampHex.slice(0, 8)}-${timestampHex.slice(8, 12)}-` +
		`7${tailHex.slice(0, 3)}-a${tailHex.slice(3, 6)}-${tailHex.slice(6, 18)}`
	)
}

let counter = 0

export function nextUuid7(): string {
	counter += 1

	return makeUuid7(Date.now(), counter)
}

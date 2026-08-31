// Polyfills required by MSW v2 in the jsdom environment.
// Runs before the test framework setup and before any module imports.

const nodeUtil = require("node:util")
const {
	ReadableStream,
	TransformStream,
	WritableStream
} = require("node:stream/web")

global.TextEncoder = nodeUtil.TextEncoder
global.TextDecoder = nodeUtil.TextDecoder
global.ReadableStream = global.ReadableStream || ReadableStream
global.TransformStream = global.TransformStream || TransformStream
global.WritableStream = global.WritableStream || WritableStream

if (globalThis.BroadcastChannel === undefined) {
	globalThis.BroadcastChannel = class BroadcastChannel {
		postMessage() {
			/* no-op: MSW only needs the constructor to exist under jsdom */
		}
		close() {
			/* no-op */
		}
		addEventListener() {
			/* no-op */
		}
		removeEventListener() {
			/* no-op */
		}
	}
}

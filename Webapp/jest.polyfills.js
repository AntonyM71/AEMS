// Polyfills required by MSW v2 in the jsdom environment.
// Runs before the test framework setup and before any module imports.

const nodeUtil = require("node:util")
const nodeV8 = require("node:v8")
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

// jsdom 20 (bundled with jest-environment-jsdom 29) has no structuredClone;
// Node's v8 serializer gives a faithful structural clone.
global.structuredClone =
	global.structuredClone ||
	((value) => nodeV8.deserialize(nodeV8.serialize(value)))

if (!("BroadcastChannel" in globalThis)) {
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

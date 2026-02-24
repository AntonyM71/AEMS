// Polyfills required by MSW v2 in jsdom environment
// This file runs before any test framework setup and before module imports

const { TextEncoder, TextDecoder, TransformStream, ReadableStream } =
	require("util").types
		? (() => {
				const util = require("util")
				try {
					const { ReadableStream, TransformStream } = require("stream/web")
					return {
						TextEncoder: util.TextEncoder,
						TextDecoder: util.TextDecoder,
						ReadableStream,
						TransformStream
					}
				} catch {
					return {}
				}
			})()
		: {}

const nodeUtil = require("util")
global.TextEncoder = nodeUtil.TextEncoder
global.TextDecoder = nodeUtil.TextDecoder

try {
	const { ReadableStream, TransformStream, WritableStream } = require("stream/web")
	global.ReadableStream = global.ReadableStream || ReadableStream
	global.TransformStream = global.TransformStream || TransformStream
	global.WritableStream = global.WritableStream || WritableStream
} catch {}

if (typeof globalThis.BroadcastChannel === "undefined") {
	globalThis.BroadcastChannel = class BroadcastChannel {
		constructor() {}
		postMessage() {}
		close() {}
		addEventListener() {}
		removeEventListener() {}
	}
}

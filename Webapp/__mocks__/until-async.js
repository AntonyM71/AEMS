"use strict"
// CJS wrapper for until-async (ESM-only package)
async function until(callback) {
try {
return [null, await callback()]
} catch (error) {
return [error, null]
}
}
module.exports = { until }

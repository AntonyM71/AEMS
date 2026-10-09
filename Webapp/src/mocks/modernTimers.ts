// The pinned @types/jest predates these Jest 29 timer APIs, which the runtime
// has. advanceTimers keeps the fake clock moving with real time, so MSW
// responses and promises still settle while a test jumps ahead.
export const modernTimers = jest as unknown as {
	useFakeTimers: (config: { advanceTimers: boolean }) => void
	advanceTimersByTimeAsync: (ms: number) => Promise<void>
}

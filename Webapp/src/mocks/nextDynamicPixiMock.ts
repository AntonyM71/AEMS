// next/dynamic would lazy-load the overlay; render it synchronously instead.
export const nextDynamicPixiMock = () =>
	jest.requireActual<
		typeof import("../components/broadcast/PixiFrameSequenceOverlay")
	>("../components/broadcast/PixiFrameSequenceOverlay").default

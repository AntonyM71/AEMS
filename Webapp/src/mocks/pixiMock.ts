export const pixiMock = {
	__esModule: true,
	Application: jest.fn(() => ({
		canvas: document.createElement("canvas"),
		stage: { addChild: jest.fn() },
		init: () => Promise.resolve(),
		destroy: () => undefined
	})),
	Sprite: jest.fn(() => ({ anchor: { set: jest.fn() } })),
	Texture: { EMPTY: {}, from: jest.fn() },
	Assets: { load: jest.fn(() => Promise.resolve()) }
}

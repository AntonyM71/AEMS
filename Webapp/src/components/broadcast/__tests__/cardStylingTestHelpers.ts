// eslint-disable-next-line testing-library/no-node-access
export const closestPaper = (el: HTMLElement): Element | null =>
	el.closest(".MuiPaper-root")

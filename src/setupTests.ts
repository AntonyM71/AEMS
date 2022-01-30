/* eslint-disable @typescript-eslint/no-empty-function */
import {
    DEFAULT_DESKTOP_LARGE_MIN_WIDTH, DEFAULT_DESKTOP_MIN_WIDTH
} from "@react-md/utils";
import "@testing-library/jest-dom";


if (typeof window.matchMedia !== "function") {
  window.matchMedia = (query) => ({
    media: query,
    matches:
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      query.includes(`${DEFAULT_DESKTOP_MIN_WIDTH}`) ||
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      query.includes(`${DEFAULT_DESKTOP_LARGE_MIN_WIDTH}`),
    onchange: () => {},
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false
  });
}

import { DM_Mono, Inter_Tight } from "next/font/google"

// Downloaded at build time and served by the app, so venues need no internet.
// Arial is the Paddle Worldwide brand fallback.
export const interTight = Inter_Tight({
	subsets: ["latin"],
	fallback: ["Arial", "sans-serif"]
})

export const brandFontFamily = interTight.style.fontFamily

// DM Mono only ships up to weight 500; bolder score text is synthesised.
const dmMono = DM_Mono({
	subsets: ["latin"],
	weight: ["400", "500"],
	fallback: ["Arial", "sans-serif"]
})

export const dataFontFamily = dmMono.style.fontFamily

/** Marks a score or time; only the overlay and arena themes style it. */
export const dataClassName = "AemsData"

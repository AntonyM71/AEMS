import { useEffect, useState } from "react"

/** Splits items into pages and advances to the next page every
 * pageChangeSeconds, wrapping after the last. */
export const useRotatingPage = <T>(
	items: T[],
	pageLimit: number,
	pageChangeSeconds: number
): { pageItems: T[]; currentPage: number; totalPages: number } => {
	const [page, setPage] = useState(0)
	const totalPages = Math.ceil(items.length / pageLimit)

	useEffect(() => {
		if (totalPages > 1) {
			const interval = setInterval(() => {
				setPage((prevPage) => (prevPage + 1) % totalPages)
			}, pageChangeSeconds * 1000)

			return () => clearInterval(interval)
		}
	}, [totalPages, pageChangeSeconds])

	// A shrinking list can leave the stored page past the end.
	const currentPage = totalPages ? page % totalPages : 0

	return {
		pageItems: items.slice(
			currentPage * pageLimit,
			(currentPage + 1) * pageLimit
		),
		currentPage,
		totalPages
	}
}

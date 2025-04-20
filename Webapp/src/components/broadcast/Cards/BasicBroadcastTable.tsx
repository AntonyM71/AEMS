import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableFooter from "@mui/material/TableFooter"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import { useEffect, useState } from "react"

export const BasicTable = ({
	data,
	pageLimit,
	pageChangeTime
}: {
	data: Record<string, any>[]
	pageLimit: number
	pageChangeTime: number
}) => {
	const [currentPage, setCurrentPage] = useState(0)

	// Calculate the total number of pages
	const totalPages = Math.ceil(data.length / pageLimit)

	// Automatically rotate pages based on pageChangeTime
	useEffect(() => {
		if (totalPages > 1) {
			const interval = setInterval(() => {
				setCurrentPage((prevPage) => (prevPage + 1) % totalPages)
			}, pageChangeTime * 1000) // Convert seconds to milliseconds

			return () => clearInterval(interval) // Cleanup on unmount
		}
	}, [totalPages, pageChangeTime])

	// Get the data for the current page
	const paginatedData = data.slice(
		currentPage * pageLimit,
		(currentPage + 1) * pageLimit
	)

	return (
		<Table
			sx={{
				// display: "flex",
				flexDirection: "column",
				height: "100%", // Make the table fill its parent
				minWidth: 650
			}}
			aria-label="simple table"
		>
			<TableHead>
				<TableRow sx={{ background: "rgba(255, 255, 255, 0.3)" }}>
					{Object.keys(data[0]).map((k) => (
						<TableCell key={k} sx={{ fontWeight: "bold" }}>
							{k}
						</TableCell>
					))}
				</TableRow>
			</TableHead>
			<TableBody>
				{paginatedData.map((row, i) => (
					<TableRow
						key={`${Object.values(row).join("-")}`}
						sx={{
							background: i % 2 ? "rgba(255, 255, 255, 0.1)" : ""
						}}
					>
						{Object.keys(row).map((d) => (
							<TableCell key={d}>
								{String(row[d] ?? "")}
							</TableCell>
						))}
					</TableRow>
				))}
			</TableBody>
			<TableFooter>
				<TableRow
					sx={{
						background: "rgba(255, 255, 255, 0.3)",
						"&:last-child td, &:last-child th": {
							border: 0
						}
					}}
				>
					<TableCell
						sx={{ fontWeight: "bold", textAlign: "right" }}
						colSpan={Object.keys(data[0]).length}
					>
						{`Page: ${currentPage + 1}/${totalPages}`}
					</TableCell>
				</TableRow>
			</TableFooter>
		</Table>
	)
}

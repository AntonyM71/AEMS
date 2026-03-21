import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableFooter from "@mui/material/TableFooter"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Typography from "@mui/material/Typography"
import { useEffect, useState } from "react"

export const BasicTable = ({
	data,
	pageLimit,
	pageChangeTime,
	maxWidth = 800,
	rowHeight = 48,
	footerPadding = 0
}: {
	data: Record<string, any>[]
	pageLimit: number
	pageChangeTime: number
	maxWidth?: number | string
	rowHeight?: number
	footerPadding?: number
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
	if (!data || data.length === 0) {
		return <></>
	}

	// Pad with empty rows if needed
	const emptyRows = pageLimit - paginatedData.length
	const fontSize = 20

	return (
		<Table
			sx={{
				flexDirection: "column",
				minWidth: 500,
				maxWidth,
				margin: "0 auto",
				borderRadius: 3
			}}
			aria-label="simple table"
		>
			<TableHead>
				<TableRow sx={{ height: rowHeight }}>
					{Object.keys(data[0]).map((k) => (
						<TableCell
							key={k}
							sx={{
								fontWeight: "bold",
								height: rowHeight,
								p: 0,
								m: 0
							}}
						>
							<Typography
								sx={{
									lineHeight: `${rowHeight}px`,
									fontSize,
									fontWeight: "bold"
								}}
							>
								{k}
							</Typography>
						</TableCell>
					))}
				</TableRow>
			</TableHead>
			<TableBody>
				{paginatedData.map((row, i) => (
					<TableRow
						key={`${Object.values(row).join("-")}`}
						sx={{ height: rowHeight }}
					>
						{Object.keys(row).map((d) => (
							<TableCell
								key={d}
								sx={{
									height: rowHeight,
									p: 0,
									m: 0,
									borderBottom: "1px solid #1976d2"
								}}
							>
								<Typography
									sx={{
										lineHeight: `${rowHeight}px`,
										fontSize
									}}
								>
									{String(row[d] ?? "")}
								</Typography>
							</TableCell>
						))}
					</TableRow>
				))}
				{/* Pad with empty rows if less than pageLimit */}
				{Array.from({ length: emptyRows > 0 ? emptyRows : 0 }).map(
					(_, idx) => (
						<TableRow
							key={`empty-row-${idx}`}
							sx={{ height: rowHeight, fontSize: 22 }}
						>
							{Object.keys(data[0]).map((k) => (
								<TableCell
									key={k}
									sx={{
										height: rowHeight,
										p: 0,
										m: 0,
										borderBottom: "1px solid #1976d2"
									}}
								/>
							))}
						</TableRow>
					)
				)}
			</TableBody>
			<TableFooter>
				<TableRow sx={{ height: rowHeight + footerPadding }}>
					<TableCell
						sx={{
							fontWeight: "bold",
							textAlign: "right",
							fontSize,
							color: "white",
							letterSpacing: 1,
							height: rowHeight,
							p: 0,
							m: 0
						}}
						colSpan={Object.keys(data[0]).length}
					>
						<Typography
							sx={{
								lineHeight: `${rowHeight}px`,
								color: "white"
							}}
						>{`Page: ${currentPage + 1}/${totalPages}`}</Typography>
					</TableCell>
				</TableRow>
			</TableFooter>
		</Table>
	)
}

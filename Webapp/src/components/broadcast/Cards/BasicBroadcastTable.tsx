import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableFooter from "@mui/material/TableFooter"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import { useThemeProps } from "@mui/material/styles"
import { useEffect, useState } from "react"
import { AemsBasicTableThemeProps } from "../themeAugmentation"

interface BasicTableProps extends AemsBasicTableThemeProps {
	data: Record<string, any>[]
	pageChangeTime: number
}

// Sizing, colour and borders all come from the active theme (MuiTable*), and the
// paging geometry from its AemsBasicTable defaultProps — so this renders as a
// frame-aligned broadcast scoreboard under overlayTheme and as an elastic dark
// table under arenaTheme, with no branching here.
export const BasicTable = (inProps: BasicTableProps) => {
	const {
		data,
		pageChangeTime,
		pageLimit = 10,
		padEmptyRows = false
	} = useThemeProps({ props: inProps, name: "AemsBasicTable" })

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

	// The overlay pads short pages so the table stays registered with its
	// background frame; the arena lets the table shrink to its content.
	const emptyRows = padEmptyRows
		? Math.max(pageLimit - paginatedData.length, 0)
		: 0
	const emptyRowKeys = Array.from(
		{ length: emptyRows },
		(_, rowNumber) =>
			`empty-row-${currentPage}-${paginatedData.length + rowNumber}`
	)

	return (
		<Table aria-label="simple table">
			<TableHead>
				<TableRow>
					{Object.keys(data[0]).map((k) => (
						<TableCell key={k}>{k}</TableCell>
					))}
				</TableRow>
			</TableHead>
			<TableBody>
				{paginatedData.map((row) => (
					<TableRow key={`${Object.values(row).join("-")}`}>
						{Object.keys(row).map((d) => (
							<TableCell key={d}>
								{String(row[d] ?? "")}
							</TableCell>
						))}
					</TableRow>
				))}
				{emptyRowKeys.map((emptyRowKey) => (
					<TableRow key={emptyRowKey}>
						{Object.keys(data[0]).map((k) => (
							<TableCell key={k} />
						))}
					</TableRow>
				))}
			</TableBody>
			<TableFooter>
				<TableRow>
					<TableCell colSpan={Object.keys(data[0]).length}>
						{`Page: ${currentPage + 1}/${totalPages}`}
					</TableCell>
				</TableRow>
			</TableFooter>
		</Table>
	)
}

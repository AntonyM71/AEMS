import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import Link from "@mui/material/Link"
import Paper from "@mui/material/Paper"
import RouterLink from "next/link"
import { useSelector } from "react-redux"
import { getSelectedHeat } from "../../redux/atoms/competitions"

import { HeatSummaryTable } from "../../components/competition/HeatSummaryTable"
import { SelectorDisplay } from "../../components/competition/MainSelector"

const Judging = () => {
	const selectedHeat = useSelector(getSelectedHeat)

	const judgeNumberArray = new Array(3).fill(null).map((_, i) => i + 1)

	const heat = selectedHeat

	if (heat) {
		return (
			<Grid
				container
				spacing={1}
				alignItems="flex-start"
				sx={{ paddingTop: "0.5em" }}
			>
				<Grid item xs={12}>
					<Paper sx={{ padding: "1em" }}>
						<Grid container spacing={1} alignItems={"stretch"}>
							{judgeNumberArray.map((j: number) => {
								return (
									<Grid item xs key={j}>
										<ScribeButton n={j} />
									</Grid>
								)
							})}
						</Grid>
					</Paper>
				</Grid>
				<Grid item xs={12}>
					<HeatSummaryTable />
				</Grid>
			</Grid>
		)
	}

	return (
		<Grid container alignItems="stretch" sx={{ paddingTop: "0.5em" }}>
			<Grid item xs={12}>
				<SelectorDisplay
					showDetailed={false}
					showEvent={false}
					showPhase={false}
				/>
			</Grid>
		</Grid>
	)
}

const ScribeButton = ({ n }: { n: number }) => {
	return (
		<Link component={RouterLink} href={`scribe/${n}`} color="inherit">
			<Button variant="contained" fullWidth>
				Scribe {n}
			</Button>
		</Link>
	)
}

export default Judging

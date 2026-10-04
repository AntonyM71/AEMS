import Grid from "@mui/material/Grid2"
import Paper from "@mui/material/Paper"
import Router from "next/router"
import { SetStateAction, useEffect, useRef, useState } from "react"
import { SelectScoresheet } from "../competition/ScoresheetSelector"
import { AddScoresheet } from "./AddScoresheet"
import { ScoresheetMoves } from "./ScoresheetBuilder"

const DISCARD_CHANGES_PROMPT =
	"You have unsaved scoresheet changes. Leave and discard them?"

export const ScoresheetBuilder = () => {
	const [selectedScoresheet, setSelectedScoresheet] = useState<string>("")
	const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

	// AddScoresheet calls switchScoresheet after awaiting requests, so it must
	// read the latest value rather than the one captured when the call began.
	const hasUnsavedChangesRef = useRef(hasUnsavedChanges)
	hasUnsavedChangesRef.current = hasUnsavedChanges

	const switchScoresheet = (scoresheet: SetStateAction<string>) => {
		if (
			!hasUnsavedChangesRef.current ||
			window.confirm(DISCARD_CHANGES_PROMPT)
		) {
			setSelectedScoresheet(scoresheet)
		}
	}

	useEffect(() => {
		if (!hasUnsavedChanges) {
			return
		}
		const warnBeforeUnload = (event: BeforeUnloadEvent) => {
			event.preventDefault()
		}
		// The pages router can only cancel a route change by throwing from
		// routeChangeStart, so the prompt must be synchronous. `cancelled`
		// stops topLevelErrorHandler from reporting the throw as a failure.
		const confirmRouteChange = () => {
			if (window.confirm(DISCARD_CHANGES_PROMPT)) {
				return
			}
			throw Object.assign(
				new Error("Route change aborted: unsaved scoresheet changes"),
				{ cancelled: true }
			)
		}
		window.addEventListener("beforeunload", warnBeforeUnload)
		Router.events.on("routeChangeStart", confirmRouteChange)

		return () => {
			window.removeEventListener("beforeunload", warnBeforeUnload)
			Router.events.off("routeChangeStart", confirmRouteChange)
		}
	}, [hasUnsavedChanges])

	return (
		<Grid container spacing={1} sx={{ paddingTop: "0.5em" }}>
			<Grid size={2}>
				<Paper sx={{ padding: "1em" }}>
					<SelectScoresheet
						setSelectedScoresheet={switchScoresheet}
						selectedScoresheet={selectedScoresheet}
					/>
					<AddScoresheet setSelectedScoresheet={switchScoresheet} />
				</Paper>
			</Grid>
			<Grid size={10}>
				<Grid container spacing={1}>
					<Grid size={12}>
						{selectedScoresheet ? (
							<ScoresheetMoves
								selectedScoresheet={selectedScoresheet}
								onUnsavedChangesChange={setHasUnsavedChanges}
							/>
						) : (
							<h4>
								Select an existing scoresheet or make a new one
								to start building!
							</h4>
						)}
					</Grid>
					<Grid size={12}></Grid>
				</Grid>
			</Grid>
		</Grid>
	)
}

export default ScoresheetBuilder

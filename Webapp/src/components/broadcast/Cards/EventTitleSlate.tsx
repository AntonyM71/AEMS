import Box from "@mui/material/Box"
import { useEventTitle } from "./EventTitle"
import { runFormatText } from "./runFormat"

const bandSx = { display: "flex", alignItems: "center", whiteSpace: "nowrap" }

/** The event title's backup layout: competition, event and phase, and the run
 * format, in the upper left on the lower third's left edge. */
export const EventTitleSlate = () => {
	const title = useEventTitle()
	if (!title) {
		return null
	}

	return (
		<Box
			className="AemsEventSlate-root"
			sx={{
				position: "absolute",
				left: 96,
				top: 240,
				maxWidth: 1728,
				display: "grid",
				justifyItems: "start"
			}}
		>
			<Box
				className="AemsEventSlate-competition"
				sx={{
					...bandSx,
					"--i": 0,
					height: 54,
					padding: "0 30px",
					fontSize: 26,
					fontWeight: 500
				}}
			>
				<span>{title.competitionName}</span>
			</Box>
			<Box sx={{ display: "flex", height: 140, maxWidth: "100%" }}>
				<Box
					className="AemsEventSlate-event"
					sx={{
						...bandSx,
						"--i": 1,
						minWidth: 0,
						padding: "0 56px 0 30px",
						fontSize: 92,
						fontWeight: 900,
						letterSpacing: "-0.01em"
					}}
				>
					<Box
						component="span"
						sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
					>
						{title.eventName}
					</Box>
				</Box>
				<Box
					className="AemsEventSlate-phase"
					sx={{
						...bandSx,
						"--i": 2,
						padding: "0 44px",
						fontSize: 46,
						fontWeight: 900
					}}
				>
					<span>{title.phaseName}</span>
				</Box>
			</Box>
			<Box
				className="AemsEventSlate-format"
				sx={{
					...bandSx,
					"--i": 3,
					height: 64,
					padding: "0 30px",
					fontSize: 28
				}}
			>
				<span>{runFormatText(title.runs, title.scoringRuns)}</span>
			</Box>
		</Box>
	)
}

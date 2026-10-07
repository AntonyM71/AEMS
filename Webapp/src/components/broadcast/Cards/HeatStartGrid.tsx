import Box from "@mui/material/Box"
import { useSelector } from "react-redux"
import { getSelectedHeat } from "../../../redux/atoms/competitions"
import { AffiliationPill } from "./AffiliationPill"
import { useHeatStartList } from "./HeatSummaryTable"
import { useRotatingPage } from "./useRotatingPage"

const ATHLETES_PER_PAGE = 10
const PAGE_CHANGE_SECONDS = 5
const HEADER_PANELS = 2

/** The heat summary's backup layout: the heat's athletes as tiles in two
 * columns, with the athlete on the water marked. */
export const HeatStartGrid = ({
	selectedAthleteId
}: {
	selectedAthleteId?: string
}) => {
	const selectedHeat = useSelector(getSelectedHeat)
	const { athletes, heatName, eventName, phaseName } =
		useHeatStartList(selectedHeat)
	const { pageItems, currentPage, totalPages } = useRotatingPage(
		athletes,
		ATHLETES_PER_PAGE,
		PAGE_CHANGE_SECONDS
	)
	if (athletes.length === 0) {
		return null
	}

	return (
		<Box
			className="AemsHeatGrid-root"
			sx={{
				position: "absolute",
				left: "50%",
				top: 150,
				transform: "translateX(-50%)",
				width: 1560,
				display: "grid",
				gap: "14px"
			}}
		>
			<Box
				sx={{
					display: "grid",
					gridTemplateColumns: "auto 1fr",
					height: 110
				}}
			>
				<Box
					className="AemsHeatGrid-heat"
					sx={{
						"--i": 0,
						display: "flex",
						alignItems: "center",
						padding: "0 48px 0 30px",
						fontSize: 72,
						fontWeight: 900,
						whiteSpace: "nowrap"
					}}
				>
					<span>{heatName}</span>
				</Box>
				<Box
					className="AemsHeatGrid-context"
					sx={{
						"--i": 1,
						display: "grid",
						alignContent: "center",
						padding: "0 30px"
					}}
				>
					<Box
						component="span"
						sx={{ fontSize: 28, fontWeight: 700 }}
					>
						{eventName}
					</Box>
					<Box component="span" sx={{ fontSize: 24 }}>
						{phaseName}
					</Box>
				</Box>
			</Box>
			<Box
				sx={{
					display: "grid",
					gridTemplateColumns: "1fr 1fr",
					gridTemplateRows: `repeat(${Math.ceil(
						pageItems.length / 2
					)}, 84px)`,
					gridAutoFlow: "column",
					gap: "6px 10px"
				}}
			>
				{pageItems.map((athlete, index) => {
					const isOnTheWater =
						athlete.athlete_id === selectedAthleteId

					return (
						<Box
							key={athlete.athlete_id}
							sx={{
								"--i": index + HEADER_PANELS,
								display: "grid",
								gridTemplateColumns: "104px minmax(0, 1fr)"
							}}
						>
							<Box
								className="AemsHeatGrid-bib"
								sx={{
									display: "grid",
									placeItems: "center",
									fontSize: 42,
									fontWeight: 900
								}}
							>
								<span>{athlete.bib}</span>
							</Box>
							<Box
								className={
									isOnTheWater
										? "AemsHeatGrid-onWater"
										: "AemsHeatGrid-athlete"
								}
								sx={{
									display: "flex",
									alignItems: "center",
									justifyContent: "space-between",
									gap: "18px",
									padding: "0 30px",
									minWidth: 0
								}}
							>
								<Box
									component="span"
									sx={{
										fontSize: 34,
										fontWeight: 700,
										whiteSpace: "nowrap",
										overflow: "hidden",
										textOverflow: "ellipsis"
									}}
								>
									{`${
										athlete.first_name
									} ${athlete.last_name.toUpperCase()}`}
								</Box>
								<Box
									component="span"
									sx={{
										display: "flex",
										alignItems: "center",
										gap: "18px",
										fontSize: 20,
										whiteSpace: "nowrap"
									}}
								>
									{isOnTheWater && (
										<Box
											component="span"
											className="AemsHeatGrid-onWaterLabel"
											sx={{
												fontSize: 16,
												fontWeight: 700,
												letterSpacing: "0.08em"
											}}
										>
											On the water
										</Box>
									)}
									<AffiliationPill
										affiliation={athlete.affiliation}
									/>
								</Box>
							</Box>
						</Box>
					)
				})}
			</Box>
			{totalPages > 1 && (
				<Box
					className="AemsHeatGrid-page"
					sx={{
						"--i": pageItems.length + HEADER_PANELS,
						justifySelf: "end",
						padding: "10px 24px",
						fontSize: 22,
						fontWeight: 700
					}}
				>
					<span>{`Page ${currentPage + 1}/${totalPages}`}</span>
				</Box>
			)}
		</Box>
	)
}

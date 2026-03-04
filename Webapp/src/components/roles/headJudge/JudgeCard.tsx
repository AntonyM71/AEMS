import Grid from "@mui/material/Grid2"
import Paper from "@mui/material/Paper"
import Skeleton from "@mui/material/Skeleton"
import Typography from "@mui/material/Typography"
import {
	ScoredMovesAndBonusesResponse,
	useGetManyAvailablebonusesGetQuery,
	useGetManyAvailablemovesGetQuery
} from "../../../redux/services/aemsApi"
import { AthleteInfo, CurrentScore } from "../scribe/InfoBar"
import ScoredMove from "../scribe/InfoBar/ScoredMove"
import {
	convertListToScoredBonusType,
	convertListToScoredMovesType
} from "../scribe/Interfaces"

interface JudgeCardProps {
	judge: number
	selectedAthlete: AthleteInfo
	moveAndBonusData: ScoredMovesAndBonusesResponse
	currentScore: number
}

export const JudgeCard = ({
	judge,
	selectedAthlete,
	currentScore,
	moveAndBonusData
}: JudgeCardProps) => {
	const availableBonuses = useGetManyAvailablebonusesGetQuery(
		{
			sheetIdListComparisonOperator: "Equal",
			sheetIdList: [selectedAthlete.scoresheet ?? ""]
		},
		{ skip: !selectedAthlete?.scoresheet }
	)
	const availableMoves = useGetManyAvailablemovesGetQuery(
		{
			sheetIdListComparisonOperator: "Equal",
			sheetIdList: [selectedAthlete?.scoresheet ?? ""]
		},
		{ skip: !selectedAthlete?.scoresheet }
	)

	const scoredMoves = convertListToScoredMovesType(
		moveAndBonusData?.moves ?? []
	)
	if (availableMoves.isSuccess && availableBonuses.isSuccess) {
		return (
			<Grid container spacing={1} alignItems={"stretch"}>
				<Grid size={6}>
					<Paper
						sx={{
							padding: "1em",
							height: "100%"
						}}
					>
						<Typography>{`Judge: ${judge}`}</Typography>
					</Paper>
				</Grid>
				<Grid size={6}>
					<CurrentScore currentScore={currentScore} />
				</Grid>

				{[...scoredMoves] // put these into a new array so that reverse works
					.reverse()
					.map((scoredMove) => (
						<Grid key={scoredMove.id} size={12}>
							<ScoredMove
								key={scoredMove.id}
								scoredMove={scoredMove}
								scoredMovesList={scoredMoves}
								scoredBonuses={convertListToScoredBonusType(
									moveAndBonusData.bonuses
								)}
								chipActionsDisabled={true}
							/>
						</Grid>
					))}
			</Grid>
		)
	}

	return <Skeleton />
}

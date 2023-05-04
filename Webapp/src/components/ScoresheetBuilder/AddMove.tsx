import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import { includes } from "lodash"
import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import { v4 } from "uuid"
import { EditMove, MoveData, checkMoveisValid } from "./EditMove"

export const AddNewMove = ({
	bonuses,
	addMove
}: {
	bonuses: string[]
	addMove: (m: MoveData) => void
}) => {
	const baseMoveData: () => MoveData = () => ({
		id: v4(),
		name: "",
		rbScore: 0,
		flScore: 0,
		bonuses: bonuses.map((b) => ({ name: b, id: v4(), score: 0 })),
		direction: "LR"
	})

	useEffect(() => {
		const listOfExistingBonuses = moveData.bonuses.map((b) => b.name)
		const newBonuses = bonuses.flatMap((b) => {
			if (!includes(listOfExistingBonuses, b)) {
				return { name: b, id: v4(), score: 0 }
			}

			return []
		})

		setMoveData({
			...moveData,
			bonuses: [
				...moveData.bonuses.filter((b) => bonuses.includes(b.name)),
				...newBonuses
			]
		})
	}, [bonuses])
	const [moveData, setMoveData] = useState<MoveData>(baseMoveData())

	const submitNewMove = () => {
		if (checkMoveisValid(moveData)) {
			addMove(moveData)
			setMoveData(baseMoveData())
		} else {
			toast.error("Please ensure you have a valid move before submitting")
		}
	}

	return (
		<Grid container spacing="2">
			{" "}
			<EditMove moveData={moveData} setMoveData={setMoveData} />
			<Grid item xs={1}>
				<Button
					onClick={submitNewMove}
					color="primary"
					variant="contained"
					sx={{ height: "100%" }}
				>
					Add to List
				</Button>
			</Grid>
		</Grid>
	)
}

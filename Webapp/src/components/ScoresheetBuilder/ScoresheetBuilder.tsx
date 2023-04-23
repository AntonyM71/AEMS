import Button from "@mui/material/Button"
import Skeleton from "@mui/material/Skeleton"
import _, { cloneDeep } from "lodash"
import { useEffect, useState } from "react"
import { v4 } from "uuid"
import {
	useAddUpdateScoresheetAddUpdateScoresheetScoresheetIdPostMutation,
	useGetManyAvailablebonusesGetQuery,
	useGetManyAvailablemovesGetQuery
} from "../../redux/services/aemsApi"
import { AddNewMove } from "./AddMove"
import { EditDeleteMove } from "./EditDeleteMove"
import { MoveData } from "./EditMove"
import { ScoresheetBuilderHeader } from "./Header"

export const ScoresheetMoves = ({
	selectedScoresheet
}: {
	selectedScoresheet: string
}) => {
	const moves = useGetManyAvailablemovesGetQuery({
		sheetIdListComparisonOperator: "Equal",
		sheetIdList: [selectedScoresheet]
	})

	useEffect(() => {
		if (selectedScoresheet) {
			void moves.refetch()
		}
	}, [selectedScoresheet])

	useEffect(() => {
		setNewMoves((moves.data as AvailableMoves[]) || [])
	}, [moves.data])

	const bonusInfo = useGetManyAvailablebonusesGetQuery({
		sheetIdListComparisonOperator: "Equal",
		sheetIdList: [selectedScoresheet]
	})
	useEffect(() => {
		setNewBonusInfo((bonusInfo.data as NewBonusInfo[]) || [])
		const uniqueBonusNames = _.uniqBy(bonusInfo.data || [], "name")
		const originalUniqueBonusNameList: string[] = []
		uniqueBonusNames.map((b) => {
			if (b && b.name) {
				originalUniqueBonusNameList.push(b.name)
			}
		})
		setUniqueBonusNamesList(originalUniqueBonusNameList)
	}, [bonusInfo.data])

	const [newBonusInfo, setNewBonusInfo] = useState<NewBonusInfo[]>([])

	const [newMoves, setNewMoves] = useState<AvailableMoves[]>([])

	const [uniqueBonusNamesList, setUniqueBonusNamesList] = useState<string[]>(
		[]
	)

	const addNewMove = (m: MoveData) => {
		setNewMoves([
			...newMoves,
			{
				id: m.id,
				sheet_id: selectedScoresheet,
				name: m.name,
				fl_score: m.flScore,
				rb_score: m.rbScore,
				direction: m.direction
			}
		])
		setNewBonusInfo([
			...newBonusInfo,
			...m.bonuses.map((b) => ({
				id: b.id,
				sheet_id: selectedScoresheet,
				move_id: m.id,
				name: b.name,
				score: b.score
			}))
		])
	}

	const editMove = (editedMove: MoveData) => {
		const uneditedMoves = newMoves

		const editedMoves = uneditedMoves.map((m) =>
			m.id === editedMove.id
				? {
						id: editedMove.id,
						sheet_id: selectedScoresheet,
						name: editedMove.name,
						fl_score: editedMove.flScore,
						rb_score: editedMove.rbScore,
						direction: editedMove.direction
				  }
				: m
		)
		setNewMoves(editedMoves)

		setNewBonusInfo([
			...newBonusInfo.filter((b) => b.move_id !== editedMove.id),
			...editedMove.bonuses.map((b) => ({
				id: b.id,
				sheet_id: selectedScoresheet,
				move_id: editedMove.id,
				name: b.name,
				score: b.score
			}))
		])
	}
	const deleteMove = (deletedMove: MoveData) => {
		setNewMoves(newMoves.filter((m) => m.id !== deletedMove.id))
		setNewBonusInfo(
			newBonusInfo.filter((b) => b.move_id !== deletedMove.id)
		)
	}
	const addNewBonusType = (bonusName: string) => {
		setNewBonusInfo([
			...newBonusInfo,
			...(newMoves
				? newMoves.map(
						(m): NewBonusInfo => ({
							id: v4(),
							sheet_id: selectedScoresheet,
							move_id: m.id,
							name: bonusName,
							score: 0
						})
				  )
				: [])
		])
		setUniqueBonusNamesList(cloneDeep([...uniqueBonusNamesList, bonusName]))
	}
	const deleteBonusType = (deletedBonusName: string) => {
		setUniqueBonusNamesList(
			_.cloneDeep([
				...uniqueBonusNamesList.filter((b) => b !== deletedBonusName)
			])
		)
		setNewBonusInfo(newBonusInfo.filter((b) => b.name !== deletedBonusName))
	}
	const [updateScoresheetMoves] =
		useAddUpdateScoresheetAddUpdateScoresheetScoresheetIdPostMutation()
	const submitDataToDB = async () => {
		await updateScoresheetMoves({
			scoresheetId: selectedScoresheet,
			addUpdateScoresheetRequest: {
				bonuses: newBonusInfo,
				moves: newMoves
			}
		})

		await bonusInfo.refetch()
		await moves.refetch()
	}

	if (moves.isLoading || bonusInfo.isLoading) {
		return <Skeleton variant="rectangular" />
	} else if (newMoves) {
		return (
			<>
				<ScoresheetBuilderHeader
					bonuses={uniqueBonusNamesList}
					setBonuses={addNewBonusType}
					deleteBonus={deleteBonusType}
				/>
				{newMoves.map((m, i) => (
					<EditDeleteMove
						key={i}
						moveData={{
							id: m.id,
							name: m.name,
							rbScore: m.rb_score,
							flScore: m.fl_score,
							direction: m.direction,
							bonuses: newBonusInfo.filter(
								(b) => b.move_id === m.id
							)
						}}
						updateMove={editMove}
						deleteMove={deleteMove}
					/>
				))}
				<AddNewMove
					bonuses={uniqueBonusNamesList}
					addMove={addNewMove}
				/>
				<Button
					onClick={submitDataToDB}
					variant="contained"
					color="secondary"
				>
					Update Scoresheet
				</Button>
			</>
		)
	} else if (!selectedScoresheet) {
		return <></>
	}

	return (
		<div>
			<ScoresheetBuilderHeader
				bonuses={uniqueBonusNamesList}
				setBonuses={addNewBonusType}
				deleteBonus={deleteBonusType}
			/>
			<AddNewMove bonuses={uniqueBonusNamesList} addMove={addNewMove} />
		</div>
	)
}

interface AvailableMoves {
	id: string
	sheet_id: string
	name: string
	fl_score: number
	rb_score: number
	direction: "LR" | "FB" | "LRFB"
}

interface NewBonusInfo {
	id: string
	sheet_id: string
	move_id: string
	name: string
	score: number
}

import Button from "@mui/material/Button"
import Skeleton from "@mui/material/Skeleton"
import _, { cloneDeep } from "lodash"
import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import { v4 } from "uuid"
import {
	useAddUpdateScoresheetAddUpdateScoresheetScoresheetIdPostMutation,
	useGetManyAvailablebonusesGetQuery,
	useGetManyAvailablemovesGetQuery
} from "../../redux/services/aemsApi"
import { AvailableMoveDirections } from "../roles/scribe/Interfaces"
import { AddNewMove } from "./AddMove"
import { EditDeleteMove } from "./EditDeleteMove"
import { MoveData } from "./EditMove"
import { ScoresheetBuilderHeader } from "./Header"

export const ScoresheetMoves = ({
	selectedScoresheet
}: {
	selectedScoresheet: string
}) => {
	const moves = useGetManyAvailablemovesGetQuery(
		{
			sheetIdListComparisonOperator: "Equal",
			sheetIdList: [selectedScoresheet]
		},
		{ refetchOnMountOrArgChange: true }
	)

	useEffect(() => {
		if (selectedScoresheet) {
			void moves.refetch()
		}
	}, [selectedScoresheet])

	useEffect(() => {
		setNewMoves((moves.data as AvailableMoves[]) || [])
	}, [moves.data])

	const bonusInfo = useGetManyAvailablebonusesGetQuery(
		{
			sheetIdListComparisonOperator: "Equal",
			sheetIdList: [selectedScoresheet]
		},
		{ refetchOnMountOrArgChange: true }
	)
	useEffect(() => {
		const orderedBonuses = Array.isArray(bonusInfo.data)
			? [...bonusInfo.data].sort(sortBonuses)
			: []
		setNewBonusInfo((orderedBonuses as NewBonusInfo[]) || [])
		const uniqueBonusNames = _.uniqBy(orderedBonuses || [], "name")
		const originalUniqueBonusNameList: string[] = []
		uniqueBonusNames.forEach((b) => {
			if (b?.name) {
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
				score: b.score,
				display_order:
					uniqueBonusNamesList.indexOf(b.name) !== -1
						? uniqueBonusNamesList.indexOf(b.name)
						: undefined
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
	useEffect(() => {
		setNewBonusInfo((prevBonusInfo) => {
			const updatedBonusInfo = prevBonusInfo.map((bonus) => {
				const displayOrder = uniqueBonusNamesList.indexOf(bonus.name)

				return {
					...bonus,
					display_order:
						displayOrder !== -1 ? displayOrder : undefined
				}
			})

			// Only update state if the new array differs from the previous state
			if (
				JSON.stringify(updatedBonusInfo) !==
				JSON.stringify(prevBonusInfo)
			) {
				return updatedBonusInfo
			}

			return prevBonusInfo
		})
	}, [uniqueBonusNamesList])

	const [updateScoresheetMoves] =
		useAddUpdateScoresheetAddUpdateScoresheetScoresheetIdPostMutation()
	const submitDataToDB = async () => {
		try {
			await updateScoresheetMoves({
				scoresheetId: selectedScoresheet,
				addUpdateScoresheetRequest: {
					bonuses: newBonusInfo,
					moves: newMoves
				}
			})
			toast.success("Scoresheet updated successfully")
			await bonusInfo.refetch()
			await moves.refetch()
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (error) {
			toast.error("Failed to update scoresheet")
		}
	}

	if (moves.isLoading || bonusInfo.isLoading) {
		return <Skeleton variant="rectangular" data-testid="loading-skeleton" />
	} else if (newMoves) {
		return (
			<>
				<ScoresheetBuilderHeader
					bonuses={uniqueBonusNamesList}
					setBonuses={addNewBonusType}
					deleteBonus={deleteBonusType}
					setUniqueBonusNamesList={setUniqueBonusNamesList}
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
							bonuses: newBonusInfo
								.filter((b) => b.move_id === m.id)
								.sort(sortBonuses)
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
					onClick={() => void submitDataToDB()}
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
				setUniqueBonusNamesList={setUniqueBonusNamesList}
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
	direction: AvailableMoveDirections
}

interface NewBonusInfo {
	id: string
	sheet_id: string
	move_id: string
	name: string
	score: number
	display_order?: number
}

export const sortBonuses = (
	a: { display_order?: number },
	b: { display_order?: number }
) => {
	// Use a fallback value for missing keys, such as `Infinity` or `-Infinity`
	const aKey = a.display_order ?? Infinity // Preserve original order for missing keys
	const bKey = b.display_order ?? Infinity

	return aKey - bKey
}

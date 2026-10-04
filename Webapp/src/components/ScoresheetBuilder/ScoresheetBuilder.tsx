import Alert from "@mui/material/Alert"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Skeleton from "@mui/material/Skeleton"
import { useEffect, useRef, useState } from "react"
import { toast } from "react-hot-toast"
import { v4 } from "uuid"
import {
	AvailableMovesResponse,
	PydanticAvailableMoves,
	useAddUpdateScoresheetAddUpdateScoresheetScoresheetIdPostMutation,
	useGetManyAvailablebonusesGetQuery,
	useGetManyAvailablemovesGetQuery
} from "../../redux/services/aemsApi"
import { uniqBy } from "../../utils/collections"
import { AvailableMoveDirections } from "../roles/scribe/Interfaces"
import { AddNewMove } from "./AddMove"
import { EditDeleteMove } from "./EditDeleteMove"
import { MoveData } from "./EditMove"
import { ScoresheetBuilderHeader } from "./Header"

const SWAP_HIGHLIGHT_MS = 500

export const ScoresheetMoves = ({
	selectedScoresheet,
	onUnsavedChangesChange
}: {
	selectedScoresheet: string
	onUnsavedChangesChange?: (hasUnsavedChanges: boolean) => void
}) => {
	const moves = useGetManyAvailablemovesGetQuery(
		{
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
		const movesData = Array.isArray(moves.data)
			? moves.data.map((move) => ({
					...move,
					direction:
						move.direction as PydanticAvailableMoves["direction"]
			  }))
			: []
		const orderedMoves = [...movesData].sort(sortMoves)
		setNewMoves(orderedMoves)
	}, [moves.data])

	const bonusInfo = useGetManyAvailablebonusesGetQuery(
		{
			sheetIdList: [selectedScoresheet]
		},
		{ refetchOnMountOrArgChange: true }
	)
	useEffect(() => {
		const orderedBonuses = Array.isArray(bonusInfo.data)
			? [...bonusInfo.data].sort(sortBonuses)
			: []
		setNewBonusInfo(orderedBonuses as NewBonusInfo[])
		setUniqueBonusNamesList(bonusTypeNames(orderedBonuses))
	}, [bonusInfo.data])

	const [newBonusInfo, setNewBonusInfo] = useState<NewBonusInfo[]>([])

	const [newMoves, setNewMoves] = useState<PydanticAvailableMoves[]>([])

	const [uniqueBonusNamesList, setUniqueBonusNamesList] = useState<string[]>(
		[]
	)

	const [recentlySwappedIds, setRecentlySwappedIds] = useState<Set<string>>(
		new Set()
	)
	const swapHighlightTimeout = useRef<NodeJS.Timeout | null>(null)

	useEffect(
		() => () => {
			if (swapHighlightTimeout.current) {
				clearTimeout(swapHighlightTimeout.current)
			}
		},
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
	const reorderMove = (moveId: string, direction: "up" | "down") => {
		setNewMoves((prevMoves) => {
			const currentIndex = prevMoves.findIndex(
				(move) => move.id === moveId
			)
			const newIndex =
				direction === "up" ? currentIndex - 1 : currentIndex + 1

			if (
				currentIndex === -1 ||
				newIndex < 0 ||
				newIndex >= prevMoves.length
			) {
				return prevMoves
			}

			const reorderedMoves = [...prevMoves]
			const currentMove = reorderedMoves[currentIndex]
			const swappedMove = reorderedMoves[newIndex]
			reorderedMoves[currentIndex] = swappedMove
			reorderedMoves[newIndex] = currentMove

			if (swapHighlightTimeout.current) {
				clearTimeout(swapHighlightTimeout.current)
			}
			setRecentlySwappedIds(new Set([currentMove.id, swappedMove.id]))
			swapHighlightTimeout.current = setTimeout(() => {
				setRecentlySwappedIds(new Set())
			}, SWAP_HIGHLIGHT_MS)

			return reorderedMoves
		})
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
		setUniqueBonusNamesList([...uniqueBonusNamesList, bonusName])
	}
	const deleteBonusType = (deletedBonusName: string) => {
		setUniqueBonusNamesList(
			uniqueBonusNamesList.filter((b) => b !== deletedBonusName)
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

	const savedBonuses = (bonusInfo.data ?? []) as NewBonusInfo[]
	const hasUnsavedChanges =
		!moves.isFetching &&
		!bonusInfo.isFetching &&
		serialiseScoresheet(newMoves, newBonusInfo, uniqueBonusNamesList) !==
			serialiseScoresheet(
				[...(moves.data ?? [])].sort(sortMoves),
				savedBonuses,
				bonusTypeNames([...savedBonuses].sort(sortBonuses))
			)

	useEffect(() => {
		onUnsavedChangesChange?.(hasUnsavedChanges)
	}, [hasUnsavedChanges])

	const [updateScoresheetMoves] =
		useAddUpdateScoresheetAddUpdateScoresheetScoresheetIdPostMutation()
	const submitDataToDB = async () => {
		try {
			await updateScoresheetMoves({
				scoresheetId: selectedScoresheet,
				addUpdateScoresheetRequest: {
					bonuses: newBonusInfo,
					moves: newMoves.map((move, index) => ({
						...move,
						display_order: index
					}))
				}
			}).unwrap()
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
	}

	return (
		<>
			<ScoresheetBuilderHeader
				bonuses={uniqueBonusNamesList}
				setBonuses={addNewBonusType}
				deleteBonus={deleteBonusType}
				setUniqueBonusNamesList={setUniqueBonusNamesList}
			/>
			{newMoves.map((m, index) => (
				<EditDeleteMove
					key={m.id}
					moveData={{
						id: m.id,
						name: m.name,
						rbScore: m.rb_score,
						flScore: m.fl_score,
						direction: m.direction as AvailableMoveDirections,
						bonuses: newBonusInfo
							.filter((b) => b.move_id === m.id)
							.sort(sortBonuses)
					}}
					updateMove={editMove}
					deleteMove={deleteMove}
					moveUp={() => reorderMove(m.id, "up")}
					moveDown={() => reorderMove(m.id, "down")}
					canMoveUp={index > 0}
					canMoveDown={index < newMoves.length - 1}
					highlighted={recentlySwappedIds.has(m.id)}
				/>
			))}
			<AddNewMove bonuses={uniqueBonusNamesList} addMove={addNewMove} />
			<Box
				sx={{
					position: "sticky",
					bottom: 0,
					zIndex: 1,
					py: 1,
					mt: 1,
					bgcolor: "background.paper"
				}}
			>
				{hasUnsavedChanges && (
					<Alert severity="warning" sx={{ mb: 1 }}>
						You have unsaved changes. Press Update Scoresheet to
						keep them.
					</Alert>
				)}
				<Button
					onClick={() => void submitDataToDB()}
					variant="contained"
					color="secondary"
				>
					Update Scoresheet
				</Button>
			</Box>
		</>
	)
}

interface NewBonusInfo {
	id: string
	sheet_id: string
	move_id: string
	name: string
	score: number
	display_order?: number
}

export const sortByDisplayOrder = (
	a: { display_order?: number | null },
	b: { display_order?: number | null }
) => {
	// Preserve original order for missing keys by sorting them last
	const aKey = a.display_order ?? Infinity
	const bKey = b.display_order ?? Infinity

	return aKey - bKey
}

export const sortBonuses = sortByDisplayOrder
export const sortMoves = sortByDisplayOrder

const bonusTypeNames = (orderedBonuses: { name?: string | null }[]) =>
	uniqBy(orderedBonuses, "name")
		.map((b) => b.name)
		.filter((name): name is string => !!name)

// Edited fields hold raw input text, so "140.0" must match a saved 140. A
// blank or non-numeric entry stays as typed: Number("") is 0 and would hide the edit.
const scoreKey = (score: number | string) => {
	const text = String(score).trim()

	return text === "" || Number.isNaN(Number(text))
		? text
		: String(Number(text))
}

const serialiseScoresheet = (
	moves: AvailableMovesResponse[],
	bonuses: NewBonusInfo[],
	bonusTypeOrder: string[]
) =>
	JSON.stringify({
		moves: moves.map((m) => [
			m.id,
			m.name,
			m.direction,
			scoreKey(m.fl_score),
			scoreKey(m.rb_score)
		]),
		bonuses: [...bonuses]
			.sort((a, b) => a.id.localeCompare(b.id))
			.map((b) => [b.id, b.move_id, b.name, scoreKey(b.score)]),
		bonusTypeOrder
	})

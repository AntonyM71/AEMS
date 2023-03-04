import { bonusesType, movesType } from "./Interfaces"

export const moves: movesType[] = [
	{
		id: "mf01",
		name: "Entry 1",
		direction: "SINGLE",
		score: 30
	},
	{
		id: "mf02",
		name: "Entry 2",
		direction: "SINGLE",
		score: 50
	}
]

export const bonuses: bonusesType[] = [
	{
		id: "bf01",
		name: "Clean",
		shortName: "C"
	},
	{
		id: "bf02",
		name: "Super Clean",
		shortName: "SC"
	},
	{
		id: "bf03",
		name: "Air",
		shortName: "A"
	},
	{
		id: "bf04",
		name: "Huge",
		shortName: "H"
	},
	{
		id: "bf05",
		name: "Link",
		shortName: "L"
	}
]

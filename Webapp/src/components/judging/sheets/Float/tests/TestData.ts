import { heatsType } from "../../../../../competitiondata/Competitions"
import { movesType } from "../Interfaces"

export const testMoves: movesType[] = [
	{
		id: "mf01",
		name: "Single Test",
		direction: "SINGLE",
		score: 10
	},
	{
		id: "mf02",
		name: "LR Test",
		direction: "LR",
		score: 10
	},
	{
		id: "mf03",
		name: "FB Test",
		direction: "FB",
		score: 10
	},
	{
		id: "mf27",
		name: "LRFB Test",
		direction: "LRFB",
		score: 10
	}
]

export const testHeat: heatsType = {
	id: "h1",
	name: "testheat",
	athletes: [
		{
			Code: "36398",
			Parent: "36398",
			Status: "ACCRED",
			GivenName: "Emily",
			FamilyName: "JACKSON",
			PrintName: "JACKSON Emily",
			PrintInitialName: "JACKSON E.",
			TVName: "JACKSON Emily",
			TVInitialName: "JACKSON E.",
			Gender: "W",
			Organisation: "USA",
			BirthDate: "19900313",
			Height: "5",
			Weight: "138",
			PlaceofBirth: "",
			CountryofBirth: "",
			PlaceofResidence: "",
			CountryofResidence: "",
			Nationality: "USA",
			Current: "true",
			OlympicSolidarity: "N",
			MainFunctionId: "AA01",
			Discipline: {
				Code: "CF",
				RegisteredEvent: {
					Gender: "W",
					Event: "002",
					Bib: "70",
					EventEntry: {
						Code: "E_POSITION",
						Pos: "1",
						Value: "1",
						Type: "E_ENTRY"
					}
				}
			},
			Bib: "70"
		},
		{
			Code: "39271",
			Parent: "39271",
			Status: "ACCRED",
			GivenName: "Jordan",
			FamilyName: "POFFENBERGER",
			PrintName: "POFFENBERGER Jordan",
			PrintInitialName: "POFFENBERGER J.",
			TVName: "POFFENBERGER Jordan",
			TVInitialName: "POFFENBERGER J.",
			Gender: "M",
			Organisation: "USA",
			BirthDate: "19940708",
			Height: "",
			Weight: "",
			PlaceofBirth: "",
			CountryofBirth: "",
			PlaceofResidence: "",
			CountryofResidence: "",
			Nationality: "USA",
			Current: "true",
			OlympicSolidarity: "N",
			MainFunctionId: "AA01",
			Discipline: {
				Code: "CF",
				RegisteredEvent: {
					Gender: "M",
					Event: "009",
					Bib: "127",
					EventEntry: {
						Code: "E_POSITION",
						Pos: "1",
						Value: "1",
						Type: "E_ENTRY"
					}
				}
			},
			Bib: "127"
		}
	]
}

import {
	athleteType,
	competitionsType,
	heatsType,
	registeredEventType
} from "../../competitiondata/Competitions"

const aems = ["K1W", "K1M", "OC1", "C1", "K1JW", "K1JM", "SW", "SM"]
const icf = ["002", "001", "", "009", "004", "003", "008", "007"]
const names = [
	"Women's Kayak",
	"Mens's Kayak",
	"Open Canoe",
	"Canoe Decked",
	"Junior Women's Kayak",
	"Junior Men's Kayak",
	"Women's Squirt",
	"Men's Squirt"
]

export interface athleteHeatType extends athleteType {
	Bib?: string
	EventsShort?: string
}

const chunkArrayInGroups = (arr: any[], size: number) => {
	const myArray = []
	for (let i = 0; i < arr.length; i += size) {
		myArray.push(arr.slice(i, i + size))
	}

	return myArray
}

export const getHeatsForEvent = (
	competition: string,
	event: string
): heatsType[] => {
	const indexOfAems = aems.indexOf(event)
	const athletes = competitions.filter((c) => c.id === competition)[0]
		.athletes

	const eventAthletes: athleteHeatType[] = athletes.reduce(
		(result: athleteHeatType[], athlete: athleteType) => {
			if (athlete.Discipline.Code === "CF") {
				// Must be Canoe Freestyle CF

				if (Array.isArray(athlete.Discipline.RegisteredEvent)) {
					// If RegisteredEvent is an array then must include a registration that is for this event
					const filteredEvents = athlete.Discipline.RegisteredEvent.filter(
						(re: registeredEventType) =>
							re.Event === icf[indexOfAems]
					)
					if (filteredEvents.length === 1) {
						result = [
							...result,
							{ ...athlete, Bib: filteredEvents[0].Bib }
						]

						return result
					}
				} else {
					if (
						athlete.Discipline.RegisteredEvent.Event ===
						icf[indexOfAems]
					) {
						result = [
							...result,
							{
								...athlete,
								Bib: athlete.Discipline.RegisteredEvent.Bib
							}
						]

						return result
					}
				}
			}

			return result
		},
		[]
	)
	const sortedAthletes: athleteHeatType[] = eventAthletes.sort(
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		(a, b) => parseInt(a.Bib!, 10) - parseInt(b.Bib!, 10)
	)
	const heatAthletes = chunkArrayInGroups(sortedAthletes, 5)
	const heats: heatsType[] = heatAthletes.map((ha, index) => ({
		id: competition + "_" + event + "_" + (index + 1).toString(),
		name: "Heat " + (index + 1).toString(),
		athletes: ha
	}))

	return heats
}

export const getEntriesForEvent = (
	competition: string,
	event: string
): athleteHeatType[] => {
	const indexOfAems = aems.indexOf(event)
	const athletes: athleteHeatType[] = competitions.filter(
		(c) => c.id === competition
	)[0].athletes

	const athleteEntries: athleteHeatType[] = athletes.reduce(
		(result: athleteHeatType[], athlete: athleteHeatType) => {
			if (athlete.Discipline.Code === "CF") {
				// Must be Canoe Freestyle CF
				if (Array.isArray(athlete.Discipline.RegisteredEvent)) {
					// If RegisteredEvent is an array then must include a registration that is for this event
					const filteredEvents = athlete.Discipline.RegisteredEvent.filter(
						(re) => re.Event === icf[indexOfAems]
					)
					if (filteredEvents.length === 1) {
						result = [
							...result,
							{ ...athlete, Bib: filteredEvents[0].Bib }
						]

						return result
					}
				} else {
					if (
						athlete.Discipline.RegisteredEvent.Event ===
						icf[indexOfAems]
					) {
						result = [
							...result,
							{
								...athlete,
								Bib: athlete.Discipline.RegisteredEvent.Bib
							}
						]

						return result
					}
				}
			}

			return result
		},
		[]
	)

	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	return athleteEntries.sort(
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		(a, b) => parseInt(a.Bib!, 10) - parseInt(b.Bib!, 10)
	)
}

export const getEntriesForCompetition = (
	competition: string
): athleteHeatType[] => {
	const athletes: athleteHeatType[] = competitions.filter(
		(c) => c.id === competition
	)[0].athletes

	const result = athletes.map((athlete: athleteHeatType) => {
		if (athlete.Discipline.Code === "CF") {
			// Must be Canoe Freestyle CF
			if (Array.isArray(athlete.Discipline.RegisteredEvent)) {
				// If RegisteredEvent is an array then must include a registration that is for this event
				athlete.Bib = athlete.Discipline.RegisteredEvent[0].Bib
				athlete.EventsShort = athlete.Discipline.RegisteredEvent.reduce(
					(events, event) => {
						const indexOfIcf = icf.indexOf(event.Event)

						return events + names[indexOfIcf] + ", "
					},
					""
				)
				if (athlete.EventsShort.length > 2) {
					athlete.EventsShort = athlete.EventsShort.substr(
						0,
						athlete.EventsShort.length - 2
					)
				}
				athletes.push(athlete)
			} else {
				athlete.Bib = athlete.Discipline.RegisteredEvent.Bib
				const indexOfIcf = icf.indexOf(
					athlete.Discipline.RegisteredEvent.Event
				)
				athlete.EventsShort = names[indexOfIcf]
				athletes.push(athlete)
			}
		}

		return athlete
	})

	result.sort((a, b) =>
		a.Nationality.localeCompare(b.Nationality, "en", {
			sensitivity: "base"
		})
	)

	return result
}

const competitions: competitionsType[] = [
	{
		id: "5fb5020d81dcac1964685f02",
		athletes: [],
		events: []
	},
	{
		id: "5fb52d7081dcac1964685f05",
		athletes: [],
		events: []
	},
	{
		id: "5fb5312f81dcac1964685f06",
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
				}
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
				}
			},
			{
				Code: "39687",
				Parent: "39687",
				Status: "ACCRED",
				GivenName: "Motoko",
				FamilyName: "ISHIDA",
				PrintName: "ISHIDA Motoko",
				PrintInitialName: "ISHIDA M.",
				TVName: "ISHIDA Motoko",
				TVInitialName: "ISHIDA M.",
				Gender: "W",
				Organisation: "JPN",
				BirthDate: "19721111",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "JPN",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "JPN",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: [
						{
							Gender: "W",
							Event: "002",
							Bib: "68",
							EventEntry: {
								Code: "E_POSITION",
								Pos: "1",
								Value: "1",
								Type: "E_ENTRY"
							}
						},
						{
							Gender: "W",
							Event: "008",
							Bib: "68",
							EventEntry: {
								Code: "E_POSITION",
								Pos: "1",
								Value: "1",
								Type: "E_ENTRY"
							}
						}
					]
				}
			},
			{
				Code: "39688",
				Parent: "39688",
				Status: "ACCRED",
				GivenName: "Yoshiko",
				FamilyName: "SUEMATSU",
				PrintName: "SUEMATSU Yoshiko",
				PrintInitialName: "SUEMATSU Y.",
				TVName: "SUEMATSU Yoshiko",
				TVInitialName: "SUEMATSU Y.",
				Gender: "W",
				Organisation: "JPN",
				BirthDate: "19820214",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "JPN",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "JPN",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: [
						{
							Gender: "W",
							Event: "002",
							Bib: "152",
							EventEntry: {
								Code: "E_POSITION",
								Pos: "1",
								Value: "1",
								Type: "E_ENTRY"
							}
						},
						{
							Gender: "W",
							Event: "008",
							Bib: "152",
							EventEntry: {
								Code: "E_POSITION",
								Pos: "1",
								Value: "1",
								Type: "E_ENTRY"
							}
						}
					]
				}
			},
			{
				Code: "39689",
				Parent: "39689",
				Status: "ACCRED",
				GivenName: "Hitomi",
				FamilyName: "TAKAKU",
				PrintName: "TAKAKU Hitomi",
				PrintInitialName: "TAKAKU H.",
				TVName: "TAKAKU Hitomi",
				TVInitialName: "TAKAKU H.",
				Gender: "W",
				Organisation: "JPN",
				BirthDate: "19820326",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "JPN",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "JPN",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: [
						{
							Gender: "W",
							Event: "002",
							Bib: "153",
							EventEntry: {
								Code: "E_POSITION",
								Pos: "1",
								Value: "1",
								Type: "E_ENTRY"
							}
						},
						{
							Gender: "W",
							Event: "008",
							Bib: "153",
							EventEntry: {
								Code: "E_POSITION",
								Pos: "1",
								Value: "1",
								Type: "E_ENTRY"
							}
						}
					]
				}
			},
			{
				Code: "39694",
				Parent: "39694",
				Status: "ACCRED",
				GivenName: "Akira",
				FamilyName: "NAKAMURA",
				PrintName: "NAKAMURA Akira",
				PrintInitialName: "NAKAMURA A.",
				TVName: "NAKAMURA Akira",
				TVInitialName: "NAKAMURA A.",
				Gender: "M",
				Organisation: "JPN",
				BirthDate: "19711226",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "JPN",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "JPN",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "M",
						Event: "001",
						Bib: "112",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "41646",
				Parent: "41646",
				Status: "ACCRED",
				GivenName: "Andraz",
				FamilyName: "ECHEVERRIA OLGUIN",
				PrintName: "ECHEVERRIA OLGUIN Andraz",
				PrintInitialName: "ECHEVERRIA OLGUIN A.",
				TVName: "ECHEVERRIA OLGUIN Andraz",
				TVInitialName: "ECHEVERRIA OLGUIN A.",
				Gender: "M",
				Organisation: "CHI",
				BirthDate: "19960603",
				Height: "170",
				Weight: "63",
				PlaceofBirth: "",
				CountryofBirth: "CHI",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "CHI",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "M",
						Event: "001",
						Bib: "40",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "42253",
				Parent: "42253",
				Status: "ACCRED",
				GivenName: "Tad",
				FamilyName: "DENNIS",
				PrintName: "DENNIS Tad",
				PrintInitialName: "DENNIS T.",
				TVName: "DENNIS Tad",
				TVInitialName: "DENNIS T.",
				Gender: "M",
				Organisation: "USA",
				BirthDate: "19840528",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "USA",
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
						Bib: "31",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "42899",
				Parent: "42899",
				Status: "ACCRED",
				GivenName: "Peter",
				FamilyName: "CSONKA",
				PrintName: "CSONKA Peter",
				PrintInitialName: "CSONKA P.",
				TVName: "CSONKA Peter",
				TVInitialName: "CSONKA P.",
				Gender: "M",
				Organisation: "SVK",
				BirthDate: "19850129",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "SVK",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "SVK",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "M",
						Event: "001",
						Bib: "23",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "42901",
				Parent: "42901",
				Status: "ACCRED",
				GivenName: "Nina",
				FamilyName: "CSONKOVA",
				PrintName: "CSONKOVA Nina",
				PrintInitialName: "CSONKOVA N.",
				TVName: "CSONKOVA Nina",
				TVInitialName: "CSONKOVA N.",
				Gender: "W",
				Organisation: "SVK",
				BirthDate: "19851030",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "SVK",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "SVK",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "W",
						Event: "002",
						Bib: "24",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "43069",
				Parent: "43069",
				Status: "ACCRED",
				GivenName: "Lukas",
				FamilyName: "CERVINKA",
				PrintName: "CERVINKA Lukas",
				PrintInitialName: "CERVINKA L.",
				TVName: "CERVINKA Lukas",
				TVInitialName: "CERVINKA L.",
				Gender: "M",
				Organisation: "CZE",
				BirthDate: "19891227",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "CZE",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "CZE",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "M",
						Event: "009",
						Bib: "18",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "44366",
				Parent: "44366",
				Status: "ACCRED",
				GivenName: "Jeremy",
				FamilyName: "BLANCHARD",
				PrintName: "BLANCHARD Jeremy",
				PrintInitialName: "BLANCHARD J.",
				TVName: "BLANCHARD Jeremy",
				TVInitialName: "BLANCHARD J.",
				Gender: "M",
				Organisation: "AUS",
				BirthDate: "19780815",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "AUS",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "AUS",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "M",
						Event: "009",
						Bib: "74",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "44367",
				Parent: "44367",
				Status: "ACCRED",
				GivenName: "Joshua",
				FamilyName: "SINGLETON",
				PrintName: "SINGLETON Joshua",
				PrintInitialName: "SINGLETON J.",
				TVName: "SINGLETON Joshua",
				TVInitialName: "SINGLETON J.",
				Gender: "M",
				Organisation: "AUS",
				BirthDate: "19850204",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "AUS",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "AUS",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "M",
						Event: "001",
						Bib: "144",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "44840",
				Parent: "44840",
				Status: "ACCRED",
				GivenName: "Alan",
				FamilyName: "WARD",
				PrintName: "WARD Alan",
				PrintInitialName: "WARD A.",
				TVName: "WARD Alan",
				TVInitialName: "WARD A.",
				Gender: "M",
				Organisation: "GBR",
				BirthDate: "19870112",
				Height: "180",
				Weight: "81",
				PlaceofBirth: "",
				CountryofBirth: "GBR",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "GBR",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "M",
						Event: "001",
						Bib: "165",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "44841",
				Parent: "44841",
				Status: "ACCRED",
				GivenName: "Robert",
				FamilyName: "CROWE",
				PrintName: "CROWE Robert",
				PrintInitialName: "CROWE R.",
				TVName: "CROWE Robert",
				TVInitialName: "CROWE R.",
				Gender: "M",
				Organisation: "GBR",
				BirthDate: "19890724",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "GBR",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "GBR",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "M",
						Event: "001",
						Bib: "22",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "44843",
				Parent: "44843",
				Status: "ACCRED",
				GivenName: "Islay",
				FamilyName: "CROSBIE",
				PrintName: "CROSBIE Islay",
				PrintInitialName: "CROSBIE I.",
				TVName: "CROSBIE Islay",
				TVInitialName: "CROSBIE I.",
				Gender: "W",
				Organisation: "GBR",
				BirthDate: "19910314",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "GBR",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "GBR",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "W",
						Event: "002",
						Bib: "20",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "44846",
				Parent: "44846",
				Status: "ACCRED",
				GivenName: "Claire",
				FamilyName: "O'HARA",
				PrintName: "O'HARA Claire",
				PrintInitialName: "O'HARA C.",
				TVName: "O'HARA Claire",
				TVInitialName: "O'HARA C.",
				Gender: "W",
				Organisation: "GBR",
				BirthDate: "19811102",
				Height: "160",
				Weight: "67",
				PlaceofBirth: "",
				CountryofBirth: "GBR",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "GBR",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: [
						{
							Gender: "W",
							Event: "002",
							Bib: "119",
							EventEntry: {
								Code: "E_POSITION",
								Pos: "1",
								Value: "1",
								Type: "E_ENTRY"
							}
						},
						{
							Gender: "W",
							Event: "008",
							Bib: "119",
							EventEntry: {
								Code: "E_POSITION",
								Pos: "1",
								Value: "1",
								Type: "E_ENTRY"
							}
						}
					]
				}
			},
			{
				Code: "45167",
				Parent: "45167",
				Status: "ACCRED",
				GivenName: "Alex",
				FamilyName: "EDWARDS",
				PrintName: "EDWARDS Alex",
				PrintInitialName: "EDWARDS A.",
				TVName: "EDWARDS Alex",
				TVInitialName: "EDWARDS A.",
				Gender: "M",
				Organisation: "GBR",
				BirthDate: "19840202",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "GBR",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "GBR",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "M",
						Event: "007",
						Bib: "41",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "45288",
				Parent: "45288",
				Status: "ACCRED",
				GivenName: "Jim",
				FamilyName: "ROVEKAMP",
				PrintName: "ROVEKAMP Jim",
				PrintInitialName: "ROVEKAMP J.",
				TVName: "ROVEKAMP Jim",
				TVInitialName: "ROVEKAMP J.",
				Gender: "M",
				Organisation: "NED",
				BirthDate: "19970427",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "NED",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "NED",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "M",
						Event: "001",
						Bib: "139",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "45502",
				Parent: "45502",
				Status: "ACCRED",
				GivenName: "Izabela",
				FamilyName: "FIDZINSKA",
				PrintName: "FIDZINSKA Izabela",
				PrintInitialName: "FIDZINSKA I.",
				TVName: "FIDZINSKA Izabela",
				TVInitialName: "FIDZINSKA I.",
				Gender: "W",
				Organisation: "POL",
				BirthDate: "19910716",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "POL",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "POL",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: [
						{
							Gender: "W",
							Event: "002",
							Bib: "45",
							EventEntry: {
								Code: "E_POSITION",
								Pos: "1",
								Value: "1",
								Type: "E_ENTRY"
							}
						},
						{
							Gender: "W",
							Event: "008",
							Bib: "45",
							EventEntry: {
								Code: "E_POSITION",
								Pos: "1",
								Value: "1",
								Type: "E_ENTRY"
							}
						}
					]
				}
			},
			{
				Code: "45503",
				Parent: "45503",
				Status: "ACCRED",
				GivenName: "Tomasz",
				FamilyName: "CZAPLICKI",
				PrintName: "CZAPLICKI Tomasz",
				PrintInitialName: "CZAPLICKI T.",
				TVName: "CZAPLICKI Tomasz",
				TVInitialName: "CZAPLICKI T.",
				Gender: "M",
				Organisation: "POL",
				BirthDate: "19880707",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "POL",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "POL",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: [
						{
							Gender: "M",
							Event: "001",
							Bib: "25",
							EventEntry: {
								Code: "E_POSITION",
								Pos: "1",
								Value: "1",
								Type: "E_ENTRY"
							}
						},
						{
							Gender: "M",
							Event: "007",
							Bib: "25",
							EventEntry: {
								Code: "E_POSITION",
								Pos: "1",
								Value: "1",
								Type: "E_ENTRY"
							}
						}
					]
				}
			},
			{
				Code: "45504",
				Parent: "45504",
				Status: "ACCRED",
				GivenName: "Zofia",
				FamilyName: "TULA",
				PrintName: "TULA Zofia",
				PrintInitialName: "TULA Z.",
				TVName: "TULA Zofia",
				TVInitialName: "TULA Z.",
				Gender: "W",
				Organisation: "POL",
				BirthDate: "19911021",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "POL",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "POL",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: [
						{
							Gender: "W",
							Event: "002",
							Bib: "156",
							EventEntry: {
								Code: "E_POSITION",
								Pos: "1",
								Value: "1",
								Type: "E_ENTRY"
							}
						},
						{
							Gender: "W",
							Event: "008",
							Bib: "156",
							EventEntry: {
								Code: "E_POSITION",
								Pos: "1",
								Value: "1",
								Type: "E_ENTRY"
							}
						}
					]
				}
			},
			{
				Code: "45507",
				Parent: "45507",
				Status: "ACCRED",
				GivenName: "Bartosz",
				FamilyName: "CZAUDERNA",
				PrintName: "CZAUDERNA Bartosz",
				PrintInitialName: "CZAUDERNA B.",
				TVName: "CZAUDERNA Bartosz",
				TVInitialName: "CZAUDERNA B.",
				Gender: "M",
				Organisation: "POL",
				BirthDate: "19910726",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "POL",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "POL",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: [
						{
							Gender: "M",
							Event: "001",
							Bib: "26",
							EventEntry: {
								Code: "E_POSITION",
								Pos: "1",
								Value: "1",
								Type: "E_ENTRY"
							}
						},
						{
							Gender: "M",
							Event: "007",
							Bib: "26",
							EventEntry: {
								Code: "E_POSITION",
								Pos: "1",
								Value: "1",
								Type: "E_ENTRY"
							}
						}
					]
				}
			},
			{
				Code: "45757",
				Parent: "45757",
				Status: "ACCRED",
				GivenName: "Mikyung",
				FamilyName: "JEONG",
				PrintName: "JEONG Mikyung",
				PrintInitialName: "JEONG M.",
				TVName: "JEONG Mikyung",
				TVInitialName: "JEONG M.",
				Gender: "W",
				Organisation: "KOR",
				BirthDate: "19661220",
				Height: "157",
				Weight: "53",
				PlaceofBirth: "",
				CountryofBirth: "",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "KOR",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "W",
						Event: "002",
						Bib: "73",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "45758",
				Parent: "45758",
				Status: "ACCRED",
				GivenName: "Jungyeop",
				FamilyName: "YEO",
				PrintName: "YEO Jungyeop",
				PrintInitialName: "YEO J.",
				TVName: "YEO Jungyeop",
				TVInitialName: "YEO J.",
				Gender: "M",
				Organisation: "KOR",
				BirthDate: "19850318",
				Height: "167",
				Weight: "63",
				PlaceofBirth: "",
				CountryofBirth: "KOR",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "KOR",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "M",
						Event: "001",
						Bib: "171",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "46127",
				Parent: "46127",
				Status: "ACCRED",
				GivenName: "Thomas",
				FamilyName: "RICHARD",
				PrintName: "RICHARD Thomas",
				PrintInitialName: "RICHARD T.",
				TVName: "RICHARD Thomas",
				TVInitialName: "RICHARD T.",
				Gender: "M",
				Organisation: "FRA",
				BirthDate: "19961030",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "FRA",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "FRA",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "M",
						Event: "001",
						Bib: "135",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "46132",
				Parent: "46132",
				Status: "ACCRED",
				GivenName: "Sebastien",
				FamilyName: "DEVRED",
				PrintName: "DEVRED Sebastien",
				PrintInitialName: "DEVRED S.",
				TVName: "DEVRED Sebastien",
				TVInitialName: "DEVRED S.",
				Gender: "M",
				Organisation: "FRA",
				BirthDate: "19910429",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "FRA",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "FRA",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: [
						{
							Gender: "M",
							Event: "001",
							Bib: "33",
							EventEntry: {
								Code: "E_POSITION",
								Pos: "1",
								Value: "1",
								Type: "E_ENTRY"
							}
						},
						{
							Gender: "M",
							Event: "009",
							Bib: "33",
							EventEntry: {
								Code: "E_POSITION",
								Pos: "1",
								Value: "1",
								Type: "E_ENTRY"
							}
						}
					]
				}
			},
			{
				Code: "46136",
				Parent: "46136",
				Status: "ACCRED",
				GivenName: "Marlene",
				FamilyName: "DEVILLEZ",
				PrintName: "DEVILLEZ Marlene",
				PrintInitialName: "DEVILLEZ M.",
				TVName: "DEVILLEZ Marlene",
				TVInitialName: "DEVILLEZ M.",
				Gender: "W",
				Organisation: "FRA",
				BirthDate: "19880903",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "FRA",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "FRA",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "W",
						Event: "002",
						Bib: "32",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "46151",
				Parent: "46151",
				Status: "ACCRED",
				GivenName: "Jonas",
				FamilyName: "UNTERBERG",
				PrintName: "UNTERBERG Jonas",
				PrintInitialName: "UNTERBERG J.",
				TVName: "UNTERBERG Jonas",
				TVInitialName: "UNTERBERG J.",
				Gender: "M",
				Organisation: "GER",
				BirthDate: "19930630",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "GER",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "GER",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "M",
						Event: "009",
						Bib: "157",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "46155",
				Parent: "46155",
				Status: "ACCRED",
				GivenName: "Paul",
				FamilyName: "MEYLAHN",
				PrintName: "MEYLAHN Paul",
				PrintInitialName: "MEYLAHN P.",
				TVName: "MEYLAHN Paul",
				TVInitialName: "MEYLAHN P.",
				Gender: "M",
				Organisation: "GER",
				BirthDate: "19910215",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "GER",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "GER",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "M",
						Event: "001",
						Bib: "104",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "46160",
				Parent: "46160",
				Status: "ACCRED",
				GivenName: "Anne",
				FamilyName: "HUEBNER",
				PrintName: "HUEBNER Anne",
				PrintInitialName: "HUEBNER A.",
				TVName: "HUEBNER Anne",
				TVInitialName: "HUEBNER A.",
				Gender: "W",
				Organisation: "GER",
				BirthDate: "19841223",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "GER",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "GER",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "W",
						Event: "002",
						Bib: "63",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "46206",
				Parent: "46206",
				Status: "ACCRED",
				GivenName: "Max",
				FamilyName: "RAYNER",
				PrintName: "RAYNER Max",
				PrintInitialName: "RAYNER M.",
				TVName: "RAYNER Max",
				TVInitialName: "RAYNER M.",
				Gender: "M",
				Organisation: "NZL",
				BirthDate: "19961016",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "NZL",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "NZL",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "M",
						Event: "001",
						Bib: "130",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "46208",
				Parent: "46208",
				Status: "ACCRED",
				GivenName: "Courtney",
				FamilyName: "KERIN",
				PrintName: "KERIN Courtney",
				PrintInitialName: "KERIN C.",
				TVName: "KERIN Courtney",
				TVInitialName: "KERIN C.",
				Gender: "W",
				Organisation: "NZL",
				BirthDate: "19931020",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "NZL",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "NZL",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "W",
						Event: "002",
						Bib: "86",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "46435",
				Parent: "46435",
				Status: "ACCRED",
				GivenName: "Marvin",
				FamilyName: "GAUGLITZ",
				PrintName: "GAUGLITZ Marvin",
				PrintInitialName: "GAUGLITZ M.",
				TVName: "GAUGLITZ Marvin",
				TVInitialName: "GAUGLITZ M.",
				Gender: "M",
				Organisation: "GER",
				BirthDate: "19940913",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "GER",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "GER",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "M",
						Event: "001",
						Bib: "51",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "46438",
				Parent: "46438",
				Status: "ACCRED",
				GivenName: "Robert",
				FamilyName: "BUECHMANN",
				PrintName: "BUECHMANN Robert",
				PrintInitialName: "BUECHMANN R.",
				TVName: "BUECHMANN Robert",
				TVInitialName: "BUECHMANN R.",
				Gender: "M",
				Organisation: "GER",
				BirthDate: "19920415",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "GER",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "GER",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "M",
						Event: "001",
						Bib: "13",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "46562",
				Parent: "46562",
				Status: "ACCRED",
				GivenName: "Kalem",
				FamilyName: "KENNEDY",
				PrintName: "KENNEDY Kalem",
				PrintInitialName: "KENNEDY K.",
				TVName: "KENNEDY Kalem",
				TVInitialName: "KENNEDY K.",
				Gender: "M",
				Organisation: "CAN",
				BirthDate: "19980106",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "CAN",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "CAN",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: [
						{
							Gender: "M",
							Event: "001",
							Bib: "85",
							EventEntry: {
								Code: "E_POSITION",
								Pos: "1",
								Value: "1",
								Type: "E_ENTRY"
							}
						},
						{
							Gender: "M",
							Event: "007",
							Bib: "85",
							EventEntry: {
								Code: "E_POSITION",
								Pos: "1",
								Value: "1",
								Type: "E_ENTRY"
							}
						},
						{
							Gender: "M",
							Event: "009",
							Bib: "85",
							EventEntry: {
								Code: "E_POSITION",
								Pos: "1",
								Value: "1",
								Type: "E_ENTRY"
							}
						}
					]
				}
			},
			{
				Code: "46564",
				Parent: "46564",
				Status: "ACCRED",
				GivenName: "Sydney",
				FamilyName: "NIXON",
				PrintName: "NIXON Sydney",
				PrintInitialName: "NIXON S.",
				TVName: "NIXON Sydney",
				TVInitialName: "NIXON S.",
				Gender: "W",
				Organisation: "CAN",
				BirthDate: "19970923",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "CAN",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "CAN",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: [
						{
							Gender: "W",
							Event: "002",
							Bib: "116",
							EventEntry: {
								Code: "E_POSITION",
								Pos: "1",
								Value: "1",
								Type: "E_ENTRY"
							}
						},
						{
							Gender: "W",
							Event: "008",
							Bib: "116",
							EventEntry: {
								Code: "E_POSITION",
								Pos: "1",
								Value: "1",
								Type: "E_ENTRY"
							}
						}
					]
				}
			},
			{
				Code: "46568",
				Parent: "46568",
				Status: "ACCRED",
				GivenName: "Cheryl",
				FamilyName: "MCGREGOR",
				PrintName: "MCGREGOR Cheryl",
				PrintInitialName: "MCGREGOR C.",
				TVName: "MCGREGOR Cheryl",
				TVInitialName: "MCGREGOR C.",
				Gender: "W",
				Organisation: "CAN",
				BirthDate: "19860122",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "CAN",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "CAN",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "W",
						Event: "002",
						Bib: "103",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "46571",
				Parent: "46571",
				Status: "ACCRED",
				GivenName: "Joel",
				FamilyName: "KOWALSKI",
				PrintName: "KOWALSKI Joel",
				PrintInitialName: "KOWALSKI J.",
				TVName: "KOWALSKI Joel",
				TVInitialName: "KOWALSKI J.",
				Gender: "M",
				Organisation: "CAN",
				BirthDate: "19880707",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "CAN",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "CAN",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "M",
						Event: "001",
						Bib: "89",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "46580",
				Parent: "46580",
				Status: "ACCRED",
				GivenName: "Mark",
				FamilyName: "RICHARD",
				PrintName: "RICHARD Mark",
				PrintInitialName: "RICHARD M.",
				TVName: "RICHARD Mark",
				TVInitialName: "RICHARD M.",
				Gender: "M",
				Organisation: "CAN",
				BirthDate: "19651123",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "CAN",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "CAN",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "M",
						Event: "007",
						Bib: "",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "46586",
				Parent: "46586",
				Status: "ACCRED",
				GivenName: "Nicholas",
				FamilyName: "TROUTMAN",
				PrintName: "TROUTMAN Nicholas",
				PrintInitialName: "TROUTMAN N.",
				TVName: "TROUTMAN Nicholas",
				TVInitialName: "TROUTMAN N.",
				Gender: "M",
				Organisation: "CAN",
				BirthDate: "19881020",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "CAN",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "CAN",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "M",
						Event: "001",
						Bib: "155",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "46839",
				Parent: "46839",
				Status: "ACCRED",
				GivenName: "Marcel",
				FamilyName: "BLODER",
				PrintName: "BLODER Marcel",
				PrintInitialName: "BLODER M.",
				TVName: "BLODER Marcel",
				TVInitialName: "BLODER M.",
				Gender: "M",
				Organisation: "AUT",
				BirthDate: "19900901",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "AUT",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "AUT",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "M",
						Event: "001",
						Bib: "10",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "46992",
				Parent: "46992",
				Status: "ACCRED",
				GivenName: "Facundo",
				FamilyName: "MORENO",
				PrintName: "MORENO Facundo",
				PrintInitialName: "MORENO F.",
				TVName: "MORENO Facundo",
				TVInitialName: "MORENO F.",
				Gender: "M",
				Organisation: "ARG",
				BirthDate: "19871209",
				Height: "186",
				Weight: "85",
				PlaceofBirth: "",
				CountryofBirth: "ARG",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "ARG",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "M",
						Event: "001",
						Bib: "107",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "47043",
				Parent: "47043",
				Status: "ACCRED",
				GivenName: "David",
				FamilyName: "MCCLURE",
				PrintName: "MCCLURE David",
				PrintInitialName: "MCCLURE D.",
				TVName: "MCCLURE David",
				TVInitialName: "MCCLURE D.",
				Gender: "M",
				Organisation: "IRL",
				BirthDate: "19950530",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "IRL",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "IRL",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "M",
						Event: "001",
						Bib: "101",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "47077",
				Parent: "47077",
				Status: "ACCRED",
				GivenName: "Thomas",
				FamilyName: "DUNPHY",
				PrintName: "DUNPHY Thomas",
				PrintInitialName: "DUNPHY T.",
				TVName: "DUNPHY Thomas",
				TVInitialName: "DUNPHY T.",
				Gender: "M",
				Organisation: "IRL",
				BirthDate: "19850215",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "IRL",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "IRL",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "M",
						Event: "001",
						Bib: "39",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "47092",
				Parent: "47092",
				Status: "ACCRED",
				GivenName: "Ander",
				FamilyName: "DE MIGUEL ARANAZ",
				PrintName: "DE MIGUEL ARANAZ Ander",
				PrintInitialName: "DE MIGUEL ARANAZ A.",
				TVName: "DE MIGUEL ARANAZ Ander",
				TVInitialName: "DE MIGUEL ARANAZ A.",
				Gender: "M",
				Organisation: "ESP",
				BirthDate: "19950816",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "ESP",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "ESP",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "M",
						Event: "001",
						Bib: "29",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "47094",
				Parent: "47094",
				Status: "ACCRED",
				GivenName: "Joaquim",
				FamilyName: "FONTANE I MASO",
				PrintName: "FONTANE I MASO Joaquim",
				PrintInitialName: "FONTANE I MASO J.",
				TVName: "FONTANE I MASO Joaquim",
				TVInitialName: "FONTANE I MASO J.",
				Gender: "M",
				Organisation: "ESP",
				BirthDate: "19930730",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "ESP",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "ESP",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "M",
						Event: "001",
						Bib: "47",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "47095",
				Parent: "47095",
				Status: "ACCRED",
				GivenName: "Nuria",
				FamilyName: "FONTANE I MASO",
				PrintName: "FONTANE I MASO Nuria",
				PrintInitialName: "FONTANE I MASO N.",
				TVName: "FONTANE I MASO Nuria",
				TVInitialName: "FONTANE I MASO N.",
				Gender: "W",
				Organisation: "ESP",
				BirthDate: "19960621",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "ESP",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "ESP",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: [
						{
							Gender: "W",
							Event: "002",
							Bib: "48",
							EventEntry: {
								Code: "E_POSITION",
								Pos: "1",
								Value: "1",
								Type: "E_ENTRY"
							}
						},
						{
							Gender: "W",
							Event: "008",
							Bib: "48",
							EventEntry: {
								Code: "E_POSITION",
								Pos: "1",
								Value: "1",
								Type: "E_ENTRY"
							}
						}
					]
				}
			},
			{
				Code: "47102",
				Parent: "47102",
				Status: "ACCRED",
				GivenName: "Paula",
				FamilyName: "VARONEN",
				PrintName: "VARONEN Paula",
				PrintInitialName: "VARONEN P.",
				TVName: "VARONEN Paula",
				TVInitialName: "VARONEN P.",
				Gender: "W",
				Organisation: "FIN",
				BirthDate: "19760831",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "FIN",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "FIN",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "W",
						Event: "002",
						Bib: "159",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "47105",
				Parent: "47105",
				Status: "ACCRED",
				GivenName: "Visa",
				FamilyName: "RAHKOLA",
				PrintName: "RAHKOLA Visa",
				PrintInitialName: "RAHKOLA V.",
				TVName: "RAHKOLA Visa",
				TVInitialName: "RAHKOLA V.",
				Gender: "M",
				Organisation: "FIN",
				BirthDate: "19960718",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "FIN",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "FIN",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "M",
						Event: "001",
						Bib: "129",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "47134",
				Parent: "47134",
				Status: "ACCRED",
				GivenName: "Eric",
				FamilyName: "JACKSON",
				PrintName: "JACKSON Eric",
				PrintInitialName: "JACKSON E.",
				TVName: "JACKSON Eric",
				TVInitialName: "JACKSON E.",
				Gender: "M",
				Organisation: "USA",
				BirthDate: "19640303",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "USA",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "USA",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: [
						{
							Gender: "M",
							Event: "001",
							Bib: "72",
							EventEntry: {
								Code: "E_POSITION",
								Pos: "1",
								Value: "1",
								Type: "E_ENTRY"
							}
						},
						{
							Gender: "M",
							Event: "007",
							Bib: "72",
							EventEntry: {
								Code: "E_POSITION",
								Pos: "1",
								Value: "1",
								Type: "E_ENTRY"
							}
						}
					]
				}
			},
			{
				Code: "47135",
				Parent: "47135",
				Status: "ACCRED",
				GivenName: "Clay",
				FamilyName: "WRIGHT",
				PrintName: "WRIGHT Clay",
				PrintInitialName: "WRIGHT C.",
				TVName: "WRIGHT Clay",
				TVInitialName: "WRIGHT C.",
				Gender: "M",
				Organisation: "USA",
				BirthDate: "19670317",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "USA",
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
						Event: "007",
						Bib: "167",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "47136",
				Parent: "47136",
				Status: "ACCRED",
				GivenName: "Dane",
				FamilyName: "JACKSON",
				PrintName: "JACKSON Dane",
				PrintInitialName: "JACKSON D.",
				TVName: "JACKSON Dane",
				TVInitialName: "JACKSON D.",
				Gender: "M",
				Organisation: "USA",
				BirthDate: "19930719",
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
					RegisteredEvent: [
						{
							Gender: "M",
							Event: "001",
							Bib: "71",
							EventEntry: {
								Code: "E_POSITION",
								Pos: "1",
								Value: "1",
								Type: "E_ENTRY"
							}
						},
						{
							Gender: "M",
							Event: "009",
							Bib: "71",
							EventEntry: {
								Code: "E_POSITION",
								Pos: "1",
								Value: "1",
								Type: "E_ENTRY"
							}
						}
					]
				}
			},
			{
				Code: "47140",
				Parent: "47140",
				Status: "ACCRED",
				GivenName: "Bennett",
				FamilyName: "SMITH",
				PrintName: "SMITH Bennett",
				PrintInitialName: "SMITH B.",
				TVName: "SMITH Bennett",
				TVInitialName: "SMITH B.",
				Gender: "M",
				Organisation: "USA",
				BirthDate: "19961110",
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
						Event: "001",
						Bib: "145",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "47141",
				Parent: "47141",
				Status: "ACCRED",
				GivenName: "Hunter",
				FamilyName: "KATICH",
				PrintName: "KATICH Hunter",
				PrintInitialName: "KATICH H.",
				TVName: "KATICH Hunter",
				TVInitialName: "KATICH H.",
				Gender: "M",
				Organisation: "USA",
				BirthDate: "19960809",
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
						Event: "001",
						Bib: "77",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "47143",
				Parent: "47143",
				Status: "ACCRED",
				GivenName: "Rowan",
				FamilyName: "STUART",
				PrintName: "STUART Rowan",
				PrintInitialName: "STUART R.",
				TVName: "STUART Rowan",
				TVInitialName: "STUART R.",
				Gender: "W",
				Organisation: "USA",
				BirthDate: "19960611",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "USA",
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
						Bib: "150",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "47144",
				Parent: "47144",
				Status: "ACCRED",
				GivenName: "Kadrian",
				FamilyName: "KELLOGG",
				PrintName: "KELLOGG Kadrian",
				PrintInitialName: "KELLOGG K.",
				TVName: "KELLOGG Kadrian",
				TVInitialName: "KELLOGG K.",
				Gender: "W",
				Organisation: "USA",
				BirthDate: "19981014",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "USA",
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
						Bib: "83",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "47146",
				Parent: "47146",
				Status: "ACCRED",
				GivenName: "Seth",
				FamilyName: "CHAPELLE",
				PrintName: "CHAPELLE Seth",
				PrintInitialName: "CHAPELLE S.",
				TVName: "CHAPELLE Seth",
				TVInitialName: "CHAPELLE S.",
				Gender: "M",
				Organisation: "USA",
				BirthDate: "19880720",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "USA",
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
						Bib: "19",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "53172",
				Parent: "53172",
				Status: "ACCRED",
				GivenName: "Maximiliano",
				FamilyName: "MONTOYA",
				PrintName: "MONTOYA Maximiliano",
				PrintInitialName: "MONTOYA M.",
				TVName: "MONTOYA Maximiliano",
				TVInitialName: "MONTOYA M.",
				Gender: "M",
				Organisation: "ARG",
				BirthDate: "19920822",
				Height: "174",
				Weight: "73",
				PlaceofBirth: "",
				CountryofBirth: "ARG",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "ARG",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "M",
						Event: "001",
						Bib: "105",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "53239",
				Parent: "53239",
				Status: "ACCRED",
				GivenName: "Fabien",
				FamilyName: "LANAO",
				PrintName: "LANAO Fabien",
				PrintInitialName: "LANAO F.",
				TVName: "LANAO Fabien",
				TVInitialName: "LANAO F.",
				Gender: "M",
				Organisation: "FRA",
				BirthDate: "19971130",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "FRA",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "FRA",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "M",
						Event: "001",
						Bib: "92",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "53297",
				Parent: "53297",
				Status: "ACCRED",
				GivenName: "Nicky",
				FamilyName: "BEEBY",
				PrintName: "BEEBY Nicky",
				PrintInitialName: "BEEBY N.",
				TVName: "BEEBY Nicky",
				TVInitialName: "BEEBY N.",
				Gender: "W",
				Organisation: "GBR",
				BirthDate: "19830419",
				Height: "168",
				Weight: "69",
				PlaceofBirth: "",
				CountryofBirth: "GBR",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "GBR",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "W",
						Event: "002",
						Bib: "8",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "53302",
				Parent: "53302",
				Status: "ACCRED",
				GivenName: "Charlie",
				FamilyName: "BRACKPOOL",
				PrintName: "BRACKPOOL Charlie",
				PrintInitialName: "BRACKPOOL C.",
				TVName: "BRACKPOOL Charlie",
				TVInitialName: "BRACKPOOL C.",
				Gender: "M",
				Organisation: "GBR",
				BirthDate: "19970614",
				Height: "179",
				Weight: "71",
				PlaceofBirth: "",
				CountryofBirth: "GBR",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "GBR",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "M",
						Event: "001",
						Bib: "11",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "53699",
				Parent: "53699",
				Status: "ACCRED",
				GivenName: "Adria",
				FamilyName: "OVANDO VILA",
				PrintName: "OVANDO VILA Adria",
				PrintInitialName: "OVANDO VILA A.",
				TVName: "OVANDO VILA Adria",
				TVInitialName: "OVANDO VILA A.",
				Gender: "M",
				Organisation: "ESP",
				BirthDate: "19991113",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "ESP",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "ESP",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "M",
						Event: "003",
						Bib: "120",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "54837",
				Parent: "54837",
				Status: "ACCRED",
				GivenName: "Jose Javier",
				FamilyName: "MUGNOS",
				PrintName: "MUGNOS Jose Javier",
				PrintInitialName: "MUGNOS J.",
				TVName: "MUGNOS Jose Javier",
				TVInitialName: "MUGNOS J.",
				Gender: "M",
				Organisation: "ARG",
				BirthDate: "19891021",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "ARG",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "ARG",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "M",
						Event: "001",
						Bib: "109",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "56406",
				Parent: "56406",
				Status: "ACCRED",
				GivenName: "Michal",
				FamilyName: "SOBIERAJ JAKUBIEC",
				PrintName: "SOBIERAJ JAKUBIEC Michal",
				PrintInitialName: "SOBIERAJ JAKUBIEC M.",
				TVName: "SOBIERAJ JAKUBIEC Michal",
				TVInitialName: "SOBIERAJ JAKUBIEC M.",
				Gender: "M",
				Organisation: "POL",
				BirthDate: "19991022",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "POL",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "POL",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "M",
						Event: "003",
						Bib: "146",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "56539",
				Parent: "56539",
				Status: "ACCRED",
				GivenName: "Fabian",
				FamilyName: "LENZ",
				PrintName: "LENZ Fabian",
				PrintInitialName: "LENZ F.",
				TVName: "LENZ Fabian",
				TVInitialName: "LENZ F.",
				Gender: "M",
				Organisation: "GER",
				BirthDate: "19990112",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "GER",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "GER",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "M",
						Event: "003",
						Bib: "95",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "57079",
				Parent: "57079",
				Status: "ACCRED",
				GivenName: "Jenni",
				FamilyName: "VANSKA",
				PrintName: "VANSKA Jenni",
				PrintInitialName: "VANSKA J.",
				TVName: "VANSKA Jenni",
				TVInitialName: "VANSKA J.",
				Gender: "W",
				Organisation: "FIN",
				BirthDate: "19920321",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "FIN",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "FIN",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "W",
						Event: "002",
						Bib: "158",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "57692",
				Parent: "57692",
				Status: "ACCRED",
				GivenName: "Gavin",
				FamilyName: "BARKER",
				PrintName: "BARKER Gavin",
				PrintInitialName: "BARKER G.",
				TVName: "BARKER Gavin",
				TVInitialName: "BARKER G.",
				Gender: "M",
				Organisation: "GBR",
				BirthDate: "19810730",
				Height: "174",
				Weight: "68",
				PlaceofBirth: "",
				CountryofBirth: "GBR",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "GBR",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "M",
						Event: "001",
						Bib: "4",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "60119",
				Parent: "60119",
				Status: "ACCRED",
				GivenName: "Sage",
				FamilyName: "DONNELLY",
				PrintName: "DONNELLY Sage",
				PrintInitialName: "DONNELLY S.",
				TVName: "DONNELLY Sage",
				TVInitialName: "DONNELLY S.",
				Gender: "W",
				Organisation: "USA",
				BirthDate: "20000722",
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
						Gender: "W",
						Event: "004",
						Bib: "35",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "60511",
				Parent: "60511",
				Status: "ACCRED",
				GivenName: "Maritza Paz",
				FamilyName: "GAJARDO",
				PrintName: "GAJARDO Maritza Paz",
				PrintInitialName: "GAJARDO M.",
				TVName: "GAJARDO Maritza Paz",
				TVInitialName: "GAJARDO M.",
				Gender: "W",
				Organisation: "CHI",
				BirthDate: "19920604",
				Height: "167",
				Weight: "65",
				PlaceofBirth: "",
				CountryofBirth: "CHI",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "CHI",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "W",
						Event: "002",
						Bib: "50",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "60666",
				Parent: "60666",
				Status: "ACCRED",
				GivenName: "Ana",
				FamilyName: "CASTRO",
				PrintName: "CASTRO Ana",
				PrintInitialName: "CASTRO A.",
				TVName: "CASTRO Ana",
				TVInitialName: "CASTRO A.",
				Gender: "W",
				Organisation: "PAR",
				BirthDate: "19970303",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "PAR",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "PAR",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "W",
						Event: "002",
						Bib: "43",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "61659",
				Parent: "61659",
				Status: "ACCRED",
				GivenName: "Dee",
				FamilyName: "PATERSON",
				PrintName: "PATERSON Dee",
				PrintInitialName: "PATERSON D.",
				TVName: "PATERSON Dee",
				TVInitialName: "PATERSON D.",
				Gender: "W",
				Organisation: "GBR",
				BirthDate: "19751228",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "GBR",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "GBR",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "W",
						Event: "008",
						Bib: "123",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "63182",
				Parent: "63182",
				Status: "ACCRED",
				GivenName: "Devyn",
				FamilyName: "SCOTT",
				PrintName: "SCOTT Devyn",
				PrintInitialName: "SCOTT D.",
				TVName: "SCOTT Devyn",
				TVInitialName: "SCOTT D.",
				Gender: "M",
				Organisation: "CAN",
				BirthDate: "19910724",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "CAN",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "CAN",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "M",
						Event: "001",
						Bib: "143",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "63186",
				Parent: "63186",
				Status: "ACCRED",
				GivenName: "Alex",
				FamilyName: "MAGGS",
				PrintName: "MAGGS Alex",
				PrintInitialName: "MAGGS A.",
				TVName: "MAGGS Alex",
				TVInitialName: "MAGGS A.",
				Gender: "W",
				Organisation: "CAN",
				BirthDate: "19940515",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "CAN",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "CAN",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "W",
						Event: "002",
						Bib: "98",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "63187",
				Parent: "63187",
				Status: "ACCRED",
				GivenName: "Katie",
				FamilyName: "KOWALSKI",
				PrintName: "KOWALSKI Katie",
				PrintInitialName: "KOWALSKI K.",
				TVName: "KOWALSKI Katie",
				TVInitialName: "KOWALSKI K.",
				Gender: "W",
				Organisation: "CAN",
				BirthDate: "19910415",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "CAN",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "CAN",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "W",
						Event: "002",
						Bib: "88",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "63466",
				Parent: "63466",
				Status: "ACCRED",
				GivenName: "Geromine",
				FamilyName: "HERVO",
				PrintName: "HERVO Geromine",
				PrintInitialName: "HERVO G.",
				TVName: "HERVO Geromine",
				TVInitialName: "HERVO G.",
				Gender: "W",
				Organisation: "FRA",
				BirthDate: "19940308",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "FRA",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "FRA",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "W",
						Event: "002",
						Bib: "59",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "63821",
				Parent: "63821",
				Status: "ACCRED",
				GivenName: "Lowri",
				FamilyName: "DAVIES",
				PrintName: "DAVIES Lowri",
				PrintInitialName: "DAVIES L.",
				TVName: "DAVIES Lowri",
				TVInitialName: "DAVIES L.",
				Gender: "W",
				Organisation: "GBR",
				BirthDate: "19841031",
				Height: "168",
				Weight: "68",
				PlaceofBirth: "",
				CountryofBirth: "GBR",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "GBR",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "W",
						Event: "002",
						Bib: "27",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "63825",
				Parent: "63825",
				Status: "ACCRED",
				GivenName: "Heidi",
				FamilyName: "WALSH",
				PrintName: "WALSH Heidi",
				PrintInitialName: "WALSH H.",
				TVName: "WALSH Heidi",
				TVInitialName: "WALSH H.",
				Gender: "W",
				Organisation: "GBR",
				BirthDate: "19971205",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "GBR",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "GBR",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "W",
						Event: "002",
						Bib: "162",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "63827",
				Parent: "63827",
				Status: "ACCRED",
				GivenName: "James",
				FamilyName: "IBBOTSON",
				PrintName: "IBBOTSON James",
				PrintInitialName: "IBBOTSON J.",
				TVName: "IBBOTSON James",
				TVInitialName: "IBBOTSON J.",
				Gender: "M",
				Organisation: "GBR",
				BirthDate: "19931012",
				Height: "175",
				Weight: "98",
				PlaceofBirth: "",
				CountryofBirth: "GBR",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "GBR",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "M",
						Event: "009",
						Bib: "65",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "64194",
				Parent: "64194",
				Status: "ACCRED",
				GivenName: "Max",
				FamilyName: "MUNCHOW",
				PrintName: "MUNCHOW Max",
				PrintInitialName: "MUNCHOW M.",
				TVName: "MUNCHOW Max",
				TVInitialName: "MUNCHOW M.",
				Gender: "M",
				Organisation: "GER",
				BirthDate: "19890227",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "GER",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "GER",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "M",
						Event: "001",
						Bib: "110",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "64933",
				Parent: "64933",
				Status: "ACCRED",
				GivenName: "Kira",
				FamilyName: "CARRETO TEJEDO",
				PrintName: "CARRETO TEJEDO Kira",
				PrintInitialName: "CARRETO TEJEDO K.",
				TVName: "CARRETO TEJEDO Kira",
				TVInitialName: "CARRETO TEJEDO K.",
				Gender: "W",
				Organisation: "ESP",
				BirthDate: "20001221",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "ESP",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "ESP",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "W",
						Event: "004",
						Bib: "16",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "64988",
				Parent: "64988",
				Status: "ACCRED",
				GivenName: "Liam",
				FamilyName: "DOWD",
				PrintName: "DOWD Liam",
				PrintInitialName: "DOWD L.",
				TVName: "DOWD Liam",
				TVInitialName: "DOWD L.",
				Gender: "M",
				Organisation: "AUS",
				BirthDate: "20000506",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "AUS",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "AUS",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "M",
						Event: "003",
						Bib: "37",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "64989",
				Parent: "64989",
				Status: "ACCRED",
				GivenName: "Sue",
				FamilyName: "ROBB",
				PrintName: "ROBB Sue",
				PrintInitialName: "ROBB S.",
				TVName: "ROBB Sue",
				TVInitialName: "ROBB S.",
				Gender: "W",
				Organisation: "AUS",
				BirthDate: "19621007",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "AUS",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "AUS",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: [
						{
							Gender: "W",
							Event: "002",
							Bib: "136",
							EventEntry: {
								Code: "E_POSITION",
								Pos: "1",
								Value: "1",
								Type: "E_ENTRY"
							}
						},
						{
							Gender: "W",
							Event: "008",
							Bib: "136",
							EventEntry: {
								Code: "E_POSITION",
								Pos: "1",
								Value: "1",
								Type: "E_ENTRY"
							}
						}
					]
				}
			},
			{
				Code: "65016",
				Parent: "65016",
				Status: "ACCRED",
				GivenName: "Yasushi",
				FamilyName: "KAMOSHITA",
				PrintName: "KAMOSHITA Yasushi",
				PrintInitialName: "KAMOSHITA Y.",
				TVName: "KAMOSHITA Yasushi",
				TVInitialName: "KAMOSHITA Y.",
				Gender: "M",
				Organisation: "JPN",
				BirthDate: "19741107",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "JPN",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "JPN",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "M",
						Event: "007",
						Bib: "76",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "65017",
				Parent: "65017",
				Status: "ACCRED",
				GivenName: "Tatsunori",
				FamilyName: "YANAGIMOTO",
				PrintName: "YANAGIMOTO Tatsunori",
				PrintInitialName: "YANAGIMOTO T.",
				TVName: "YANAGIMOTO Tatsunori",
				TVInitialName: "YANAGIMOTO T.",
				Gender: "M",
				Organisation: "JPN",
				BirthDate: "19761005",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "JPN",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "JPN",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "M",
						Event: "001",
						Bib: "170",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "65020",
				Parent: "65020",
				Status: "ACCRED",
				GivenName: "Subaru",
				FamilyName: "FUKUSHI",
				PrintName: "FUKUSHI Subaru",
				PrintInitialName: "FUKUSHI S.",
				TVName: "FUKUSHI Subaru",
				TVInitialName: "FUKUSHI S.",
				Gender: "M",
				Organisation: "JPN",
				BirthDate: "19920224",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "JPN",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "JPN",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "M",
						Event: "009",
						Bib: "49",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "65379",
				Parent: "65379",
				Status: "ACCRED",
				GivenName: "Anna",
				FamilyName: "BRUNO",
				PrintName: "BRUNO Anna",
				PrintInitialName: "BRUNO A.",
				TVName: "BRUNO Anna",
				TVInitialName: "BRUNO A.",
				Gender: "W",
				Organisation: "USA",
				BirthDate: "19850817",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "USA",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "USA",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: [
						{
							Gender: "W",
							Event: "002",
							Bib: "12",
							EventEntry: {
								Code: "E_POSITION",
								Pos: "1",
								Value: "1",
								Type: "E_ENTRY"
							}
						},
						{
							Gender: "W",
							Event: "008",
							Bib: "12",
							EventEntry: {
								Code: "E_POSITION",
								Pos: "1",
								Value: "1",
								Type: "E_ENTRY"
							}
						}
					]
				}
			},
			{
				Code: "65380",
				Parent: "65380",
				Status: "ACCRED",
				GivenName: "Hayden",
				FamilyName: "VOORHEES",
				PrintName: "VOORHEES Hayden",
				PrintInitialName: "VOORHEES H.",
				TVName: "VOORHEES Hayden",
				TVInitialName: "VOORHEES H.",
				Gender: "M",
				Organisation: "USA",
				BirthDate: "19991104",
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
						Event: "003",
						Bib: "160",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "65386",
				Parent: "65386",
				Status: "ACCRED",
				GivenName: "Jessie",
				FamilyName: "STONE",
				PrintName: "STONE Jessie",
				PrintInitialName: "STONE J.",
				TVName: "STONE Jessie",
				TVInitialName: "STONE J.",
				Gender: "W",
				Organisation: "USA",
				BirthDate: "19671112",
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
						Gender: "W",
						Event: "002",
						Bib: "149",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "65387",
				Parent: "65387",
				Status: "ACCRED",
				GivenName: "Stephen",
				FamilyName: "WRIGHT",
				PrintName: "WRIGHT Stephen",
				PrintInitialName: "WRIGHT S.",
				TVName: "WRIGHT Stephen",
				TVInitialName: "WRIGHT S.",
				Gender: "M",
				Organisation: "USA",
				BirthDate: "19780312",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "USA",
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
						Event: "001",
						Bib: "168",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "66410",
				Parent: "66410",
				Status: "ACCRED",
				GivenName: "Sam",
				FamilyName: "WARD",
				PrintName: "WARD Sam",
				PrintInitialName: "WARD S.",
				TVName: "WARD Sam",
				TVInitialName: "WARD S.",
				Gender: "M",
				Organisation: "UGA",
				BirthDate: "19830713",
				Height: "182",
				Weight: "72",
				PlaceofBirth: "",
				CountryofBirth: "GBR",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "UGA",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "M",
						Event: "001",
						Bib: "164",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "69014",
				Parent: "69014",
				Status: "ACCRED",
				GivenName: "Otis",
				FamilyName: "RAYNER",
				PrintName: "RAYNER Otis",
				PrintInitialName: "RAYNER O.",
				TVName: "RAYNER Otis",
				TVInitialName: "RAYNER O.",
				Gender: "M",
				Organisation: "NZL",
				BirthDate: "19990119",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "NZL",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "NZL",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "M",
						Event: "003",
						Bib: "131",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "69049",
				Parent: "69049",
				Status: "ACCRED",
				GivenName: "Agata",
				FamilyName: "SOBIERAJ JAKUBIEC",
				PrintName: "SOBIERAJ JAKUBIEC Agata",
				PrintInitialName: "SOBIERAJ JAKUBIEC A.",
				TVName: "SOBIERAJ JAKUBIEC Agata",
				TVInitialName: "SOBIERAJ JAKUBIEC A.",
				Gender: "W",
				Organisation: "POL",
				BirthDate: "19980716",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "POL",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "POL",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "W",
						Event: "002",
						Bib: "147",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "69051",
				Parent: "69051",
				Status: "ACCRED",
				GivenName: "Tom",
				FamilyName: "DOLLE",
				PrintName: "DOLLE Tom",
				PrintInitialName: "DOLLE T.",
				TVName: "DOLLE Tom",
				TVInitialName: "DOLLE T.",
				Gender: "M",
				Organisation: "FRA",
				BirthDate: "20001102",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "FRA",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "FRA",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "M",
						Event: "003",
						Bib: "34",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "69053",
				Parent: "69053",
				Status: "ACCRED",
				GivenName: "Valentin",
				FamilyName: "PARASME",
				PrintName: "PARASME Valentin",
				PrintInitialName: "PARASME V.",
				TVName: "PARASME Valentin",
				TVInitialName: "PARASME V.",
				Gender: "M",
				Organisation: "FRA",
				BirthDate: "20001011",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "FRA",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "FRA",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "M",
						Event: "003",
						Bib: "122",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "69054",
				Parent: "69054",
				Status: "ACCRED",
				GivenName: "Marie",
				FamilyName: "HELYE",
				PrintName: "HELYE Marie",
				PrintInitialName: "HELYE M.",
				TVName: "HELYE Marie",
				TVInitialName: "HELYE M.",
				Gender: "W",
				Organisation: "FRA",
				BirthDate: "19901027",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "FRA",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "FRA",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: [
						{
							Gender: "W",
							Event: "002",
							Bib: "58",
							EventEntry: {
								Code: "E_POSITION",
								Pos: "1",
								Value: "1",
								Type: "E_ENTRY"
							}
						}
					]
				}
			},
			{
				Code: "69055",
				Parent: "69055",
				Status: "ACCRED",
				GivenName: "Jean-Yves",
				FamilyName: "MOUSTROU",
				PrintName: "MOUSTROU Jean-Yves",
				PrintInitialName: "MOUSTROU J.",
				TVName: "MOUSTROU Jean-Yves",
				TVInitialName: "MOUSTROU J.",
				Gender: "M",
				Organisation: "FRA",
				BirthDate: "19920827",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "FRA",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "FRA",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: [
						{
							Gender: "M",
							Event: "009",
							Bib: "108",
							EventEntry: {
								Code: "E_POSITION",
								Pos: "1",
								Value: "1",
								Type: "E_ENTRY"
							}
						}
					]
				}
			},
			{
				Code: "69066",
				Parent: "69066",
				Status: "ACCRED",
				GivenName: "Ottilie",
				FamilyName: "ROBINSON-SHAW",
				PrintName: "ROBINSON-SHAW Ottilie",
				PrintInitialName: "ROBINSON-SHAW O.",
				TVName: "ROBINSON-SHAW Ottilie",
				TVInitialName: "ROBINSON-SHAW O.",
				Gender: "W",
				Organisation: "GBR",
				BirthDate: "20011029",
				Height: "164",
				Weight: "52",
				PlaceofBirth: "",
				CountryofBirth: "GBR",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "GBR",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: [
						{
							Gender: "W",
							Event: "004",
							Bib: "137",
							EventEntry: {
								Code: "E_POSITION",
								Pos: "1",
								Value: "1",
								Type: "E_ENTRY"
							}
						},
						{
							Gender: "W",
							Event: "008",
							Bib: "137",
							EventEntry: {
								Code: "E_POSITION",
								Pos: "1",
								Value: "1",
								Type: "E_ENTRY"
							}
						}
					]
				}
			},
			{
				Code: "69069",
				Parent: "69069",
				Status: "ACCRED",
				GivenName: "Matthew",
				FamilyName: "STEPHENSON",
				PrintName: "STEPHENSON Matthew",
				PrintInitialName: "STEPHENSON M.",
				TVName: "STEPHENSON Matthew",
				TVInitialName: "STEPHENSON M.",
				Gender: "M",
				Organisation: "GBR",
				BirthDate: "20000831",
				Height: "178",
				Weight: "57",
				PlaceofBirth: "",
				CountryofBirth: "GBR",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "GBR",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "M",
						Event: "003",
						Bib: "148",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "69070",
				Parent: "69070",
				Status: "ACCRED",
				GivenName: "Alex",
				FamilyName: "WALTERS",
				PrintName: "WALTERS Alex",
				PrintInitialName: "WALTERS A.",
				TVName: "WALTERS Alex",
				TVInitialName: "WALTERS A.",
				Gender: "M",
				Organisation: "GBR",
				BirthDate: "20001208",
				Height: "175",
				Weight: "60",
				PlaceofBirth: "",
				CountryofBirth: "GBR",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "GBR",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "M",
						Event: "003",
						Bib: "163",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "69102",
				Parent: "69102",
				Status: "ACCRED",
				GivenName: "Martin",
				FamilyName: "KOLL",
				PrintName: "KOLL Martin",
				PrintInitialName: "KOLL M.",
				TVName: "KOLL Martin",
				TVInitialName: "KOLL M.",
				Gender: "M",
				Organisation: "GER",
				BirthDate: "19860915",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "GER",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "GER",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "M",
						Event: "001",
						Bib: "87",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "69124",
				Parent: "69124",
				Status: "ACCRED",
				GivenName: "Tom",
				FamilyName: "LAY",
				PrintName: "LAY Tom",
				PrintInitialName: "LAY T.",
				TVName: "LAY Tom",
				TVInitialName: "LAY T.",
				Gender: "M",
				Organisation: "FRA",
				BirthDate: "19930122",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "FRA",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "FRA",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "M",
						Event: "009",
						Bib: "94",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "74589",
				Parent: "74589",
				Status: "ACCRED",
				GivenName: "German Federico",
				FamilyName: "BACCANI",
				PrintName: "BACCANI German Federico",
				PrintInitialName: "BACCANI G.",
				TVName: "BACCANI German Federico",
				TVInitialName: "BACCANI G.",
				Gender: "M",
				Organisation: "ARG",
				BirthDate: "19920626",
				Height: "180",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "ARG",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "ARG",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "M",
						Event: "001",
						Bib: "3",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "74613",
				Parent: "74613",
				Status: "ACCRED",
				GivenName: "Ignacio",
				FamilyName: "INGLESE",
				PrintName: "INGLESE Ignacio",
				PrintInitialName: "INGLESE I.",
				TVName: "INGLESE Ignacio",
				TVInitialName: "INGLESE I.",
				Gender: "M",
				Organisation: "ARG",
				BirthDate: "20000812",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "ARG",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "ARG",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "M",
						Event: "003",
						Bib: "66",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "74917",
				Parent: "74917",
				Status: "ACCRED",
				GivenName: "Valentin",
				FamilyName: "BETANCOURT",
				PrintName: "BETANCOURT Valentin",
				PrintInitialName: "BETANCOURT V.",
				TVName: "BETANCOURT Valentin",
				TVInitialName: "BETANCOURT V.",
				Gender: "M",
				Organisation: "ARG",
				BirthDate: "20011104",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "ARG",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "ARG",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "M",
						Event: "003",
						Bib: "9",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "74992",
				Parent: "74992",
				Status: "ACCRED",
				GivenName: "Miki",
				FamilyName: "SATO",
				PrintName: "SATO Miki",
				PrintInitialName: "SATO M.",
				TVName: "SATO Miki",
				TVInitialName: "SATO M.",
				Gender: "W",
				Organisation: "JPN",
				BirthDate: "19900213",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "JPN",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "JPN",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "W",
						Event: "002",
						Bib: "141",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "75065",
				Parent: "75065",
				Status: "ACCRED",
				GivenName: "Seima",
				FamilyName: "KAWADU",
				PrintName: "KAWADU Seima",
				PrintInitialName: "KAWADU S.",
				TVName: "KAWADU Seima",
				TVInitialName: "KAWADU S.",
				Gender: "M",
				Organisation: "JPN",
				BirthDate: "19841003",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "JPN",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "JPN",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "M",
						Event: "001",
						Bib: "80",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "75067",
				Parent: "75067",
				Status: "ACCRED",
				GivenName: "Ruka",
				FamilyName: "KURATO",
				PrintName: "KURATO Ruka",
				PrintInitialName: "KURATO R.",
				TVName: "KURATO Ruka",
				TVInitialName: "KURATO R.",
				Gender: "M",
				Organisation: "JPN",
				BirthDate: "19971113",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "JPN",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "JPN",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "M",
						Event: "001",
						Bib: "91",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "75142",
				Parent: "75142",
				Status: "ACCRED",
				GivenName: "Simon",
				FamilyName: "PITHOD",
				PrintName: "PITHOD Simon",
				PrintInitialName: "PITHOD S.",
				TVName: "PITHOD Simon",
				TVInitialName: "PITHOD S.",
				Gender: "M",
				Organisation: "ARG",
				BirthDate: "19980818",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "ARG",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "ARG",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "M",
						Event: "001",
						Bib: "126",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "75348",
				Parent: "75348",
				Status: "ACCRED",
				GivenName: "Marc",
				FamilyName: "GODBOUT",
				PrintName: "GODBOUT Marc",
				PrintInitialName: "GODBOUT M.",
				TVName: "GODBOUT Marc",
				TVInitialName: "GODBOUT M.",
				Gender: "M",
				Organisation: "CAN",
				BirthDate: "19960916",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "CAN",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "CAN",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "M",
						Event: "009",
						Bib: "52",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "75357",
				Parent: "75357",
				Status: "ACCRED",
				GivenName: "Marianna",
				FamilyName: "TORRES BRICENO",
				PrintName: "TORRES BRICENO Marianna",
				PrintInitialName: "TORRES BRICENO M.",
				TVName: "TORRES BRICENO Marianna",
				TVInitialName: "TORRES BRICENO M.",
				Gender: "W",
				Organisation: "VEN",
				BirthDate: "19980523",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "VEN",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "VEN",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "W",
						Event: "002",
						Bib: "154",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "80605",
				Parent: "80605",
				Status: "ACCRED",
				GivenName: "Constanza",
				FamilyName: "NOBIS",
				PrintName: "NOBIS Constanza",
				PrintInitialName: "NOBIS C.",
				TVName: "NOBIS Constanza",
				TVInitialName: "NOBIS C.",
				Gender: "W",
				Organisation: "CHI",
				BirthDate: "20011022",
				Height: "176",
				Weight: "66",
				PlaceofBirth: "",
				CountryofBirth: "CHI",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "CHI",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "W",
						Event: "004",
						Bib: "117",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "80637",
				Parent: "80637",
				Status: "ACCRED",
				GivenName: "Luisa",
				FamilyName: "HEINEN",
				PrintName: "HEINEN Luisa",
				PrintInitialName: "HEINEN L.",
				TVName: "HEINEN Luisa",
				TVInitialName: "HEINEN L.",
				Gender: "W",
				Organisation: "GER",
				BirthDate: "19920406",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "GER",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "GER",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "W",
						Event: "002",
						Bib: "56",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "80639",
				Parent: "80639",
				Status: "ACCRED",
				GivenName: "Stefanie",
				FamilyName: "SCHMOLLACK",
				PrintName: "SCHMOLLACK Stefanie",
				PrintInitialName: "SCHMOLLACK S.",
				TVName: "SCHMOLLACK Stefanie",
				TVInitialName: "SCHMOLLACK S.",
				Gender: "W",
				Organisation: "GER",
				BirthDate: "19841026",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "GER",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "GER",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "W",
						Event: "002",
						Bib: "142",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "80640",
				Parent: "80640",
				Status: "ACCRED",
				GivenName: "Eric",
				FamilyName: "LINSEL",
				PrintName: "LINSEL Eric",
				PrintInitialName: "LINSEL E.",
				TVName: "LINSEL Eric",
				TVInitialName: "LINSEL E.",
				Gender: "M",
				Organisation: "GER",
				BirthDate: "20001001",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "GER",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "GER",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "M",
						Event: "003",
						Bib: "97",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "80642",
				Parent: "80642",
				Status: "ACCRED",
				GivenName: "Patrick",
				FamilyName: "GODECKE",
				PrintName: "GODECKE Patrick",
				PrintInitialName: "GODECKE P.",
				TVName: "GODECKE Patrick",
				TVInitialName: "GODECKE P.",
				Gender: "M",
				Organisation: "GER",
				BirthDate: "19990419",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "GER",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "GER",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "M",
						Event: "003",
						Bib: "53",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "80643",
				Parent: "80643",
				Status: "ACCRED",
				GivenName: "Philip",
				FamilyName: "JOSEF",
				PrintName: "JOSEF Philip",
				PrintInitialName: "JOSEF P.",
				TVName: "JOSEF Philip",
				TVInitialName: "JOSEF P.",
				Gender: "M",
				Organisation: "GER",
				BirthDate: "20010829",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "GER",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "GER",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "M",
						Event: "009",
						Bib: "75",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "81990",
				Parent: "81990",
				Status: "ACCRED",
				GivenName: "Luke",
				FamilyName: "CALLAGHAN",
				PrintName: "CALLAGHAN Luke",
				PrintInitialName: "CALLAGHAN L.",
				TVName: "CALLAGHAN Luke",
				TVInitialName: "CALLAGHAN L.",
				Gender: "M",
				Organisation: "AUS",
				BirthDate: "19951026",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "AUS",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "AUS",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "M",
						Event: "001",
						Bib: "14",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "81991",
				Parent: "81991",
				Status: "ACCRED",
				GivenName: "Luke",
				FamilyName: "CARTER",
				PrintName: "CARTER Luke",
				PrintInitialName: "CARTER L.",
				TVName: "CARTER Luke",
				TVInitialName: "CARTER L.",
				Gender: "M",
				Organisation: "AUS",
				BirthDate: "19990915",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "AUS",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "AUS",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: [
						{
							Gender: "M",
							Event: "001",
							Bib: "17",
							EventEntry: {
								Code: "E_POSITION",
								Pos: "1",
								Value: "1",
								Type: "E_ENTRY"
							}
						},
						{
							Gender: "M",
							Event: "007",
							Bib: "17",
							EventEntry: {
								Code: "E_POSITION",
								Pos: "1",
								Value: "1",
								Type: "E_ENTRY"
							}
						}
					]
				}
			},
			{
				Code: "81992",
				Parent: "81992",
				Status: "ACCRED",
				GivenName: "Michaela",
				FamilyName: "DEALTRY",
				PrintName: "DEALTRY Michaela",
				PrintInitialName: "DEALTRY M.",
				TVName: "DEALTRY Michaela",
				TVInitialName: "DEALTRY M.",
				Gender: "W",
				Organisation: "AUS",
				BirthDate: "19960816",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "AUS",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "AUS",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "W",
						Event: "002",
						Bib: "30",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "81993",
				Parent: "81993",
				Status: "ACCRED",
				GivenName: "Christian",
				FamilyName: "HLIOUNAKIS",
				PrintName: "HLIOUNAKIS Christian",
				PrintInitialName: "HLIOUNAKIS C.",
				TVName: "HLIOUNAKIS Christian",
				TVInitialName: "HLIOUNAKIS C.",
				Gender: "M",
				Organisation: "AUS",
				BirthDate: "20020506",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "AUS",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "AUS",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: [
						{
							Gender: "M",
							Event: "003",
							Bib: "61",
							EventEntry: {
								Code: "E_POSITION",
								Pos: "1",
								Value: "1",
								Type: "E_ENTRY"
							}
						},
						{
							Gender: "M",
							Event: "007",
							Bib: "61",
							EventEntry: {
								Code: "E_POSITION",
								Pos: "1",
								Value: "1",
								Type: "E_ENTRY"
							}
						}
					]
				}
			},
			{
				Code: "81994",
				Parent: "81994",
				Status: "ACCRED",
				GivenName: "Maddison",
				FamilyName: "LEWIS",
				PrintName: "LEWIS Maddison",
				PrintInitialName: "LEWIS M.",
				TVName: "LEWIS Maddison",
				TVInitialName: "LEWIS M.",
				Gender: "W",
				Organisation: "AUS",
				BirthDate: "19991216",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "AUS",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "AUS",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "W",
						Event: "004",
						Bib: "96",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "81995",
				Parent: "81995",
				Status: "ACCRED",
				GivenName: "Lewis",
				FamilyName: "WYLIE",
				PrintName: "WYLIE Lewis",
				PrintInitialName: "WYLIE L.",
				TVName: "WYLIE Lewis",
				TVInitialName: "WYLIE L.",
				Gender: "M",
				Organisation: "AUS",
				BirthDate: "19920819",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "AUS",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "AUS",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: [
						{
							Gender: "M",
							Event: "007",
							Bib: "169",
							EventEntry: {
								Code: "E_POSITION",
								Pos: "1",
								Value: "1",
								Type: "E_ENTRY"
							}
						},
						{
							Gender: "M",
							Event: "009",
							Bib: "169",
							EventEntry: {
								Code: "E_POSITION",
								Pos: "1",
								Value: "1",
								Type: "E_ENTRY"
							}
						}
					]
				}
			},
			{
				Code: "81997",
				Parent: "81997",
				Status: "ACCRED",
				GivenName: "Peter",
				FamilyName: "NEWLAND",
				PrintName: "NEWLAND Peter",
				PrintInitialName: "NEWLAND P.",
				TVName: "NEWLAND Peter",
				TVInitialName: "NEWLAND P.",
				Gender: "M",
				Organisation: "AUS",
				BirthDate: "19601204",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "AUS",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "AUS",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "M",
						Event: "001",
						Bib: "113",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "81998",
				Parent: "81998",
				Status: "ACCRED",
				GivenName: "Jack",
				FamilyName: "NEWLAND",
				PrintName: "NEWLAND Jack",
				PrintInitialName: "NEWLAND J.",
				TVName: "NEWLAND Jack",
				TVInitialName: "NEWLAND J.",
				Gender: "M",
				Organisation: "AUS",
				BirthDate: "20010116",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "AUS",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "AUS",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "M",
						Event: "003",
						Bib: "114",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "82694",
				Parent: "82694",
				Status: "ACCRED",
				GivenName: "Christina Theresa",
				FamilyName: "HOCHSTRASSER",
				PrintName: "HOCHSTRASSER Christina Theresa",
				PrintInitialName: "HOCHSTRASSER C.",
				TVName: "HOCHSTRASSER Christina Theresa",
				TVInitialName: "HOCHSTRASSER C.",
				Gender: "W",
				Organisation: "AUT",
				BirthDate: "19931228",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "AUT",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "AUT",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "W",
						Event: "002",
						Bib: "62",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "82696",
				Parent: "82696",
				Status: "ACCRED",
				GivenName: "Denise Liane",
				FamilyName: "REBNEGGER",
				PrintName: "REBNEGGER Denise Liane",
				PrintInitialName: "REBNEGGER D.",
				TVName: "REBNEGGER Denise Liane",
				TVInitialName: "REBNEGGER D.",
				Gender: "W",
				Organisation: "AUT",
				BirthDate: "19940728",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "AUT",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "AUT",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "W",
						Event: "002",
						Bib: "134",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "82931",
				Parent: "82931",
				Status: "ACCRED",
				GivenName: "Katie",
				FamilyName: "FANKHOUSER",
				PrintName: "FANKHOUSER Katie",
				PrintInitialName: "FANKHOUSER K.",
				TVName: "FANKHOUSER Katie",
				TVInitialName: "FANKHOUSER K.",
				Gender: "W",
				Organisation: "USA",
				BirthDate: "20020605",
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
						Gender: "W",
						Event: "004",
						Bib: "42",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "83058",
				Parent: "83058",
				Status: "ACCRED",
				GivenName: "Brooke",
				FamilyName: "HESS",
				PrintName: "HESS Brooke",
				PrintInitialName: "HESS B.",
				TVName: "HESS Brooke",
				TVInitialName: "HESS B.",
				Gender: "W",
				Organisation: "USA",
				BirthDate: "19930218",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "USA",
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
						Bib: "60",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "83059",
				Parent: "83059",
				Status: "ACCRED",
				GivenName: "Olivia",
				FamilyName: "MCGINNIS",
				PrintName: "MCGINNIS Olivia",
				PrintInitialName: "MCGINNIS O.",
				TVName: "MCGINNIS Olivia",
				TVInitialName: "MCGINNIS O.",
				Gender: "W",
				Organisation: "USA",
				BirthDate: "20020710",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "USA",
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
						Event: "004",
						Bib: "102",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "83060",
				Parent: "83060",
				Status: "ACCRED",
				GivenName: "Kenny",
				FamilyName: "KELLOGG",
				PrintName: "KELLOGG Kenny",
				PrintInitialName: "KELLOGG K.",
				TVName: "KELLOGG Kenny",
				TVInitialName: "KELLOGG K.",
				Gender: "M",
				Organisation: "USA",
				BirthDate: "20000807",
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
						Event: "003",
						Bib: "81",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "83061",
				Parent: "83061",
				Status: "ACCRED",
				GivenName: "Dally",
				FamilyName: "KELLOGG",
				PrintName: "KELLOGG Dally",
				PrintInitialName: "KELLOGG D.",
				TVName: "KELLOGG Dally",
				TVInitialName: "KELLOGG D.",
				Gender: "M",
				Organisation: "USA",
				BirthDate: "20011212",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "USA",
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
						Event: "003",
						Bib: "82",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "83283",
				Parent: "83283",
				Status: "ACCRED",
				GivenName: "Robert",
				FamilyName: "ANGER",
				PrintName: "ANGER Robert",
				PrintInitialName: "ANGER R.",
				TVName: "ANGER Robert",
				TVInitialName: "ANGER R.",
				Gender: "M",
				Organisation: "USA",
				BirthDate: "19901002",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "USA",
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
						Event: "001",
						Bib: "1",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "83284",
				Parent: "83284",
				Status: "ACCRED",
				GivenName: "Rose",
				FamilyName: "WALL",
				PrintName: "WALL Rose",
				PrintInitialName: "WALL R.",
				TVName: "WALL Rose",
				TVInitialName: "WALL R.",
				Gender: "W",
				Organisation: "USA",
				BirthDate: "19940209",
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
						Gender: "W",
						Event: "008",
						Bib: "161",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "83286",
				Parent: "83286",
				Status: "ACCRED",
				GivenName: "Maya-Ray",
				FamilyName: "CROSS",
				PrintName: "CROSS Maya-Ray",
				PrintInitialName: "CROSS M.",
				TVName: "CROSS Maya-Ray",
				TVInitialName: "CROSS M.",
				Gender: "W",
				Organisation: "GBR",
				BirthDate: "20010412",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "GBR",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "GBR",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "W",
						Event: "004",
						Bib: "21",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "83287",
				Parent: "83287",
				Status: "ACCRED",
				GivenName: "Harry",
				FamilyName: "PRICE",
				PrintName: "PRICE Harry",
				PrintInitialName: "PRICE H.",
				TVName: "PRICE Harry",
				TVInitialName: "PRICE H.",
				Gender: "M",
				Organisation: "GBR",
				BirthDate: "20000603",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "GBR",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "GBR",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "M",
						Event: "003",
						Bib: "128",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "83288",
				Parent: "83288",
				Status: "ACCRED",
				GivenName: "Benjamin",
				FamilyName: "PAMPLIN",
				PrintName: "PAMPLIN Benjamin",
				PrintInitialName: "PAMPLIN B.",
				TVName: "PAMPLIN Benjamin",
				TVInitialName: "PAMPLIN B.",
				Gender: "M",
				Organisation: "GBR",
				BirthDate: "19991012",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "GBR",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "GBR",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "M",
						Event: "009",
						Bib: "121",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "83289",
				Parent: "83289",
				Status: "ACCRED",
				GivenName: "Eoghan",
				FamilyName: "KELLY",
				PrintName: "KELLY Eoghan",
				PrintInitialName: "KELLY E.",
				TVName: "KELLY Eoghan",
				TVInitialName: "KELLY E.",
				Gender: "M",
				Organisation: "GBR",
				BirthDate: "19951107",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "GBR",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "GBR",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "M",
						Event: "009",
						Bib: "84",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "83290",
				Parent: "83290",
				Status: "ACCRED",
				GivenName: "Dennis",
				FamilyName: "NEWTON",
				PrintName: "NEWTON Dennis",
				PrintInitialName: "NEWTON D.",
				TVName: "NEWTON Dennis",
				TVInitialName: "NEWTON D.",
				Gender: "M",
				Organisation: "GBR",
				BirthDate: "19770424",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "GBR",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "GBR",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "M",
						Event: "001",
						Bib: "115",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "83291",
				Parent: "83291",
				Status: "ACCRED",
				GivenName: "David",
				FamilyName: "ROGERS",
				PrintName: "ROGERS David",
				PrintInitialName: "ROGERS D.",
				TVName: "ROGERS David",
				TVInitialName: "ROGERS D.",
				Gender: "M",
				Organisation: "GBR",
				BirthDate: "19931009",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "GBR",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "GBR",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "M",
						Event: "007",
						Bib: "138",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "83293",
				Parent: "83293",
				Status: "ACCRED",
				GivenName: "Seth",
				FamilyName: "ASHWORTH",
				PrintName: "ASHWORTH Seth",
				PrintInitialName: "ASHWORTH S.",
				TVName: "ASHWORTH Seth",
				TVInitialName: "ASHWORTH S.",
				Gender: "M",
				Organisation: "CAN",
				BirthDate: "19891215",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "CAN",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "GBR",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "M",
						Event: "001",
						Bib: "2",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "83294",
				Parent: "83294",
				Status: "ACCRED",
				GivenName: "Pierce",
				FamilyName: "HUSER",
				PrintName: "HUSER Pierce",
				PrintInitialName: "HUSER P.",
				TVName: "HUSER Pierce",
				TVInitialName: "HUSER P.",
				Gender: "M",
				Organisation: "CAN",
				BirthDate: "19990930",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "CAN",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "CAN",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "M",
						Event: "003",
						Bib: "64",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "83295",
				Parent: "83295",
				Status: "ACCRED",
				GivenName: "Marc-Antoine",
				FamilyName: "D'AVIGNON",
				PrintName: "D'AVIGNON Marc-Antoine",
				PrintInitialName: "D'AVIGNON M.",
				TVName: "D'AVIGNON Marc-Antoine",
				TVInitialName: "D'AVIGNON M.",
				Gender: "M",
				Organisation: "CAN",
				BirthDate: "20010723",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "CAN",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "CAN",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "M",
						Event: "003",
						Bib: "28",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "83328",
				Parent: "83328",
				Status: "ACCRED",
				GivenName: "Simon",
				FamilyName: "GONZALEZ",
				PrintName: "GONZALEZ Simon",
				PrintInitialName: "GONZALEZ S.",
				TVName: "GONZALEZ Simon",
				TVInitialName: "GONZALEZ S.",
				Gender: "M",
				Organisation: "CHI",
				BirthDate: "19920410",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "CHI",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "CHI",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "M",
						Event: "001",
						Bib: "54",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "83331",
				Parent: "83331",
				Status: "ACCRED",
				GivenName: "Sam",
				FamilyName: "DUFF",
				PrintName: "DUFF Sam",
				PrintInitialName: "DUFF S.",
				TVName: "DUFF Sam",
				TVInitialName: "DUFF S.",
				Gender: "M",
				Organisation: "CAN",
				BirthDate: "20000619",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "CAN",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "CAN",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "M",
						Event: "003",
						Bib: "38",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "83332",
				Parent: "83332",
				Status: "ACCRED",
				GivenName: "Ken",
				FamilyName: "ISHIBASHI",
				PrintName: "ISHIBASHI Ken",
				PrintInitialName: "ISHIBASHI K.",
				TVName: "ISHIBASHI Ken",
				TVInitialName: "ISHIBASHI K.",
				Gender: "M",
				Organisation: "JPN",
				BirthDate: "19800323",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "JPN",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "JPN",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "M",
						Event: "001",
						Bib: "67",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "83333",
				Parent: "83333",
				Status: "ACCRED",
				GivenName: "Mari",
				FamilyName: "SUDA",
				PrintName: "SUDA Mari",
				PrintInitialName: "SUDA M.",
				TVName: "SUDA Mari",
				TVInitialName: "SUDA M.",
				Gender: "W",
				Organisation: "JPN",
				BirthDate: "19750929",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "JPN",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "JPN",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "W",
						Event: "002",
						Bib: "151",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "83341",
				Parent: "83341",
				Status: "ACCRED",
				GivenName: "Ona",
				FamilyName: "BARO REGUE",
				PrintName: "BARO REGUE Ona",
				PrintInitialName: "BARO REGUE O.",
				TVName: "BARO REGUE Ona",
				TVInitialName: "BARO REGUE O.",
				Gender: "W",
				Organisation: "ESP",
				BirthDate: "20021129",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "ESP",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "ESP",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "W",
						Event: "004",
						Bib: "5",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "83342",
				Parent: "83342",
				Status: "ACCRED",
				GivenName: "Jan",
				FamilyName: "MUNTADA VINOLAS",
				PrintName: "MUNTADA VINOLAS Jan",
				PrintInitialName: "MUNTADA VINOLAS J.",
				TVName: "MUNTADA VINOLAS Jan",
				TVInitialName: "MUNTADA VINOLAS J.",
				Gender: "M",
				Organisation: "ESP",
				BirthDate: "20001128",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "ESP",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "ESP",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "M",
						Event: "003",
						Bib: "111",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "83345",
				Parent: "83345",
				Status: "ACCRED",
				GivenName: "Pol",
				FamilyName: "MONTSERRAT LOPEZ",
				PrintName: "MONTSERRAT LOPEZ Pol",
				PrintInitialName: "MONTSERRAT LOPEZ P.",
				TVName: "MONTSERRAT LOPEZ Pol",
				TVInitialName: "MONTSERRAT LOPEZ P.",
				Gender: "M",
				Organisation: "ESP",
				BirthDate: "20021108",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "ESP",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "ESP",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "M",
						Event: "003",
						Bib: "106",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "83351",
				Parent: "83351",
				Status: "ACCRED",
				GivenName: "Matthew",
				FamilyName: "HANSEN",
				PrintName: "HANSEN Matthew",
				PrintInitialName: "HANSEN M.",
				TVName: "HANSEN Matthew",
				TVInitialName: "HANSEN M.",
				Gender: "M",
				Organisation: "NZL",
				BirthDate: "19820507",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "NZL",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "NZL",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "M",
						Event: "001",
						Bib: "55",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "83352",
				Parent: "83352",
				Status: "ACCRED",
				GivenName: "Lotte",
				FamilyName: "RAYNER",
				PrintName: "RAYNER Lotte",
				PrintInitialName: "RAYNER L.",
				TVName: "RAYNER Lotte",
				TVInitialName: "RAYNER L.",
				Gender: "W",
				Organisation: "NZL",
				BirthDate: "20011023",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "NZL",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "NZL",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "W",
						Event: "004",
						Bib: "132",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "83353",
				Parent: "83353",
				Status: "ACCRED",
				GivenName: "Gordon",
				FamilyName: "RAYNER",
				PrintName: "RAYNER Gordon",
				PrintInitialName: "RAYNER G.",
				TVName: "RAYNER Gordon",
				TVInitialName: "RAYNER G.",
				Gender: "M",
				Organisation: "NZL",
				BirthDate: "19571219",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "NZL",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "NZL",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "M",
						Event: "001",
						Bib: "133",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "83354",
				Parent: "83354",
				Status: "ACCRED",
				GivenName: "Renato Pinheiro",
				FamilyName: "SANTANA",
				PrintName: "SANTANA Renato Pinheiro",
				PrintInitialName: "SANTANA R.",
				TVName: "SANTANA Renato Pinheiro",
				TVInitialName: "SANTANA R.",
				Gender: "M",
				Organisation: "BRA",
				BirthDate: "19770316",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "BRA",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "BRA",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "M",
						Event: "001",
						Bib: "140",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "83357",
				Parent: "83357",
				Status: "ACCRED",
				GivenName: "Jeremias",
				FamilyName: "FERNANDEZ",
				PrintName: "FERNANDEZ Jeremias",
				PrintInitialName: "FERNANDEZ J.",
				TVName: "FERNANDEZ Jeremias",
				TVInitialName: "FERNANDEZ J.",
				Gender: "M",
				Organisation: "ARG",
				BirthDate: "20010430",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "ARG",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "ARG",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "M",
						Event: "003",
						Bib: "44",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "83358",
				Parent: "83358",
				Status: "ACCRED",
				GivenName: "Olivier",
				FamilyName: "KREMER",
				PrintName: "KREMER Olivier",
				PrintInitialName: "KREMER O.",
				TVName: "KREMER Olivier",
				TVInitialName: "KREMER O.",
				Gender: "M",
				Organisation: "FRA",
				BirthDate: "19920521",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "FRA",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "FRA",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "M",
						Event: "001",
						Bib: "90",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "83359",
				Parent: "83359",
				Status: "ACCRED",
				GivenName: "Dorian",
				FamilyName: "CAPONY",
				PrintName: "CAPONY Dorian",
				PrintInitialName: "CAPONY D.",
				TVName: "CAPONY Dorian",
				TVInitialName: "CAPONY D.",
				Gender: "M",
				Organisation: "FRA",
				BirthDate: "19960619",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "FRA",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "FRA",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "M",
						Event: "001",
						Bib: "15",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "83360",
				Parent: "83360",
				Status: "ACCRED",
				GivenName: "Marine",
				FamilyName: "IZAC",
				PrintName: "IZAC Marine",
				PrintInitialName: "IZAC M.",
				TVName: "IZAC Marine",
				TVInitialName: "IZAC M.",
				Gender: "W",
				Organisation: "FRA",
				BirthDate: "19960327",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "FRA",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "FRA",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "W",
						Event: "002",
						Bib: "69",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "83361",
				Parent: "83361",
				Status: "ACCRED",
				GivenName: "Julien",
				FamilyName: "HELLO",
				PrintName: "HELLO Julien",
				PrintInitialName: "HELLO J.",
				TVName: "HELLO Julien",
				TVInitialName: "HELLO J.",
				Gender: "M",
				Organisation: "FRA",
				BirthDate: "19990120",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "FRA",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "FRA",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "M",
						Event: "003",
						Bib: "57",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "83373",
				Parent: "83373",
				Status: "ACCRED",
				GivenName: "Ana Lucia",
				FamilyName: "PICKENHAYN",
				PrintName: "PICKENHAYN Ana Lucia",
				PrintInitialName: "PICKENHAYN A.",
				TVName: "PICKENHAYN Ana Lucia",
				TVInitialName: "PICKENHAYN A.",
				Gender: "W",
				Organisation: "ARG",
				BirthDate: "20011026",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "ARG",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "ARG",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "W",
						Event: "004",
						Bib: "125",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "83381",
				Parent: "83381",
				Status: "ACCRED",
				GivenName: "Jimmy",
				FamilyName: "MARTINEZ",
				PrintName: "MARTINEZ Jimmy",
				PrintInitialName: "MARTINEZ J.",
				TVName: "MARTINEZ Jimmy",
				TVInitialName: "MARTINEZ J.",
				Gender: "M",
				Organisation: "CRC",
				BirthDate: "19890320",
				Height: "168",
				Weight: "70",
				PlaceofBirth: "",
				CountryofBirth: "CRC",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "CRC",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "M",
						Event: "001",
						Bib: "99",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "83474",
				Parent: "83474",
				Status: "ACCRED",
				GivenName: "Leonardo",
				FamilyName: "GONZALES",
				PrintName: "GONZALES Leonardo",
				PrintInitialName: "GONZALES L.",
				TVName: "GONZALES Leonardo",
				TVInitialName: "GONZALES L.",
				Gender: "M",
				Organisation: "ARG",
				BirthDate: "19790601",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "PER",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "PER",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "M",
						Event: "009",
						Bib: "",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "83475",
				Parent: "83475",
				Status: "ACCRED",
				GivenName: "Yanua",
				FamilyName: "SOLDEVILA",
				PrintName: "SOLDEVILA Yanua",
				PrintInitialName: "SOLDEVILA Y.",
				TVName: "SOLDEVILA Yanua",
				TVInitialName: "SOLDEVILA Y.",
				Gender: "W",
				Organisation: "PER",
				BirthDate: "20010923",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "PER",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "PER",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "W",
						Event: "004",
						Bib: "",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			},
			{
				Code: "84098",
				Parent: "84098",
				Status: "ACCRED",
				GivenName: "Denise Jessica",
				FamilyName: "MARTINEZ",
				PrintName: "MARTINEZ Denise Jessica",
				PrintInitialName: "MARTINEZ D.",
				TVName: "MARTINEZ Denise Jessica",
				TVInitialName: "MARTINEZ D.",
				Gender: "W",
				Organisation: "ARG",
				BirthDate: "19000101",
				Height: "",
				Weight: "",
				PlaceofBirth: "",
				CountryofBirth: "",
				PlaceofResidence: "",
				CountryofResidence: "",
				Nationality: "",
				Current: "true",
				OlympicSolidarity: "N",
				MainFunctionId: "AA01",
				Discipline: {
					Code: "CF",
					RegisteredEvent: {
						Gender: "W",
						Event: "002",
						Bib: "",
						EventEntry: {
							Code: "E_POSITION",
							Pos: "1",
							Value: "1",
							Type: "E_ENTRY"
						}
					}
				}
			}
		],
		events: []
	}
]

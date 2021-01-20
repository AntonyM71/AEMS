import { StringDecoder } from "string_decoder";
import { getEntriesForEvent, getEntriesForCompetition, getHeatsForEvent, athleteHeatType } from "./Athletes";

export const getCompetitions = () => competitions;

const competitions: competitionsType[] = [
	{
		id: "5fb5312f81dcac1964685f06",
		name: "ICF Test Competition",
		athletes: getEntriesForCompetition("5fb5312f81dcac1964685f06"),
		events: [
			{
				id: "5fb52d3032a4bb3e076be3c5",
				name: "Women's Kayak",
				format: "FLOAT",
				athletes: getEntriesForEvent("5fb5312f81dcac1964685f06", "K1W"),
				phases: [
					{
						id: "1",
						name: "Preliminaries",
						athletes: getEntriesForEvent("5fb5312f81dcac1964685f06", "K1W"),
						heats: getHeatsForEvent("5fb5312f81dcac1964685f06", "K1W")
					}
				]
			},
			{
				id: "5fb52d4632a4bb3e076be3c6",
				name: "Men's Kayak",
				format: "FLOAT",
				athletes: getEntriesForEvent("5fb5312f81dcac1964685f06", "K1M"),
				phases: [
					{
						id: "2",
						name: "Preliminaries",
						athletes: getEntriesForEvent("5fb5312f81dcac1964685f06", "K1M"),
						heats: getHeatsForEvent("5fb5312f81dcac1964685f06", "K1M")
					}
				]
			},
			{
				id: "5fb52d5132a4bb3e076be3c8",
				name: "Canoe Decked",
				format: "FLOAT",
				athletes: getEntriesForEvent("5fb5312f81dcac1964685f06", "C1"),
				phases: [
					{
						id: "4",
						name: "Preliminaries",
						athletes: getEntriesForEvent("5fb5312f81dcac1964685f06", "C1"),
						heats: getHeatsForEvent("5fb5312f81dcac1964685f06", "C1")
					}
				]
			},
			{
				id: "5fb52d6032a4bb3e076be3ca",
				name: "Junior Womens's Kayak",
				format: "FLOAT",
				athletes: getEntriesForEvent("5fb5312f81dcac1964685f06", "K1JW"),
				phases: [
					{
						id: "6",
						name: "Preliminaries",
						athletes: getEntriesForEvent("5fb5312f81dcac1964685f06", "K1JW"),
						heats: getHeatsForEvent("5fb5312f81dcac1964685f06", "K1JW")
					}
				]
			},
			{
				id: "5fb52d5932a4bb3e076be3c9",
				name: "Junior Men's Kayak",
				format: "FLOAT",
				athletes: getEntriesForEvent("5fb5312f81dcac1964685f06", "K1JM"),
				phases: [
					{
						id: "5",
						name: "Preliminaries",
						athletes: getEntriesForEvent("5fb5312f81dcac1964685f06", "K1JM"),
						heats: getHeatsForEvent("5fb5312f81dcac1964685f06", "K1JM")
					}
				]
			},
			{
				id: "5fb52d6632a4bb3e076be3cb",
				name: "Women's Squirt",
				format: "SQUIRT",
				athletes: getEntriesForEvent("5fb5312f81dcac1964685f06", "SW"),
				phases: [
					{
						id: "7",
						name: "Preliminaries",
						athletes: getEntriesForEvent("5fb5312f81dcac1964685f06", "SW"),
						heats: getHeatsForEvent("5fb5312f81dcac1964685f06", "SW")
					}
				]
			},
			{
				id: "5fb52d6b32a4bb3e076be3cc",
				name: "Men's Squirt",
				format: "SQUIRT",
				athletes: getEntriesForEvent("5fb5312f81dcac1964685f06", "SM"),
				phases: [
					{
						id: "8",
						name: "Preliminaries",
						athletes: getEntriesForEvent("5fb5312f81dcac1964685f06", "SM"),
						heats: getHeatsForEvent("5fb5312f81dcac1964685f06", "SM")
					}
				]
			}
		]
	},
	{
		id: "5fb5020d81dcac1964685f02",
		name: "Jon's Competition",
		athletes: [],
		events: []
	},
	{
		id: "5fb52d7081dcac1964685f05",
		name: "Jacko's Competition",
		athletes: [],
		events: []
	}
];


export interface competitionsType {
	id: string;
	name?: string;
	athletes: athleteHeatType[];
	events: eventType[];
}
export interface phaseType {
	id: string;
	name: string;
	athletes: athleteHeatType[];
	heats: heatsType[];
}

export interface eventType {
	id: string;
	name: string;
	format: string;
	athletes: athleteHeatType[];
	phases: phaseType[];
}
export interface heatsType {
	id: string;
	name: string;
	athletes: athleteHeatType[];
}
export interface athleteType {
	Code: string;
	Parent: string;
	Status: string;
	GivenName: string;
	FamilyName: string;
	PrintName: string;
	PrintInitialName: string;
	TVName: string;
	TVInitialName: string;
	Gender: string;
	Organisation: string;
	BirthDate: string;
	Height: string;
	Weight: string;
	PlaceofBirth: string;
	CountryofBirth: string;
	PlaceofResidence: string;
	CountryofResidence: string;
	Nationality: string;
	Current: string;
	OlympicSolidarity: string;
	MainFunctionId: string;
	Discipline: {
		Code: string;
		RegisteredEvent: registeredEventType[] | registeredEventType;
	};
}

export interface registeredEventType {
	Gender: string;
	Event: string;
	Bib: string;
	EventEntry: {
		Code: string;
		Pos: string;
		Value: string;
		Type: string;
	};
}

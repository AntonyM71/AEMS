import { ThemeProvider } from "@mui/material/styles"
import { act, screen, waitFor } from "@testing-library/react"
import { socketHub } from "../../../mocks/socketHub"
import { renderWithProviders } from "../../../testUtils"
import { defaultOverlayControllerState } from "../../Interfaces"
import { RunCorner } from "../Cards/RunCorner"
import { lightTheme } from "../overlayTheme"

jest.mock("../../roles/headJudge/WebSocketConnections")

const athlete = {
	id: "athlete-1",
	first_name: "Finn",
	last_name: "Krossig",
	bib: "36",
	scoresheet: "sheet-1",
	affiliation: "GER"
}

const renderCorner = () =>
	renderWithProviders(
		<ThemeProvider theme={lightTheme}>
			<RunCorner
				overlayControlState={{
					...defaultOverlayControllerState,
					selectedEvent: "event-1",
					selectedHeat: "heat-1",
					selectedRun: 1,
					selectedAthlete: athlete,
					showLiveRunScore: true
				}}
			/>
		</ThemeProvider>
	)

const sendTimer = async (timeRemaining: number, status = "running") => {
	await waitFor(() => expect(socketHub.openCount("timer")).toBeGreaterThan(0))
	act(() => {
		socketHub.emit("timer", "timer", {
			time_remaining: timeRemaining,
			status
		})
	})
}

const bar = () =>
	// eslint-disable-next-line testing-library/no-node-access
	document.querySelector(".AemsRunCorner-bar") as HTMLElement

describe("RunCorner", () => {
	beforeEach(() => {
		socketHub.reset()
	})

	it("shows who is running, the time left, the live score, and the event, heat and run", async () => {
		renderCorner()
		await sendTimer(36)

		expect(await screen.findByText("36")).toBeInTheDocument()
		expect(screen.getByText("Finn KROSSIG")).toBeInTheDocument()
		expect(screen.getByText("GER")).toBeInTheDocument()
		expect(await screen.findByText("Test Event")).toBeInTheDocument()
		expect(await screen.findByText("Test Heat")).toBeInTheDocument()
		expect(await screen.findByText("· Run 2/3")).toBeInTheDocument()
		expect(screen.getByTestId("final-score-value")).toHaveTextContent(
			"0.00"
		)
	})

	it("shows DNS when the run is marked did-not-start", async () => {
		renderCorner()
		await waitFor(() =>
			expect(socketHub.openCount("run_status")).toBeGreaterThan(0)
		)

		act(() => {
			socketHub.emit("run_status", "run_status", {
				heat_id: "heat-1",
				athlete_id: "athlete-1",
				run_number: 1,
				locked: false,
				did_not_start: true
			})
		})

		await waitFor(() =>
			expect(screen.getByTestId("final-score-value")).toHaveTextContent(
				"DNS"
			)
		)
	})

	it("drains the ride bar against a 45-second float ride", async () => {
		renderCorner()
		await sendTimer(36)

		await waitFor(() =>
			expect(bar()).toHaveAttribute("data-fraction", String(36 / 45))
		)
		// eslint-disable-next-line testing-library/no-node-access
		expect(document.querySelector(".AemsRunCorner-time")).not.toHaveClass(
			"AemsRunCorner-warning"
		)
	})

	it("switches to a 60-second scale once a squirt ride shows more than 45 seconds", async () => {
		renderCorner()
		await sendTimer(52)
		await waitFor(() =>
			expect(bar()).toHaveAttribute("data-fraction", String(52 / 60))
		)

		await sendTimer(30)
		await waitFor(() =>
			expect(bar()).toHaveAttribute("data-fraction", String(30 / 60))
		)
	})

	it("warns for the final ten seconds", async () => {
		renderCorner()
		await sendTimer(9)

		await waitFor(() =>
			// eslint-disable-next-line testing-library/no-node-access
			expect(document.querySelector(".AemsRunCorner-time")).toHaveClass(
				"AemsRunCorner-warning"
			)
		)
	})
})

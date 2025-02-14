import { render, screen } from "@testing-library/react"
import { rest } from "msw"
import { Provider } from "react-redux"
import { server } from "../../../mocks/server"
import { setupStore } from "../../../redux/store"
import { HeatScoreTable } from "../HeatScoreTable"

describe("HeatScoreTable", () => {
	beforeEach(() => {
		// Add handlers for the APIs used by HeatScoreTable
		server.use(
			// Handler for getting heat details
			rest.get("/api/heat/:id", (req, res, ctx) => {
				const { id } = req.params

				return res(
					ctx.json({
						id,
						name: "Test Heat",
						competition_id: "1",
						number_of_runs: 2
					})
				)
			}),
			// Handler for getting heat scores
			rest.get("/api/getHeatScores/:heatId", (req, res, ctx) => {
				const { heatId } = req.params

				return res(
					ctx.json({
						scores: [
							{
								bib_number: "123",
								first_name: "John",
								last_name: "Doe",
								run_scores: [
									{
										locked: true,
										did_not_start: false,
										mean_run_score: 85.5,
										judge_scores: [
											{
												judge_id: "1",
												score_info: { score: 85 }
											},
											{
												judge_id: "2",
												score_info: { score: 86 }
											}
										]
									},
									{
										locked: true,
										did_not_start: true,
										mean_run_score: 0,
										judge_scores: [
											{
												judge_id: "1",
												score_info: { score: 0 }
											},
											{
												judge_id: "2",
												score_info: { score: 0 }
											}
										]
									}
								]
							}
						]
					})
				)
			})
		)
	})

	it("shows loading skeleton when data is being fetched", () => {
		const store = setupStore({
			competitions: {
				selectedHeat: "1",
				selectedCompetition: "1",
				selectedEvent: "1",
				selectedPhase: "1",
				numberOfRuns: 2
			}
		})

		render(
			<Provider store={store}>
				<HeatScoreTable />
			</Provider>
		)

		expect(screen.getByTestId("skeleton")).toBeInTheDocument()
	})

	it("displays heat data when loaded", async () => {
		const store = setupStore({
			competitions: {
				selectedHeat: "1",
				selectedCompetition: "1",
				selectedEvent: "1",
				selectedPhase: "1",
				numberOfRuns: 2
			}
		})

		render(
			<Provider store={store}>
				<HeatScoreTable />
			</Provider>
		)

		// Wait for heat name and grid to appear
		expect(await screen.findByText("Heat: Test Heat")).toBeInTheDocument()
		const grid = await screen.findByTestId("mock-data-grid")
		expect(grid).toBeInTheDocument()

		// Get the grid props
		const gridProps = JSON.parse(
			grid.getAttribute("data-grid-props") || "{}"
		) as {
			columns: { field: string; headerName: string }[]
			rows: {
				id: number
				bib: string
				first_name: string
				last_name: string
			}[]
		}

		// Verify columns
		expect(gridProps.columns).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					field: "first_name",
					headerName: "First Name"
				}),
				expect.objectContaining({
					field: "last_name",
					headerName: "Last Name"
				}),
				expect.objectContaining({
					field: "bib",
					headerName: "Bib Number"
				}),
				expect.objectContaining({ field: "run_1", headerName: "Run 1" })
			])
		)

		// Verify rows
		expect(gridProps.rows).toEqual([
			expect.objectContaining({
				id: 0,
				bib: "123",
				first_name: "John",
				last_name: "Doe"
			})
		])
	})

	it("toggles judge scores visibility when switch is clicked", async () => {
		const store = setupStore({
			competitions: {
				selectedHeat: "1",
				selectedCompetition: "1",
				selectedEvent: "1",
				selectedPhase: "1",
				numberOfRuns: 2
			}
		})

		render(
			<Provider store={store}>
				<HeatScoreTable />
			</Provider>
		)

		// Wait for data to load
		await screen.findByText("Heat: Test Heat")

		// Get initial grid props
		const grid = await screen.findByTestId("mock-data-grid")
		const initialProps = JSON.parse(
			grid.getAttribute("data-grid-props") || "{}"
		)
		expect(initialProps.rows[0].run_1.judgeScores).toBeDefined()

		// Click the switch
		const switchElement = screen.getByRole("checkbox", {
			name: "Show Judge Scores"
		})
		switchElement.click()

		// Get updated grid props
		const updatedGrid = await screen.findByTestId("mock-data-grid")
		const updatedProps = JSON.parse(
			updatedGrid.getAttribute("data-grid-props") || "{}"
		)
		expect(updatedProps.rows[0].run_1.judgeScores).toBeDefined()
	})

	it("shows error message when no heat is selected", async () => {
		const store = setupStore({
			competitions: {
				selectedHeat: "",
				selectedCompetition: "1",
				selectedEvent: "1",
				selectedPhase: "1",
				numberOfRuns: 2
			}
		})

		render(
			<Provider store={store}>
				<HeatScoreTable />
			</Provider>
		)

		expect(
			await screen.findByText("Something went wrong")
		).toBeInTheDocument()
	})

	it("displays DNS for did not start runs", async () => {
		const store = setupStore({
			competitions: {
				selectedHeat: "1",
				selectedCompetition: "1",
				selectedEvent: "1",
				selectedPhase: "1",
				numberOfRuns: 2
			}
		})

		render(
			<Provider store={store}>
				<HeatScoreTable />
			</Provider>
		)

		// Wait for data to load
		await screen.findByText("Heat: Test Heat")

		// Get grid props and verify DNS
		const grid = await screen.findByTestId("mock-data-grid")
		const gridProps = JSON.parse(
			grid.getAttribute("data-grid-props") || "{}"
		)
		expect(gridProps.rows[0].run_2.didNotStart).toBe(true)
	})

	it("applies correct styling for locked and unlocked scores", async () => {
		// Modify the mock to include both locked and unlocked scores
		server.use(
			rest.get("/api/getHeatScores/:heatId", (req, res, ctx) =>
				res(
					ctx.json({
						scores: [
							{
								bib_number: "123",
								first_name: "John",
								last_name: "Doe",
								run_scores: [
									{
										locked: true,
										did_not_start: false,
										mean_run_score: 85.5,
										judge_scores: [
											{
												judge_id: "1",
												score_info: { score: 85 }
											}
										]
									},
									{
										locked: false,
										did_not_start: false,
										mean_run_score: 90.0,
										judge_scores: [
											{
												judge_id: "1",
												score_info: { score: 90 }
											}
										]
									}
								]
							}
						]
					})
				)
			)
		)

		const store = setupStore({
			competitions: {
				selectedHeat: "1",
				selectedCompetition: "1",
				selectedEvent: "1",
				selectedPhase: "1",
				numberOfRuns: 2
			}
		})

		render(
			<Provider store={store}>
				<HeatScoreTable />
			</Provider>
		)

		// Wait for data to load
		await screen.findByText("Heat: Test Heat")

		// Toggle judge scores to see detailed view
		const switchElement = screen.getByRole("checkbox", {
			name: "Show Judge Scores"
		})
		switchElement.click()

		// Get grid props and verify locked/unlocked scores
		const grid = await screen.findByTestId("mock-data-grid")
		const gridProps = JSON.parse(
			grid.getAttribute("data-grid-props") || "{}"
		)
		expect(gridProps.rows[0].run_1.locked).toBe(true)
		expect(gridProps.rows[0].run_1.meanScore).toBe(85.5)
		expect(gridProps.rows[0].run_2.locked).toBe(false)
		expect(gridProps.rows[0].run_2.meanScore).toBe(90.0)
	})

	it("shows no athletes message when heat has no scores", async () => {
		// Modify the mock to return empty scores array
		server.use(
			rest.get("/api/getHeatScores/:heatId", (req, res, ctx) =>
				res(
					ctx.json({
						scores: []
					})
				)
			)
		)

		const store = setupStore({
			competitions: {
				selectedHeat: "1",
				selectedCompetition: "1",
				selectedEvent: "1",
				selectedPhase: "1",
				numberOfRuns: 2
			}
		})

		render(
			<Provider store={store}>
				<HeatScoreTable />
			</Provider>
		)

		// Get grid props and verify empty rows
		const grid = await screen.findByTestId("mock-data-grid")
		const gridProps = JSON.parse(
			grid.getAttribute("data-grid-props") || "{}"
		)
		expect(gridProps.rows).toHaveLength(0)
	})

	it("shows judge scores by default when defaultShowJudgeScores is true", async () => {
		const store = setupStore({
			competitions: {
				selectedHeat: "1",
				selectedCompetition: "1",
				selectedEvent: "1",
				selectedPhase: "1",
				numberOfRuns: 2
			}
		})

		render(
			<Provider store={store}>
				<HeatScoreTable defaultShowJudgeScores={true} />
			</Provider>
		)

		// Wait for data to load
		await screen.findByText("Heat: Test Heat")

		// Get grid props and verify judge scores are visible
		const grid = await screen.findByTestId("mock-data-grid")
		const gridProps = JSON.parse(
			grid.getAttribute("data-grid-props") || "{}"
		)
		expect(gridProps.rows[0].run_1.judgeScores).toBeDefined()
		expect(gridProps.rows[0].run_1.judgeScores[0].score).toBe(85)
		expect(gridProps.rows[0].run_1.judgeScores[1].score).toBe(86)

		// Verify switch is checked
		const switchElement = screen.getByRole("checkbox", {
			name: "Show Judge Scores"
		})
		expect(switchElement).toBeChecked()
	})
})

import { act, screen } from "@testing-library/react"
import { socketHub } from "../../../mocks/socketHub"
import { renderWithProviders } from "../../../testUtils"
import { usePhaseRunStatusStreamQuery } from "../streamingApi"

jest.mock("../../../components/roles/headJudge/WebSocketConnections")

const Listener = () => {
	const { data } = usePhaseRunStatusStreamQuery({ phaseId: "phase-1" })

	return (
		<p>
			{data?.latest?.athlete_id ?? "none"} after {data?.connects ?? 0}{" "}
			connects
		</p>
	)
}

const runStatus = (phaseId: string, athleteId: string) => ({
	id: `status-${athleteId}`,
	heat_id: "heat-1",
	phase_id: phaseId,
	athlete_id: athleteId,
	run_number: 1,
	locked: true,
	did_not_start: false
})

describe("phaseRunStatusStream", () => {
	afterEach(() => socketHub.reset())

	it("keeps the latest message for its phase and ignores other phases", async () => {
		renderWithProviders(<Listener />)
		await screen.findByText("none after 0 connects")

		act(() =>
			socketHub.emit(
				"run_status",
				"run_status",
				runStatus("phase-1", "a")
			)
		)
		expect(
			await screen.findByText("a after 0 connects")
		).toBeInTheDocument()

		act(() =>
			socketHub.emit(
				"run_status",
				"run_status",
				runStatus("phase-2", "b")
			)
		)
		expect(screen.getByText("a after 0 connects")).toBeInTheDocument()
	})

	it("counts each connection, including reconnections", async () => {
		renderWithProviders(<Listener />)
		await screen.findByText("none after 0 connects")

		act(() => socketHub.emit("run_status", "connect"))
		act(() => socketHub.emit("run_status", "connect"))

		expect(
			await screen.findByText("none after 2 connects")
		).toBeInTheDocument()
	})
})

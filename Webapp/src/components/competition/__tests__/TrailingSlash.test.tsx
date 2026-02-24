import { render, screen } from "@testing-library/react"
import { http, HttpResponse } from "msw"
import { Provider } from "react-redux"
import { server } from "../../../mocks/server"
import { setupStore } from "../../../redux/store"
import HeatSelector from "../HeatSelector"

it("trailing slash fix test", async () => {
  server.use(
    http.get("/api/heat/", () => HttpResponse.json(null)),
  )
  const store = setupStore({
    competitions: {
      selectedCompetition: "comp1",
      selectedEvent: "",
      selectedPhase: "",
      selectedHeat: "",
      numberOfRuns: 2
    }
  })
  render(
    <Provider store={store}>
      <HeatSelector showDetailed={true} />
    </Provider>
  )
  const result = await screen.findByText("No Heats in Competition")
  expect(result).toBeInTheDocument()
})

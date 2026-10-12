import { expect, test } from "@playwright/test";
import { randomUUID } from "node:crypto";
import { BACKEND_URL, proxyFrontendAPIToBackend } from "./helpers/apiProxy";
import { fetchMoves, fetchTwoMoves } from "./helpers/moves";
import { setRunStatusOnce } from "./helpers/runStatus";
import { setupTestData } from "./helpers/testData";
import { nextUuid7 } from "./helpers/uuid7";

test("a newcomer and a second-run improvement climb a short leaderboard tower", async ({
  browser,
  request,
}) => {
  const data = await setupTestData(request);
  const [first, second] = await fetchTwoMoves(
    request,
    BACKEND_URL,
    data.scoresheetId,
  );
  const score = async (
    athleteId: string,
    moves: (typeof first)[],
    runNumber = 0,
  ) => {
    const response = await request.post(
      `${BACKEND_URL}/addUpdateAthleteScore/${data.heatId}/${athleteId}/${runNumber}/1?phase_id=${data.phaseId}`,
      {
        data: {
          moves: moves.map((m) => ({
            id: randomUUID(),
            move_id: m.moveId,
            direction: m.direction,
          })),
          bonuses: [],
          request_id: nextUuid7(),
        },
      },
    );
    expect(response.status()).toBe(200);
  };
  const lock = (athleteId: string, runNumber = 0) =>
    setRunStatusOnce(
      BACKEND_URL,
      {
        heatId: data.heatId,
        phaseId: data.phaseId,
        athleteId,
        runNumber,
      },
      { locked: true, did_not_start: false },
    );
  expect(
    (
      await request.patch(`${BACKEND_URL}/phase/${data.phaseId}`, {
        data: { number_of_runs: 2 },
      })
    ).status(),
  ).toBe(200);
  const secondId = randomUUID();
  expect(
    (
      await request.post(`${BACKEND_URL}/athlete/`, {
        data: [
          { id: secondId, first_name: "Second", last_name: "Rider", bib: "2" },
        ],
      })
    ).status(),
  ).toBe(201);
  expect(
    (
      await request.post(`${BACKEND_URL}/athleteheat/`, {
        data: [
          {
            id: randomUUID(),
            athlete_id: secondId,
            heat_id: data.heatId,
            phase_id: data.phaseId,
          },
        ],
      })
    ).status(),
  ).toBe(201);
  await score(data.athleteId, [first]);
  await score(secondId, [first, second]);

  const context = await browser.newContext();
  try {
    const [controller, overlay] = await Promise.all([
      context.newPage(),
      context.newPage(),
    ]);
    await Promise.all([controller, overlay].map(proxyFrontendAPIToBackend));

    await controller.goto("/Broadcast/Controller");
    // The competition and event comboboxes have no accessible name, and
    // the tower's settings below them are comboboxes too.
    const pickers = controller.locator(
      ':not([aria-label="Broadcast screen"] *)[role="combobox"]',
    );
    await pickers.first().click({ timeout: 15000 });
    await controller
      .getByRole("option", { name: data.competitionName })
      .click();
    await pickers.nth(1).click({ timeout: 15000 });
    await controller.getByRole("option", { name: "E2E Event" }).click();
    await controller
      .getByRole("combobox", { name: "Select Phase" })
      .click({ timeout: 15000 });
    await controller.getByRole("option", { name: "E2E Phase" }).click();
    await controller
      .getByRole("combobox", { name: "Select Heat" })
      .click({ timeout: 15000 });
    await controller
      .getByRole("option", { name: data.heatName, exact: true })
      .click();

    await overlay.setViewportSize({ width: 1920, height: 1080 });
    await overlay.goto("/Broadcast/Overlay");
    await controller.getByRole("button", { name: "Leaderboard tower" }).click();
    await controller.getByRole("button", { name: "Live run score" }).click();

    const tower = overlay.locator(".AemsTower-root");
    await expect(tower.locator(".AemsTower-count")).toHaveText("0/2", {
      timeout: 15000,
    });
    await lock(data.athleteId);
    await expect(tower.locator(".AemsTower-row")).toHaveCount(1, {
      timeout: 15000,
    });
    await lock(secondId);
    await expect(tower.locator(".AemsTower-climber")).toBeVisible({
      timeout: 8000,
    });
    await expect(tower.locator(".AemsTower-climber")).toHaveCount(0, {
      timeout: 20000,
    });
    // The first athlete's second run beats the second athlete's best.
    const manyMoves = await fetchMoves(
      request,
      BACKEND_URL,
      data.scoresheetId,
      8,
    );
    await score(data.athleteId, manyMoves, 1);
    await lock(data.athleteId, 1);
    await expect(tower.locator(".AemsTower-climber")).toBeVisible({
      timeout: 8000,
    });
  } finally {
    await context.close();
  }
});

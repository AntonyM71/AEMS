# Tasks

## 1. Storage

- [x] 1.1 Add a `CompetitionImage` model to `Server/db/models.py` (`competition_id` FK, `kind`, `content` `LargeBinary`, `content_type`, unique on `(competition_id, kind)`) and generate its Alembic migration; verify `alembic upgrade head`, `alembic downgrade -1`, and `alembic upgrade head` all succeed against the devcontainer Postgres and the table and constraint exist afterwards

## 2. Image endpoints

- [x] 2.1 Write failing `TestClient` tests in `Server/app/competition_management/tests/test_competition_images.py`: upload a Pillow-generated PNG logo and read back identical bytes and `image/png`; upload again and read back the new image; delete and get `404`, with the signature unaffected; a text file named `.png` gets `415`; a file over 10 MB gets `413`; an unknown competition gets `404`; an unknown kind gets `422`. Verify they fail for the right reason (missing routes)
- [x] 2.2 Implement `PUT`, `GET`, and `DELETE` `/competition_management/competition/{competition_id}/image/{kind}` with a `kind` enum. Validate size first, then confirm with Pillow that the format is PNG or JPEG, then do a trial fpdf2 `image()` embed; store the `content_type` derived from the format and upsert on `(competition_id, kind)`. Verify the 2.1 tests pass
- [x] 2.3 Add `client_max_body_size 11m;` to `nginx.conf`; verify with the Docker stack running that uploading a ~5 MB image through port 81 reaches the server, with no nginx `413`. Verified with the real `nginx.conf` in a standalone `nginx:latest` container in front of the dev server, not the full compose stack: a 5 MB PNG returned `204` and read back byte-for-byte, a 10.8 MB file got the server's own `413` message, and only a 12 MB file was stopped by nginx

## 3. Logo on PDFs

- [x] 3.1 Write failing tests that build each of the three PDFs with `set_compression(False)` and a stored logo: the phase results PDF (forced onto two pages), the heat draw (two heats), and the heat results PDF each contain the logo image object, and the same PDFs without a logo contain no `/Subtype /Image`
- [x] 3.2 Add `draw_logo_and_reserve_width` to `pdfEndpoints.py`: 7.5 mm tall, 60 mm max wide, top right of the first title row. Call it from `phase_pdf_header`'s `header()`, `build_heat_pdf_page`, and `build_heat_results_pdf_content`, and narrow and offset each first title cell by the reserved width. Load the logo in each endpoint and pass it down. Verify the 3.1 tests and the existing `test_pdfEndpoints.py` pass
- [x] 3.3 Generate each PDF from the running server with a real logo and a long competition name; verify by eye that the logo sits top right on every page and the title does not overlap it. Rendered through the endpoint functions with real fonts and a mocked session rather than a running server. This found the long phase title running off the page and under the logo; the title now shrinks to fit, pinned by `test_a_long_title_shrinks_to_stay_clear_of_the_logo`

## 4. Signature block

- [x] 4.1 Write failing tests for `phase_pdf`: `signed=true` with a stored signature contains `Head Judge`, today's date, and one image object more than unsigned; `signed=true` with no signature contains `Head Judge` and no image; `signed` omitted contains no `Head Judge`; a phase with unlocked runs still gets the block when signed
- [x] 4.2 Add the optional `signed: bool = False` query parameter to `phase_pdf` and a `draw_signature_block` helper: 70 mm wide, right-aligned, the image at most 20 mm tall or an empty space, a rule, then "Head Judge" and the date; move to a new page if `will_page_break` says the block would split. Verify the 4.1 tests pass
- [x] 4.3 Generate a signed PDF whose table ends near the bottom of a page; verify by eye that the block moves whole onto the next page, under the header and logo

## 5. API client

- [x] 5.1 Run `buildApi.sh` from the repo root; verify `Common/openapi.json` and `aemsApi.ts` include the image endpoints and the `signed` parameter, and `npm run tsc` passes

## 6. Webapp

- [x] 6.1 Write a failing MSW-backed test in `PhaseScoretable.test.tsx`: turning on "Signed by head judge" and clicking "Create PDF" requests `phase_pdf/:phaseId` with `signed=true`, and with the switch off the request does not carry `signed=true`
- [x] 6.2 Add the "Signed by head judge" `Switch` next to "Create PDF" in `PhaseScoretable.tsx` and append `signed=true` in `downloadFile` when it is on; verify the 6.1 test passes
- [x] 6.3 Write failing tests for a new `CompetitionImages` component: with a competition selected, uploading a PNG to the Logo card sends it to the logo endpoint and then shows the preview; delete removes the preview; a `415` response shows the server's message in an alert
- [x] 6.4 Implement `CompetitionImages`, with Logo and Head Judge Signature cards each holding a preview, upload, and delete, and a cache-busting version on the preview `src`. Add it to `Admin.tsx` in a "Competition Logo and Signature" accordion with a competition-only selector. Verify the 6.3 tests pass and `npm run precommit` is clean

## 7. End to end

- [x] 7.1 Add a Playwright test in `e2e/`: create a competition with a unique name, upload a logo and signature on the Admin page and see both previews, then download a signed phase results PDF and verify the response is a PDF that contains `Head Judge`; delete the signature and verify the preview disappears
- [x] 7.2 Run the backend suite (`uv run python -m pytest`), `uv run ruff check .`, the webapp suite (`npm test`), and the new e2e test; verify all pass. Backend 433 passed, ruff clean, e2e passed in Chromium and Firefox. Webapp 447 of 448 passed: the one failure, `HeadJudge › stops re-rendering when the paddler has no scoresheet`, also fails on unchanged `main` in full runs and passes alone, and is tracked as #577

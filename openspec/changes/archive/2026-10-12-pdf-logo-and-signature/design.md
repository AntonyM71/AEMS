# Design

## Context

All three PDFs are built in `Server/app/competition_management/pdfEndpoints.py` on a
`BrandPDF` (fpdf2, A4 landscape, 10 mm margins):

- **Phase results** (`phase_pdf`) installs a per-page `header()` through `phase_pdf_header`.
  Its first row is a 10 mm-tall, full-width cell holding the 24 pt title, centred.
- **Heat draw** (`build_heat_pdf_page`) and **heat results**
  (`build_heat_results_pdf_content`) have no header hook. Each draws its own centred,
  full-width title row after `add_page()`.

`Competition` holds only `id` and `name`. It is returned whole by the CRUD list and read
endpoints and flattened by `ToDictMixin`. The only existing file upload is the start-list
import on `competition_management_router`, which takes a FastAPI `UploadFile`.

fpdf2 2.8 depends on Pillow (12.x installed), so both are already available. fpdf2's
`image()` accepts a `BytesIO`, and it embeds a given image once per document however many
pages draw it.

The webapp reaches the API through nginx at `/api/`. `nginx.conf` does not set
`client_max_body_size`, so nginx's 1 MB default applies to every upload.

## Goals / Non-Goals

**Goals:**
- One drawing helper for the logo, shared by all three PDFs.
- No change to the bytes of any existing PDF when no logo is stored and the switch is off.

**Non-Goals:**
- Storing a head judge's name, or any per-phase or per-event images.
- Resizing, cropping, or recompressing uploads. The image prints as uploaded, scaled.
- Authentication. The signature has the same open trust model as the rest of AEMS.

## Decisions

### Store images in a separate `competition_image` table

Each row holds `id`, `competition_id` (foreign key to `competition`), `kind` (`logo` or
`signature`), `content` (`LargeBinary`), and `content_type`, with a unique constraint on
`(competition_id, kind)`. An upload is an upsert on that key, so uploading again replaces the
existing row in place.

- *Over two nullable binary columns on `competition`:* every competition list and read
  would load or serialise up to 20 MB of blobs unless every query deferred them. The CRUD
  responses and `ToDictMixin` make that easy to get wrong.
- *Over files on disk:* the Postgres volume is already persisted and backed up. Disk storage
  needs a new Docker volume, path handling, and cleanup when rows go.

### Endpoints live on `competition_management_router`

Under `/competition_management/competition/{competition_id}/image/{kind}`, where `kind` is a
`str` enum (`logo`, `signature`), so FastAPI rejects any other kind with `422`:

- `PUT` with multipart `file` returns `204`.
  - `404` if the competition does not exist.
  - `413` if the file is over 10 MB.
  - `415` if Pillow cannot open the file, or it opens as anything but PNG or JPEG.
- `GET` returns the image bytes with the stored `content_type`, or `404` if none is stored.
  The Admin preview uses it.
- `DELETE` returns `204`, whether or not an image was stored.

Validation reads the upload's bytes, rejects anything over the cap, then runs
`Image.open(BytesIO(data))` and checks `.format in {"PNG", "JPEG"}`. The stored
`content_type` comes from that format, not from the client's header. Without a logged-in
user, sniffing the bytes is the only check worth having.

The CRUD `competition_router` was the other option, but it holds generated-style CRUD, and
uploads already live on `competition_management_router`.

### Raise nginx's body limit

Set `client_max_body_size 11m;` in `nginx.conf`, a little over the 10 MB cap. Then the
server's `413` (with its message) is what a user sees, rather than a bare nginx error page.

### Logo drawing: one helper, called at the top of each page

Add `draw_title_row(pdf, title, logo)`, which calls `draw_logo`. That function draws the logo at
the top right of the first title row and returns the width it occupies plus a 2 mm gap, or
`0` when there is no logo.

- **Height:** 7.5 mm, three quarters of the 10 mm title row. Width follows the image's
  aspect ratio.
- **Position:** vertically centred in the row (`y = t_margin + 1.25`). The right edge sits
  at `w - r_margin`.
- **Title:** each PDF's first title cell becomes `pdf.epw - 2 * reserved` wide, offset by
  `reserved` from the left margin, so the title stays centred on the page and clear of the
  logo. A title wider than that cell shrinks its font size until it fits. Before this change,
  long phase titles ran off both edges of the page.
- **Width cap:** the helper caps the logo width at 60 mm. A very wide logo then shrinks
  below 7.5 mm tall instead of squeezing the title out.

Each PDF calls the helper where its first title row is drawn:

- **Phase results:** inside `phase_pdf_header`'s `header()`, so every page gets it.
- **Heat draw and heat results:** right after `add_page()` in each builder.

The endpoints load the logo once per request and pass the bytes down. The heat draw looks
the logo up per heat, because heats in one request may in principle belong to different
competitions.

### Signature block: `signed` query parameter on `phase_pdf`

`GET /phase_pdf/{phase_id}?signed=true` (an optional `bool`, default `false`) makes
`phase_pdf` call `draw_signature_block(pdf, signature: bytes | None)` after
`build_phase_pdf_content`.

The block is right-aligned, 70 mm wide, and about 30 mm tall:

- the signature image, at most 20 mm tall, or empty space of the same height when none is
  stored
- a horizontal rule
- "Head Judge" on the left and today's date (`12 Oct 2026` style, server local time) on the
  right, in the body font

It starts 8 mm below the table. Before drawing, `pdf.will_page_break(block_height)` decides
whether to call `add_page()` first, so the block never splits across pages. On a new page
the header, logo included, still draws.

- *Over a separate signed-PDF endpoint:* the switch only changes one trailing block, so a
  flag keeps a single code path.

### Webapp

**Admin page.** A new "Competition Logo and Signature" accordion holds a competition-only
`SelectorDisplay` and a `CompetitionImages` component with two cards, Logo and Head Judge
Signature. Each card has:

- an `<img>` preview, shown only when the `GET` succeeds
- an upload button (`<input type="file" accept="image/png,image/jpeg">`)
- a delete button

Upload uses `FormData` through the generated RTK Query mutation if codegen produces a usable
multipart hook, or axios otherwise, as `UploadCsv` does. The preview `src` carries a version
counter that increments after each upload or delete, so the browser does not show a cached
image. A server `4xx` message shows in an `Alert`.

**PhaseScoreTable.** A MUI `Switch` labelled "Signed by head judge" sits next to "Create
PDF", held in component state (default off). `downloadFile` appends `?signed=true` when it
is on. The component appears on both the Admin and Score pages, so both get the switch.

### Tests

- **Server:**
  - Endpoint tests use `TestClient` against the real database: upload, read back,
    replace, delete, `413`, `415` (a text file renamed `.png`), and `404` for an unknown
    competition.
  - PDF tests build documents with `pdf.set_compression(False)` so the output can be
    searched as bytes. They count `/Subtype /Image` objects to show the logo is present or
    absent, and look for `Head Judge` with the switch on and off. A real Pillow-generated
    PNG is the fixture.
- **Webapp:**
  - An MSW-backed test that turning the switch on makes the download request carry
    `signed=true`.
  - A test that uploading a file in `CompetitionImages` posts it and then shows the
    preview.

## Risks / Trade-offs

- [A 10 MB JPEG is embedded at full size, so every PDF from that competition carries it] →
  fpdf2 embeds it once per document, which keeps a multi-page PDF from growing per page. A
  generous cap was a deliberate choice. Resizing on upload can come later if PDFs get
  unwieldy.
- [Anyone on the venue network can replace the head judge's signature] → This is the
  accepted trust model for AEMS, stated in the proposal. The switch is off by default, so a
  signature never appears on a PDF unless someone asks for it.
- [A CMYK or progressive JPEG that fpdf2 cannot embed would make every PDF for that
  competition fail with `500`] → Validation also runs a trial `FPDF().image(...)` on the
  upload and rejects it with `415` if fpdf2 cannot handle it. A bad image is caught at
  upload time, not on match day.
- [A very long title shrinks to a small font] → It stays readable down to well over 100
  characters at A4 landscape, and the alternative was text running off the page.

## Migration Plan

One Alembic migration creates `competition_image`, and it is purely additive. Rollback
drops the table. Existing competitions have no rows, so every PDF renders exactly as it
does today until an image is uploaded.

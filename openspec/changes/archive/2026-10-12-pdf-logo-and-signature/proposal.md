# Proposal

## Why

Phase results are the official record of a competition, but the PDFs AEMS prints carry no
branding and no sign-off. Head judges currently sign the sheets by hand and organisers have
no way to show the event's logo on them. Issue #570 asks for an uploaded signature and logo
to appear on the phase results PDF.

## What Changes

- Each competition can hold an optional **logo** and an optional **head judge signature**,
  uploaded from the Admin page as PNG or JPEG images of up to 10 MB each. Uploading again
  replaces the stored image, and each image can be deleted.
- When the competition has a logo, it appears top-right in the title row of every page of
  all three PDFs: phase results, heat draw, and heat results. The title narrows to keep
  clear of it.
- The phase results download gains a **"Signed by head judge"** switch, off by default:
  - **Off:** no signature block, so the PDF is unchanged from today.
  - **On, signature uploaded:** the signature image prints after the results table, above a
    "Head Judge" line and the date.
  - **On, no signature uploaded:** the same block prints with a blank line, so the head judge
    can sign the printout by hand.
- The switch is always available. It does not check whether the head judge has confirmed
  every run: the PDF already shows unconfirmed scores in italics, and the head judge decides
  when to sign.

## Capabilities

### New Capabilities

None. Logo and signature upload is part of setting up a competition, so it belongs in
`competition-management`.

### Modified Capabilities

- `competition-management`:
  - Adds a requirement that operators can upload, replace, view, and delete a competition's
    logo and head judge signature.
  - Modifies the phase results PDF requirement to include the logo and the signature switch.
  - Modifies the heat draw and heat results PDF requirements to include the logo.

## Impact

- **Server:** a new table and Alembic migration for competition images, upload, read, and
  delete endpoints, and changes to the PDF code so all three PDFs draw the logo and the
  phase PDF can draw the signature block. `GET /phase_pdf/{phase_id}` gains an optional
  `signed` query parameter. There are no new dependencies: fpdf2 already depends on Pillow,
  which validates the uploaded images.
- **Webapp:** a new Admin section to upload, preview, and delete the two images, and the
  "Signed by head judge" switch next to "Create PDF" in the phase score table, which appears
  on both the Admin and Score pages.
- **API contract:** new endpoints and a new query parameter, so `buildApi.sh` must run
  again to regenerate `Common/openapi.json` and the client.
- **Trust:** AEMS has no login, so anyone on the venue network can upload or replace the
  signature. This is the same trust model as the rest of the system.

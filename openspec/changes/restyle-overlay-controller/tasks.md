# Tasks

## 1. Controller

- [x] 1.1 Rename the visibility toggles after their graphic and update the controller tests' button queries; verify `npx jest src/components/broadcast` passes
- [x] 1.2 Show each toggle's on-air state as "On air"/"Off" text with `aria-pressed`; verify the "emits the ICF-logo toggle" test asserts the pressed state before and after a click
- [ ] 1.3 Assert the "ICF logo" toggle's visible "On air"/"Off" text alongside its pressed state in the logo test; verify `npx jest src/components/broadcast/__tests__/controller.test.tsx` passes

## 2. Spec

- [x] 2.1 Check the delta with `openspec validate restyle-overlay-controller` and confirm it passes

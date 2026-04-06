# ICF Scoresheet Changes: 2025 → 2026

## Summary

This document describes all changes made from `icf_2025.json` to `icf_2026.json`.

---

## 1. New Field: `Style` Bonus

All moves now include a `Style` bonus field. The value is determined by:

- **`0`** — if the move's `Value` is ≤ 30 (Style is never eligible for low-value moves)
- **`0`** — if the move is ineligible for Style per the 2026 appendix bonus eligibility tables
- **`20`** — if eligible and move `Value` is in the range 31–90
- **`30`** — if eligible and move `Value` > 90

Moves where Style is **not eligible** (set to `0`) regardless of value bracket:
- Shuvit, Spin, Cartwheel, Roundhouse, Back Roundhouse (all ≤ 30 bracket)
- Entry 1, Pirouette (≤ 30 bracket)

---

## 2. Trophy Move Value Changes

| Move     | 2025 Value | 2026 Value |
|----------|-----------|-----------|
| Trophy 1 | 50        | 60        |
| Trophy 2 | 170       | 120       |
| Trophy 3 | 240       | 180       |

Associated bonuses have been updated to reflect the new value brackets:

| Move     | 2025 Bonuses (Clean/SC/Air/Huge/Link) | 2026 Bonuses (Clean/SC/Air/Huge/Link/Style) |
|----------|---------------------------------------|---------------------------------------------|
| Trophy 1 | 30/10/30/40/20 (bracket 31–90)        | 30/10/30/40/20/20 (bracket 31–90, 60 pts)  |
| Trophy 2 | 50/10/40/50/30 (bracket >90)          | 50/10/40/50/30/30 (bracket >90, 120 pts)   |
| Trophy 3 | 50/10/40/50/30 (bracket >90)          | 50/10/40/50/30/30 (bracket >90, 180 pts)   |

---

## 3. New Moves Added

The following moves are new in 2026:

| Move       | Value | Direction | Clean | SuperClean | Air | Huge | Link | Style |
|------------|-------|-----------|-------|------------|-----|------|------|-------|
| Gedi Flip  | 160   | LR        | 50    | 10         | 40  | 50   | 30   | 30    |
| Vada Flip  | 180   | LR        | 50    | 10         | 40  | 50   | 30   | 30    |
| Side Kick  | 80    | LR        | 30    | 10         | 0   | 40   | 20   | 20    |
| Sasquatch  | 80    | S         | 30    | 10         | 0   | 40   | 20   | 20    |
| Silly Flip | 170   | LR        | 50    | 10         | 0   | 50   | 30   | 30    |

Notes:
- **Side Kick**, **Sasquatch**, and **Silly Flip**: Air bonus is ineligible (0) per eligibility tables.
- **Sasquatch**: Direction is `S` (switch).

---

## 4. Back Loop

No separate `Back Loop` move is added. As in 2025, the `Loop` move retains a `ReverseValue: 90` to capture the back-loop score. The `Style` bonus has been added to `Loop` (value: 20, since Loop Value=60 is in the 31–90 bracket and Style is eligible).

---

## 5. Complete 2026 Bonus Values Reference

The full bonus value lookup table for eligible bonuses:

| Bonus      | Value ≤ 30 | 31 < Value ≤ 90 | Value > 90 |
|------------|-----------|-----------------|-----------|
| Clean      | 10        | 30              | 50        |
| SuperClean | 10        | 10              | 10        |
| Air        | 10        | 30              | 40        |
| Huge       | 20        | 40              | 50        |
| Link       | 10        | 20              | 30        |
| Style      | 0         | 20              | 30        |

Ineligible bonuses are always set to `0`.

---

## 6. Unchanged Moves (with Style added)

All moves carried over from 2025 retain the same `Value`, `Direction`, and other bonus values. Only the `Style` field is newly added. Below is the complete list with their 2026 Style values:

| Move            | Value | Style |
|-----------------|-------|-------|
| Entry 1         | 30    | 0     |
| Entry 2         | 50    | 20    |
| Entry 3         | 80    | 20    |
| Shuvit          | 5     | 0     |
| Spin            | 10    | 0     |
| Felix           | 40    | 20    |
| Cartwheel       | 30    | 0     |
| Splitwheel      | 40    | 20    |
| Tricky Woo      | 160   | 30    |
| Tricky Loop     | 180   | 30    |
| Woo Tricky      | 120   | 30    |
| Pirouette       | 25    | 0     |
| Loop            | 60    | 20    |
| Space Godzilla  | 100   | 30    |
| Lunar Orbit     | 150   | 30    |
| Lunar Loop      | 170   | 30    |
| McNasty         | 120   | 30    |
| Phonics Monkey  | 140   | 30    |
| Three Point Loop| 170   | 30    |
| Roundhouse      | 15    | 0     |
| Back Roundhouse | 20    | 0     |
| Blunt           | 50    | 20    |
| Back Blunt      | 70    | 20    |
| Pan Am          | 110   | 30    |
| Back Pan Am     | 130   | 30    |
| Flip Turn       | 90    | 20    |
| Donkey Flip     | 80    | 20    |
| Airscrew        | 140   | 30    |
| Helix           | 150   | 30    |

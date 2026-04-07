{
  "title": "ICF Scoresheet Changes: 2025 -> 2026",
  "summary": "This document describes all changes made from icf_2025.json to icf_2026.json.",
  "sections": [
    {
      "title": "New Field: Style Bonus",
      "description": "All moves now include a Style bonus field.",
      "rules": [
        {
          "style": 0,
          "condition": "if the move value is less than or equal to 30"
        },
        {
          "style": 0,
          "condition": "if the move is ineligible for Style per the 2026 appendix bonus eligibility tables"
        },
        {
          "style": 20,
          "condition": "if eligible and the move value is in the range 31-90"
        },
        {
          "style": 30,
          "condition": "if eligible and the move value is greater than 90"
        }
      ],
      "not_eligible_moves": [
        "Shuvit",
        "Spin",
        "Cartwheel",
        "Roundhouse",
        "Back Roundhouse",
        "Entry 1",
        "Pirouette"
      ]
    },
    {
      "title": "Trophy Move Value Changes",
      "moves": [
        {
          "move": "Trophy 1",
          "value_2025": 50,
          "value_2026": 60,
          "bonuses_2025": "30/10/30/40/20",
          "bonuses_2026": "30/10/30/40/20/20"
        },
        {
          "move": "Trophy 2",
          "value_2025": 170,
          "value_2026": 120,
          "bonuses_2025": "50/10/40/50/30",
          "bonuses_2026": "50/10/40/50/30/30"
        },
        {
          "move": "Trophy 3",
          "value_2025": 240,
          "value_2026": 180,
          "bonuses_2025": "50/10/40/50/30",
          "bonuses_2026": "50/10/40/50/30/30"
        }
      ]
    },
    {
      "title": "New Moves Added",
      "moves": [
        {
          "move": "Gedi Flip",
          "value": 160,
          "direction": "LR",
          "clean": 50,
          "super_clean": 10,
          "air": 40,
          "huge": 50,
          "link": 30,
          "style": 30
        }
      ]
    }
  ]
}
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

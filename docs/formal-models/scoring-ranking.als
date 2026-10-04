/*
 * Alloy model of AEMS scoring and ranking (Server/app/scoring/scoring_logic.py,
 * openspec/specs/scoring/spec.md). Scores are modelled as Alloy Int, so
 * mean-of-judges division is integer division rather than the real system's
 * round-to-2-decimals float; every other rule (dedup, DNS, best-N, tie-break
 * ladder, "1224" ranking) is modelled exactly.
 */

module scoring_ranking

abstract sig Direction {}
one sig F, L, S, R, B extends Direction {}
fun flDirections: set Direction { F + L + S }

sig Scoresheet {}
sig MoveDef { sheet: one Scoresheet, flScore: one Int, rbScore: one Int }
sig BonusDef { sheet: one Scoresheet, bonusScore: one Int }

sig Phase {
	scoresheet: one Scoresheet,
	totalRuns: one Int,
	scoringRuns: one Int,
	assignedJudgeCount: one Int
}
sig Heat { phase: one Phase }

sig Athlete {}
sig Judge {}

-- A MoveKey is one "make_move_string" identity: every ScoredMove row sharing
-- (moveDef, direction, athlete, judge, runNumber, heat) collapses onto it.
sig MoveKey {
	moveDef: one MoveDef,
	direction: one Direction,
	athlete: one Athlete,
	judge: one Judge,
	runNumber: one Int,
	heat: one Heat
}
sig ScoredMove { key: one MoveKey }

sig ScoredBonus { bonusDef: one BonusDef, onMove: one ScoredMove }

sig RunStatus { athlete: one Athlete, heat: one Heat, runNumber: one Int }
one sig Flags { dns: set RunStatus, locked: set RunStatus }

one sig BestSelection { sel: Athlete -> Heat -> Int }
one sig Ranking { rank: Athlete -> Heat -> lone Int }

fact WellFormed {
	all mk: MoveKey | mk.moveDef.sheet = mk.heat.phase.scoresheet
	all sb: ScoredBonus | sb.bonusDef.sheet = sb.onMove.key.heat.phase.scoresheet
	-- ICF phases run 2 or 3 rides; bounding this (rather than leaving it open to
	-- the full Int range) keeps the run-order-statistic unrolling in
	-- nthHighestRun tractable for the solver, and matches every real phase.
	all p: Phase | p.totalRuns > 1 and p.totalRuns =< 3 and p.scoringRuns > 0
		and p.scoringRuns =< p.totalRuns and p.assignedJudgeCount > 0
		and p.assignedJudgeCount =< 3

	-- no two distinct MoveKey atoms denote the same identity
	all mk1, mk2: MoveKey | mk1 != mk2 implies
		(mk1.moveDef != mk2.moveDef or mk1.direction != mk2.direction
			or mk1.athlete != mk2.athlete or mk1.judge != mk2.judge
			or mk1.runNumber != mk2.runNumber or mk1.heat != mk2.heat)
	all mk: MoveKey | some sm: ScoredMove | sm.key = mk
	all mk: MoveKey | mk.runNumber >= 0 and mk.runNumber < mk.heat.phase.totalRuns

	all rs1, rs2: RunStatus | rs1 != rs2 implies
		(rs1.athlete != rs2.athlete or rs1.heat != rs2.heat or rs1.runNumber != rs2.runNumber)
	all rs: RunStatus | rs.runNumber >= 0 and rs.runNumber < rs.heat.phase.totalRuns

	-- one athlete's given run number always belongs to one heat
	all mk1, mk2: MoveKey | (mk1.athlete = mk2.athlete and mk1.runNumber = mk2.runNumber)
		implies mk1.heat = mk2.heat
	all rs: RunStatus, mk: MoveKey | (rs.athlete = mk.athlete and rs.runNumber = mk.runNumber)
		implies rs.heat = mk.heat
}

fun runStatusFor[a: Athlete, h: Heat, r: Int]: lone RunStatus {
	{ rs: RunStatus | rs.athlete = a and rs.heat = h and rs.runNumber = r }
}
pred isDNS[a: Athlete, h: Heat, r: Int] { some runStatusFor[a, h, r] & Flags.dns }

fun bonusTotal[mk: MoveKey]: Int {
	-- a bonus type counted once per move identity, no matter how many times it was submitted
	sum bd: { bd: BonusDef | some sb: ScoredBonus | sb.bonusDef = bd and sb.onMove.key = mk } |
		bd.bonusScore
}
fun moveKeyScore[mk: MoveKey]: Int {
	-- `+` is set union in Alloy, not arithmetic addition; `plus[]` is the actual sum
	plus[mk.direction in flDirections => mk.moveDef.flScore else mk.moveDef.rbScore, bonusTotal[mk]]
}

fun moveKeysFor[a: Athlete, j: Judge, r: Int, h: Heat]: set MoveKey {
	{ mk: MoveKey | mk.athlete = a and mk.judge = j and mk.runNumber = r and mk.heat = h }
}
fun judgeRunScore[a: Athlete, j: Judge, r: Int, h: Heat]: Int {
	sum mk: moveKeysFor[a, j, r, h] | moveKeyScore[mk]
}
fun judgeHighestMove[a: Athlete, j: Judge, r: Int, h: Heat]: Int {
	let keys = moveKeysFor[a, j, r, h] |
		some keys => max[{ x: Int | some mk: keys | moveKeyScore[mk] = x }] else 0
}

fun judgesScoring[a: Athlete, h: Heat, r: Int]: set Judge {
	{ j: Judge | some moveKeysFor[a, j, r, h] }
}
fun meanRunScore[a: Athlete, h: Heat, r: Int]: Int {
	isDNS[a, h, r] => 0 else (
		let js = judgesScoring[a, h, r] |
		let n = max[#js + h.phase.assignedJudgeCount] |
		let total = (sum j: js | judgeRunScore[a, j, r, h]) |
		div[total, n]
	)
}
fun runHighestMove[a: Athlete, h: Heat, r: Int]: Int {
	isDNS[a, h, r] => 0 else (
		let js = judgesScoring[a, h, r] |
		some js => max[{ x: Int | some j: js | judgeHighestMove[a, j, r, h] = x }] else 0
	)
}

fun runsOf[h: Heat]: set Int { { r: Int | r >= 0 and r < h.phase.totalRuns } }

fun athleteHighestMove[a: Athlete, h: Heat]: Int {
	max[{ x: Int | some r: runsOf[h] | runHighestMove[a, h, r] = x }]
}
pred startedAtLeastOneRun[a: Athlete, h: Heat] {
	some r: runsOf[h] | not isDNS[a, h, r]
}

pred isBestNSelection[a: Athlete, h: Heat, chosen: set Int] {
	chosen in runsOf[h]
	#chosen = min[h.phase.scoringRuns + #runsOf[h]]
	all r1: chosen, r2: runsOf[h] - chosen | meanRunScore[a, h, r1] >= meanRunScore[a, h, r2]
}
fact BestSelectionDefinition {
	all a: Athlete, h: Heat | isBestNSelection[a, h, BestSelection.sel[a][h]]
}
fun totalScore[a: Athlete, h: Heat]: Int {
	sum r: BestSelection.sel[a][h] | meanRunScore[a, h, r]
}

-- the i-th highest (0-indexed) run score, counting ties by multiplicity
fun nthHighestRun[a: Athlete, h: Heat, i: Int]: Int {
	{ v: Int | some r: runsOf[h] | meanRunScore[a, h, r] = v
		and #{ r2: runsOf[h] | meanRunScore[a, h, r2] > v } =< i
		and #{ r2: runsOf[h] | meanRunScore[a, h, r2] >= v } > i }
}

pred fullyTied[a1, a2: Athlete, h: Heat] {
	totalScore[a1, h] = totalScore[a2, h]
	and athleteHighestMove[a1, h] = athleteHighestMove[a2, h]
	and all i: runsOf[h] | nthHighestRun[a1, h, i] = nthHighestRun[a2, h, i]
}
-- true when `better` outranks `worse` on the ICF ladder: run-by-run, then highest move
pred tieBreakBetter[better, worse: Athlete, h: Heat] {
	(some i: runsOf[h] |
		nthHighestRun[better, h, i] > nthHighestRun[worse, h, i]
		and all j: runsOf[h] | j < i implies nthHighestRun[better, h, j] = nthHighestRun[worse, h, j])
	or
	((all i: runsOf[h] | nthHighestRun[better, h, i] = nthHighestRun[worse, h, i])
		and athleteHighestMove[better, h] > athleteHighestMove[worse, h])
}
pred betterThan[a2, a1: Athlete, h: Heat] {
	totalScore[a2, h] > totalScore[a1, h]
	or (totalScore[a2, h] = totalScore[a1, h] and tieBreakBetter[a2, a1, h])
}

fact RankingDefinition {
	all h: Heat |
		let eligible = { a: Athlete | startedAtLeastOneRun[a, h] } | (
			(all a: Athlete - eligible | no Ranking.rank[a][h])
			and (all a: eligible |
				Ranking.rank[a][h] = plus[1, #{ a2: eligible | betterThan[a2, a, h] }])
		)
}

-- Checks: the rank formula above should reproduce the openspec requirements as
-- emergent properties, not restate them.
--
-- RankingDefinition's use of integer division (meanRunScore) and the
-- order-statistic comprehension (nthHighestRun) make these expensive for a
-- SAT backend: use the bundled native solver (`alloy exec -s minisat`, not
-- the sat4j default — on these checks sat4j doesn't finish in 5 minutes
-- where minisat takes 1-3). Widening every sig to scope 2 is intractable
-- (hours, not minutes) because it multiplies MoveKey/ScoredMove/Judge
-- combinations along with Athlete; widening only Athlete, as below, gets a
-- real two-athlete comparison (not a vacuous self-comparison) while keeping
-- the supporting data small enough for minisat to finish each check in
-- 1-3 minutes.

assert HigherTotalRanksAbove {
	all a1, a2: Athlete, h: Heat |
		(startedAtLeastOneRun[a1, h] and startedAtLeastOneRun[a2, h]
			and totalScore[a1, h] > totalScore[a2, h])
		implies Ranking.rank[a1][h] < Ranking.rank[a2][h]
}
check HigherTotalRanksAbove for 1 but 2 Athlete, 4 Int

assert FullyTiedAthletesShareRank {
	all a1, a2: Athlete, h: Heat |
		(startedAtLeastOneRun[a1, h] and startedAtLeastOneRun[a2, h] and fullyTied[a1, a2, h])
		implies Ranking.rank[a1][h] = Ranking.rank[a2][h]
}
check FullyTiedAthletesShareRank for 1 but 2 Athlete, 4 Int

-- The converse of FullyTiedAthletesShareRank: every started athlete's rank is
-- unique unless they're fully tied with another. The individual tie-break
-- criteria being well-defined doesn't by itself guarantee this combined
-- claim, which is exactly the kind of gap that let two non-identical
-- athletes share a rank in practice.
assert UniqueRankUnlessFullyTied {
	all a1, a2: Athlete, h: Heat |
		(startedAtLeastOneRun[a1, h] and startedAtLeastOneRun[a2, h] and not fullyTied[a1, a2, h])
		implies Ranking.rank[a1][h] != Ranking.rank[a2][h]
}
check UniqueRankUnlessFullyTied for 1 but 2 Athlete, 4 Int

assert AllDnsAthletesAreUnranked {
	all a: Athlete, h: Heat | (all r: runsOf[h] | isDNS[a, h, r]) implies no Ranking.rank[a][h]
}
check AllDnsAthletesAreUnranked for 1 but 2 Athlete, 4 Int

assert BestSelectionIsOptimal {
	all a: Athlete, h: Heat, other: set Int |
		(other in runsOf[h] and #other = #(BestSelection.sel[a][h]))
		implies (let otherTotal = (sum r: other | meanRunScore[a, h, r]) | otherTotal =< totalScore[a, h])
}
check BestSelectionIsOptimal for 1 but 2 Athlete, 4 Int

-- Exercises two distinct athletes; expensive (minutes) because it forces
-- RankingDefinition to resolve for a non-trivial pair instead of vacuously.
run TieBrokenBySecondRun {
	some disj a1, a2: Athlete, h: Heat |
		totalScore[a1, h] = totalScore[a2, h]
		and nthHighestRun[a1, h, 0] = nthHighestRun[a2, h, 0]
		and nthHighestRun[a1, h, 1] != nthHighestRun[a2, h, 1]
} for 1 but 2 Athlete, 4 Int

-- Fast smoke test: a non-trivial world (moves, bonuses, a DNS run) exists at all.
run NonTrivialWorld {
	some ScoredMove and some ScoredBonus and some RunStatus & Flags.dns
} for 1 but 4 Int

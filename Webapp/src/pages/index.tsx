export default function Score() {
	return (
		<div>
			Gotchas:
			<ul>
				- Please don't put paddlers with different numbers of runs in
				the same heat, it should work, but will be painful to use
			</ul>
			<ul>
				- Tiebreaks now show which criterion decided the result and
				the athletes' bib numbers and values, e.g. "Tie resolved by
				highest scoring run: #12 (85.00), #7 (80.00)". A complete tie
				shows "Tie unresolved — athletes remain tied".
			</ul>
			<ul>
				- Once a scoresheet has been used in a competition, it is not
				possible to update it.
			</ul>
		</div>
	)
}

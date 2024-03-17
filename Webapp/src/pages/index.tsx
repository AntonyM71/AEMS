export default function Score() {
	return (
		<div>
			Gotchas:
			<ul>
				- Please don't put paddlers with different numbers of runs in
				the same heat, it should work, but will be painful to use
			</ul>
			<ul>
				- Tiebreak engine doesn't give a detailled breakdown of why yet,
				but will present a different message ("Fully Tied") if things
				are a complete tie.
			</ul>
			<ul>
				- Once a scoresheet has been used in a competition, it is not
				possible to update it.
			</ul>
		</div>
	)
}

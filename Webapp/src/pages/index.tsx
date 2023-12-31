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
				but will present a different message if things are a complete
				tie.
			</ul>
			<ul>
				- If a paddler only scores one move with a single judge, they
				will get full points for it. i.e if Judge 1 scores a spin, and
				no other judges score any moves, they will get 10 points for the
				spin, rather than 3.33 as you would expect if only one judge
				scored it out of three. This situation only applies if the
				paddler scores no moves whatsoever by one or more judges.
			</ul>
		</div>
	)
}

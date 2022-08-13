import React from "react"
import { bonuses, moves } from "./demoMoves"
import { MoveProps, BonusProps } from "./interfaces"

const Squirt = () => (
	<div className="sheetContainer">
		<div className="squirtMultiplierContainer">
			<Multiplier />
		</div>
		<div className="squirtMoveButtonsContainer">
			<div className="buttonsContainer">
				{moves.map((move) => (
					<Move key={move.id} move={move} />
				))}
			</div>
			<div className="buttonsContainer">
				{bonuses.map((bonus) => (
					<Bonus key={bonus.id} bonus={bonus} />
				))}
			</div>
		</div>
		<div className="squirtMoveListingContainer">&nbsp;</div>
	</div>
)

const Multiplier = () => (
	<div className="squirtMultiplier">
		<div className="squirtMultiplierValue">2.0</div>
		<div className="squirtMultiplierValue">1.9</div>
		<div className="squirtMultiplierValue">1.8</div>
		<div className="squirtMultiplierValue">1.7</div>
		<div className="squirtMultiplierValue">1.6</div>
		<div className="squirtMultiplierValue">1.5</div>
		<div className="squirtMultiplierValue">1.4</div>
		<div className="squirtMultiplierValue">1.3</div>
		<div className="squirtMultiplierValue">1.2</div>
		<div className="squirtMultiplierValue">1.1</div>
		<div className="squirtMultiplierValue">1.0</div>
	</div>
)

const Move = (props: MoveProps) => {
	if (props.move.direction === "LR") {
		return (
			<div className="moveButtonContainer flexGrowLeast">
				<div className="moveButtonName">{props.move.name}</div>
				<div className="moveButton">
					<div className="moveButtonDirection moveButtonDirectionL">
						L
					</div>
					<div className="moveButtonDirection moveButtonDirectionR">
						R
					</div>
				</div>
			</div>
		)
	} else if (props.move.direction === "FB") {
		return (
			<div className="moveButtonContainer flexGrowLeast">
				<div className="moveButtonName">{props.move.name}</div>
				<div className="moveButton">
					<div className="moveButtonDirection moveButtonDirectionF">
						F
					</div>
					<div className="moveButtonDirection moveButtonDirectionB">
						B
					</div>
				</div>
			</div>
		)
	} else if (props.move.direction === "LRFB") {
		return (
			<div className="moveButtonContainer flexGrowLeast">
				<div className="moveButtonName">{props.move.name}</div>
				<div className="moveButton">
					<div className="moveButtonDirection moveButtonDirectionLF">
						L or F
					</div>
					<div className="moveButtonDirection moveButtonDirectionRB">
						R or B
					</div>
				</div>
			</div>
		)
	} else if (props.move.direction === "SINGLE") {
		return (
			<div className="moveButtonContainer flexGrowLeast">
				<div className="moveButtonName">{props.move.name}</div>
				<div className="moveButton">
					<div className="moveButtonDirection moveButtonDirectionSingle">
						Any
					</div>
				</div>
			</div>
		)
	} else if (props.move.direction === "LTRRTL") {
		return (
			<div className="moveButtonContainer flexGrowLeast">
				<div className="moveButtonName">{props.move.name}</div>
				<div className="moveButton">
					<div className="moveButtonDirection moveButtonDirectionLF">
						LtR
					</div>
					<div className="moveButtonDirection moveButtonDirectionRB">
						RtL
					</div>
				</div>
			</div>
		)
	} else {
		return <div>Unknown Move</div>
	}
}

const Bonus = (props: BonusProps) => (
	<div className="bonusButtonContainer flexGrowLeast">
		<div className="bonusButtonName">{props.bonus.name}</div>
		<div className="bonusButton">
			<div className="bonusButtonDirection bonusButtonDirectionSingle">
				Any
			</div>
		</div>
	</div>
)

export default Squirt
export {}

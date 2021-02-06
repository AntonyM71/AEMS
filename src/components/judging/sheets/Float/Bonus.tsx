import Button from "@material-ui/core/Button"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import React from "react"
import { useFloatStyles } from "./FloatStyles"
import { BonusPropsType } from "./Interfaces"

export const Bonus = (props: BonusPropsType) => {
	const classes = useFloatStyles()

	return (
		<Paper className={classes.moveBox}>
			<Typography>{props.bonus.name}</Typography>
			<Button
				variant="contained"
				fullWidth
				color="primary"
				aria-label={"addBonus"}
				onClick={() =>
					props.addScoredBonus(props.bonus.name, props.bonus.id)
				}
			>
				Any
			</Button>
		</Paper>
	)
}

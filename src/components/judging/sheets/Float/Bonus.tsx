import { Paper, Typography, Button } from "@material-ui/core"
import React from "react"
import { useFloatStyles } from "./Float"
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
				onClick={() => props.addScoredBonus("", props.bonus.id)}
			>
				Any
			</Button>
		</Paper>
	)
}

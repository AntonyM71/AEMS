import Button from "@mui/material/Button"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import React from "react"

import { BonusPropsType } from "./Interfaces"

export const Bonus = (props: BonusPropsType) => (
		<Paper >
			<Typography>{props.bonus.name}</Typography>
			<Button
				variant="contained"
				fullWidth
				color="primary"
				aria-label={"addBonus"}
				onClick={() =>
					props.addScoredBonus(props.bonus.name, props.bonus.id)
				}
				data-testid={"button-bonus-" + props.bonus.id}
			>
				Any
			</Button>
		</Paper>
	)

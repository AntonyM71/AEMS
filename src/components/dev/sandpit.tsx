import { Button, Paper } from "@material-ui/core"
import React from "react"
import { useToasts } from "react-toast-notifications"
import { useStyles } from "../../style/Styles"
import { handleErrors } from "../../topLevelErrorHandler"

export const SandpitPage = () => {
	const classes = useStyles()
	const { addToast } = useToasts()

	return (
		<Paper className={classes.paper}>
			<Button
				fullWidth
				variant="outlined"
				onClick={() => {
					addToast("test error", { appearance: "error" })
				}}
			>
				{"Throw Test Error Directly"}
			</Button>
			<Button
				fullWidth
				variant="outlined"
				onClick={() => {
					try {
						throw Error("Intentional Error")
					} catch (e) {
						handleErrors(e, addToast)
					}
				}}
			>
				{"Catch error and throw toast using error handler"}
			</Button>
			<Button
				fullWidth
				variant="outlined"
				onClick={() => {
					void Promise.reject("Mock Rejected Promise")
				}}
			>
				{"Mock Rejected Promise "}
			</Button>
		</Paper>
	)
}

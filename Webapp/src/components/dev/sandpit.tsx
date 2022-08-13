import { Button, Paper } from "@material-ui/core"
import { IChangeEvent, withTheme } from "@rjsf/core"
import { Theme as MaterialUITheme } from "@rjsf/material-ui"
import React from "react"
import { useToasts } from "react-toast-notifications"
import { useStyles } from "../../style/Styles"
import { handleErrors } from "../../topLevelErrorHandler"
import { devSchema, extendedDevSchema } from "../formSpecs"
import { DevType } from "../formSpecs/dev"

export const SandpitPage = () => {
	const classes = useStyles()
	const { addToast } = useToasts()
	const Form = withTheme(MaterialUITheme)
	const handleFormSubmit = ({ formData }: IChangeEvent<DevType>) => {
		addToast(JSON.stringify(formData), { appearance: "success" })
	}

	return (
		<div>
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
			<Paper className={classes.paper}>
				<Form schema={devSchema} onSubmit={handleFormSubmit}></Form>
			</Paper>
			<Paper className={classes.paper}>
				<Form
					schema={extendedDevSchema}
					onSubmit={handleFormSubmit}
				></Form>
			</Paper>
		</div>
	)
}

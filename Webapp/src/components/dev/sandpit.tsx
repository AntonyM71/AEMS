import { Button, Paper } from "@material-ui/core"
import { IChangeEvent, withTheme } from "@rjsf/core"
import { Theme as MaterialUITheme } from "@rjsf/material-ui"
import { JSONSchema7 } from "json-schema"
import { toast } from "react-hot-toast"
import { useStyles } from "../../style/Styles"
import { handleErrors } from "../../topLevelErrorHandler"
import { extendedDevSchema } from "../formSpecs"
import devSchema from "../formSpecs/jsonschemas/test.json"
import { ExampleJsonSchemaForm } from "../formSpecs/typescript/test"

export const SandpitPage = () => {
	const classes = useStyles()

	const Form = withTheme(MaterialUITheme)
	const handleFormSubmit = ({
		formData
	}: IChangeEvent<ExampleJsonSchemaForm>) => {
		toast.success(JSON.stringify(formData))
	}

	return (
		<div>
			<Paper className={classes.paper}>
				<Button
					fullWidth
					variant="outlined"
					onClick={() => {
						toast.error("test error")
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
							handleErrors(e)
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
				<Form
					schema={devSchema as JSONSchema7}
					onSubmit={handleFormSubmit}
				></Form>
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

import React, { Fragment } from "react"

interface headJudgePropsType {
	competition: string
}
const Scribe = ({ competition }: headJudgePropsType) => (
	<Fragment>Scribe Sheet for {competition}</Fragment>
)

export default Scribe

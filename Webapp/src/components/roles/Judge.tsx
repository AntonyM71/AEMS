import React, { Fragment } from "react"

interface judgePropsType {
	competition: string
}
const Scribe = ({ competition }: judgePropsType) => (
	<Fragment>Scribe Sheet for {competition}</Fragment>
)

export default Scribe

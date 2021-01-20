import React, { Fragment } from "react";


interface timingPropsType {
	competition: string;
}
const Scribe = ({ competition }: timingPropsType) => (
	<Fragment>
        Scribe Sheet for {competition}
	</Fragment>
);


export default Scribe;

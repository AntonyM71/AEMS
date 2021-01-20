import React, { Fragment } from "react";


interface controllerPropsType {
	competition: string;
}
const Scribe = ({ competition }: controllerPropsType) => (
	<Fragment>
        Scribe Sheet for {competition}
	</Fragment>
);


export default Scribe;

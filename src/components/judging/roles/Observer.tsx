import React, { Fragment } from "react";


interface observerPropsType {
	competition: string;
}
const Scribe = ({ competition }: observerPropsType) => (
	<Fragment>
        Scribe Sheet for {competition}
	</Fragment>
);


export default Scribe;

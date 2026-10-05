import Box from "@mui/material/Box"

// ponytail: text only; flags need an IOC-to-ISO lookup and bundled flag images.
export const AffiliationPill = ({
	affiliation
}: {
	affiliation?: string | null
}) =>
	affiliation ? (
		<Box
			component="span"
			className="AemsAffiliationPill"
			sx={{
				display: "inline-flex",
				alignItems: "center",
				height: "1.55em",
				padding: "0 0.55em",
				border: "2px solid currentColor",
				borderRadius: "4px",
				fontWeight: 700,
				letterSpacing: "0.06em"
			}}
		>
			{affiliation}
		</Box>
	) : null

import Skeleton from "@mui/material/Skeleton"

export default function Loading() {
	// You can add any UI inside Loading, including a Skeleton.
	return (
		<Skeleton
			data-testid="loading-skeleton"
			variant="rectangular"
			sx={{ height: "100%", width: "100%" }}
		/>
	)
}

import RefreshIcon from "@mui/icons-material/Refresh"
import IconButton from "@mui/material/IconButton"

export const RefreshButton = ({ refetch }: { refetch: () => Promise<any> }) => (
	<IconButton onClick={() => void refetch()}>
		<RefreshIcon />
	</IconButton>
)

import DeleteIcon from "@mui/icons-material/Delete"
import IconButton, { IconButtonProps } from "@mui/material/IconButton"
import { useState } from "react"
import toast from "react-hot-toast"

const DOUBLE_CLICK_WINDOW_MS = 200

export const DoubleClickDeleteButton = ({
	onDelete,
	testId,
	color,
	size,
	iconFontSize
}: {
	onDelete: () => void
	testId?: string
	color?: IconButtonProps["color"]
	size?: IconButtonProps["size"]
	iconFontSize?: "small" | "medium" | "large" | "inherit"
}) => {
	const [clickTimeout, setClickTimeout] = useState<NodeJS.Timeout | null>(
		null
	)

	const handleClick = () => {
		if (clickTimeout) {
			clearTimeout(clickTimeout)
			setClickTimeout(null)
		} else {
			const timeout = setTimeout(() => {
				toast.error("Double Click to delete")
				setClickTimeout(null)
			}, DOUBLE_CLICK_WINDOW_MS)
			setClickTimeout(timeout)
		}
	}

	const handleDoubleClick = () => {
		if (clickTimeout) {
			clearTimeout(clickTimeout)
		}
		setClickTimeout(null)
		onDelete()
	}

	return (
		<IconButton
			onClick={handleClick}
			onDoubleClick={handleDoubleClick}
			color={color}
			size={size}
			data-testid={testId}
		>
			<DeleteIcon fontSize={iconFontSize} />
		</IconButton>
	)
}

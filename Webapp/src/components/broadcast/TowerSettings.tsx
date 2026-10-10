import FormControlLabel from "@mui/material/FormControlLabel"
import MenuItem from "@mui/material/MenuItem"
import Stack from "@mui/material/Stack"
import Switch from "@mui/material/Switch"
import TextField from "@mui/material/TextField"
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import { OverlayControlState } from "../Interfaces"

type TowerSettingsState = Pick<
	OverlayControlState,
	"towerStyle" | "towerPlacesThrough" | "towerQualifierRows" | "towerClimb"
>

const ALL_THAT_FIT = "fit"

const wholeNumberOfOneOrMore = (text: string): number | null => {
	const value = Number(text)

	return text.trim() !== "" && Number.isInteger(value) && value >= 1
		? value
		: null
}

/** The leaderboard tower's style, cut line, qualifier rotation and climb. */
export const TowerSettings = ({
	settings,
	onChange
}: {
	settings: TowerSettingsState
	onChange: (change: Partial<TowerSettingsState>) => void
}) => (
	<Stack
		spacing={1}
		sx={{ bgcolor: "background.paper", p: 1, borderRadius: 2 }}
	>
		<ToggleButtonGroup
			exclusive
			fullWidth
			size="small"
			aria-label="Leaderboard tower style"
			value={settings.towerStyle}
			onChange={(
				_,
				towerStyle: TowerSettingsState["towerStyle"] | null
			) => {
				// Clicking the selected option again would clear it.
				if (towerStyle) {
					onChange({ towerStyle })
				}
			}}
		>
			<ToggleButton value="timing">Timing tower</ToggleButton>
			<ToggleButton value="waterline">Waterline</ToggleButton>
		</ToggleButtonGroup>
		<TextField
			size="small"
			type="number"
			label="Places through"
			helperText="Leave empty for no cut line"
			slotProps={{ htmlInput: { min: 1, step: 1 } }}
			value={settings.towerPlacesThrough ?? ""}
			onChange={(event) =>
				onChange({
					towerPlacesThrough: wholeNumberOfOneOrMore(
						event.target.value
					)
				})
			}
		/>
		<TextField
			select
			size="small"
			label="Qualifiers above the bubble"
			value={settings.towerQualifierRows ?? ALL_THAT_FIT}
			onChange={(event) =>
				onChange({
					towerQualifierRows:
						event.target.value === ALL_THAT_FIT
							? null
							: Number(event.target.value)
				})
			}
		>
			<MenuItem value={ALL_THAT_FIT}>Show all that fit</MenuItem>
			{[2, 3, 4].map((rows) => (
				<MenuItem key={rows} value={rows}>
					Cycle {rows} at a time
				</MenuItem>
			))}
		</TextField>
		<FormControlLabel
			control={
				<Switch
					checked={settings.towerClimb}
					onChange={(event) =>
						onChange({ towerClimb: event.target.checked })
					}
				/>
			}
			label="Climb on new scores"
		/>
	</Stack>
)

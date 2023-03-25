import { Autocomplete, Skeleton, TextField } from "@mui/material"
import { useGetManyScoresheetGetQuery } from "../../redux/services/aemsApi"

export const SelectScoresheet = ({
	selectedScoresheet,
	setSelectedScoresheet
}: {
	selectedScoresheet: string
	setSelectedScoresheet: React.Dispatch<React.SetStateAction<string>>
}) => {
	const { data, isLoading, isSuccess } = useGetManyScoresheetGetQuery({})
	const options: ScoresheetOptions[] =
		data
			?.filter((d) => !!d.id && !!d.name)
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			.map((d) => ({ value: d.id!, label: d.name! })) || []

	if (options) {
		return (
			<Autocomplete
				// error={!!competitionId}
				value={options.find((s) => s.value === selectedScoresheet)}
				options={options}
				fullWidth
				renderInput={(params) => (
					<TextField {...params} label="Scoresheet" />
				)}
				onChange={(event, newValue) => {
					if (newValue) {
						setSelectedScoresheet(newValue.value)
					}
				}}
			/>
		)
	} else if (isLoading) {
		return <Skeleton variant="rectangular" />
	} else if (isSuccess && !data) {
		return <h4>No Scoresheets in database</h4>
	}

	return <></>
}

interface ScoresheetOptions {
	label: string
	value: string
}

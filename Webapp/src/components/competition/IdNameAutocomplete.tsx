import Autocomplete from "@mui/material/Autocomplete"
import TextField from "@mui/material/TextField"

interface Option {
	value: string
	label: string
}

/** Picks one of `items` by id; renders nothing until `items` has loaded. */
export const IdNameAutocomplete = ({
	items,
	value,
	onChange,
	label,
	testId
}: {
	items: { id?: string | null; name?: string | null }[] | undefined
	value: string
	onChange: (id: string) => void
	label: string
	testId?: string
}) => {
	if (!items) {
		return <></>
	}
	const options: Option[] = items
		.filter((item) => !!item.id && !!item.name)
		.map((item) => ({ value: item.id ?? "", label: item.name ?? "" }))
	const selected = options.find((option) => option.value === value)

	return (
		<Autocomplete
			options={options}
			value={selected ?? null}
			inputValue={selected?.label ?? ""}
			fullWidth
			renderInput={(params) => (
				<TextField {...params} label={label} data-testid={testId} />
			)}
			onChange={(event, newValue) => {
				if (newValue) {
					onChange(newValue.value)
				}
			}}
		/>
	)
}

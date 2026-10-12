import Alert from "@mui/material/Alert"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import Grid from "@mui/material/Grid2"
import Typography from "@mui/material/Typography"
import axios, { AxiosError } from "axios"
import { ChangeEvent, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { getSelectedCompetition } from "../../redux/atoms/competitions"
import { ImageKind } from "../../redux/services/aemsApi"

const IMAGES: { kind: ImageKind; label: string }[] = [
	{ kind: "logo", label: "Logo" },
	{ kind: "signature", label: "Head Judge Signature" }
]

export const CompetitionImages = () => {
	const competitionId = useSelector(getSelectedCompetition)
	if (!competitionId) {
		return <Typography>Please select a competition</Typography>
	}

	return (
		<Grid container spacing={2}>
			{IMAGES.map(({ kind, label }) => (
				<Grid size={6} key={kind}>
					<CompetitionImageCard
						competitionId={competitionId}
						kind={kind}
						label={label}
					/>
				</Grid>
			))}
		</Grid>
	)
}

const CompetitionImageCard = ({
	competitionId,
	kind,
	label
}: {
	competitionId: string
	kind: ImageKind
	label: string
}) => {
	const url = `${
		process.env.NEXT_PUBLIC_API_URL_DEV || "/api/"
	}competition_management/competition/${competitionId}/image/${kind}`
	const [previewUrl, setPreviewUrl] = useState<string>()
	const [errorMessage, setErrorMessage] = useState<string>()
	const [version, setVersion] = useState(0)

	useEffect(() => {
		let objectUrl: string | undefined
		axios
			.get<Blob>(url, { responseType: "blob" })
			.then((response) => {
				objectUrl = URL.createObjectURL(response.data)
				setPreviewUrl(objectUrl)
			})
			.catch(() => setPreviewUrl(undefined))

		return () => {
			if (objectUrl) {
				URL.revokeObjectURL(objectUrl)
			}
		}
	}, [url, version])

	const refreshAfter = (request: Promise<unknown>) =>
		request
			.then(() => {
				setErrorMessage(undefined)
				setVersion((current) => current + 1)
			})
			.catch((error: AxiosError<{ detail?: string }>) =>
				setErrorMessage(error.response?.data?.detail ?? error.message)
			)

	const upload = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0]
		event.target.value = ""
		if (!file) {
			return
		}
		const formData = new FormData()
		formData.append("file", file)
		void refreshAfter(axios.put(url, formData))
	}

	return (
		<Card>
			<CardContent>
				<Typography variant="h6">{label}</Typography>
				{previewUrl ? (
					// next/image cannot optimise a blob: object URL
					// eslint-disable-next-line @next/next/no-img-element
					<img
						src={previewUrl}
						alt={label}
						style={{ maxWidth: "100%", maxHeight: "8em" }}
					/>
				) : (
					<Typography color="text.secondary">
						None uploaded
					</Typography>
				)}
				{errorMessage && <Alert severity="error">{errorMessage}</Alert>}
			</CardContent>
			<CardActions>
				<Button component="label" variant="contained">
					{"Upload"}
					<input
						type="file"
						hidden
						accept="image/png,image/jpeg"
						aria-label={`Upload ${label}`}
						onChange={upload}
					/>
				</Button>
				<Button
					color="error"
					disabled={!previewUrl}
					aria-label={`Delete ${label}`}
					onClick={() => void refreshAfter(axios.delete(url))}
				>
					Delete
				</Button>
			</CardActions>
		</Card>
	)
}

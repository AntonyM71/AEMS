import { useRouter } from "next/router"
import Scribe from "../../components/roles/scribe/ScribePage"

//       before this page can be pre-rendered.
export default function ScribePage() {
	const router = useRouter()
	const { id } = router.query
	if (typeof id === "string") {
		return <Scribe scribeNumber={id} />
	}
}

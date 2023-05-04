import dynamic from "next/dynamic"

const ScoresheetBuilder = dynamic(
	() => import("../components/ScoresheetBuilder/ScoresheetBuilderPage")
)

const ScoresheetBuilderPage = () => <ScoresheetBuilder />

export default ScoresheetBuilderPage

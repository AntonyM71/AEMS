import dynamic from "next/dynamic"

export const Judging = dynamic(
	() => import("../components/judging/JudgingPage")
)

const JudgingPage = () => <Judging />

export default JudgingPage

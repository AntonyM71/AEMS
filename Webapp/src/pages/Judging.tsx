import dynamic from "next/dynamic"

export const Judging = dynamic(() => import("../components/roles/JudgingPage"))

const JudgingPage = () => <Judging />

export default JudgingPage

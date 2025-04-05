import dynamic from "next/dynamic"

export const HeadJudge = dynamic(
	() => import("../components/roles/headJudge/headJudge")
)
export default function Score() {
	return <HeadJudge />
}

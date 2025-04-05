import dynamic from "next/dynamic"

export const OverlayComponent = dynamic(
	() => import("../../components/broadcast/overlay")
)
export default function Overlay() {
	return <OverlayComponent />
}
Overlay.noLayout = true

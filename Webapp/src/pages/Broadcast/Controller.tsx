import dynamic from "next/dynamic"

export const Controller = dynamic(
	() => import("../../components/broadcast/controller")
)
const OverlayController = () => <Controller />

export default OverlayController

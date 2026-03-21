import dynamic from "next/dynamic"
import { HeatSummaryTable } from "./HeatSummaryTable"
import { OverlayControlState } from "../../Interfaces"

const PixiFrameSequenceOverlay = dynamic(
  () => import("../PixiFrameSequenceOverlay"),
  { ssr: false }
)

interface HeatListModalProps {
  isVisible: boolean
  overlayControlState: OverlayControlState
  size?: number
}

export const HeatListModal = ({ isVisible, overlayControlState, size }: HeatListModalProps) => (
  <PixiFrameSequenceOverlay
    configName="startList"
    isVisible={isVisible}
    style={{
      position: "fixed",
      inset: 0,
      width: "100vw",
      height: "100vh",
      zIndex: 1400
    }}
  >
    <HeatSummaryTable overlayControlState={overlayControlState} size={size} />
  </PixiFrameSequenceOverlay>
)

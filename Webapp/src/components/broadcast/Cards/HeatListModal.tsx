import dynamic from "next/dynamic"
import { HeatSummaryTable } from "./HeatSummaryTable"

const PixiFrameSequenceOverlay = dynamic(
  () => import("../PixiFrameSequenceOverlay"),
  { ssr: false }
)

interface HeatListModalProps {
  isVisible: boolean
}

export const HeatListModal = ({ isVisible }: HeatListModalProps) => (
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
    <HeatSummaryTable />
  </PixiFrameSequenceOverlay>
)

import React from "react"

import { OverlayControlState } from "../../Interfaces"
import PixiFrameSequenceOverlay from "../PixiFrameSequenceOverlay"
import { AthleteInfo } from "./AthleteInfoCard"

interface AthleteCardWithAnimationProps {
	overlayControlState: OverlayControlState
	basePath: string
	frameCount: number
	holdImage: number | string
}

/**
 * Example usage of PixiFrameSequenceOverlay with an existing broadcast card.
 *
 * The animation sequence plays in at 30 fps up to `holdImage`, pauses while
 * the athlete card is visible, then plays the remaining frames out when the
 * card is dismissed.
 *
 * Usage:
 *   <AthleteCardWithAnimation
 *     overlayControlState={overlayControlState}
 *     basePath="/gfx/athlete_bug"
 *     frameCount={60}
 *     holdImage={30}
 *   />
 *
 * Frame files are expected at:
 *   {basePath}/frame_{0001..N}.png
 *
 * `holdImage` can also be a filename suffix such as "frame_0030.png" to identify
 * the hold frame by name rather than index.
 */
const AthleteCardWithAnimation = ({
	overlayControlState,
	basePath,
	frameCount,
	holdImage
}: AthleteCardWithAnimationProps): React.JSX.Element => (
	<PixiFrameSequenceOverlay
		basePath={basePath}
		frameCount={frameCount}
		holdImage={holdImage}
		isVisible={overlayControlState.showLiveRunScore}
		style={{ width: "100%", height: "100%" }}
	>
		<AthleteInfo overlayControlState={overlayControlState} />
	</PixiFrameSequenceOverlay>
)

export default AthleteCardWithAnimation

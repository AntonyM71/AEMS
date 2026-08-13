import React from "react"

import { OverlayControlState } from "../../Interfaces"
import PixiFrameSequenceOverlay from "../PixiFrameSequenceOverlay"
import { AthleteInfo } from "./AthleteInfoCard"

interface AthleteCardWithAnimationProps {
	overlayControlState: OverlayControlState
	configName: string
	configEndpointBase?: string
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
 *     configName="athleteInfo"
 *     configEndpointBase="http://localhost:82/componentInfo"
 *   />
 *
 * The config endpoint should return frame metadata, including the `path` for
 * frame assets (for example `/assets/athlete_info`).
 */
const AthleteCardWithAnimation = ({
	overlayControlState,
	configName,
	configEndpointBase
}: AthleteCardWithAnimationProps): React.JSX.Element => (
	<PixiFrameSequenceOverlay
		configName={configName}
		configEndpointBase={configEndpointBase}
		isVisible={overlayControlState.showLiveRunScore}
		style={{ width: "100%", height: "100%" }}
	>
		<AthleteInfo overlayControlState={overlayControlState} />
	</PixiFrameSequenceOverlay>
)

export default AthleteCardWithAnimation

import { useEffect, useState } from "react"
import { useTimerStreamQuery } from "../../../redux/services/streamingApi"

const FLOAT_RIDE_SECONDS = 45
const SQUIRT_RIDE_SECONDS = 60
// The Timer buzzes once at this point; the overlay warns from the same moment.
const FINAL_WARNING_SECONDS = 10

/** Seconds left in the current ride and the fraction of it remaining. */
export const useRideClock = () => {
	const { data } = useTimerStreamQuery()
	const secondsRemaining = Math.round(data?.time_remaining ?? 0)
	const isRunning = data?.status === "running"
	// ponytail: infers 45 s or 60 s from the Timer's two modes; send the total
	// in the timer payload if a third mode is ever added.
	const [rideSeconds, setRideSeconds] = useState(FLOAT_RIDE_SECONDS)

	useEffect(() => {
		if (!isRunning) {
			setRideSeconds(FLOAT_RIDE_SECONDS)
		} else if (secondsRemaining > FLOAT_RIDE_SECONDS) {
			setRideSeconds(SQUIRT_RIDE_SECONDS)
		}
	}, [isRunning, secondsRemaining])

	return {
		secondsRemaining,
		isCancelled: data?.status === "cancelled",
		fractionRemaining: Math.min(secondsRemaining / rideSeconds, 1),
		isFinalWarning: isRunning && secondsRemaining <= FINAL_WARNING_SECONDS
	}
}

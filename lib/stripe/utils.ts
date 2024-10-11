import Stripe from 'stripe'
import { env } from '../env'

export const stripe = new Stripe(env.STRIPE_SECRET_KEY, { apiVersion: '2024-09-30.acacia' })

export const calculateTrialEndUnixTimestamp = (trialPeriodDays: number | null | undefined) => {
	// Check if trialPeriodDays is null, undefined, or less than 2 days
	if (trialPeriodDays === null || trialPeriodDays === undefined || trialPeriodDays < 2) {
		return undefined
	}

	const currentDate = new Date() // Current date and time
	const trialEnd = new Date(currentDate.getTime() + (trialPeriodDays + 1) * 24 * 60 * 60 * 1000) // Add trial days
	return Math.floor(trialEnd.getTime() / 1000) // Convert to Unix timestamp in seconds
}

export const toDateTime = (secs: number) => {
	const t = new Date(+0)
	t.setSeconds(secs)
	return t
}

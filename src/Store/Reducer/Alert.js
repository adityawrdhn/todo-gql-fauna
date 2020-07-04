const initialState = {
	error: {},
	visible: false,
}

const alert = (state = initialState, { type, payload }) => {
	switch (type) {
		case "ALERT_OPEN":
			return { error: payload, visible: true }
		case "ALERT_CLOSE":
			return { error: {}, visible: false }
		default:
			return state
	}
}
export default alert

const openAlert = (payload) => ({ type: "ALERT_OPEN", payload })
const closeAlert = () => ({ type: "ALERT_CLOSE" })

export const alertActions = {
	openAlert,
	closeAlert,
}

import { alertActions } from "../Alert"

describe("action", () => {
	it("should create an action to show error Alert", () => {
		const text = "Error Test"
		const expectedAction = {
			type: "ALERT_OPEN",
			payload: text,
		}
		expect(alertActions.openAlert(text)).toEqual(expectedAction)
	})
	it("should create an action to close error Alert", () => {
		const expectedAction = {
			type: "ALERT_CLOSE",
		}
		expect(alertActions.closeAlert()).toEqual(expectedAction)
	})
})

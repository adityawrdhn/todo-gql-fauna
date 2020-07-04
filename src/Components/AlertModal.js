import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { Dialog, DialogFooter, DialogType, DefaultButton } from "@fluentui/react"
import { alertActions } from "Store/Action"

const AlertModal = () => {
	const { visible, error: { message = "", name = "Something Missing" } = {} } = useSelector(({ alert }) => alert)
	const dispatch = useDispatch()
	return (
		<Dialog
			hidden={!visible}
			dialogContentProps={{
				type: DialogType.normal,
				title: name,
				subText: message,
			}}
			modalProps={{
				isBlocking: false,
			}}
			onDismiss={() => dispatch(alertActions.closeAlert())}
		>
			<DialogFooter>
				<DefaultButton text="Close" onClick={() => dispatch(alertActions.closeAlert())} />
			</DialogFooter>
		</Dialog>
	)
}

export default AlertModal

import React, { useState } from "react"
import {
	PrimaryButton,
	DefaultButton,
	Stack,
	Icon,
	FontWeights,
	Text,
	DefaultPalette,
	ActionButton,
	Dialog,
	DialogType,
	DialogFooter,
} from "@fluentui/react"
import { Card } from "@uifabric/react-cards"
const titleTextStyles = {
	root: {
		color: DefaultPalette.black,
		fontWeight: FontWeights.semibold,
	},
}
const helpfulTextStyles = {
	root: {
		color: DefaultPalette.blackTranslucent40,
		fontWeight: FontWeights.regular,
	},
}
const iconStyles = {
	root: {
		color: DefaultPalette.themePrimaryS,
		fontSize: 16,
		fontWeight: FontWeights.regular,
		selectors: {
			":hover": {
				color: DefaultPalette.red,
			},
		},
	},
}
const iconStylesWhite = {
	root: {
		color: DefaultPalette.white,
		fontSize: 16,
		fontWeight: FontWeights.regular,
	},
}
const footerCardSectionStyles = {
	root: {
		borderTop: "1px solid " + DefaultPalette.neutralLighter,
	},
}
const backgroundImageCardSectionStyles = {
	root: {
		backgroundColor: DefaultPalette.white,
		marginBottom: 12,
	},
}
const actionButtonStyles = {
	root: {
		border: "none",
		backgroundColor: "transparent",
		height: 32,
		padding: 0,
		minWidth: 0,
	},
	flexContainer: {
		backgroundColor: "transparent",
		selectors: {
			":hover": {
				color: DefaultPalette.red,
				backgroundColor: "transparent",
			},
		},
	},
}
const deleteButtonStyles = {
	root: {
		color: DefaultPalette.red,
		height: 32,
		backgroundColor: "transparent",
		selectors: {
			":hover": {
				color: `${DefaultPalette.white} !important`,
				backgroundColor: `${DefaultPalette.red} !important`,
			},
		},
	},
	flexContainer: {
		backgroundColor: "transparent",
		fontWeight: FontWeights.semibold,
		padding: "0px 16px",
		minWidth: 30,
		color: DefaultPalette.red,
		selectors: {
			":hover": {
				color: DefaultPalette.white,
				backgroundColor: DefaultPalette.red,
			},
		},
	},
}

const cardTokens = { childrenMargin: 12 }
const footerCardSectionTokens = { padding: "12px 0px 0px" }
const TodoItem = ({ onComplete, onDelete, todo: { completed, title, description } }) => {
	const [modalShow, setModalShow] = useState(false)
	return (
		<Stack>
			<Card tokens={cardTokens} styles={backgroundImageCardSectionStyles}>
				<Card.Section>
					<Text styles={titleTextStyles}>{title}</Text>
					<Text variant="small" styles={helpfulTextStyles}>
						{description}
					</Text>
				</Card.Section>
				<Card.Section horizontal styles={footerCardSectionStyles} tokens={footerCardSectionTokens}>
					{completed && (
						<DefaultButton onClick={() => onComplete()}>
							<Icon iconName="Undo" styles={iconStyles} />
							Uncomplete
						</DefaultButton>
					)}
					{!completed && (
						<PrimaryButton onClick={() => onComplete()}>
							<Icon iconName="Checkmark" styles={iconStylesWhite} />
							Complete
						</PrimaryButton>
					)}

					<Stack.Item grow={1}>
						<span />
					</Stack.Item>
					<ActionButton
						text={<Icon iconName="Delete" styles={iconStyles} />}
						styles={actionButtonStyles}
						onClick={() => setModalShow(!modalShow)}
					/>
				</Card.Section>
			</Card>
			<Dialog
				hidden={!modalShow}
				dialogContentProps={{
					type: DialogType.normal,
					title: "Delete",
					subText: "Are you sure you want to delete this item? This action cannot be undone.",
				}}
				modalProps={{
					isBlocking: false,
				}}
			>
				<DialogFooter>
					<ActionButton
						text="Yes"
						styles={deleteButtonStyles}
						onClick={() => {
							onDelete()
							setModalShow(!modalShow)
						}}
					/>
					<DefaultButton
						text="No"
						onClick={() => {
							setModalShow(!modalShow)
						}}
					/>
				</DialogFooter>
			</Dialog>
		</Stack>
	)
}

export default TodoItem
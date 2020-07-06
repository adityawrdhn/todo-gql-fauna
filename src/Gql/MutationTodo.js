import { gql } from "apollo-boost"

export const ADD_TODO_MUTATION = gql`
	mutation CreateTodo($data: TodoInput!) {
		createTodo(data: $data) {
			_id
			title
			description
			completed
			created
		}
	}
`
export const UPDATE_TODO_MUTATION = gql`
	mutation UpdateTodo($id: ID!, $data: TodoInput!) {
		updateTodo(id: $id, data: $data) {
			_id
			title
			description
			completed
			created
		}
	}
`
export const DELETE_TODO_MUTATION = gql`
	mutation DeleteTodo($id: ID!) {
		deleteTodo(id: $id) {
			_id
			title
			description
			completed
			created
		}
	}
`

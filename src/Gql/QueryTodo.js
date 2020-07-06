import { gql } from "apollo-boost"

export const TODOS_QUERY = gql`
    query Todos($size: Int!) {
        todos(_size: $size) {
            data {
                _id
                title
                description
                completed
                created
            }
        }
    }
`
export const TODO_QUERY = gql`
    query Todo($id: Int!) {
        findTodoByID(id: $id) {
            _id
            title
            description
            completed
            created
        }
    }
`

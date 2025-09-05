import { gql } from '@apollo/client';

export const GET_CHARACTERS = gql`
    query GetCharacters($page: Int, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      info {
        pages
        next
        prev
      }
      results {
        id
        name
        species
        image
      }
    }
  }
`
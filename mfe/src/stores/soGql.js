import { gql } from "@apollo/client";

export const FIND_ALL_POSTS = gql`
query Posts {
   posts  {
      id 
      type
      link
      score
      lastEditDate
      creationDate
      lastActivityDate
      owner {
         id
         profileImage
         displayName
         link
      }
   }
}`

export const FIND_ALL_QUESTIONS = gql`
query Questions  {
   questions  {
   id 
    owner {
      id
      profileImage
      displayName
      link
    }
    tags
    title
    link
    score
    creationDate
   }
}`


export const CREATE_USERS = gql`
mutation CreateUser($input: UserInput!) {
   createUser(user:$input) {
   email
   }
 }`
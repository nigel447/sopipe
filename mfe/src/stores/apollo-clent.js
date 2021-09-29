import { ApolloClient, ApolloLink, InMemoryCache, makeVar,   HttpLink,   concat, } from "@apollo/client";
import fetch from "cross-fetch";
import {customFetch} from './middleWare'
import {globalCache} from './apollo-cache'

const baseUrl = `http://localhost`
// const baseUrl = `http://localhost:8080/query`
const httpLink = new HttpLink({ uri: baseUrl, fetch: customFetch });
const publicHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

const getClient = () => { 
    const authMiddleware = new ApolloLink((operation, forward) => {

   // console.log( `operation:${JSON.stringify(operation)}  forward:${JSON.stringify(forward)}`);
    // add headers
    operation.setContext(({ headers = {} }) => {
        const privateHeaders = {
          Authorization: global.access_token
            ? `Bearer ${global.access_token}`
            : "",
        };
        const { isPrivate, Authorization } = headers;
 
        //If there is Authorization in header, it has the highest priority and is preferred to use
        if (Authorization) {
          return {
            headers: { ...publicHeaders, ...{ Authorization } },
          };
        }
        const header = isPrivate
          ? { ...publicHeaders, ...privateHeaders }
          : publicHeaders;
        console.log("header===============");
        console.log(header);
        return {
          headers: header,
        };
      });
      return forward(operation);
     });

     return new ApolloClient({
        cache: globalCache,
        link: concat(authMiddleware, httpLink),
      });
}

export const client = getClient();
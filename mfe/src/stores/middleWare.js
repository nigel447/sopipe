import fetch from "cross-fetch";

const LOCAL_ENDPOINT = ":3000/query";
const REMOTE_ENDPOINT = "/query";


// map of gql qureies to ports
const endPoints = {
  Posts: REMOTE_ENDPOINT,
  Questions: REMOTE_ENDPOINT,

}


/**
 * options.body looks like
   {"operationName":"Users","variables":{},"query":"query Users {\n  users {\n    email\n    __typename\n  }\n}\n"} 
 */

export const customFetch = (uri, options) => {
  const { operationName } = JSON.parse(options.body);
  let newUri = `${uri}${endPoints[operationName]}`;
  console.log("currentURL========:" + newUri);
  return fetch(newUri, options);
};
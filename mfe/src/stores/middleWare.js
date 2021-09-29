import fetch from "cross-fetch";

const LOCAL_ENDPOINT = ":3000/query";


// map of gql qureies to ports
const endPoints = {
  Posts: LOCAL_ENDPOINT,
  Questions: LOCAL_ENDPOINT,

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
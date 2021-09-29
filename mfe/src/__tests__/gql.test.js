import { client } from "../stores/apollo-clent";
import { customFetch } from "../stores/middleWare";
import {
  FIND_ALL_POSTS,
  FIND_ALL_QUESTIONS,
} from "../stores/soGql";


/**
 * 
 *  operation:{"variables":{},"extensions":{},"operationName":"Users","query":{"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Users"},"variableDefinitions":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"},"arguments":[],"directives":[]}]}}],"loc":{"start":0,"end":25}}}  forward:undefined
 *  
 * */

// yarn jest -t "gql test mddleware"
it("gql test mddleware", async () => {  // let ret = 
  let options = { body: `{"variables":{},"extensions":{},"operationName":"Users"}` }
  const { operationName } = JSON.parse(options.body)
  console.log("operationName==:" + operationName);
  customFetch("testing", options)
})


// yarn jest -t "gql test gql posts"
it("gql test gql posts", async () => {  // let ret = 
  let ret = await client
    .query({
      query: FIND_ALL_POSTS,
      context: {
        headers: {
          isPrivate: false,
        },
      }
    }).then((result) => result)
    .catch((err) => {
      console.log("query error " + err);
      return;
    });


  if (typeof ret !== "undefined") {
    console.log(`num of Posts ${ret.data.posts.length}`);
    //console.log(`Posts ${JSON.stringify(ret.data.posts)}`);
   // {"__typename":"Post","id":"69261372","owner":{"__typename":"Owner","id":"22809585"}},
   for (let p of ret.data.posts) { 
        // console.log(`Post Id ${p.id}`);
        // console.log(`Post Type ${p.type}`);
        // console.log(`Post Link ${p.link}`);
        // console.log(`Owner Id ${p.owner.id}`);
        // console.log(`Owner ProfileImage ${p.owner.profileImage}`);
        console.log(`Owner DisplayName ${p.score}`);
        var date = new Date(p.creationDate);
        console.log(`Owner Link ${new Date(p.creationDate).toUTCString()}`);
        

   }
  }

});

// yarn jest -t "gql test gql questions"
it("gql test gql questions", async () => {  // let ret = 
  let ret = await client
    .query({
      query: FIND_ALL_QUESTIONS,
      context: {
        headers: {
          isPrivate: false,
        },
      }
    }).then((result) => result)
    .catch((err) => {
      console.log("query error " + err);
      return;
    });


  if (typeof ret !== "undefined") {
    console.log(`num of Posts ${ret.data.questions.length}`);
    //console.log(`Posts ${JSON.stringify(ret.data.questions)}`);

   for (let q of ret.data.questions) { 
        // console.log(`Question Id ${q.id}`);
        console.log(`Question Tags ${q.tags}`);
        console.log(`Question Title ${q.title}`);
        // console.log(`Question Link ${q.link}`);
        // console.log(`Owner Id ${q.owner.id}`);
        // console.log(`Owner ProfileImage ${q.owner.profileImage}`);
        // console.log(`Owner DisplayName ${q.owner.displayName}`);
        // console.log(`Owner Link ${q.owner.link}`);
        

   }
  }

});
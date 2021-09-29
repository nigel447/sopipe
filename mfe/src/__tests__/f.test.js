import {uniqueKey} from "../stores/hooks";

// yarn jest -t "f test random key"
it("f test random key", async () => {   
    for(let i=0;i < 30; i++) {
        console.log("uniqueKey==:" + uniqueKey());
    }
  })
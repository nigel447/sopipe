package dbbolt

/**
bool, for JSON booleans
float64, for JSON numbers
string, for JSON strings
[]interface{}, for JSON arrays
map[string]interface{}, for JSON objects
nil for JSON null
*/

/**
https://github.com/etcd-io/bbolt
*/

import (
	"encoding/json"
	"fmt"
	// "io/ioutil"

	//"strconv"
	"testing"

	_ "aserver/graph/model"
	bolt "go.etcd.io/bbolt"
)

func TestInitDb(t *testing.T) {
	// marshal the data to the db
	WriteDbData()
	// unmarshal the data from the db
	LoadDbData()
	fmt.Printf("size of data from the db %d\n", len(DbData))
	CleanDb()
}

func TestRawDataSerde(t *testing.T) {
	qItems := marshalQuestionJson("../raw-data/questions.json")
	fmt.Printf("%#v\n", qItems)
	pItems := marshalPostJson("../raw-data/questions.json")
	fmt.Printf("%#v\n", pItems)
}

func TestInterfaceFlow(t *testing.T) {
 

	if flagError != nil {
		t.Errorf("Bucket Write Fail")
	}

	for _, v := range rawData {
		testBoltBucketRead(v.bucket)

	}

	if flagError != nil {
		t.Errorf("Bucket Read Fail")
	}

	CleanDb()
}

func TestDebug(t *testing.T) {

	testBoltBucketRead("posts")

}


func testBoltBucketRead(bucket string) {
	fmt.Printf("testBoltBucketRead %s\n", bucket)
	db := GetDbForTest()
	defer db.Close()

	db.View(func(tx *bolt.Tx) error {
		b := tx.Bucket([]byte(bucket))
		c := b.Cursor()

		for k, v := c.First(); k != nil; k, v = c.Next() {
			switch bucket {
			case PostBucket:
				var p RawPost
				err := json.Unmarshal(v, &p)
				fmt.Printf("testBoltBucketRead switch PostBucket %#v\n", p)
				handleFlagError(err)
			case QuestionBucket:
				fmt.Printf("testBoltBucketRead switch QuestionBucket %#v\n", v)
				var q RawQuestion
				err := json.Unmarshal(v, &q)
				handleFlagError(err)
			default:
				break
			}
		}
		return nil
	})

}
 


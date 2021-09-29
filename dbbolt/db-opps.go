package dbbolt

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"
	"strconv"
	bolt "go.etcd.io/bbolt"
)

func LoadDbData() {
	for _,v := range rawData {
		readDbData(v.bucket)
	}
}

func readDbData(bucket string) {
	db := GetDb()
	defer db.Close()

	db.View(func(tx *bolt.Tx) error {
		b := tx.Bucket([]byte(bucket))
		c := b.Cursor()

		for k, v := c.First(); k != nil; k, v = c.Next() {
		switch(bucket) {
				case PostBucket: 
				var p RawPost
				err :=json.Unmarshal(v, &p)
				if err == nil {
					DbData = append(DbData, Item{ItemType:SOPost,Post:p})
				} else {
					handleFlagError(err)
				}
				case QuestionBucket: 
				var q RawQuestion
				err :=json.Unmarshal(v, &q)
				if err == nil {
					DbData = append(DbData, Item{ItemType:SOQuestion, Question:q})
				} else {
					handleFlagError(err)
				}
				default: break 
				}
		}
		return nil
	})

}
func WriteDbData() {
	for i,v := range rawData {
		data := marshalItemsJson(i,v.path)
		writeDbData( v.bucket, data)
	 }
}

func writeDbData(bucket string, data []Item ) {
	db := GetDb()
	defer db.Close()
	db.Update(func(tx *bolt.Tx) error {
		b, err := tx.CreateBucketIfNotExists([]byte(bucket))
		handleFlagError(err)
		flagError = err
		for i, v := range data {
			ib := []byte(strconv.Itoa(i))
            switch(bucket) {
			case PostBucket: 
			jsonEncoded, _ := json.Marshal(v.Post)
			err = b.Put(ib, jsonEncoded)
			handleFlagError(err)
			case QuestionBucket: 
			jsonEncoded, _ := json.Marshal(v.Question)
			err = b.Put(ib, jsonEncoded)
			handleFlagError(err)
			default: break 
			}
		}
		return nil
	})
}

func marshalItemsJson(index int, path string) []Item {
	var items []Item
	switch(index) {
	case 0 :
		outData :=  marshalPostJson(path)
		for _,v := range outData.StreamData {
			items = append(items, Item{ItemType: SOPost, Post: v})
		}
	case 1 :
		outData := marshalQuestionJson(path) 
		for _,v := range outData.StreamData {
			items = append(items, Item{ItemType: SOQuestion, Question: v})
		}
	default:
		return items	
	}
	return items
}

func marshalQuestionJson(path string)  QuestionItems {
	var data QuestionItems
	rawData, _ := ioutil.ReadFile(path)
	err := json.Unmarshal(rawData, &data)
	handleFlagError(err)
	return data 
}

func marshalPostJson(path string ) PostItems {
	var data PostItems
	rawData, _ := ioutil.ReadFile(path)
	err := json.Unmarshal(rawData, &data)
	handleFlagError(err)
	var items []Item
	data.Items = items
	return data
}


func GetDbForTest() (db *bolt.DB) {

	db, err := bolt.Open("../so.db", 0600, nil)
	handleError(err)
	return
}

func GetDb() (db *bolt.DB) {

	db, err := bolt.Open("so.db", 0600, nil)
	handleError(err)
	return
}

// https://gist.github.com/novalagung/13c5c8f4d30e0c4bff27
func CleanDb() {
	var err = os.Remove("so.db")
	handleError(err)
}


func handleError(err error) {
	if err != nil {
		fmt.Println("HandleError ", err.Error())
	}
}

func handleFlagError(err error) {
	if err != nil {
		flagError = err
	}
}

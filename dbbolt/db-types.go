package dbbolt
 
// import "fmt"

const ( 
	SOPost Type  = iota
	SOQuestion
)

const ( 
    PostBucket = "posts"
	QuestionBucket = "questions"
)

type (

    Type int64
 
	Item struct  { 
	 ItemType Type	
	 Post RawPost
	 Question RawQuestion
	}

	PostItems struct {
		StreamData []RawPost `json:"items"`
		Items []Item `json:"dbItems"`
	}

	QuestionItems struct {
		StreamData []RawQuestion `json:"items"`
		Items []Item `json:"dbItems"`
	}

	RawOwner struct {
		ID           int32  `json:"account_id"`
		Reputation   int   `json:"reputation"`
		ProfileImage string `json:"profile_image"`
		DisplayName  string `json:"display_name"`
		Link         string `json:"link"`
	}

	RawPost struct {
		ID    int32    `json:"post_id"`
		Owner RawOwner `json:"owner"`
		Score int      `json:"score"`
		Type  string   `json:"post_type"`
		Link  string   `json:"link"`
		LastEditDate     int `json:"last_edit_date"`
		LastActivityDate int `json:"last_activity_date"`
		CreationDate     int `json:"creation_date"`
	}

	RawQuestion struct {
		ID    int32    `json:"question_id"`
		Owner RawOwner `json:"owner"`
		Score int      `json:"score"`
		Tags  []string `json:"tags"`
		Title string   `json:"title"`
		Link  string   `json:"link"`
		LastActivityDate int `json:"last_activity_date"`
		CreationDate     int `json:"creation_date"`
	}
)  

var (
	flagError error
	rawData = [2]struct{
		bucket string 
		path string} {{PostBucket,"raw-data/posts.json"}, {QuestionBucket,"raw-data/questions.json"} }
	DbData []Item	
	DbPostData []Item
	DbQuestionData []Item
)
  
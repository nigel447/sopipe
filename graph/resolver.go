package graph

import (
	"aserver/dbbolt"

)

type Resolver struct{
   PostData []dbbolt.Item
   QuestionData []dbbolt.Item
}
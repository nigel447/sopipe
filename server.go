package main

import (
	"aserver/dbbolt"
	"aserver/graph"
	"aserver/graph/generated"
	"aserver/sec"
	"embed"
	"fmt"
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"log"
	"net/http"
	"os"
	"io/fs"

	"context"
	"github.com/99designs/gqlgen/graphql"
)

const defaultPort = "3000"

//go:embed mfe/build
var FE embed.FS

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}
	dbbolt.CleanDb()
	dbbolt.WriteDbData()
	dbbolt.LoadDbData()
	for _, v := range dbbolt.DbData {
		switch v.ItemType {
		case dbbolt.SOPost:
			dbbolt.DbPostData = append(dbbolt.DbPostData, v)
		case dbbolt.SOQuestion:
			dbbolt.DbQuestionData = append(dbbolt.DbQuestionData, v)
		default:
			break
		}
	}
	fmt.Println("Bolt data for resolver ", len(dbbolt.DbPostData),len(dbbolt.DbQuestionData))
	srv := handler.NewDefaultServer(
		generated.NewExecutableSchema(
			generated.Config{Resolvers: &graph.Resolver{PostData: dbbolt.DbPostData,
				QuestionData: dbbolt.DbQuestionData}}))
	srv.AroundOperations(func(ctx context.Context, next graphql.OperationHandler) graphql.ResponseHandler {
		oc := graphql.GetOperationContext(ctx)
		if oc.OperationName != "IntrospectionQuery" {
			fmt.Printf("around: %s %s", oc.OperationName, oc.RawQuery)
		}
		return next(ctx)
	})


	rFS, err := fs.Sub(FE, "mfe/build")
	if err != nil {
		fmt.Errorf("rfs error %#v", err)
	}
	http.Handle("/", http.Handler(http.FileServer(http.FS(rFS))))
	http.Handle("/socialSignIn", http.HandlerFunc(func(res http.ResponseWriter, req *http.Request) {
 
		http.Redirect(res, req, "/", http.StatusSeeOther)
	}))
	http.Handle("/gql",corsMiddleware( playground.Handler("SO Pipe", "/query")))
	http.Handle("/query", corsMiddleware( srv) )

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}


func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(res http.ResponseWriter, req *http.Request) {
		if sec.Preflight(res, req) {
			return
		}
	  next.ServeHTTP(res, req)
	})
  }

BINARY=gogql

build:
	go mod download
	CGO_ENABLED=1  go build -ldflags "-s -w" -o $(BINARY) 

gqlgen-init:
	rm -Rf graph/**/*
	@go get github.com/99designs/gqlgen/cmd@v0.14.0
	@go run github.com/99designs/gqlgen init
	rm  graph/schema.graphqls


generate:
	@go get github.com/99designs/gqlgen/cmd@v0.14.0
	@go generate ./...

download:
	@echo Download go.mod dependencies
	@go mod download

install-tools: download
	@echo Installing tools from tools.go
	@cat tools.go | grep _ | awk -F'"' '{print $$2}' | xargs -tI % go install %
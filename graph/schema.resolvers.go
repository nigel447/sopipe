package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"aserver/graph/generated"
	"aserver/graph/model"
	"context"
	"strconv"
)

var (
	Posts     []*model.Post
	Questions []*model.Question
)

func (r *queryResolver) Posts(ctx context.Context) ([]*model.Post, error) {
	for _, v := range r.PostData {
		profileLink := v.Post.Owner.Link
		image := v.Post.Owner.ProfileImage
		name := v.Post.Owner.DisplayName
		rep := v.Post.Owner.Reputation
		atype := v.Post.Type
		link := v.Post.Link
		score := v.Post.Score 
		lad := v.Post.LastActivityDate 
		cd := v.Post.CreationDate 
		ed := v.Post.LastEditDate 
		p := model.Post{
			ID: strconv.Itoa(int(v.Post.ID)),
			Owner: &model.Owner{
				ID:           strconv.Itoa(int(v.Post.Owner.ID)),
				ProfileImage: &image,
				DisplayName:  &name,
				Link:         &profileLink,
				Reputation: &rep,	
			},
			Type: &atype,
			Link: &link,
			Score:&score,
			LastEditDate:&ed,
			LastActivityDate:&lad,
			CreationDate:&cd,

		}
		Posts = append(Posts, &p)
	}

	return Posts, nil
}

func (r *queryResolver) Questions(ctx context.Context) ([]*model.Question, error) {
	for _, v := range r.QuestionData {
		var tags []*string
		for _, k := range v.Question.Tags {
			t := k
			tags = append(tags, &t)
		}

		profileLink := v.Question.Owner.Link
		image := v.Question.Owner.ProfileImage
		name := v.Question.Owner.DisplayName
		rep := v.Question.Owner.Reputation
		title := v.Question.Title
		link := v.Question.Link
		score := v.Question.Score 
		lad := v.Question.LastActivityDate 
		cd := v.Question.CreationDate 
 

		Questions = append(Questions, &model.Question{
			ID: strconv.Itoa(int(v.Question.ID)),
			Owner: &model.Owner{
				ID:           strconv.Itoa(int(v.Question.Owner.ID)),
				ProfileImage: &image,
				DisplayName:  &name,
				Link:         &profileLink,
				Reputation: &rep,
			},
			Tags:  tags,
			Link:  &link,
			Title: &title,
			Score:&score,
			LastActivityDate:&lad,
			CreationDate:&cd,
		})

	}
	return Questions, nil
}

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type queryResolver struct{ *Resolver }

 
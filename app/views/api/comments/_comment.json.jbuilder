json.(comment, :id, :body, :owner_id, :post_id, :parent_id, :created_at, :updated_at)
json.karma(comment.karma)
json.num_comments(comment.num_comments)
json.already_voted(comment.user_already_voted?(current_user))
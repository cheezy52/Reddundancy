json.(post, :id, :link, :title, :owner_id, :sub_id, :created_at, :updated_at)
json.karma(post.karma)
json.num_comments(post.num_comments)
json.already_voted(post.user_already_voted?(current_user))
